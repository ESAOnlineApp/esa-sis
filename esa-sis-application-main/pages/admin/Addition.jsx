import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";

import AdditionList from "./AdditionList";

export default function Addition() {
    const { data: session } = useSession();

    const router = useRouter();
    const redirect = () => {
        router.push("/AccessDenied");
    };
    return (
        <>
          {session?.user.role === "0" ? (
            <>
              <Head>
                <title>SIS Admin - Accounts</title>
              </Head>
              <h2 className="text-gray-700 text-3xl pt-5 font-bold">Addition</h2>
              <div className="mt-12">
                <div className="">
                  <AdditionList />
                </div>
              </div>
            </>
          ) : (
            redirect()
          )}
        </>
      );
      
}
Addition.auth = true;
Addition.adminOnly = true;
