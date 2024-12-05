import React, { useState } from "react";
import CustomSelectBox from "../pages/programManager/customSelectBox";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function CopyClass({
  promotion,
  courses,
  teachers,
  users,
  allTeacher,
  setOpenCopy,
  getClasses,
}) {
  const { data: session } = useSession();
  const [courseValue, setCourseValue] = useState("");
  const [majorValue, setMajorValue] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [promotionValueClass, setPromotionValueClass] = useState("");
  const [teacherValue, setTeacherValue] = useState("");
  const [oldteach, setoldteach] = useState("");
  const [classID, setClassID] = useState("");
  // const [error, setError] = useState("");

  const [errorCourse, setErrorCourse] = useState("");

  const handleSaveCopy = async () => {
    if (courseValue.length === 0) {
      setErrorCourse("Please choose course")
    }
    // Create a new Date object with the desired date
    const fromDate = new Date(dateFrom);
    const toDate = new Date(dateTo);

    // Increment one year
    fromDate.setFullYear(fromDate.getFullYear() + 1);
    toDate.setFullYear(toDate.getFullYear() + 1);

    try {
      let classValue = {
        class_id: classID,
        course_id: courseValue,
        teacher_id: teacherValue,
        promotion: promotionValueClass,
        startdate: fromDate,
        enddate: toDate,
        pm_id: session.user.userid,
        major_id: majorValue,
      };
      if (errorCourse === '') {
        let { data } = await axios.post("/api/pmApi/copyClass", classValue);
        // console.log(data);
        if (data.success) {
          setOpenCopy(false);
          setClassID("");
          setCourseValue("");
          setMajorValue("");
          setTeacherValue("");
          setDateFrom("");
          setDateTo("");
          getClasses();
        } else {
          alert("Error copying class");
        }
      }

      // setOpen(false)
    } catch (err) {
      return err
      // console.log(err);
    }






  };

  const handleCancelCopy = () => {
    setOpenCopy(false);
    setPromotionValueClass("");
    setErrorCourse('')
    setCourseValue("");
    setTeacherValue("");
  };

  const handlePromotionClass = (selectedValue) => {
    // Do something with the selected value
    // console.log("Selected Value:", selectedValue);
    setPromotionValueClass(selectedValue);
  };

  // console.log("users from custom element", users);

  const handleCourseCopy = (selectedValue) => {
    if (selectedValue == "") {
      setClassID("");
      setCourseValue("");

      setMajorValue("");

      setPromotionValueClass("");

      setDateFrom("");

      setDateTo("");

      setoldteach("");
      setTeacherValue("");
    } else {
      setClassID(
        users.filter((user) => user.course_id == selectedValue)[0].tmpclass_id
      );

      setCourseValue(
        users.filter((user) => user.course_id == selectedValue)[0].course_id
      );

      setMajorValue(
        users.filter((user) => user.course_id == selectedValue)[0].major_id
      );

      setPromotionValueClass(
        users.filter((user) => user.course_id == selectedValue)[0].promotion
      );

      setDateFrom(
        users.filter((user) => user.course_id == selectedValue)[0].startdate
      );

      setDateTo(
        users.filter((user) => user.course_id == selectedValue)[0].enddate
      );

      let theold = allTeacher.filter(
        (teach) =>
          teach.teacher_id ===
          users.filter((user) => user.course_id == selectedValue)[0].teacher_id
      )[0];

      setoldteach(
        `${theold.teacher_firstname} ${theold.teacher_lastname} ${theold.teacher_id}`
      );

      // setTeacherValue(`${oldteach.teacher_firstname} ${oldteach.teacher_lastname} ${oldteach.teacher_id}`)

      setTeacherValue(
        users.filter((user) => user.course_id == selectedValue)[0].teacher_id
      );

      // console.log(selectedValue);
      // console.log(
      //   users.filter((user) => user.course_id == selectedValue)[0].teacher_id
      // );

      // console.log(
      //   users.filter((user) => user.course_id == selectedValue)[0].promotion
      // );
    }
  };

  const handleTeacher = (selectedValue) => {
    // console.log(
    //   "select teacher: ",
    //   selectedValue.length > 0 ? selectedValue.split(" ")[0] : ""
    // );
    setTeacherValue(
      selectedValue.length > 0 ? selectedValue.split(" ")[0] : ""
    );
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-50">
        <div className="relative w-full max-w-4xl mx-auto my-6">
          {/* Modal content */}
          <div className="border border-gray-300 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
            {/* Modal header */}
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
              <h3 className="text-gray-700 text-3xl font-bold">Copy Class</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={handleCancelCopy}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
              </button>
            </div>
            {/* Modal body */}
            <div className="p-6 flex-auto">
              {/* Form fields */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm lg:text-base text-gray-700 font-semibold mb-2 block">Course:</label>
                  <CustomSelectBox
                    options={courses}
                    placeholder="Select Course"
                    onSelect={handleCourseCopy}
                    styled="font-medium h-auto items-center border-[1px] border-gray-300 w-full px-4 py-2 rounded-md"
                    enable={false}
                  />
                  <div className="text-red-500 mt-1">{errorCourse}</div>
                </div>
                <div>
                  {teacherValue.length > 0 && (
                    <>                    <label className="text-sm lg:text-base text-gray-700 font-semibold mb-2 block">Teacher:</label>
                      <CustomSelectBox
                        options={teachers}
                        placeholder="Select Teacher"
                        onSelect={handleTeacher}
                        styled="font-medium h-auto items-center border-[1px] border-gray-300 w-full px-4 py-2 rounded-md"
                        enable={false}
                        oldvalue={oldteach}
                      /></>

                  )}
                </div>
                <div>
                 
                  {promotionValueClass.length > 0 && (
                     <>
                    <label className="text-sm lg:text-base text-gray-700 font-semibold mb-2 block">Promotion:</label>
                    <CustomSelectBox
                      options={promotion}
                      placeholder="Select Promotion"
                      onSelect={handlePromotionClass}
                      styled="font-medium h-auto items-center border-[1px] border-gray-300 w-full px-4 py-2 rounded-md"
                      enable={false}
                      oldvalue={promotionValueClass}
                    />
                    </>
                  )}
                  

                </div>
              </div>
            </div>
            {/* Modal footer */}
            <div className="flex items-center justify-end p-4 border-t border-solid border-gray-300 rounded-b">
              <button
                className="primary-button btnCol text-white hover:text-white hover:font-bold mr-4"
                type="button"
                onClick={handleSaveCopy}
              >
                Changes
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-4"
                type="button"
                onClick={handleCancelCopy}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

}
