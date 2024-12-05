

import React, { useEffect, useState } from 'react';
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import GradeList from '../../components/Dashboard/GradesList';
import DownloadGrades from './downloadGrades';
import UploadGrades from './uploadGrades';
import axios from 'axios';
import GradeListGMP from '../../components/Dashboard/GradeListGMP';
import GradeListRTF from '../../components/Dashboard/GradeListRTF';
import GradesEXEDList from '../../components/Dashboard/GradesEXEDList';
export default function Grades() {
    const { data: session } = useSession();
    const [clickDownload, setClickDownload] = useState(false)
    const [clickUpload, setClickUpload] = useState(false)
    const [studentId, setStudentID] = useState("")
    const [studentFirstName, setStudentFirstName] = useState("")
    const [studentLastName, setStudentLast] = useState("")
    const [promotions, setPromotion] = useState("")
    const [PromotionName, setPromotionName] = useState([])
    const [GPA, setGPA] = useState("")
    const [Rank, setRank] = useState("")
    const [gradeOver30, setGradesOver30] = useState("")
    const [grade, setGrades] = useState("")
    const [courseId, setCourseId] = useState("")
    const [users, setUser] = useState([])
    const [taskName, setTaskName] = useState("")
    const [data, setData] = useState([])
    const [majors, setMajorName] = useState('')
    // const [major, setMajors] = useState([])
    const router = useRouter();

    const redirect = () => {
        router.push("/AccessDenied");
    };
    const template = () => {
        setClickDownload(true)
    }
    const upload = () => {
        setClickUpload(true)
    }

    // Function to extract the first word before a hyphen "-"
    const getFirstWordBeforeHyphen = (text) => {
        if (text) {
            const words = text.split("-");
            if (words.length > 0) {
                return words[0];
            }
        }
        return "";
    };

    // Function to extract the first word before a hyphen "-"
    const getFirstWordAfterHyphen = (text) => {
        if (text) {
            const words = text.split("-");
            if (words.length > 0) {
                return words[1];
            }
        }
        return "";
    };
    

    const handleMajorName = async () => {
        try {
            const response = await axios.post('/api/pmApi/getAllCourses', {
                table: 'major',
                Where: 'major_id',
                id: session.user?.majorid
            })
            setMajorName(response.data.data[0].major_name)
        } catch (error) {
            return error
        }
    }

    // const handleMajors = async () => {
    //     try {
    //         if (session.user?.role === '3') {
    //             const data = await axios.post('/api/pmApi/getMajorFromAs', {
    //                 pm_ass_id: session.user?.userid
    //             })

    //             setMajors(data.data.data)
    //         } else if (session.user?.role === '2') {
    //             const data = await axios.post('/api/pmApi/getMajorFromMajor', {
    //                 pm_id: session.user?.userid
    //             })

    //             setMajors(data.data.data)
    //         }


    //     } catch (error) {
    //         return error;
    //     }
    // };
    // useEffect(() => {
    //     handleMajors()


    // }, [session?.user.majorid])

    useEffect(() => {
        handleMajorName()

    }, [session?.user.majorid])


    const firstMajorWord = getFirstWordBeforeHyphen(session?.user.majorName);
    const secondMajorWord = getFirstWordAfterHyphen(session?.user.majorName);

    const isExeMajor = firstMajorWord === "EXED";

    const fetchPromotion = async () => {
        try {
            const payload = {
                table: 'promotions',
                Where: 'major_id',
                id: session.user.majorid
            }
            const response = await axios.post('/api/pmApi/getAllCourses', payload)
            setPromotionName(response.data.data)
        } catch (error) {
            return error
        }
    }

    const fetchGPA = async () => {
        try {
            const payload = {
                table: 'gpa',
            }
            const response = await axios.post('/api/pmApi/getAll', payload)

            setData(response.data.rows)
        } catch (error) {
            return error
        }
    }
    // console.log(data)
    const showAll = async () => {
        try {
            const payload = {
                student_id: "",
                first_name: "",
                last_name: "",
                promotion: "",
                major_id: session.user.majorid,
                course_id: "",
                grades: "",
                gpa: "",
                rank: ""
            }
            const response = await axios.post('/api/pmApi/filterGrades', payload)
            setUser(response.data.data)
            setStudentID("")
            setStudentFirstName("")
            setStudentLast("")
            setGrades("")
            setGPA("")
            setRank("")
            setCourseId("")
            setPromotion("")
            setTaskName("")
        } catch (error) {
            return error
        }
    }

    const search = async () => {
        try {
            const payload = {
                student_id: studentId,
                first_name: studentFirstName,
                last_name: studentLastName,
                promotion: promotions,
                major_id: session.user.majorid,
                course_id: courseId,
                grades: grade,
                task_name: taskName,
                gpa: GPA,
                rank: Rank
            }

            const response = await axios.post('/api/pmApi/filterGrades', payload)

            setUser(response.data.data)
        } catch (error) {
            setUser([])
            return error
        }
    }

    const showAllGMP = async () => {
        try {
            const payload = {
                student_id: '',
                first_name: '',
                last_name: '',
                promotion: '',
                major_id: session.user?.majorid,
                course_id: '',
                grades: '',
                task_name: ''
            }
            const response = await axios.post('/api/pmApi/filterGradeGMP', payload)

            setUser(response.data.data)
            setStudentID("")
            setStudentFirstName("")
            setStudentLast("")
            setGrades("")
            setCourseId("")
            setPromotion("")
            setTaskName("")
        } catch (error) {
            return error
        }
    }

    const searchGMP = async () => {
        try {
            const payload = {
                student_id: studentId,
                first_name: studentFirstName,
                last_name: studentLastName,
                promotion: promotions,
                major_id: session.user?.majorid,
                course_id: courseId,
                grades: grade,
                task_name: taskName
            }

            const response = await axios.post('/api/pmApi/filterGradeGMP', payload)

            setUser(response.data.data)
        } catch (error) {
            setUser([])
            return error
        }
    }

    const showAllRTF = async () => {
        try {
            const payload = {
                student_id: '',
                first_name: '',
                last_name: '',
                promotion: '',
                major_id: session.user?.majorid,
                course_id: '',
                grades_over_20: '',
                grades_over_30: '',
                task_name: ''
            }
            const response = await axios.post('/api/pmApi/filterRTF', payload)

            setUser(response.data.data)
            setStudentID("")
            setGradesOver30('')
            setStudentFirstName("")
            setStudentLast("")
            setGrades("")
            setCourseId("")
            setPromotion("")
            setTaskName("")
        } catch (error) {
            setUser([])
            return error
        }
    }

    const searchRTF = async () => {
        try {
            const payload = {
                student_id: studentId,
                first_name: studentFirstName,
                last_name: studentLastName,
                promotion: promotions,
                major_id: session.user?.majorid,
                course_id: courseId,
                grades_over_20: grade,
                grades_over_30: gradeOver30,
                task_name: taskName
            }

            const response = await axios.post('/api/pmApi/filterRTF', payload)

            setUser(response.data.data)
        } catch (error) {
            setUser([])
            return error
        }
    }

    const showAllEXED = async () => {
        try {
            const payload = {
                student_id: '',
                first_name: '',
                last_name: '',
                promotion: '',
                major_id: session.user?.majorid,
                course_id: '',
                task_name: '',
                grades: ''
            }
            const response = await axios.post('/api/pmApi/filterGradesEXED', payload)

            setUser(response.data.data)
            setStudentID("")
            setStudentFirstName("")
            setStudentLast("")
            setGrades("")
            setCourseId("")
            setPromotion("")
            setTaskName("")
        } catch (error) {

            return error
        }
    }

    const searchEXED = async () => {
        try {
            const payload = {
                student_id: studentId,
                first_name: studentFirstName,
                last_name: studentLastName,
                promotion: promotions,
                major_id: session.user?.majorid,
                course_id: courseId,
                task_name: taskName,
                grades: grade
            }

            const response = await axios.post('/api/pmApi/filterGradesEXED', payload)

            setUser(response.data.data)
        } catch (error) {
            setUser([])
            return error
        }
    }

    useEffect(() => {
        if (!isExeMajor) {
            fetchGPA()
            fetchPromotion()
            showAll()
            search()
        } else if (isExeMajor && secondMajorWord === 'GMP') {
            fetchPromotion()
            showAllGMP()
            searchGMP()
        } else if (isExeMajor && secondMajorWord === 'Digital Transformation in Financial Services' || secondMajorWord === 'Digital Transformation') {
            fetchPromotion()
            showAllRTF()
            searchRTF()
        } else if (isExeMajor) {
            fetchPromotion()
            showAllEXED()
            searchEXED()
        }

    }, [])

    return (
        <>
            <Head>
                <title>SIS PM - Grades</title>
            </Head>

            {session?.user.role === "2" || session?.user.role === "3" ? (
                <>
                    <p className="text-gray-700 text-3xl pt-5 mb-10 font-bold">Grades</p>
                    <form>
                        {clickDownload && <DownloadGrades setClickDownload={setClickDownload}  majors={majors} />}
                        {clickUpload && <UploadGrades setClickUpload={setClickUpload} showAll={showAll} clickUpload={clickUpload}
                            showAllGMP={showAllGMP} showAllRTF={showAllRTF} showAllEXED={showAllEXED} majors={majors} />}
                        <div className="grid grid-cols-1 gap-4 min-[850px]:grid-cols-2 min-[1100px]:grid-cols-3 mb-3 pb-4 border-blue-300 border-b-2">
                            <label>
                                ID:
                                <input
                                    className="ml-16 w-40"
                                    type="number"
                                    name="ID"
                                    value={studentId}
                                    placeholder='Student ID'
                                    onChange={(e) => {
                                        setStudentID(e.target.value);
                                    }}
                                // onChange={handleChange}
                                ></input>
                            </label>

                            <label>
                                First Name:
                                <input
                                    className="ml-1 w-40 max-[850px]:ml-1"
                                    type="text"
                                    value={studentFirstName}
                                    onChange={(e) => setStudentFirstName(e.target.value)}
                                    placeholder="Student FirstName"
                                // value={formData.Fname}
                                // onChange={handleChange}
                                ></input>
                            </label>

                            <label>
                                Last Name:
                                <input
                                    className="ml-1 w-40 max-[850px]:ml-1"
                                    type="text"
                                    value={studentLastName}
                                    onChange={(e) => setStudentLast(e.target.value)}
                                    placeholder="Student LastName"
                                // value={formData.Lname}
                                // onChange={handleChange}
                                ></input>
                            </label>
                            {/* </div>
        <div className="grid lg:grid-cols-3 min-[100px]:gap-4 mb-3"> */}
                            <label>
                                CourseID:
                                <input
                                    className="ml-4 w-40 max-[850px]:ml-3"
                                    type="text"
                                    value={courseId}
                                    onChange={(e) => setCourseId(e.target.value)}
                                    placeholder="Course ID"
                                // value={formData.Lname}
                                // onChange={handleChange}
                                ></input>
                            </label>

                            <label>
                                Task:
                                <select
                                    className="ml-12 w-40 max-[850px]:ml-12"
                                    value={taskName}
                                    onChange={(e) => setTaskName(e.target.value)}
                                >
                                    <option value="">Task</option>
                                    <option value='assignment'>assignment</option>
                                    <option value='exam'>exam</option>
                                    <option value='project'>project</option>
                                </select>
                            </label>

                            <label>
                                Promotion:
                                <select
                                    className="ml-1 w-40 max-[850px]:ml-1"
                                    value={promotions}
                                    onChange={(e) => setPromotion(e.target.value)}
                                >
                                    <option value="">Promotion</option>
                                    {PromotionName.length > 0 ? (
                                        PromotionName.map((item, index) => (
                                            <option key={index} value={item.promotion_name}>
                                                {item.promotion_name}
                                            </option>
                                        ))
                                    ) : (
                                        <option value={""}>NO Promotion</option>
                                    )}
                                </select>
                            </label>
                            <label>
                                Grade:
                                <input
                                    type="number"

                                    value={grade}
                                    onChange={(e) => setGrades(e.target.value)}
                                    placeholder="Grade"
                                    className="ml-9 w-40 max-[850px]:ml-9" />
                            </label>
                            {isExeMajor && secondMajorWord === 'Digital Transformation in Financial Services' || secondMajorWord === 'Digital Transformation' || session.user?.majorName === 'EXED-Digital Transformation' ?

                            (                                <>
                                <label>
                                    Grade/30:
                                    <input
                                        type="number"
                                        value={gradeOver30}
                                        onChange={(e) => setGradesOver30(e.target.value)}
                                        placeholder="Grade Over 30"
                                        className="ml-4 w-40 max-[850px]:ml-4 max-[850px]:w-30" />
                                </label>

                            </> )

                            :!isExeMajor ?(
                                <>
                                <label>
                                    Rank:
                                    <select
                                        className="ml-12 w-40 max-[850px]:ml-12"
                                        value={Rank}
                                        onChange={(e) => setRank(e.target.value)}
                                    >
                                        <option value="">Rank</option>
                                        {data.length > 0 ? (
                                            data.map((item, index) => (
                                                <option key={index} value={item.rank}>
                                                    {item.rank}
                                                </option>
                                            ))
                                        ) : (
                                            <option value={""}>NO Rank</option>
                                        )}
                                    </select>
                                </label>

                            </>
                            ):<></>

                           }

                            {!isExeMajor ? <>
                                <label>
                                    GPA:
                                    <select
                                        className="ml-12 w-40 max-[850px]:ml-12"
                                        value={GPA}
                                        onChange={(e) => setGPA(e.target.value)}
                                    >
                                        <option value="">GPA</option>
                                        {data.length > 0 ? (
                                            data.map((item, index) => (
                                                <option key={index} value={item.gpa}>
                                                    {item.gpa}
                                                </option>
                                            ))
                                        ) : (
                                            <option value={""}>NO GPA</option>
                                        )}
                                    </select>
                                </label>

                            </> : <></>}
                            {isExeMajor && secondMajorWord === 'Digital Transformation in Financial Services' || secondMajorWord === 'Digital Transformation' || session.user?.majorName === 'EXED-Digital Transformation' ? <>
                                <label className='invisible max-[850px]:visible max-[850px]:hidden'>
                                    Rank:
                                    <select
                                        className="ml-10 w-40 invisible max-[850px]:visible max-[850px]:hidden"
                                        value={Rank}
                                        onChange={(e) => setRank(e.target.value)}
                                    >
                                        <option value="">Rank</option>
                                        {data.length > 0 ? (
                                            data.map((item, index) => (
                                                <option key={index} value={item.rank}>
                                                    {item.rank}
                                                </option>
                                            ))
                                        ) : (
                                            <option value={""}>NO Rank</option>
                                        )}
                                    </select>
                                </label>


                            </> : <>
                                <label className='invisible max-[850px]:visible max-[850px]:hidden'>
                                    Rank:
                                    <select
                                        className="ml-10 w-40 invisible max-[850px]:visible max-[850px]:hidden"
                                        value={Rank}
                                        onChange={(e) => setRank(e.target.value)}
                                    >
                                        <option value="">Rank</option>
                                        {data.length > 0 ? (
                                            data.map((item, index) => (
                                                <option key={index} value={item.rank}>
                                                    {item.rank}
                                                </option>
                                            ))
                                        ) : (
                                            <option value={""}>NO Rank</option>
                                        )}
                                    </select>
                                </label>

                            </>}


                            {!isExeMajor ? <>
                                <label className='invisible max-[850px]:visible max-[850px]:hidden'>
                                    Rank:
                                    <select
                                        className="ml-10 w-40 invisible max-[850px]:visible max-[850px]:hidden"
                                        value={Rank}
                                        onChange={(e) => setRank(e.target.value)}
                                    >
                                        <option value="">Rank</option>
                                        {data.length > 0 ? (
                                            data.map((item, index) => (
                                                <option key={index} value={item.rank}>
                                                    {item.rank}
                                                </option>
                                            ))
                                        ) : (
                                            <option value={""}>NO Rank</option>
                                        )}
                                    </select>
                                </label>


                            </> : <></>}



                            <div className="flex flex-col min-[850px]:flex-row gap-4 min-[850px]:col-start-2 min-[1100px]:col-start-3 h-10 max-[850px]:mb-16">
                                <button
                                    className="primary-button btnCol text-white w-60 hover:text-white hover:font-bold"
                                    type="button"
                                    onClick={!isExeMajor ? search :
                                        (secondMajorWord === 'GMP' ?
                                            searchGMP :
                                            isExeMajor && secondMajorWord === 'Digital Transformation in Financial Services' || secondMajorWord === 'Digital Transformation'
                                                ? searchRTF : isExeMajor ? searchEXED : <></>)
                                    }

                                >
                                    Search
                                </button>
                                <button
                                    className="primary-button btnCol text-white  w-60 hover:text-white hover:font-bold"
                                    type="button"
                                    onClick={!isExeMajor ? showAll :
                                        (secondMajorWord === 'GMP' ?
                                            showAllGMP :
                                            isExeMajor && secondMajorWord === 'Digital Transformation in Financial Services' || secondMajorWord === 'Digital Transformation'
                                                ? showAllRTF : isExeMajor ? showAllEXED : <></>)
                                    }
                                >
                                    Show All
                                </button>

                            </div>
                            <div className="flex flex-col min-[850px]:flex-row gap-4 min-[850px]:col-start-2 min-[1100px]:col-start-3 h-10 max-[850px]:mb-16">

                                <button
                                    className="primary-button btnCol text-white  w-60 hover:text-white hover:font-bold"
                                    type="button"
                                    onClick={template}
                                >
                                    Template
                                </button>
                                <button
                                    className="primary-button btnCol text-white  w-60 hover:text-white hover:font-bold"
                                    type="button"
                                    onClick={upload}
                                >
                                    Upload Grade
                                </button>
                            </div>


                        </div>
                        {
                            !isExeMajor ? <GradeList users={users} setUser={setUser} />
                                : isExeMajor && secondMajorWord === 'GMP' ? <GradeListGMP users={users} setUser={setUser} />
                                    : isExeMajor && secondMajorWord === 'Digital Transformation in Financial Services' || secondMajorWord === 'Digital Transformation' || session.user?.majorName === 'EXED-Digital Transformation' ?
                                        <GradeListRTF users={users} setUser={setUser} />
                                        : isExeMajor ? <GradesEXEDList users={users} setUser={setUser} /> : <></>

                        }
                    </form>

                </>
            ) : (
                redirect()
            )}
        </>





    )
}
Grades.auth = true;
Grades.adminOnly = true;
