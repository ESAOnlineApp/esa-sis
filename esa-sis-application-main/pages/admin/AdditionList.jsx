import { useSession } from "next-auth/react";

import React, { useState, useEffect } from "react";
// import generatePasswod from "../../utilities/generatePassword";
import axios from "axios";
// import bcryptjs from "bcryptjs";
import { useRouter } from "next/router";
import { NotificatonMessage } from "../../components/Dashboard/WarningMessage";
import MajorList from "../../components/Dashboard/MajorList";
import PromotionList from "../../components/Dashboard/PromotionList";
import CourseTypeList from "../../components/Dashboard/CourseTypeList";


export default function AdditionList() {

    const [formErrors, setFormErrors] = useState({});
    const [errors, setErrors] = useState({});
    const { data: session } = useSession();
    const router = useRouter();
    const [confirmOpenMessage, setConfirmOpenMessage] = useState(false);
    const [messages, setMessages] = useState("");
    const [promotion, setPromotion] = useState("");
    const [major, setMajor] = useState([]);
    const [majorValue, setMajorValue] = useState("");
    const [additionOption, setAdditionOption] = useState('0')
    const [majorName, setMajorName] = useState('')
    const [courseType, setCourseType] = useState('')
    const [majorList, setMajorList] = useState([])
    const [promotionList, setPromotionList] = useState([])
    const [courseList, setCourseList] = useState([])
    const [counter, setCounter] = useState(1)


    const redirect = () => {
        router.push("/AccessDenied");
    };

    const getAllMajors = async () => {
        try {
            let majorData = await axios.get("/api/admin/adminApi/getMajor");
            majorData.data.sort((a, b) => parseInt(b.major_id) - parseInt(a.major_id)); // Sort majors in descending order
            setMajor(majorData.data);
            // Get the largest major_id from the sorted array
            const largestMajorId = majorData.data[0].major_id;
            // Store the largest major_id in local storage
            setCounter(parseInt(largestMajorId) + 1);
            localStorage.setItem('largestMajorId', largestMajorId);
        } catch (error) {
            return error;
        }
    };
    
    



    useEffect(() => {
        const fetchData = () => {
            // Fetch all major-related data here
            getAllMajors();
        };
    
        // Fetch data initially
        fetchData();
    
        // Fetch data every 3 minutes
        const interval = setInterval(fetchData, 1 * 60 * 1000);
    
        // Cleanup function to clear interval
        return () => clearInterval(interval);
    }, []);
    
    const handleAdd = async () => {
        const errors = {};
        if (promotion.trim() === "") {
            errors.promotion = "promotion is required.";
        }
        if (majorValue.length === 0) {
            errors.majorValue = "Select At Least one major"
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        const payload = {

            promotion_name: promotion.trim('').toUpperCase(),
            academic_year: new Date().getFullYear(),
            major_id: majorValue,
        };
        console.log(payload);
        try {
            const data = await axios.post(
                "/api/admin/adminApi/createPromotion",
                payload
            );


            if (data.data.success === true && data.data.code === 201) {
                const majorName = await axios.post(
                    '/api/pmApi/getAllCourses', {
                    table: 'major',
                    Where: 'major_id',
                    id: data.data.data.rows[0].major_id
                }
                )
           
    
                const majors_name = majorName.data.data[0].major_name
                setPromotion('')
                setPromotionList((prevPromotionList) => [
                    ...prevPromotionList,
                    ...data.data.data.rows.map((item) => ({
                        ...item,
                        major_name: majors_name
                    }))
                ]);
                setMajorValue('')
                // console.log(data.data.message);
                setConfirmOpenMessage(true);
                setMessages(data.data.message);
            }else if(data.data.success === true && data.data.code === 200){
                setPromotion('')
                setMajorValue('')
                // console.log(data.data.message);
                setConfirmOpenMessage(true);
                setMessages(data.data.message);

            }

        } catch (error) {
            return error;
        }
    };

    const handleAddOption = async () => {


        if (additionOption === '2') {
            const errors = {};
            if (majorName.trim() === "") {
                errors.majorName = "major name is required.";
            }


            if (Object.keys(errors).length > 0) {
                setErrors(errors);
                return;
            }
            const payload = {
                major_id: counter,
                major_name: majorName.trim(" ")

            }
            const data = await axios.post('/api/admin/adminApi/createMajor', payload)
            console.log(data.data.data)
            if (data.data.success === true && data.data.code === 201) {
                setMajorName(' ')
                setConfirmOpenMessage(true);
                setMajorList((prevMajorList) => [...prevMajorList, ...data.data.data.rows]);
                setMessages(data.data.message);
            } else if (data.data.success === true && data.data.code === 200) {
                setMajorName(' ')
                setConfirmOpenMessage(true);
                setMessages(data.data.message);

            }
        }
        else if (additionOption === '3') {
            const errors = {};
            if (courseType.trim(" ") === "") {
                errors.courseType = "course Type is required.";
            }


            if (Object.keys(errors).length > 0) {
                setErrors(errors);
                return;
            }
            const payload = {
                table: 'course_type',
                column: 'course_type',
                value: courseType
            }

            const data = await axios.post('/api/admin/adminApi/create', payload)
            if (data.data.success === true && data.data.code === 201) {
                setCourseType(' ')
                setCourseList((prevCourseList) => [...prevCourseList, ...data.data.data.rows]);
                setConfirmOpenMessage(true);
                setMessages(data.data.message);
            }else if(data.data.success === true && data.data.code === 200){
                setCourseType(' ')
                setConfirmOpenMessage(true);
                setMessages(data.data.message);

            }
        }
    }

    const handleOpenNotificatonMessages = () => {
        setConfirmOpenMessage(true);
    };
    const handleCloseNotificatonMessages = () => {
        setConfirmOpenMessage(false);
    };
    const fetchMajor = async () => {
        try {
            const response = await axios.post('/api/pmApi/getAll', { table: 'major' })
            setMajorList(response.data.rows)

        } catch (error) {
            console.error(error)
        }
    }

    const fetchPromotions = async () => {
        try {
            const response = await axios.post('/api/admin/adminApi/promotionList')
            setPromotionList(response.data.data)
        } catch (error) {
            console.error(error)
        }
    }

    const fetchCourseList = async () => {
        try {
            const response = await axios.post('/api/pmApi/getAll', { table: 'course_type' })
            setCourseList(response.data.rows)

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (additionOption === '1') {
            // Fetch promotions here
            fetchPromotions();
        } else if (additionOption === '2') {
            fetchMajor()
        } else if (additionOption === '3') {
            fetchCourseList()
        }
    }, [additionOption]);


    return (
        <>
            {confirmOpenMessage && (
                <NotificatonMessage
                    handleOpenNotificatonMessages={handleOpenNotificatonMessages}
                    handleCloseNotificatonMessages={handleCloseNotificatonMessages}
                    messages={messages}
                />
            )}
            <div className="flex flex-col md:flex-row mb-4 md:mb-20">
                <label className="w-full md:w-auto">
                    Addition List:
                    <select
                        onChange={(e) => setAdditionOption(e.target.value)}
                        value={additionOption}
                        className="ml-0 md:ml-4 mt-3 md:mt-0 w-full md:w-96"
                    >
                        <option value="0">Choose an Addition</option>
                        <option value="1">Promotion</option>
                        <option value="2">Major</option>
                        <option value="3">Course Type</option>
                    </select>
                </label>
            </div>

            {session?.user.role === "0" ? (
                <div className="flex flex-col">
                    {additionOption === "1" ? (
                        <div>
                            <PromotionList promotionList={promotionList} setPromotionList={setPromotionList} />

                            <form className="mb-3 md:mb-4 pb-4 md:pb-0 border-blue-300 border-b-2 mt-4">
                                <div className="mb-3">
                                    <label className="mr-2">
                                        Promotion:
                                        <input
                                            className="w-full md:w-1/2 mt-3 md:mt-0"
                                            type="text"
                                            name="ID"
                                            required
                                            placeholder="Promotion"
                                            value={promotion}
                                            onChange={(e) => setPromotion(e.target.value)}
                                        />
                                        {formErrors.promotion && (
                                            <div className="text-center text-red-500 font-bold">{formErrors.promotion}</div>
                                        )}
                                    </label>
                                </div>
                                <div className="mb-2">
                                    <label className="mr-2">
                                        Major:
                                        <select
                                            onChange={(e) => setMajorValue(e.target.value)}
                                            value={majorValue}
                                            className="w-full md:w-1/2 mt-3 md:mt-0"
                                        >
                                            <option key={"uu2isdvf"} value="">
                                                Choose a Major
                                            </option>
                                            {major &&
                                                major.map((major) => (
                                                    <option key={major.major_name} value={major.major_id}>
                                                        {major.major_name}
                                                    </option>
                                                ))}
                                        </select>
                                        {formErrors.majorValue && (
                                            <div className="text-center text-red-500 font-bold p-2">{formErrors.majorValue}</div>
                                        )}
                                    </label>
                                </div>

                                <div className="flex mt-4 justify-end mb-4">
                                    <button
                                        className="primary-button rounded w-60 btnCol text-white hover:text-white hover:font-bold"
                                        type="button"
                                        onClick={handleAdd}
                                    >
                                        Add
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : additionOption === "2" ? (
                        <div>
                            <MajorList majorList={majorList} setMajorList={setMajorList} />

                            <form className="mb-3 md:mb-4 pb-4 md:pb-0 border-blue-300 border-b-2 mt-4">
                                <div className="mb-3">
                                    <label >
                                        Major Name:
                                        <input
                                            className="w-full ml-0 md:ml-1 mt-3 md:mt-0"
                                            type="text"
                                            name="ID"
                                            required
                                            placeholder="Major Name"
                                            value={majorName}
                                            onChange={(e) => setMajorName(e.target.value)}
                                        />
                                        {errors.majorName && (
                                            <div className="text-center text-red-500 font-bold">{errors.majorName}</div>
                                        )}
                                    </label>

                                </div>
                                <div className="flex mt-4 justify-end mb-4">
                                    <button
                                        className="primary-button rounded w-60 btnCol text-white hover:text-white hover:font-bold"
                                        type="button"
                                        onClick={handleAddOption}
                                    >
                                        Add
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : additionOption === '3' ? (
                        <div>
                            <CourseTypeList courseList={courseList} setCourseList={setCourseList} />
                            <form className="mb-3 md:mb-4 pb-4 md:pb-0 border-blue-300 border-b-2 mt-4">
                                <div className="mb-3">
                                    <label className="">
                                        Course Type:
                                        <input
                                            className="w-full ml-0 md:ml-1 mt-3 md:mt-0"
                                            type="text"
                                            name="ID"
                                            required
                                            placeholder="Course Type"
                                            value={courseType}
                                            onChange={(e) => setCourseType(e.target.value)}
                                        />
                                        {errors.courseType && (
                                            <div className="text-center text-red-500 font-bold">{errors.courseType}</div>
                                        )}
                                    </label>
                                </div>

                                <div className="flex mt-4 justify-end mb-4">
                                    <button
                                        className="primary-button rounded w-60 btnCol text-white hover:text-white hover:font-bold"
                                        type="button"
                                        onClick={handleAddOption}
                                    >
                                        Add
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            ) : (
                redirect()
            )}
        </>
    );

}
AdditionList.auth = true;
AdditionList.adminOnly = true;
