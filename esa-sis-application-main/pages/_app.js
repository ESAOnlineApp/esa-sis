/*
 * Created By: KANSO Adi
 * Project: SIS Application
 * File: pages\_app.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

import "../styles/globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { wrapper } from "../redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import CircularProgress from "@mui/material/CircularProgress";
import DashboardLayout from "../components/Dashboard/DashboardLayout";
import Cookies from "js-cookie";
import Head from "next/head";



function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  const persistor = store.__persisitor;



  if (Component.getLayout) {
    return (
      <>
        <SessionProvider session={session}>
          <Provider store={store}>
            <Component {...props.pageProps} />
          </Provider>
        </SessionProvider>
      </>
    );
  }

  // try {
  return (
    <div className="primary-bg h-full">
      <Head>
        <link rel="icon" href="/esa.ico" />
      </Head>
      <SessionProvider session={session}>
        {/* {// console.log('Component.auth=', Component.auth)}
        {// console.log('Component.adminOnly=', Component.adminOnly)} */}

        {Component.auth ? (
          <Auth adminOnly={Component.auth}>
            <Provider store={store}>
              <PersistGate
                persistor={persistor}
                // persistor={store.__persistor}
              >
                {Component.adminOnly ? (
                  <DashboardLayout>
                    <Component {...props.pageProps} />
                  </DashboardLayout>
                ) : (
                  // <Layout>
                  <Component {...props.pageProps} />
                  //  </Layout>
                )}
              </PersistGate>
            </Provider>
          </Auth>
        ) : (
          <Provider store={store}>
            <PersistGate
              persistor={persistor}
              // persistor={store.__persistor}
            >
              {/* <Layout> */}
              <Component {...props.pageProps} />
              {/* </Layout> */}
            </PersistGate>
          </Provider>
        )}
      </SessionProvider>
    </div>
  );
  // } catch (error) {
  //   // sendErrorToSlack(error);
  //   return (
  //     <>
  //       <ErrorOccur error={error} />
  //     </>
  //   );
  //   // return <p>An error occurred.</p>;
  // }
}

function Auth({ children }) {
  // function Auth({ children, adminOnly }) {
  const router = useRouter();
  // eslint-disable-next-line no-unused-vars
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      // adminOnly
      //   ? router.push('/unauthorized?message=admin login required')
      //   :
      router.push("/unauthorized?message=Login Required");
    },
  });

  //   The status returned by useSession() can be one of the following three values:
  // 'loading': This means that the session data is still being fetched from the server. This status is usually temporary and should only last for a short period of time.
  // 'unauthenticated': This means that there is no authenticated user session available. This can happen if the user has not logged in or if their session has expired.
  // 'authenticated': This means that there is an authenticated user session available. In this case, the data property of the returned object should contain the user's session data.

  if (status === "loading") {
    return (
      <div className="grid h-screen place-items-center">
        <CircularProgress />
      </div>
    );
  }

  if (status === "unauthenticated") {
    // console.log('unauthenticated user...');
    // localStorage.clear();
    sessionStorage.clear();
    // Clear all cookies
    // Object.keys(Cookies.get()).forEach((cookieName) => {
    //   Cookies.remove(cookieName);
    // });
    // Clear session cookie
    Cookies.remove("sessionCookieName", { path: "" });
  }

  return children;
}

export default MyApp;
