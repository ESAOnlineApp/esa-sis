// import Link from 'next/link';
import React from "react";
// import { useForm } from "react-hook-form";
// import { getError } from "../../utilities/error";
// import { signIn, useSession, getSession } from "next-auth/react";
// import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
// import selection_data from '../../utilities/selection_data';
// import decrypt from "../../utilities/encrypt_decrypt/decryptText";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
import esaBuilding from "../../public/images/ESA3.jpg";
import esaLogo from "../../public/images/esa.png";

// import Person2Icon from '@mui/icons-material/Person2';
// import LockIcon from '@mui/icons-material/Lock';
import Image from "next/image";


export default function HomeScreen() {


    return (
        <>
            <Head>
                <title>ESA SIS - Login</title>
                <link rel="icon" href="/public/index.ico" />
            </Head>
            <div className="bg-[#F7F7F7] h-screen">
                <div className="flex justify-center   text-black">
                    <div className="imageRes lg:visible invisible">
                        <Image
                            src={esaBuilding}
                            alt="Esa-Building"
                            width={456}
                            height={690}
                        />
                    </div>
                    <div className="bg-white pr-11 sm:pl-11">
                        <div className="log flex pr-11 ">
                            <Image
                                src={esaLogo}
                                width={81}
                                className="esaLogo"
                                alt="Logo"
                                height='100%'
                            />
                            <div className="leading-7 welcometoSis mt-4 ml-5">
                                <p className="welcomeTo mt-11">WELCOME TO</p>
                                <span className="SIS">Student Information System (SIS)</span>
                            </div>
                            <Link href="/user/login" legacyBehavior>
                                <div className="text-center login text-[#3D709A] text-[39px] bold cursor-pointer">
                                    Login
                                </div>
                            </Link>
                        </div>
                        <div className="contentSIS">
                            <div className="SISText">This site will allow you to:</div>
                            <div className="ContainerCircle">
                                <div className="contentDiv">
                                    <div className="circle blue">
                                        <p className="ContentText">Check your grades</p>
                                    </div>
                                    <div className="rightContent">
                                        <p className="textContent blue"> You can access all your grades for enrolled courses through our SIS.</p>
                                    </div>
                                </div>
                                <div className="contentDiv">
                                    <div className="circle gray">
                                        <p className="ContentText">Get Notifications</p>
                                    </div>
                                    <div className="rightContent">
                                        <p className="textContent gray">Notifications for new grades or reminders before each class.</p>
                                    </div>
                                </div>
                                <div className="contentDiv">
                                    <div className="circle lightBlue">
                                        <p className="ContentText">Submit Requests</p>
                                    </div>
                                    <div className="rightContent">
                                        <p className="textContent lightBlue">
                                            Directly submit requests to the program manager,<br />
                                            such as Academic Transcript,<br />
                                            through our SIS
                                        </p>
                                    </div>
                                </div>
                                <div className="contentDiv">
                                    <div className="circle darkBlue">
                                        <p className="ContentText">Check your payment</p>
                                    </div>
                                    <div className="rightContent">
                                        <p className="textContent darkBlue">View upcoming installments and payment history</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <footer className="text-center mt-8">
                            <Link href="/user/PrivacyPolicy" className="text-gray-700 font-bold text-sm hover:text-gray-900 underline">Privacy Policy</Link>
                        </footer>
                    </div>
                </div>
            </div>
        </>


    );
}

HomeScreen.getLayout = function (page) {
    return <>{page}</>;
};
