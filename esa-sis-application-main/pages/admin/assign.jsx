import { useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
// import AccountsList from '../../components/Dashboard/AccountsList';
// import AccountsAssistance from '../../components/Dashboard/AccountsAssistance';
import axios from "axios";
import { useRouter } from "next/router";
import CoursesList from "../../components/Dashboard/CoursesList";
import CustomSelectBox from "../programManager/customSelectBox";

// import Link from 'next/link';
// import TeachersList from '../../components/Dashboard/TeachersList'

export default function Create() {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  // const [assistance, setAssistance] = useState([]);
  const router = useRouter();
  const [ids, setIds] = useState([]);
  const [majorName, setMajorName] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [theMName, setTheMName] = useState("");

  const handleMajor = (selectedValue) => {
    // Do something with the selected value
    setTheMName(selectedValue);
  };

  const handleId = (selectedValue) => {
    // Do something with the selected value
    setCourseId(selectedValue);
  };

  const redirect = () => {
    router.push("/AccessDenied");
  };

  useEffect(() => {
    handleShowAll();
    // handleShow();
  }, []);

  const handleShowAll = async () => {
    let { data } = await axios.post("/api/admin/adminApi/courses");
    console.log('data' , data)
    setUsers(data.rows);

    const datesArray = [];
    data.rows.forEach((course) => {
      datesArray.push(course.course_id);
    });

    setIds(datesArray);

    // const datesArray1 = [];
    // data.rows.forEach((course) => {
    //   course.major_name !== '' && datesArray1.push(course.major_name);
    // });
    const datesSet = new Set();
    data.rows.forEach((course) => {
      course.major_name !== "" && datesSet.add(course.major_name);
    });

    // Convert the Set back to an array, if needed
    const datesArray1 = Array.from(datesSet);

    setMajorName(datesArray1);
  };
  //   const handleShow = async () => {
  //     // pm_id, pm_firstname, pm_lastname, pm_email
  //     let sendData = {
  //       pm_ass_id: ''.trim(),
  //       pm_ass_firstname: ''.trim(),
  //       pm_ass_lastname: ''.trim(),
  //       pm_ass_email: ''.trim(),
  //       pm_ass_status: ''.trim(),
  //     };
  //     // console.log(sendData);
  //     // id,firstname,lastname,major,promotion,status
  //     let { data } = await axios.post(
  //       '/api/admin/adminApi/filterassistance',
  //       sendData
  //     );

  //     // console.log(sendData);
  //     setAssistance(data.rows);
  //   };

  const handleCouses = async (e) => {
    e.preventDefault();
    let sendData = {
      course_id: courseId.trim(),
      major_name: theMName.trim(),
    };
    // id,firstname,lastname,major,promotion,status
    let { data } = await axios.post(
      "/api/admin/adminApi/filterCourse",
      sendData
    );

    setUsers(data);
  };

  return (
    <>
      <Head>
        <title>SIS Admin - Accounts</title>
      </Head>

      {session?.user.role === "0" ? (
        <>
          <p className="text-gray-700 text-3xl pt-5 mb-10 font-bold">
            List Of Courses
          </p>
          <form>
            <div className="grid grid-cols-1 gap-4 min-[850px]:grid-cols-2 min-[1100px]:grid-cols-3 mb-3 pb-4 border-blue-300 border-b-2">
              <label className="w-[350px]">
                CourseId:
                {
                  <CustomSelectBox
                    options={ids}
                    placeholder="Select Status"
                    onSelect={handleId}
                    styled={
                      "font-medium h-auto items-center border-[1px] border-zinc-300 self-center w-40 inline-block ml-10"
                    }
                  />
                }
              </label>

              <label className="w-[350px]">
                Major Name:
                {
                  <CustomSelectBox
                    options={majorName}
                    placeholder="Select Status"
                    onSelect={handleMajor}
                    styled={
                      "font-medium h-auto items-center border-[1px] border-zinc-300 self-center w-40 inline-block ml-10"
                    }
                  />
                }
              </label>

              <div className="flex flex-col min-[850px]:flex-row gap-4">
                <button
                  className="primary-button rounded w-60 btnCol text-white hover:text-white hover:font-bold"
                  type="submit"
                  onClick={handleCouses}
                >
                  Search
                </button>
                <button
                  className="primary-button btnCol text-white rounded w-60 hover:text-white hover:font-bold"
                  type="reset"
                  onClick={handleShowAll}
                >
                  Show All
                </button>
              </div>
            </div>

            <CoursesList users={users} setUsers={setUsers} />
          </form>
        </>
      ) : (
        redirect()
      )}
    </>
  );
}
Create.auth = true;
Create.adminOnly = true;
