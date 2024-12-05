import axios from "axios";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Select from 'react-select';
import moment from "moment";
import * as XLSX from "xlsx";

export default function TeacherAttendance() {
    const router = useRouter();
    const [teacherList, setTeacherList] = useState([]);
    const { data: session } = useSession();
    const [teacherValue, setTeachersValue] = useState([]);
    // const [teachersName, setTeachersName] = useState('');
    const [data, setData] = useState([])
    const [formErrors, setFormErrors] = useState({});
    // const [message , setMessage] = useState(``)
    const [majorIDs, setMajorIDs] = useState()

    const redirect = () => {
        router.push("/AccessDenied");
    };

    const handleTeachers = (selectedValues) => {
        const selectedTeacherIds = selectedValues.map((value) => value.value);
        // const selectedTeacherNames = selectedValues.map((value) => value.label);
        setTeachersValue(selectedTeacherIds);
        // setTeachersName(selectedTeacherNames);
    };

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const payload = { table: 'teachers' };
                const response = await axios.post('/api/pmApi/getAll', payload);
                if (response.data && response.data.rows) {
                    setTeacherList(response.data.rows);
                } else {
                    throw new Error('Invalid response data');
                }
            } catch (error) {
                console.error('Error fetching teachers:', error);
            }
        };
        fetchTeachers();

    }, []);


    useEffect(() => {
        const fetchTeacherReport = async () => {
            try {
                if (teacherValue.length > 0) {
                    if (session.user?.hasMultiMajor === 'false') {
                        const response = await axios.post('/api/pmApi/teacherReport', {
                            teacher_id: teacherValue,
                            pmMajor: session.user?.majorid
                        })
                        if (response.data.code === 201) {
                            setData(response.data)

                        } else {
                            setData(response.data.data)

                        }
                    } else {
                        const response = await axios.post('/api/pmApi/teacherReport', {
                            teacher_id: teacherValue,
                            pmMajor: session.user?.majorid,
                            majorId: majorIDs
                        })
                        if (response.data.code === 201) {
                            setData(response.data)

                        } else {
                            setData(response.data.data)

                        }
                    }


                }
            } catch (error) {
                return error
            }
        }
        fetchTeacherReport()

    }, [teacherValue])

    useEffect(() => {
        const fetchAnotherMajor = async () => {
            try {
                let payload;
                if(session.user?.role === '2'){
                     payload = { table: 'program_manager_extra_major' }

                }else if(session.user?.role === '3'){
                     payload = { table: 'program_manager_assistance_extra_major' }
                }
                
                const response = await axios.post('/api/pmApi/getAll', payload)
                console.log('extra' , response.data.rows[0].major_id)
                if (response.data && response.data.rows) {
                    setMajorIDs(response.data.rows[0].major_id)

                } else {
                    throw new Error('Invalid response data');
                }
            } catch (error) {
                console.error('Error fetching data', error)
            }

        }
        fetchAnotherMajor()
    }, [])


    const exportData = () => {
        try {
            // Modify the data
            console.log('data');
            const errors = {};
            if (data.length <= 0) {
                if (data.code === 201) {
                    errors.teacherValue = `Teacher Doesn't has schedule`;
                } else {
                    errors.teacherValue = 'Please select a teacher';
                }
                if (Object.keys(errors).length > 0) {
                    setFormErrors(errors);
                }
            } else {
                const modifiedData = data.map((item) => {
                    const status = item.is_online ? 'online' : 'onsite';
                    const additionalFields = status === 'onsite'
                        ? { Room: item.room_name, Building: item.room_building }
                        : {};

                    return {
                        FirstName: item.teacher_firstname,
                        LastName: item.teacher_lastname,
                        Course: item.course_name,
                        Date: formatDate(item.day),
                        FromTime: ConvertTime(item.from_time),
                        ToTime: ConvertTime(item.to_time),
                        Status: status,
                        Promotion: item.promotion,
                        ...additionalFields,
                    };
                });

                // Check if data is available for export
                if (modifiedData.length > 0) {
                    // Convert modified data to XLSX format
                    const ws = XLSX.utils.json_to_sheet(modifiedData);
                    const wb = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(wb, ws, "Teacher Attendance");
                    const fileName = `TeacherAttendances.xlsx`;
                    XLSX.writeFile(wb, fileName);
                } else {
                    console.warn('No data available for export');
                }
            }
        } catch (error) {
            console.error("Error exporting data: ", error);
            // Handle the error and set an appropriate error message
            setFormErrors({ teacherValue: `Teacher Doesn't has schedule` });
        }
    };



    const ConvertTime = (timeWithTimeZone) => {
        const [time] = timeWithTimeZone.split('+'); // Remove the timezone offset
        const [hours, minutes] = time.split(':');
        const formattedHours = parseInt(hours) % 12 === 0 ? 12 : parseInt(hours) % 12;

        const period = parseInt(hours) < 12 ? 'AM' : 'PM';
        return `${formattedHours}:${minutes} ${period}`;
    };

    const formatDate = (dateString) => {
        return moment(dateString).format("DD/MM/YYYY");
    };

    return (
        <>
            <Head>
                <title>SIS PM - Teachers</title>
            </Head>
            {session?.user.role === "2" || session?.user.role === "3" ? (
                <>
                    <p className="text-gray-700 text-3xl pt-5 mb-10 font-bold">
                        Teacher(s) Attendance
                    </p>
                    <div className="text-center text-red-500 font-bold p-2">{formErrors.teacherValue}</div>
                    <>
                        <Select
                            isMulti
                            options={teacherList.map((teacher) => ({
                                value: teacher.teacher_id,
                                label: `${teacher.teacher_firstname} ${teacher.teacher_lastname}`
                            })).sort((a, b) => a.label.localeCompare(b.label))}
                            placeholder="Select Teacher"
                            onChange={handleTeachers}
                        />

                    </>
                    <div className="flex justify-end">
                        <button
                            className="primary-button btnCol text-white w-60 hover:text-white hover:font-bold mt-8"
                            type="button"
                            onClick={exportData}
                        >
                            Export
                        </button>
                    </div>




                </>
            ) : (
                redirect()
            )}
        </>
    );
}
TeacherAttendance.auth = true;
TeacherAttendance.adminOnly = true;
