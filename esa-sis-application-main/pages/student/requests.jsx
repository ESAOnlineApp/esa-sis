//  Hassan
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import StudentRequests from "../../components/StudentRequests";
// =======
// import { useSession } from 'next-auth/react';
// import Head from 'next/head';
// import { useRouter } from 'next/router';
// import Link from 'next/link';
// // import { useEffect } from "react";
// // import axios from "axios";

// main
export default function Accounts() {
  const { data: session } = useSession();

  const [reqType, setReqType] = useState("");
  const [pageReq, setPageReq] = useState("");

  const router = useRouter();

  const redirect = () => {
    router.push('/AccessDenied');
  };

  const getRequestType = async () => {
    const res = await axios.post("/api/user/getRequest");
    
    setReqType(res.data.data);
  };

  useEffect(() => {
    getRequestType();
  }, []);

  

  return (
    <>
      <Head>
        <title>SIS Admin - Requests</title>
      </Head>

      {session?.user.role === '1' ? (
        <>
          <h2 className="text-gray-700 text-3xl p-6 font-bold">Requests</h2>
          <div>
            <div className="flex flex-wrap justify-center mt-5">
              <label className="w-[350px]">
                Request Type
                <select
                  className=" ml-3"
                  onChange={(e) => {
                    setPageReq(e.target.value);
                  }}
                >
                  <option value="">Select a Request...</option>
                  {reqType &&
                    reqType.map((req) => {
                      return (
                        <option key={req.req_id} value={req.type}>
                          {req.type}
                        </option>
                      );
                    })}
                </select>
              </label>
            </div>
            <div className="mt-5">
              {pageReq == "Transcript" && <StudentRequests />}
            </div>
          </div>
        </>
      ) : (
        redirect()
      )}
    </>
  );
}
Accounts.auth = true;
Accounts.adminOnly = true;
