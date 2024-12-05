import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Courses() {
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
          <h2 className="text-gray-700 text-3xl pt-5  font-bold">Courses</h2>
          <div className="flex gap-10 ml-[10%] max-[850px]:flex-col max-[850px]:mt-32 max-[850px]:ml-0  h-[30vh] place-items-center">
            <Link href="/admin/createCourse">
              <div className="  ">
                <button className="primary-button rounded w-60 btnCol text-white hover:text-white hover:font-bold">
                  Create Course
                </button>
              </div>
            </Link>
            <Link href="/admin/assign">
              <div className=" ">
                <button className="primary-button rounded w-80 btnCol text-white hover:text-white hover:font-bold">
                Edit Course Assignment to Major
                </button>
              </div>
            </Link>
            <Link href="/admin/UploadCourses">
              <div className="  ">
                <button className="primary-button rounded w-60 btnCol text-white hover:text-white hover:font-bold">
                  Upload Courses
                </button>
              </div>
            </Link>
          </div>
        </>
      ) : (
        redirect()
      )}
    </>
  );
}
Courses.auth = true;
Courses.adminOnly = true;
