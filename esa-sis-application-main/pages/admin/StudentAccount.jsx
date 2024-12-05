import { useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
// import AccountsList from "../../components/Dashboard/AccountsList";
import StudentAdminList from "../../components/Dashboard/StudentAdminList";
import axios from "axios";
import { useRouter } from "next/router";

export default function Create() {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const router = useRouter();

  const redirect = () => {
    router.push("/AccessDenied");
  };

  useEffect(() => {
    handleShowAll();
    getAllMajors();
  }, []);

  const [studentId, setStudentId] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [status, setStatus] = useState("active");
  const [major, setMajor] = useState([]);
  const [majorValue, setMajorValue] = useState("");

  const handleShowAll = async () => {
    let sendData = {
      status: "active",
      student_id: "",

      promotion: "",
      student_firstname: "",
      student_lastname: "",
    };
    const data = await axios.post(
      "/api/admin/adminApi/filterStudentAdmin",
      sendData
    );
    // console.log("==========");
    // console.log(data.data.rows);
    setUsers(data.data.rows);
    setStudentId("");
    setFname("");
    setLname("");
    setMajorValue("");
    // setEmail("");
  };

  const handleSearch = async () => {
    let sendData = {
      student_id: studentId,
      status: status,
      promotion: majorValue,
      student_firstname: fname,
      student_lastname: lname,
    };
    // console.log(sendData);
    const data = await axios.post(
      "/api/admin/adminApi/filterStudentAdmin",
      sendData
    );
    setUsers(data.data.rows);
    // console.log(status);
    // console.log(data.data.rows);
  };

  const getAllMajors = async () => {
    let data = await axios.get("/api/admin/adminApi/getAllMajors");

    setMajor(data.data.rows);
  };
  return (
    <>
      <Head>
        <title>SIS Admin - Accounts</title>
      </Head>

      {session?.user.role === "0" ? (
        <>
          <p className="text-gray-700 text-3xl pt-5 mb-10 font-bold">
            List Of Accounts
          </p>
          <form>
            <div className="grid grid-cols-1 gap-4 min-[850px]:grid-cols-2 min-[1100px]:grid-cols-3 mb-3 pb-4 border-blue-300 border-b-2">
              <label>
                ID:
                <input
                  className="ml-16 w-40"
                  type="text"
                  name="ID"
                  value={studentId}
                  placeholder="ID"
                  onChange={(e) => setStudentId(e.target.value)}
                ></input>
              </label>

              <label>
                First Name:
                <input
                  className="ml-2 w-40 max-[850px]:ml-1"
                  type="text"
                  name="Fname"
                  value={fname}
                  placeholder="First Name"
                  onChange={(e) => setFname(e.target.value)}
                ></input>
              </label>

              <label>
                Last Name:
                <input
                  className="ml-1 w-40 max-[850px]:ml-1"
                  type="text"
                  name="Lname"
                  value={lname}
                  placeholder="Last Name"
                  onChange={(e) => setLname(e.target.value)}
                ></input>
              </label>

              <label>
                Email:
                <input
                  className="ml-10 mt-3 w-40 max-[850px]:ml-10 max-[850px]:mt-0"
                  type="email"
                  name="email"
                  placeholder="Email"
                  // onChange={(e) => setEmail(e.target.value)}
                ></input>
              </label>

              <label className="invisible max-[850px]:visible max-[850px]:hidden">
                From:
                <input
                  className="ml-12 invisible max-[850px]:visible max-[850px]:hidden w-40 max-[850px]:ml-10"
                  type="date"
                  name="from"
                ></input>
              </label>
              <label className="invisible max-[850px]:visible max-[850px]:hidden">
                From:
                <input
                  className="ml-12 invisible max-[850px]:visible max-[850px]:hidden w-40 max-[850px]:ml-10"
                  type="date"
                  name="from"
                ></input>
              </label>

              <label className="w-[350px]">
                Promotion:
                <select
                  className="ml-1 w-40"
                  onChange={(e) => setMajorValue(e.target.value)}
                >
                  <option value=" ">Choose a Promotion</option>
                  <>
                    <>
                      {major.length > 0 ? (
                        major.map((item, index) => (
                          <option key={index} value={item.promotion_name}>
                            {item.promotion_name}
                          </option>
                        ))
                      ) : (
                        <option value={""}>NO major</option>
                      )}
                    </>
                  </>
                </select>
              </label>

              <label>
                Status:
                <select
                  className="ml-9 w-40"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="hold">Hold</option>
                  <option value="limited">Limited</option>
                </select>
              </label>
              <div className="flex flex-col min-[850px]:flex-row gap-4">
                <button
                  className="primary-button rounded w-60 btnCol text-white hover:text-white hover:font-bold"
                  type="button"
                  onClick={handleSearch}
                >
                  Search
                </button>

                <>
                  <button
                    className="primary-button btnCol text-white rounded w-60 hover:text-white hover:font-bold"
                    type="button"
                    onClick={handleShowAll}
                  >
                    Show All
                  </button>
                </>
              </div>
            </div>

            <StudentAdminList users={users} setUsers={setUsers} />
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
