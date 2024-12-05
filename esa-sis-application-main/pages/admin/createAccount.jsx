import { useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import generatePasswod from "../../utilities/generatePassword";
import axios from "axios";
import bcryptjs from "bcryptjs";
import { useRouter } from "next/router";
import { NotificatonMessage } from "../../components/Dashboard/WarningMessage";
import Select from 'react-select';
function generateID(prefix) {
  const prefixLength = prefix.length;
  const randomDigits = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(6, "0");
  return prefix + randomDigits.substr(prefixLength);
}

export default function Create() {
  const { data: session } = useSession();
  // const [users, setUsers] = useState([]);
  // const [assistance, setAssistance] = useState([]);
  const [message, setMessage] = useState("");

  const router = useRouter();

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  // const [idvalue, setIDvalue] = useState('');
  const [email, setEmail] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [status, setStatus] = useState("active");
  const [role, setRole] = useState("");
  const [major, setMajor] = useState([]);

  const [majorValue, setMajorValue] = useState("");
  // const [majorValueExtra, setMajorValueExtra] = useState("");
  const [confirmOpenMessage, setConfirmOpenMessage] = useState(false);
  const [messages, setMessages] = useState("");
  // const [confirmCancleMessage , setConfirmCancleMessage] = useState(false)

  const redirect = () => {
    router.push("/AccessDenied");
  };

  // console.log(majorValue)

  const getAllMajors = async () => {
    let majorData = await axios.get("/api/admin/adminApi/getMajor");

    setMajor(majorData.data);
  };
  useEffect(() => {
    getAllMajors();
  }, []);

  let generatedPass = generatePasswod(10);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const salt = await bcryptjs.genSalt(8);
    const genPass = await bcryptjs.hash(generatedPass, salt);
    if (
      role == "2" &&
      fname != "" &&
      lname != "" &&
      email != "" &&
      majorValue != ""
    ) {
      const prefix = "PM";
      let gen = generateID(prefix);
      let sendData = {
        pm_id: gen.trim(),
        pm_firstname: fname.trim(),
        pm_lastname: lname.trim(),
        pm_email: email.trim(),
        pm_status: status.trim(),
        userpassword: genPass,
        password: generatedPass,
        major_id: majorValue[0],
        role: 'Program Manager'
      };

      // id,firstname,lastname,major,promotion,status
      let { data } = await axios.post(
        "/api/admin/adminApi/createPMAccount",
        sendData
      );
      if (majorValue.length > 1) {
        for (let i = 1; i < majorValue.length; i++) {
          let dataExtra = {
            pm_id: gen.trim(),
            major_id: majorValue[i]
          };

          await axios.post("/api/admin/adminApi/createExtra", dataExtra);
        }
      }

      if (data === true) {
        setConfirmOpenMessage(true);
        setMajorValue('')
        setMessages(`Account Program Manager Already Exist`);
      }
      // console.log(data[0].rowCount);
      else if (data[0].rowCount == 0) {
        // >>>>>>> main
        setMessage("ID Already Exist");
      } else {
        setConfirmOpenMessage(true);
        setMessages(`Account Program Manager Created Successfully`);
        // setMessage(
        //   `user Created Successfully with a password : ${generatedPass}`
        // );
      }
    } else if (
      role == "3" &&
      fname != "" &&
      lname != "" &&
      email != "" &&
      majorValue != ""
    ) {
      const prefix = "AS";
      let gen = generateID(prefix);
      let sendASData = {
        pm_ass_id: gen.trim(),
        pm_ass_firstname: fname.trim(),
        pm_ass_lastname: lname.trim(),
        pm_ass_email: email.trim(),
        pm_ass_status: status.trim(),
        userpassword: genPass,
        major_id: majorValue[0],
        password: generatedPass,
        role: 'Program Manager Assistance'
      };

      // id,firstname,lastname,major,promotion,status
      let { data } = await axios.post(
        "/api/admin/adminApi/createASAccount",
        sendASData
      );
      if (majorValue.length > 1) {
        for (let i = 1; i < majorValue.length; i++) {
          let dataExtra = {
            pm_id: gen.trim(),
            major_id: majorValue[i],
          };

          await axios.post("/api/admin/adminApi/createExtraAS", dataExtra);
        }
      }
      if (data === true) {
        setConfirmOpenMessage(true);
        setMessages(`Account Program Manager Assistance Already Exist`);
      } else {
        setConfirmOpenMessage(true);
        setMessages(` Account of Assistant Program Manager Created Successfully`);
      }
    } else if (role == "0" && fname != "" && email != "") {
      const prefix = "AD";
      let gen = generateID(prefix);
      let sendADData = {
        adminid: gen.trim(),
        adminemail: email.trim(),
        admin_firstname: fname.trim(),
        userpassword: genPass,
        admin_lastname: lname.trim(),
        admin_status: status.trim(),
        password: generatedPass,
        role: 'Admin'
      };

      // id,firstname,lastname,major,promotion,status
      let { data } = await axios.post(
        "/api/admin/adminApi/createAdminAccount",
        sendADData
      );

      console.log(data);

      if (data === true) {
        setConfirmOpenMessage(true);
        setMessages(`Account Admin Already Exist`);
      }
      else {
        setConfirmOpenMessage(true);
        setMessages(`Admin Account Created Successfully`);
      }
    }
    if (fname == "" && email == "") {
      setMessage("Please Fill all the required Fields");
    }
    if (role == "") {
      setMessage("Please choose a role");
    }
    if (role != 0) {
      if (majorValue == "") {
        setMessage("Please choose a Major");
      }
      if (fname == "" && lname == "" && email == "") {
        setMessage("Please Fill all the required Fields");
      }

    }
    setEmail('')
    setFname('')
    setLname('')
    setRole('')
    setStatus('active')
    setMajorValue('')
  };
  const handleOpenNotificatonMessages = () => {
    setConfirmOpenMessage(true);
  };
  const handleCloseNotificatonMessages = () => {
    setConfirmOpenMessage(false);

  };

  const handleMajor = (selectedOptions) => {
    // Extract an array of selected values
    const selectedValues = selectedOptions.map((option) => option.value);

    // Update the state with the array of selected values
    setMajorValue(selectedValues);
  };




  return (
    <>
      {confirmOpenMessage && (
        <NotificatonMessage
          handleOpenNotificatonMessages={handleOpenNotificatonMessages}
          handleCloseNotificatonMessages={handleCloseNotificatonMessages}
          messages={messages}
        />
      )}
      <Head>
        <title>SIS Admin - Accounts</title>
      </Head>

      {session?.user.role === "0" ? (
        <>
          <p className="text-gray-700 text-3xl pt-5 mb-10 font-bold">
            Create Accounts
          </p>
          <form>
            <div className="grid grid-cols-1 gap-4 min-[850px]:grid-cols-2 min-[1100px]:grid-cols-3 mb-3 pb-4 border-blue-300 border-b-2">
              <label className="w-[350px]">
                First Name:
                <input
                  className="ml-1 w-40"
                  type="text"
                  name="ID"
                  required
                  placeholder="First Name"
                  value={fname}
                  onChange={(e) => {
                    setFname(e.target.value);
                  }}
                ></input>
              </label>

              <label>
                Last Name:
                <input
                  className="ml-2 w-40 max-[850px]:ml-1"
                  type="text"
                  name="Fname"
                  required
                  placeholder="First Name"
                  // disabled={role == "0" ? true : false}
                  value={lname}
                  onChange={(e) => {
                    setLname(e.target.value);
                  }}
                ></input>
              </label>

              <label>
                Email:
                <input
                  className="ml-10  w-40 max-[850px]:ml-10 max-[850px]:mt-0"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                ></input>
              </label>
              {/* </div>
        <div className="grid lg:grid-cols-3 min-[100px]:gap-4 mb-3"> */}
              <label className="flex items-center space-x-4">
                <span className="ml-4">Major:</span>
                <Select
                  isMulti={true}
                  options={major
                    .map((majors) => ({
                      value: majors.major_id,
                      label: majors.major_name,
                    }))
                    .sort((a, b) => a.label.localeCompare(b.label))}
                  placeholder="Select a Major"
                  onChange={handleMajor}
                  className='w-60'
                />
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
                Status:
                <select
                  className="ml-9 w-40"
                  onChange={(e) => setStatus(e.target.value)}
                  value={status}
                // disabled={role == "0" ? true : false}
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
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option defaultValue="">Choose a Role</option>
                  <option value="0">Admin</option>
                  <option value="2">Program Manager</option>
                  <option value="3">Assistance</option>
                </select>
              </label>
              <div className="flex flex-col min-[850px]:flex-row gap-4">
                <button
                  className="primary-button rounded w-60 btnCol text-white hover:text-white hover:font-bold"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Register
                </button>
              </div>
            </div>
          </form>
          {message == "Please choose a role" ? (
            <div className="text-center text-red-500 text-xl">{message}</div>
          ) : null}
          {message == "Please Fill all the required Fields" ? (
            <div className="text-center text-red-500 text-xl">{message}</div>
          ) : null}
          {message == "ID Already Exist" ? (
            <div className="text-center text-red-500 text-xl">{message}</div>
          ) : null}
          {message == "Please choose a Major" ? (
            <div className="text-center text-red-500 text-xl">{message}</div>
          ) : null}
          {message.includes("Successfully") ? (
            <div className="text-center text-green-700 text-xl">{message}</div>
          ) : null}
        </>
      ) : (
        redirect()
      )}
    </>
  );
}
Create.auth = true;
Create.adminOnly = true;
