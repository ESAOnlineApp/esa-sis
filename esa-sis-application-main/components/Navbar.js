/*
 * Created By: KANSO Adi,Jaber Mohamad
 * Project: SIS Application
 * File: components\Navbar.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Menu } from "@headlessui/react";
import DropdownLink from "./DropdownLink";
// import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { isLogout } from "../redux/slices/userSlice";
// import { useRouter } from 'next/router';
import { useEffect } from "react";
import { useState } from "react";
import selection_data from "../utilities/selection_data";
import NavigationRef from "../utilities/NavbarRef/navigationRef";
import axios from "axios";
import encrypt from "../utilities/encrypt_decrypt/encryptText";

export const Navbar = () => {
  const { status, data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  // const router = useRouter();
  // const domain = router?.query?.domain ?? '';
  // // console.log(
  //   'router==',
  //   `${window.location.origin}${selection_data.where_going_after_logout}`
  // );
  // // console.log('domain==', window.location.origin);
  const [href, sethref] = useState();
  // const [isLogOut, setisLogOut] = useState(false);

  const userState = useSelector(
    (state) => state.persistedReducer.user_state.userState
  );

  //const appState = useSelector(
  //(state) => state.persistedReducer.app_state.appState
  //);

  const logoutClickHandler = async () => {
    dispatch(isLogout(true));
    const emailWas = session?.user.email;
    const role = session?.user.role;

    await signOut({
      redirect: true,
      callbackUrl: `${window.location.origin}${selection_data.where_going_after_logout}`,
      // callbackUrl: `${window.location.origin}${selection_data.where_going_after_logout}`,
    });
    // dispatch(logoutSuccess());
    const encryptedEmail = encrypt(
      JSON.stringify({
        email: emailWas,
        role,
        info: "signout navbar",
      })
    );
    console.log('enc' , encryptedEmail)
    await axios.post("/api/logger/sendInfoToLogger", {
      data: encryptedEmail,
    });
    

    // if (!selection_data.going_to_external_URL) {
    //   if (router.locale === 'fr') {
    //     await router.replace(
    //       selection_data.where_going_after_save_fr,
    //       undefined,
    //       { locale: 'en-US' }
    //     );
    //   } else await router.replace(selection_data.where_going_after_save_en);
    //   const encryptedEmail = encrypt(
    //     JSON.stringify({ email: session?.user.email, info: 'signout' })
    //   );
    //   await axios.put('/api/logger/sendInfoToLogger', {
    //     data: encryptedEmail,
    //   });
    // } else {
    //   const encryptedEmail = encrypt(
    //     JSON.stringify({
    //       email: session?.user.email,
    //       info: 'signout to external URL',
    //     })
    //   );
    //   await axios.put('/api/logger/sendInfoToLogger', {
    //     data: encryptedEmail,
    //   });
    // }

    // if (!pathname.includes('studentapplication')) {
    //   dispatch(logoutSuccess());
    // } else {
    //   dispatch(isLogout(true));
    // }

    // Case: Routing to an external URL
    // if (selection_data.going_to_external_URL) {
    //   if (router.locale === 'fr') {
    //     await router.push(
    //       selection_data.going_to_external_URL_after_save_fr,
    //       undefined,
    //       { locale: 'en-US' }
    //     );
    //   } else
    //     await router.push(selection_data.going_to_external_URL_after_save_en);
    // }

    //  const encryptedBody = encrypt(
    //       JSON.stringify({ email: session?.user.email, info: 'signout' })
    //     );
    //     await axios.put('/api/logger/sendInfoToLogger', {
    //       data: encryptedBody,
    //     });
    //     await signOut();

    //     if (router.locale === 'fr') {
    //       // await router.replace('/', undefined, { locale: 'en-US' });
    //       await router.replace(selection_data.where_going_after_logout_fr, undefined, { locale: 'en-US' });
    //     } else {
    //       // await router.replace('/');
    //       await router.replace(selection_data.where_going_after_logout_en);
    //     }
    //     // await router.push(router.asPath, router.asPath, { locale: 'en-US' });
    //     // FIXME: delete this two line router and signout() after fixing the forwardRef bug in dob datepicker

    // FIXME: un-comment after fixing the forwardRef bug in dob datepicker

    // dispatch(logoutSuccess());
    // dispatch(isLogout(true));
  };
  // eslint-disable-next-line react/display-name
  const MyLink = React.forwardRef(({ href, children, ...rest }, ref) => {
    return (
      <a href={href} onClick={rest.onClick} ref={ref}>
        {children}
      </a>
    );
  });

  useEffect(() => {
    sethref(
      NavigationRef(
        session?.user.role,
        session?.user.major,
        userState.user.application_Language
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user.major, userState.user.application_Language]);

  return (
    <>
      {/* <ToastContainer position="bottom-center" limit={1} /> */}
      <header>

        <nav className="w-full bg-white shadow-md">
        <Link
                          href="/privacy-policy"
                          className="p-2 font-bold uppercase hover:text-xl"
                        >
                          here
                        </Link>
          <div className="justify-between px-4 mx-auto md:items-center md:flex md:px-8">
            <div>
              <div className="flex items-center justify-between  md:block">
                <Link
                  href={selection_data.where_going_onclicking_esa_logo}
                  className="text-lg font-bold mt-1"
                >
                  <Image
                    src={
                      "https://res.cloudinary.com/ds6avfn6i/image/upload/v1684261612/esaonlineapp/public/esa-logo_y9a1ha.png"
                    }
                    // src={appState.appVar.esa_logo}
                    alt="ESA logo"
                    width={65}
                    height={100}
                    className="w-[65px] h-[100px]"
                    priority
                  ></Image>
                </Link>
                <div className="md:hidden">
                  <button
                    className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    {isOpen ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div
                className={`flex-1 justify-self-center pb-3 pl-4 md:block md:pb-0 md:mt-0 ${
                  isOpen ? "block" : "hidden"
                }`}
              >
                <ul className="items-center flex justify-end space-y-8 md:flex md:space-x-6 md:space-y-0">
                  <li className="text-gray-600 hover:text-blue-600">
                    <div>
                      {status === "loading" ? (
                        "Checking Authentication ..."
                      ) : session?.user ? (
                        <>
                          <div className="flex justify-center">

                            <Image
                              src={
                                userState.user.profileUrl &&
                                userState.user.profileUrl !== " "
                                  ? userState.user.profileUrl
                                  : selection_data.user_Avatar
                              }
                              alt="avatar"
                              width={70}
                              height={70}
                              className="w-[70px] h-[70px] rounded-full"
                            ></Image>

                          </div>
                          <Menu as="div" className="relative inline-block">
                            <Menu.Button className="text-blue-800 uppercase font-bold hover:text-xl">
                              {userState.user.name}
                            </Menu.Button>
                            {/* Insert DropDown Menu Items */}

                            <Menu.Items className="absolute w-48 pl-3 min-[200px]:right-0 md:right-0 xl:right-0 origin-top-right bg-white shadow-lg z-10 rounded-xl">
                              <Menu.Item>
                                {/* <DropdownLink
                          className="dropdown-link"
                          href="/user/profile"
                        >
                          Profile
                        </DropdownLink> */}
                                <Link
                                  className="dropdown-link"
                                  href="/user/profile"
                                  replace
                                >
                                  <MyLink className="dropdown-link">
                                    Profile
                                  </MyLink>
                                </Link>
                              </Menu.Item>

                              {session.user.role === "1" && (
                                <Menu.Item>
                                  <Link
                                    className="dropdown-link w-full"
                                    href={href}
                                    replace
                                  >
                                    <MyLink className="dropdown-link">
                                      Student Dashboard
                                    </MyLink>
                                  </Link>
                                </Menu.Item>
                              )}

                              {session.user.role === "0" && (
                                <Menu.Item>
                                  <DropdownLink
                                    className="dropdown-link"
                                    href={href}
                                  >
                                    Admin Dashboard
                                  </DropdownLink>
                                </Menu.Item>
                              )}

                              <Menu.Item>
                                <a
                                  className="dropdown-link"
                                  href="#"
                                  onClick={logoutClickHandler}
                                >
                                  Logout
                                </a>
                              </Menu.Item>
                            </Menu.Items>
                          </Menu>
                        </>
                      ) : (
                        <Link
                          href="/user/login"
                          className="p-2 font-bold uppercase hover:text-xl"
                        >
                          Login
                        </Link>
                      )}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};
