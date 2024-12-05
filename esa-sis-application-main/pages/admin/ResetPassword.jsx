import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';
// import AccountsList from '../../components/Dashboard/AccountsList';
// import AccountsAssistance from '../../components/Dashboard/AccountsAssistance';
import axios from 'axios';
import { useRouter } from 'next/router';
// import AdminList from '../../components/Dashboard/AdminList';
import AdminListResetPassword from '../../components/Dashboard/AdminListResetPassword';
import AccountsAssistanceResetPassword from '../../components/Dashboard/AccountsAssistanceResetPassword';
import AccountsListResetPassword from '../../components/Dashboard/AccountsListResetPassword';
import StudentsListResetPassword from '../../components/Dashboard/StudentsListResetPassword';

// import Link from 'next/link';
// import TeachersList from '../../components/Dashboard/TeachersList'

export default function Create() {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const [assistance, setAssistance] = useState([]);
  const [students, setStudents] = useState([]);
  const router = useRouter();
  // const [inputValue, setInputValue] = useState("");
  // const [selected, setSelected] = useState("");
  // const [open, setOpen] = useState(false);
  // const [dates, setDates] = useState([]);
  // const [status, setStatus] = useState([]);
  // const [promotion, setPromotion] = useState([]);
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [idvalue, setIDvalue] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [role, setRole] = useState('1');
  const [majorName, setMajorName] = useState('');
  const [majorID, setMajorID] = useState(null);
  const [major, setMajor] = useState([]);
  const [admin, setAdminList] = useState([]);

  const redirect = () => {
    router.push('/AccessDenied');
  };

  useEffect(() => {
    // handleDataFetch(); // Call the common data fetch function when role changes
    handleMajor();
    handleAccounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]); // Add 'role' as a dependency to re-run the effect when it changes

  // const handleDataFetch = async () => {
  //   if (role === '2') {
  //     handleShowAll();
  //   } else if (role === '3') {
  //     handleShow();
  //   } else if (role === '4') {
  //     handleShowAdmin();
  //   }
  // };

  const handleMajor = async () => {
    try {
      const table = 'major';
      const data = await axios.post('/api/pmApi/getAll', { table });
      setMajor(data.data.rows);
    } catch (error) {
      return error;
    }
  };

  // const handleShowAll = async () => {
  //   // pm_id, pm_firstname, pm_lastname, pm_email
  //   setFname('');
  //   setLname('');
  //   setIDvalue('');
  //   setEmail('');
  //   setStatus('active');

  //   setMajorName('');

  //   setRole('2');

  //   let sendpmData = {
  //     pm_id: ''.trim(),
  //     pm_firstname: ''.trim(),
  //     pm_lastname: ''.trim(),
  //     pm_email: ''.trim(),
  //     pm_status: 'active'.trim(),
  //     majorName: '',
  //   };
  //   try {
  //     // id,firstname,lastname,major,promotion,status
  //     let { data } = await axios.post(
  //       '/api/admin/adminApi/filterpm',
  //       sendpmData
  //     );

  //     // console.log(data);
  //     setUsers(data);
  //   } catch (error) {
  //     return error;
  //   }

  //   // // console.log('this is users')
  //   // // console.log(users)
  // };
  // const handleShow = async () => {
  //   // pm_id, pm_firstname, pm_lastname, pm_email
  //   setRole('3');
  //   setFname('');
  //   setLname('');
  //   setIDvalue('');
  //   setEmail('');
  //   setStatus('active');
  //   setMajorName('');
  //   let sendData = {
  //     pm_ass_id: ''.trim(),
  //     pm_ass_firstname: ''.trim(),
  //     pm_ass_lastname: ''.trim(),
  //     pm_ass_email: ''.trim(),
  //     pm_ass_status: 'active'.trim(),
  //     majorName: '',
  //   };
  //   // console.log(sendData);
  //   // id,firstname,lastname,major,promotion,status
  //   try {
  //     let { data } = await axios.post(
  //       '/api/admin/adminApi/filterassistance',
  //       sendData
  //     );

  //     // console.log(sendData);
  //     setAssistance(data.rows);
  //   } catch (error) {
  //     return error;
  //   }
  // };

  // const handleShowAdmin = async () => {
  //   setRole('4');
  //   setFname('');
  //   setLname('');
  //   setIDvalue('');
  //   setEmail('');
  //   setStatus('active');
  //   setMajorName('');
  //   let sendDataAdmin = {
  //     adminid: ''.trim(),
  //     admin_firstname: ''.trim(),
  //     admin_lastname: ''.trim(),
  //     adminemail: ''.trim(),
  //     admin_status: 'active'.trim(),
  //   };
  //   try {
  //     let { data } = await axios.post(
  //       '/api/admin/adminApi/filterAdmin',
  //       sendDataAdmin
  //     );
  //     setAdminList(data.rows);
  //   } catch (error) {
  //     return error;
  //   }
  // };

  const handleAccounts = async () => {
    // e.preventDefault();
    // // console.log(idvalue, fname, lname, email, courseid)
    if (role == '1') {
      let sendData = {
        studentid: idvalue.trim(),
        student_firstname: fname.trim(),
        student_lastname: lname.trim(),
        studentemail: email.trim(),
        student_status: status.trim(),
        majorID: majorID,
      };
      // console.log(sendData);
      // id,firstname,lastname,major,promotion,status
      let { data } = await axios.post(
        '/api/admin/adminApi/filterStudent',
        sendData
      );

      setStudents(data.rows);

    }else if (role == '3') {
      let sendData = {
        pm_ass_id: idvalue.trim(),
        pm_ass_firstname: fname.trim(),
        pm_ass_lastname: lname.trim(),
        pm_ass_email: email.trim(),
        pm_ass_status: status.trim(),
        majorName: majorName,
      };
      // console.log(sendData);
      // id,firstname,lastname,major,promotion,status
      let { data } = await axios.post(
        '/api/admin/adminApi/filterassistance',
        sendData
      );

      setAssistance(data.rows);
    } else if (role == '4') {
      let sendDataAdmin = {
        adminid: idvalue.trim(),
        admin_firstname: fname.trim(),
        admin_lastname: lname.trim(),
        adminemail: email.trim(),
        admin_status: status.trim(),
      };
      let { data } = await axios.post(
        '/api/admin/adminApi/filterAdmin',
        sendDataAdmin
      );
      setAdminList(data.rows);
    } else {
      let sendpmData = {
        pm_id: idvalue.trim(),
        pm_firstname: fname.trim(),
        pm_lastname: lname.trim(),
        pm_email: email.trim(),
        pm_status: status.trim(),
        majorName: majorName,
      };
      // // id,firstname,lastname,major,promotion,status
      let { data } = await axios.post(
        '/api/admin/adminApi/filterpm',
        sendpmData
      );

      setUsers(data);
    }
  };

  return (
    <>
      <Head>
        <title>SIS Admin - Reset Password</title>
      </Head>

      {session?.user.role === '0' ? (
        <>
          <p className="text-gray-700 text-3xl pt-5 mb-10 font-bold">
            Reset Password
          </p>
          <form>
            <div className="grid grid-cols-1 gap-4 min-[850px]:grid-cols-2 min-[1100px]:grid-cols-3 mb-3 pb-4 border-blue-300 border-b-2">
              <label>
                ID:
                <input
                  className="ml-16 w-40"
                  type="text"
                  name="ID"
                  placeholder="ID"
                  // value={formData.ID}
                  value={idvalue}
                  onChange={(e) => {
                    setIDvalue(e.target.value);
                  }}
                ></input>
              </label>

              <label>
                First Name:
                <input
                  className="ml-2 w-40 max-[850px]:ml-1"
                  type="text"
                  name="Fname"
                  placeholder="First Name"
                  value={fname}
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
                  placeholder="Last Name"
                  // value={formData.Lname}
                  value={lname}
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
                  placeholder="Email"
                  // value={formData.Fname}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                ></input>
              </label>

              <label className="invisible max-[850px]:visible max-[850px]:hidden">
                From:
                <input
                  className="ml-12 invisible max-[850px]:visible max-[850px]:hidden w-40 max-[850px]:ml-10"
                  type="date"
                  name="from"
                  // value={formData.from}
                  // onChange={handleChange}
                ></input>
              </label>
              {role === '4' ? (
                <label className="invisible max-[850px]:visible max-[850px]:hidden">
                  Major:
                  <select
                    className="ml-12 invisible max-[850px]:visible max-[850px]:hidden w-40 max-[850px]:ml-10"
                    value={majorName}
                    onChange={
                      (e) => (
                        console.log('hello world'),
                      setMajorName(e.target.value)
                      )
                    }
                  >
                    <option value=" ">Major</option>
                    <>
                      <>
                        {major.length > 0 ? (
                          major.map((item, index) => (
                            <option key={index} value={item.major_name}>
                              {item.major_name}
                            </option>
                          ))
                        ) : (
                          <option value={''}>NO major</option>
                        )}
                      </>
                    </>
                  </select>
                </label>
              ) : (
                <label className="">
                  Major:
                  <select
                    className="ml-9 w-40"
                    value={majorName}
                    onChange={(e) =>   (
                      setMajorName(e.target.value),
                      setMajorID(major.filter(m => m.major_name === e.target.value)[0].major_id)
                       )}
                  >
                    <option value=" ">Major</option>
                    <>
                      <>
                        {major.length > 0 ? (
                          major.map((item, index) => (
                            <option key={index} value={item.major_name}>
                              {item.major_name}
                            </option>
                          ))
                        ) : (
                          <option value={''}>NO major</option>
                        )}
                      </>
                    </>
                  </select>
                </label>
              )}

              {/* </div>
        <div className="grid lg:grid-cols-3 min-[100px]:gap-4 mb-3 pb-4  border-blue-300 border-b-2"> */}

              <label>
                Status:
                <select
                  className="ml-9 w-40"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {/* <option value="">Choose Value..</option> */}
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </label>

              <label className="">
                Role:
                <select
                  value={role}
                  className="ml-9 w-40 max-[840px]:ml-[50px]"
                  onChange={(e) => {
                    setRole(e.target.value);
                    setFname('');
                    setLname('');
                    setIDvalue('');
                    setEmail('');
                    setStatus('active');
                    setMajorName('');
                  }}
                >
                  <option value="1">Students</option>
                  <option value="2">Program Manager</option>
                  <option value="3"> Assistance</option>
                  {/* <option value="4"> admin</option> */}
                </select>
              </label>
              <div className="flex flex-col min-[850px]:flex-row gap-4">
                <button
                  className="primary-button rounded w-60 btnCol text-white hover:text-white hover:font-bold"
                  type="button"
                  onClick={handleAccounts}
                >
                  Search
                </button>
              </div>
            </div>
          </form>
          {role === '4' ? (
            // Render AdminList for role 4 users
            <AdminListResetPassword admin={admin} setAdminList={setAdminList} />
          ) : role === '3' ? (
            // Render AccountsAssistance for role 3 users
            <AccountsAssistanceResetPassword
              assistance={assistance}
              setAssistance={setAssistance}
            />
          ) : role === '2' ? (
            // Render AccountsList for role 2 users
            <AccountsListResetPassword users={users} setUsers={setUsers} />
          )
            : (
              <StudentsListResetPassword users={students} setUsers={setStudents} />
            )}
        </>
      ) : (
        redirect()
      )}
    </>
  );
}
Create.auth = true;
Create.adminOnly = true;
