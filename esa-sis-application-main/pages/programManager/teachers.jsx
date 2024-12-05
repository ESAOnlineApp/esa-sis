import { useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import TeachersList from "../../components/Dashboard/TeachersList";
import axios from "axios";
import { useRouter } from "next/router";
import { saveAs } from 'file-saver';
import UploadTeachers from "./UploadTeachers";
// import Link from 'next/link';
import * as XLSX from 'xlsx';

export default function Students() {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const router = useRouter();
  // const [inputValue, setInputValue] = useState("");
  // const [selected, setSelected] = useState("");
  // const [open, setOpen] = useState(false);
  // const [dates, setDates] = useState([]);
  // const [status, setStatus] = useState([]);
  // const [promotion, setPromotion] = useState([]);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [idvalue, setIDvalue] = useState("");
  const [email, setEmail] = useState("");
  const [courseid, setCourseid] = useState("");
  // const [temp, setTemp] = useState("");
  const [openUpload , setOpenUpload] = useState(false)
  
  const redirect = () => {
    router.push("/AccessDenied");
  };
  const headerTeacher = [['FirstName' , 'LastName' , 'Email' , 'MobileNumber']];
  
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

      // const calculateColumnWidths = (data) => {
      //   const columnWidths = data[0].map((col, colIndex) => {
      //     const maxContentWidth = data.reduce((max, row) => {
      //       const cellContent = row[colIndex] !== undefined ? row[colIndex].toString() : '';
      //       const contentWidth = cellContent.length;
      //       return Math.max(max, contentWidth);
      //     }, col.length);
          
      //     return { wch: maxContentWidth };
      //   });
    
      //   return columnWidths;
      // };
      
    
      const firstMajorWord = getFirstWordBeforeHyphen(session?.user.majorName);
    
      const isExeMajor = firstMajorWord === "EXED";


  // const createExcelTemplateTeacher = () => {
 
  //       const columnWidths = calculateColumnWidths(headerTeacher);
  //        const worksheet = XLSX.utils.aoa_to_sheet(headerTeacher);
  //        worksheet['!cols'] = columnWidths;
     
  //        const workbook = XLSX.utils.book_new();
     
  //        XLSX.utils.book_append_sheet(workbook, worksheet, 'Teacher');
     
  //        const excelBuffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
  //        const excelBlob = new Blob([excelBuffer], {
  //          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  //        });
  //        saveAs(excelBlob, 'Teacher.xlsx');
  //      };


  const calculateColumnWidths = (worksheet) => {
    const columnWidths = worksheet['!cols'] || [];
    const headerRow = worksheet[XLSX.utils.encode_cell({ r: 0, c: 0 })];
    if (!Array.isArray(headerRow)) {
      return columnWidths;
    }
  
    headerRow.forEach((cell, colIndex) => {
      const content = cell?.w || '';
      const contentWidth = content.length * 7; // Adjust the multiplier as needed
      const defaultWidth = 10; // Set a default width if content width is smaller
      columnWidths[colIndex] = { wch: Math.max(defaultWidth, contentWidth) };
    });
  
    return columnWidths;
  };

  const createCSVTemplateTeacher = () => {
    const data2 = headerTeacher.concat([
      ['', '', '', ''],
    ]);

    const worksheet = XLSX.utils.aoa_to_sheet(data2);
    const columnWidths = calculateColumnWidths(worksheet);

    // Apply column widths to the worksheet
    worksheet['!cols'] = columnWidths;

    const csvContent = XLSX.utils.sheet_to_csv(worksheet);
    const csvBlob = new Blob([csvContent], { type: 'text/csv' });
    saveAs(csvBlob, 'Teacher.csv');
  };
  
  const handleUpload = ()=>{
        setOpenUpload(true)
      }

  useEffect(() => {
    handleShowAll();
  }, []);

  const handleShowAll = async () => {
    let sendData = {
      id: "",
      firstname: "",
      lastname: "",
      email: "",
      courseid: "",
    };
    // console.log(sendData)
    // console.log((sendData))
    // id,firstname,lastname,major,promotion,status
    let { data } = await axios.post("/api/pmApi/filterTeach", sendData);

    setUsers(data);
    setFname("");
    setLname("");
    setIDvalue("");
    setEmail("");
    setCourseid("");
  };

  const handleTeachers = async (e) => {
    e.preventDefault();
    // console.log(idvalue, fname, lname, email, courseid)
    let sendData = {
      id: idvalue,
      firstname: fname.trim(),
      lastname: lname.trim(),
      email: email.trim(),
      courseid: courseid,
    };
    // console.log(sendData)
    // console.log((sendData))
    // id,firstname,lastname,major,promotion,status
    let { data } = await axios.post("/api/pmApi/filterTeach", sendData);

    // console.log('this is data')
    // setTemp(parseInt(idvalue));
    // // console.log(data)
    
    setUsers(data);
  };

  //>>>>>>> main
  return (
    <>
      <Head>
        <title>SIS Admin - Teachers</title>
      </Head>
      {session?.user.role === "2" || session?.user.role === "3"? (
        <>
        {
          openUpload ?     <UploadTeachers  setOpenUpload={setOpenUpload} handleShowAll={handleShowAll}/>:<></>
        }
   
          <p className="text-gray-700 text-3xl pt-5 mb-10 font-bold">
            List Of Teachers
          </p>
          <form>
            <div className="grid grid-cols-1 gap-4 min-[850px]:grid-cols-2 min-[1100px]:grid-cols-3 mb-3 pb-4 border-blue-300 border-b-2">
              <label>
                ID:
                <input
                  className="ml-16 w-40"
                  type="number"
                  name="ID"
                  placeholder="Teacher's ID"
                  // value={formData.ID}
                  onChange={(e) => {
                    setIDvalue(e.target.value);
                  }}
                ></input>
              </label>

              <label>
                First Name:
                <input
                  className="ml-1 w-40 max-[850px]:ml-1"
                  type="text"
                  name="Fname"
                  placeholder="Teacher's First Name"
                  // value={formData.Fname}
                  onChange={(e) => {
                    setFname(e.target.value);
                  }}
                ></input>
              </label>

              <label>
                Last Name:
                <input
                  className="ml-1 w-40 max-[850px]:ml-1"
                  type="text"
                  name="Lname"
                  placeholder="Teacher's Last Name"
                  // value={formData.Lname}
                  onChange={(e) => {
                    setLname(e.target.value);
                  }}
                ></input>
              </label>
              {/* </div>
        <div className="grid lg:grid-cols-3 min-[100px]:gap-4 mb-3"> */}
              <label>
                Email:
                <input
                  className="ml-10 mt-3 w-40 max-[850px]:ml-10 max-[850px]:mt-0"
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  // value={formData.Fname}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                ></input>
              </label>

              <div className="flex flex-col min-[850px]:flex-row gap-4 min-[850px]:col-start-2 min-[1100px]:col-start-3 h-10 max-[850px]:mb-16">
                <button
                  className="primary-button w-60"
                  type="submit"
                  onClick={handleTeachers}
                >
                  Search
                </button>
                <button
                  className="primary-button w-60"
                  type="reset"
                  onClick={handleShowAll}
                >
                  Show All
                </button>
              </div>
              {isExeMajor ? <>
                <div className="flex flex-col min-[850px]:flex-row gap-4 min-[850px]:col-start-2 min-[1100px]:col-start-3 h-10 max-[850px]:mb-16">
                <button
                  className="primary-button btnCol text-white w-60 hover:text-white hover:font-bold"
                  type="button"
                  onClick={createCSVTemplateTeacher}
                >
                  Teacher Template
                </button>
                <button
                  className="primary-button btnCol text-white  w-60 hover:text-white hover:font-bold"
                  type="button"
                  onClick={handleUpload}
                >
                  Upload
                </button>
              </div>
              </>:
              <></>}

            </div>
            <TeachersList users={users} setUsers={setUsers} />
          </form>
        </>
      ) : (
        redirect()
      )}
    </>
  );
}
Students.auth = true;
Students.adminOnly = true;
