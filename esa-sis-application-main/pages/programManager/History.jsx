import { useSession } from 'next-auth/react';
import Head from 'next/head';
import HistoryList from '../../components/Dashboard/HistoryList';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';

import axios from 'axios';
// import { x64 } from 'crypto-js';

import CustomSelectBox from './customSelectBox';
// import UploadStudent from './UploadStudent';
// import Link from 'next/link';

export default function History() {
    const { data: session } = useSession();
    const [users, setUsers] = useState([]);
    const router = useRouter();
    // const [major, setMajor] = useState([]);
    // const [allMajor, setallMajor] = useState([]);
    //   const [status, setStatus] = useState([]);
    const [promotion, setPromotion] = useState([]);
    // const [test, setTest] = useState(false);

    const [idValue, setIdValue] = useState('');
    const [firstnameValue, setFirstnameValue] = useState('');
    const [lastnameValue, setLastnameValue] = useState('');
    // const [majorValue, setMajorValue] = useState('');
    //   const [statusValue, setStatusValue] = useState('');
    const [promotionValue, setPromotionValue] = useState('');
    const [promotionsName, setPromotionName] = useState('')
    console.log([promotionsName])
    const [major, setMajors] = useState([])
    const [majorId, setMajorIds] = useState('')

    //   const [openUpload , setOpenUpload] = useState(false)
    const [graduationYear, setGraduationYear] = useState('');

    // Function to extract the first word before a hyphen "-"
    // const getFirstWordBeforeHyphen = (text) => {
    //     if (text) {
    //         const words = text.split("-");
    //         if (words.length > 0) {
    //             return words[0];
    //         }
    //     }
    //     return "";
    // };

    // const firstMajorWord = getFirstWordBeforeHyphen(session?.user.majorName);

    // const isExeMajor = firstMajorWord === "EXED";

    const redirect = () => {
        router.push("/AccessDenied");
    };

    const handleMajors = async () => {
        try {
            if (session.user?.role === '3') {
                const data = await axios.post('/api/pmApi/getMajorFromAs', {
                    pm_ass_id: session.user?.userid
                })

                setMajors(data.data.data)
                setMajorIds(data.data.data[0].major_id)
            } else if (session.user?.role === '2') {
                const data = await axios.post('/api/pmApi/getMajorFromMajor', {
                    pm_id: session.user?.userid
                })

                setMajorIds(data.data.data[0].major_id)
                setMajors(data.data.data)
            }


        } catch (error) {
            return error;
        }
    };
    useEffect(() => {
        handleMajors()


    }, [])


    // const handleMajorName = async()=>{
    //     try {
    //         const response = await axios.post('/api/pmApi/getAllCourses' , {
    //             table:'major',
    //             Where:'major_id',
    //             id:majorId
    //         })
    //         setMajorName(response.data.data[0].major_name)
    //     } catch (error) {
    //         return error
    //     }
    //   }


    const handleMajor = (selectedValue) => {
        setMajorIds(selectedValue)
    };


    useEffect(() => {
        // handleMajorName()
        handlePromotions()
    }, [])


    const handlePromotions = async () => {
        try {
            const dates = new Date().getFullYear()

            const data = await axios.post('/api/pmApi/getPromotionMajorDate', {
                major_id: majorId,
                date: dates
            })

            setPromotionName(data.data.data[0].promotion_name)
        } catch (error) {
            return error
        }
    }


    useEffect(() => {
        handlePromotions()
    }, [])



    useEffect(() => {



        const getPromotion = async () => {
            let table = 'promotions';
            let Where = 'major_id';
            let id = majorId;
            let { data } = await axios.post('/api/pmApi/getAllCourses', {
                table,
                Where,
                id,
            });


            // setUsers(data)

            // setDates(data.rows)
            // data.rows.forEach(student =>
            //   dates.push(student.student_firstname)
            //   )
            const datesArray = [];
            data.data.forEach((promotion) => {
                datesArray.push(promotion.promotion_name);
            });

            setPromotion(datesArray);
        };
        getPromotion();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [majorId]);





    useEffect(() => {
        renderValues();
        handleShowAll()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [majorId]);

    const renderValues = async () => {
        try {
            let sendData = {
                id: '',
                firstname: '',
                lastname: '',
                major: majorId,
                promotion: '',
                //   status: '',
                graduationYear: '',
            };

            // id,firstname,lastname,major,promotion,status
            let { data } = await axios.post('/api/pmApi/filterHistory', sendData);

            setUsers(data.rows);
        } catch (error) {
            setUsers([])
            return error
        }

    };

    const handleShowAll = async () => {

        try {
            let sendData = {
                id: '',
                firstname: '',
                lastname: '',
                major: majorId,
                promotion: '',
                graduationYear: '',

            };

            // id,firstname,lastname,major,promotion,status
            let { data } = await axios.post('/api/pmApi/filterHistory', sendData);

            setUsers(data.rows);
            // setMajorValue('');
            // setTest(true);
            setIdValue('');
            // setallMajor([]);
            setFirstnameValue('');
            setLastnameValue('');

            setPromotionValue('');
        } catch (error) {
            setUsers([])
            return error
        }

    };

    const handlePromotion = (selectedValue) => {
        // Do something with the selected value

        setPromotionValue(selectedValue);
    };

    const handleStudents = async (e) => {
        try {
            e.preventDefault();
            let sendData = {
                id: idValue,
                firstname: firstnameValue,
                lastname: lastnameValue,
                major: majorId,
                promotion: promotionValue,
                graduationYear: graduationYear,

            };

            // id,firstname,lastname,major,promotion,status
            let { data } = await axios.post('/api/pmApi/filterHistory', sendData);


            setUsers(data.rows);
        } catch (error) {
            setUsers([])
            return error
        }

    };

    const getGraduationYears = () => {
        const currentYear = new Date().getFullYear();
        const years = [];

        for (let i = currentYear; i >= currentYear - 10; i--) {
            years.push(i.toString());
        }

        return years;
    };



    const handleGraduationYear = (selectedValue) => {
        setGraduationYear(selectedValue);
    };


    //>>>>>>> main
    return (
        <>
            <Head>
                <title>SIS PM - History</title>
            </Head>
            {session?.user.role === '2' || session?.user.role === '3' ? (
                <>
                    <p className="text-gray-700 text-3xl pt-5 mb-10 font-bold">
                     History
                    </p>
                    <form>
                        <div className="grid grid-cols-1 gap-4 min-[850px]:grid-cols-2 min-[1100px]:grid-cols-3 mb-3 pb-4 border-blue-300 border-b-2">
                            <label>
                                ID:
                                <input
                                    className="ml-16 w-40"
                                    type="number"
                                    name="ID"
                                    onChange={(e) => setIdValue(e.target.value)}
                                    placeholder="Select ID"
                                // value={formData.ID}
                                // onChange={handleChange}
                                ></input>
                            </label>

                            <label>
                                First Name:
                                <input
                                    className="ml-1 w-40 max-[850px]:ml-1"
                                    type="text"
                                    name="Fname"
                                    onChange={(e) => setFirstnameValue(e.target.value)}
                                    placeholder="Select Name"
                                // value={formData.Fname}
                                // onChange={handleChange}
                                ></input>
                            </label>

                            <label>
                                Last Name:
                                <input
                                    className="ml-1 w-40 max-[850px]:ml-1"
                                    type="text"
                                    name="Lname"
                                    onChange={(e) => setLastnameValue(e.target.value)}
                                    placeholder="Select surname"
                                // value={formData.Lname}
                                // onChange={handleChange}
                                ></input>
                            </label>

                            <label className="w-[350px]">
                                Promotion:
                                {
                                    <CustomSelectBox
                                        options={promotion}
                                        placeholder="Select Promotion"
                                        onSelect={handlePromotion}
                                        styled={
                                            'font-medium h-auto items-center border-[1px] border-zinc-300 self-center w-40 inline-block ml-[8px]'
                                        }
                                    />
                                }
                            </label>

                            {/* <label>
                Status:
                {
                  <CustomSelectBox
                    options={status}
                    placeholder="Select Status"
                    onSelect={handleStatus}
                    styled={
                      'font-medium h-auto items-center border-[1px] border-zinc-300 self-center w-40 inline-block ml-10'
                    }
                  />
                }
              </label> */}
                            <label className="w-[350px]">
                                Graduated:
                                {
                                    <CustomSelectBox
                                        options={getGraduationYears()}
                                        placeholder="Select year"
                                        onSelect={handleGraduationYear}
                                        styled={
                                            'font-medium h-auto items-center border-[1px] border-zinc-300 self-center w-40 inline-block ml-[8px]'
                                        }
                                    />
                                }
                            </label>

                            {session.user?.hasMultiMajor === 'true' ?
                                <label className=''>
                                    Major:
                                    <select
                                        onChange={(e) => handleMajor(e.target.value)}
                                        value={majorId}
                                        className="ml-10 mt-3 w-40 max-[850px]:ml-10 max-[850px]:mt-0"

                                    >
                                        <option key={"uu2isdvf"} value="">
                                            Choose a Major
                                        </option>
                                        {major &&
                                            major.map((major) => (
                                                <>
                                                    <option key={major.major_id} value={major.major_id}>
                                                        {major.major_name}
                                                    </option>
                                                </>
                                            ))}
                                    </select>
                                </label>


                                : <></>}
                            <div className="flex flex-col min-[850px]:flex-row gap-4">
                                <button
                                    className="primary-button btnCol text-white w-60 hover:text-white hover:font-bold"
                                    type="submit"
                                    onClick={handleStudents}
                                >
                                    Search
                                </button>
                                <button
                                    className="primary-button btnCol text-white  w-60 hover:text-white hover:font-bold"
                                    type="reset"
                                    onClick={handleShowAll}
                                >
                                    Show All
                                </button>
                            </div>

                            {/* <div className="flex flex-col min-[850px]:flex-row gap-4">
                                <button
                                    className="primary-button btnCol text-white w-60 hover:text-white hover:font-bold"
                                    type="submit"
                                    onClick={handleStudents}
                                >
                                    Search
                                </button>
                                <button
                                    className="primary-button btnCol text-white  w-60 hover:text-white hover:font-bold"
                                    type="reset"
                                    onClick={handleShowAll}
                                >
                                    Show All
                                </button>
                            </div> */}
                        </div>
                        <HistoryList users={users} setUsers={setUsers} />
                    </form>
                </>
            ) : (
                redirect()
            )}
        </>
    );
}
History.auth = true;
History.adminOnly = true;
