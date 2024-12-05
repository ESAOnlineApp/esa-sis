import { useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
// import generatePasswod from "../../utilities/generatePassword";
import axios from "axios";
// import bcryptjs from "bcryptjs";
import { useRouter } from "next/router";
import { NotificatonMessage } from "../../components/Dashboard/WarningMessage";
import TeachersList from "../../components/Dashboard/TeachersList";

function generateID(prefix) {
  prefix.length;
  const randomDigits = Math.floor(Math.random() * 10000).toString();

  return randomDigits;
}

export default function CreateTeacher() {
  const [formErrors, setFormErrors] = useState({});
  const { data: session } = useSession();
  // const [users, setUsers] = useState([]);
  // const [assistance, setAssistance] = useState([]);
  // const [message, setMessage] = useState("");

  const router = useRouter();

  const [confirmOpenMessage, setConfirmOpenMessage] = useState(false);
  const [messages, setMessages] = useState("");
  // const [confirmCancleMessage, setConfirmCancleMessage] = useState(false);
  const [teacher_firstname, setTeacherFirstname] = useState("");
  const [teacher_lastname, setTeacherLastname] = useState("");
  const [teacher_mail, setTeacherMail] = useState("");
  const [teacher_mobile, setTeacherMobile] = useState("");
  const [teachers, setTeachers] = useState([])

  const redirect = () => {
    router.push("/AccessDenied");
  };

  const handleAdd = async () => {
    const errors = {};
    if (teacher_firstname.trim() === "") {
      errors.teacher_firstname = "First Name is required.";
    }
    if (teacher_lastname.trim() === "") {
      errors.teacher_lastname = "Last Name is required.";
    }
    if (teacher_mail.trim() === "") {
      errors.teacher_mail = "Email is required."
    }
    if (teacher_mobile.trim() === "") {
      errors.teacher_mobile = "Mobile is required."
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    let prefix = 5;
    let teacherId = generateID(prefix);
    const payload = {
      teacher_id: teacherId,
      teacher_firstname: teacher_firstname,
      teacher_lastname: teacher_lastname,
      teacher_mail: teacher_mail,
      teacher_mobile:teacher_mobile
    };
    // console.log(payload);
    try {
      const data = await axios.post(
        "/api/admin/adminApi/createTeacher",
        payload
      );
      console.log('data' , data)
      setTeachers((prevTeachers) => [
        ...data.data.data.rows,
        ...prevTeachers
      ]);

      setTeacherFirstname('')
      setTeacherLastname("")
      setTeacherMail("")
      setTeacherMobile("")
      // console.log(data.data.message);
      setConfirmOpenMessage(true);
      setMessages(data.data.message);
    } catch (error) {
      return error;
    }
  };

  const handleOpenNotificatonMessages = () => {
    setConfirmOpenMessage(true);
  };
  const handleCloseNotificatonMessages = () => {
    setConfirmOpenMessage(false);
  };

  useEffect(() => {
    fetchTeacher()
  }, [])

  const fetchTeacher = async () => {
    try {
      const response = await axios.post('/api/pmApi/getAll', { table: 'teachers' })

      setTeachers(response.data.rows)
    } catch (error) {
      return error
    }
  }

  return (
    <>

      <Head>
        <title>SIS Admin - Accounts</title>
      </Head>

      {session?.user.role === "0" ? (
        <>

          <p className="text-gray-700 text-3xl pt-5 mb-10 font-bold">
            Create Accounts
          </p>
          <form>
            {confirmOpenMessage && (
              <NotificatonMessage
                handleOpenNotificatonMessages={handleOpenNotificatonMessages}
                handleCloseNotificatonMessages={handleCloseNotificatonMessages}
                messages={messages}
              />
            )}
            <div className="grid grid-cols-1 gap-4  min-[850px]:grid-cols-2 min-[1100px]:grid-cols-3 mb-3 pb-4 border-blue-300 border-b-2 justify-center">
              <label className="w-[350px]">
                First Name:
                <input
                  className="ml-1 w-40"
                  type="text"
                  name="ID"
                  required
                  placeholder="First Name"
                  value={teacher_firstname}
                  onChange={(e) => setTeacherFirstname(e.target.value)}
                ></input>
                {formErrors.teacher_firstname && (
                  <div className="text-center text-red-500 font-bold">
                    {formErrors.teacher_firstname}
                  </div>
                )}
              </label>

              <label>
                Last Name:
                <input
                  className="ml-2 w-40 max-[850px]:ml-1"
                  type="text"
                  name="Fname"
                  required
                  placeholder="Last Name"
                  value={teacher_lastname}
                  onChange={(e) => {
                    setTeacherLastname(e.target.value);
                  }}
                ></input>
                {formErrors.teacher_lastname && (
                  <div className="text-center text-red-500 font-bold ">
                    {formErrors.teacher_lastname}
                  </div>
                )}
              </label>

              <label className="invisible max-[850px]:visible max-[850px]:hidden">
                Email:
                <input
                  className="ml-12 invisible max-[850px]:visible max-[850px]:hidden w-40 max-[850px]:ml-10"
                  type="email"
                  name="email"
                  placeholder="Email"
                ></input>
              </label>
              {/* </div>
        <div className="grid lg:grid-cols-3 min-[100px]:gap-4 mb-3"> */}
              <label className="invisible max-[850px]:visible max-[850px]:hidden">
                Email:
                <input
                  className="ml-12 invisible max-[850px]:visible max-[850px]:hidden w-40 max-[850px]:ml-10"
                  type="email"
                  name="email"
                  placeholder="Email"
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

              <label className="invisible max-[850px]:visible max-[850px]:hidden">
                new:
                <input
                  className="ml-16 w-40 invisible max-[850px]:visible max-[850px]:hidden max-[850px]:ml-[60px]"
                  type="date"
                  name="to"
                // value={formData.to}
                // onChange={handleChange}
                ></input>
              </label>
              {/* </div>
        <div className="grid lg:grid-cols-3 min-[100px]:gap-4 mb-3 pb-4  border-blue-300 border-b-2"> */}
              <label>
                Email:
                <input
                  className="ml-10  w-40 max-[850px]:ml-10 max-[850px]:mt-0"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={teacher_mail}
                  onChange={(e) => setTeacherMail(e.target.value)}
                ></input>
                {formErrors.teacher_mail && (
                  <div className="text-center text-red-500 font-bold ">
                    {formErrors.teacher_mail}
                  </div>
                )}
              </label>
              <label className="w-[253px]">
                Mobile:
                <input
                  className="ml-10  w-40 max-[850px]:ml-6 max-[850px]:mt-0"
                  type="mobile"
                  name="mobile"
                  placeholder="Mobile Number"
                  value={teacher_mobile}
                  onChange={(e) => setTeacherMobile(e.target.value)}
                ></input>
                {formErrors.teacher_mobile && (
                  <div className="text-center text-red-500 font-bold ">
                    {formErrors.teacher_mobile}
                  </div>
                )}
              </label>


              <div className="flex flex-col min-[850px]:flex-row gap-4">
                <button
                  className="primary-button rounded w-60 btnCol text-white hover:text-white hover:font-bold"
                  type="button"
                  onClick={handleAdd}
                >
                  Add
                </button>
              </div>
            </div>
          </form>
          <TeachersList users={teachers} setUsers={setTeachers} />
        </>
      ) : (
        redirect()
      )}
    </>
  );
}
CreateTeacher.auth = true;
CreateTeacher.adminOnly = true;
