import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Accounts() {
  const { data: session } = useSession();

  const router = useRouter();

  const redirect = () => {
    router.push("/AccessDenied");
  };

  return (
    <>
      <Head>
        <title>SIS Admin - Accounts</title>
      </Head>

      {session?.user.role === "0" ? (
        <>
          <h2 className="text-gray-700 text-3xl p-6 font-bold">Accounts</h2>
          <div className="flex flex-wrap justify-center mt-5">
            <Link href="/admin/CreateTeacherAccount" className="m-2">
              <button className="primary-button rounded w-60 btnCol text-white hover:text-white hover:font-bold">
                Create Teacher Account
              </button>
            </Link>
            <Link href="/admin/createAccount" className="m-2">
              <button className="primary-button rounded w-60 btnCol text-white hover:text-white hover:font-bold">
                Create a new Account
              </button>
            </Link>
            <Link href="/admin/create" className="m-2">
              <button className="primary-button rounded w-60 btnCol text-white hover:text-white hover:font-bold">
                View and Edit Accounts
              </button>
            </Link>
            <Link href="/admin/UploadTeacher" className="m-2">
              <button className="primary-button rounded w-60 btnCol text-white hover:text-white hover:font-bold">
                Upload Teacher
              </button>
            </Link>
            <Link href="/admin/UploadStudent" className="m-2">
              <button className="primary-button rounded w-60 btnCol text-white hover:text-white hover:font-bold">
                Upload Students
              </button>
            </Link>
            <Link href="/admin/StudentAccount" className="m-2">
              <button className="primary-button rounded w-60 btnCol text-white hover:text-white hover:font-bold">
                Students Account
              </button>
            </Link>
            <Link href="/admin/UploadSTAlumni" className="m-2">
              <button className="primary-button rounded w-60 btnCol text-white hover:text-white hover:font-bold">
                Upload Alumni Students
              </button>
            </Link>
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
