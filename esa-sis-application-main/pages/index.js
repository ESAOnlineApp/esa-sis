/*
 * Created By: KANSO Adi
 * Project: SIS Application
 * File: pages\index.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */

import Head from 'next/head';
// import Image from 'next/image';
// import Carousel from 'react-material-ui-carousel';
// import selection_data from '../utilities/selection_data';
// import { useEffect, useState } from 'react';
// import { ApplyNow } from '../components/ApplyNow';
// import SocialIcons from '../components/SocialIcons';
// import LoginScreen from './user/login';
import HomeScreen from './user/homepage';


// import { useSession } from 'next-auth/react';
// import { useState } from 'react';
// import axios from 'axios';
// import decrypt from '../utilities/encrypt_decrypt/decryptText';
// import { useEffect } from 'react';
// import { useUserStore } from '../context/userContext';
// import NextLink from 'next/link';
// import Link from 'next/link';
// import { useEffect} from 'react';
// import { useDispatch } from 'react-redux';
// import { appSetting} from '../redux/slices/appSlice';
// import LoginScreen from './user/login'

export default function Home() {
  // const [carousel, setCarousel] = useState([]);

  // useEffect(() => {
  //   setCarousel(selection_data.carouselList);
  // }, []);

  //  const dispatch = useDispatch();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         '/api/controller/settingdata'
  //       );
  //       const incomingData = JSON.parse(decrypt(response.data.data));

  //       if (response.status === 200) {

  //         dispatch(appSetting({
  //           auto_Save_Timing: incomingData.setting[0].auto_Save_Timing * 60 * 1000,
  //           disapearing_Message_Time:incomingData.setting[0].message_disapear_timing * 1000,
  //           max_characters_count:incomingData.setting[0].max_characters_count,
  //           education_Year_of_Acquisition_Limit:incomingData.setting[0].Year_of_Acquisition_Limit,
  //           personalinfo_dob_min:incomingData.setting[0].personalinfo_dob_min.split('T')[0],
  //           personalinfo_dob_max:incomingData.setting[0].personalinfo_dob_max.split('T')[0],
  //           upload_file_single_size:incomingData.setting[0].upload_file_single_size *1024 *1024,
  //           upload_file_total_size:incomingData.setting[0].upload_file_total_size *1024 *1024,
  //           logger_expiry_day:incomingData.setting[0].logger_expiry_day + 'd',
  //           logger_max_file_size:incomingData.setting[0].logger_max_file_size + 'm',
  //           upload_file_directory_name:incomingData.setting[0].upload_file_directory_name,
  //           carouselList:incomingData.setting[0].carouselList,
  //           esa_logo:incomingData.setting[0].esa_logo,
  //           login_bg:incomingData.setting[0].login_bg,
  //           MBA_recommendation_letter:incomingData.setting[0].MBA_recommendation_letter,
  //           EMBA_recommendation_letter:incomingData.setting[0].EMBA_recommendation_letter,

  //         }));
  //         setCarousel(incomingData.setting[0].carouselList);
  //            }

  //       }
  //      catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchData();
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <>
      <Head>
        <title>ESA Business School - SIS Application</title>
        <link rel='icon' href='/esa.ico' />
        <meta name="google-site-verification" content="OM1_3GqV2ivos-Y_OSyfU7Gcfz6ajfWkpejdKaNJMxE" />
      </Head>
      {/* <LoginScreen /> */}
      <HomeScreen />
   
      {/* <Carousel
        className='mt-8 rounded-xl  border-8 border-gray-300 h-[200px] md:h-[600px]'
        navButtonsAlwaysVisible={true}
        activeIndicatorIconButtonProps={{
          style: {
            color: 'blue',
          },
        }}
      >
        {carousel.map((item, i) => (
          <Image
            alt='esa'
            fill
            style={{
              objectFit: 'cover',
            }}
            key={i}
            src={item}
            priority={true}
            sizes='100vw,100vw'
          />
        ))}
      </Carousel>
      <ApplyNow /> */}

      {/* <div className='relative pt-16 pb-32 h-[600px] flex content-center items-center justify-center min-h-screen-72 '>
        <div
          className='absolute top-0 w-full h-full bg-center bg-cover rounded-lg'
          style={{
            backgroundImage: 'url(images/home.jpg)',
          }}
        >
          <span
            id='blackOverlay'
            className='w-full h-full absolute opacity-30 bg-black'
          ></span>
        </div>

        <SocialIcons />

        <div className='container relative mx-auto '>
          <div className='flex flex-wrap items-center'>
            <div className='w-full pt-16 mr-32 text-center'>
              <div className='text-center mb-14'>
                <h1 className='text-white font-semibold text-5xl'>
                  One Place for All Your Needs
                </h1>
              </div>
              <div className='py-16'>
                <ApplyNow />
              </div>
            </div>
          </div>
        </div>
        <div
          className='top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16'
          style={{ transform: 'translateZ(0)' }}
        ></div>
      </div>

      <section className='mt-16 bg-blueGray-200'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-wrap'>
            <div className='w-full md:w-4/12 px-4 text-center'>
              <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg'>
                <div className='px-4 py-5 flex-auto'>
                  <div className='text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400'>
                    <i className='fas fa-award'></i>
                  </div>
                  <h6 className='text-xl font-semibold'>Manage your Payment</h6>
                  <p className='mt-2 mb-4 text-blueGray-500'>text goes here!</p>
                </div>
              </div>
            </div>

            <div className='w-full md:w-4/12 px-4 text-center'>
              <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg'>
                <div className='px-4 py-5 flex-auto'>
                  <div className='p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-500'>
                    <i className='fas fa-retweet'></i>
                  </div>
                  <h6 className='text-xl font-semibold'>View you classes</h6>
                  <p className='mt-2 mb-4 text-blueGray-500'>text goes here!</p>
                </div>
              </div>
            </div>

            <div className='w-full md:w-4/12 px-4 text-center'>
              <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg'>
                <div className='px-4 py-5 flex-auto'>
                  <div className='p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400'>
                    <i className='fas fa-fingerprint'></i>
                  </div>
                  <h6 className='text-xl font-semibold'>
                    Check your current status
                  </h6>
                  <p className='mt-2 mb-4 text-blueGray-500'>text goes here!</p>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-wrap items-center mt-14'>
            <div className='w-full md:w-5/12 px-4 mr-auto ml-auto'>
              <div className='text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-red-500'>
                <i className='fas fa-user-friends text-xl'></i>
              </div>
              <h3 className='text-3xl mb-2 font-semibold leading-normal'>
                Work as a team!
              </h3>
              <p className='text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600'>
                Don't let your uses guess by attaching tooltips and popoves to
                any element. Just make sure you enable them first via
                JavaScript.
              </p>
              <p className='text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600'>
                The kit comes with three pre-built pages to help you get started
                faster. You can change the text and images and you're good to
                go. Just make sure you enable them first via JavaScript.
              </p>
            </div>

            <div className='w-full md:w-4/12 ml-auto mr-auto px-4'>
              <Image
                alt='...'
                src='/images/img1.png'
                width={500}
                height={200}
                className='max-w-full rounded-lg shadow-lg'
              />
            </div>
          </div>
        </div>
      </section>

      <section className='relative py-20'>
        <div className='container mx-auto px-4'>
          <div className='items-center flex flex-wrap'>
            <div className='w-full md:w-4/12 ml-auto mr-auto px-4'>
              <Image
                alt='...'
                width={500}
                height={200}
                className='max-w-full rounded-lg shadow-lg'
                src='/images/img2.png'
              />
            </div>
            <div className='w-full md:w-5/12 ml-auto mr-auto px-4'>
              <div className='md:pr-12'>
                <div className='text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-red-500'>
                  <i className='fas fa-rocket text-xl'></i>
                </div>
                <h3 className='text-3xl font-semibold'>A growing company</h3>
                <p className='mt-4 text-lg leading-relaxed text-blueGray-500'>
                  The extension comes with three pre-built pages to help you get
                  started faster. You can change the text and images and you're
                  good to go.
                </p>
                <ul className='list-none mt-6'>
                  <li className='py-2'>
                    <div className='flex items-center'>
                      <div>
                        <span className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3'>
                          <i className='fas fa-fingerprint'></i>
                        </span>
                      </div>
                      <div>
                        <h4 className='text-blueGray-500'>
                          Carefully crafted components
                        </h4>
                      </div>
                    </div>
                  </li>
                  <li className='py-2'>
                    <div className='flex items-center'>
                      <div>
                        <span className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3'>
                          <i className='fab fa-html5'></i>
                        </span>
                      </div>
                      <div>
                        <h4 className='text-blueGray-500'>
                          Amazing page examples
                        </h4>
                      </div>
                    </div>
                  </li>
                  <li className='py-2'>
                    <div className='flex items-center'>
                      <div>
                        <span className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3'>
                          <i className='far fa-paper-plane'></i>
                        </span>
                      </div>
                      <div>
                        <h4 className='text-blueGray-500'>
                          Dynamic components
                        </h4>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='pt-2'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-wrap justify-center text-center mb-14'>
            <div className='w-full lg:w-6/12 px-4'>
              <h2 className='text-4xl font-semibold'>Here are our Courses</h2>
              <p className='text-lg leading-relaxed m-4 text-blueGray-500'>
                We have the majors that you desire, click on your major for more
                info.
              </p>
            </div>
          </div>
          <div className='flex flex-wrap'>
            <div className='w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4'>
              <div className='px-6'>
                <img
                  alt='...'
                  src='/images/BBA.png'
                  className='shadow-lg rounded-full mx-auto max-w-120-px'
                />
                <div className='pt-6 text-center'>
                  <h5 className='text-xl font-bold'>BBA</h5>
                  <p className='mt-1 text-sm text-blueGray-400 uppercase font-semibold'>
                    More details goes here!
                  </p>
                </div>
              </div>
            </div>

            <div className='w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4'>
              <div className='px-6'>
                <img
                  alt='...'
                  src='/images/MBA.png'
                  className='shadow-lg rounded-full mx-auto max-w-120-px'
                />
                <div className='pt-6 text-center'>
                  <h5 className='text-xl font-bold'>MBA</h5>
                  <p className='mt-1 text-sm text-blueGray-400 uppercase font-semibold'>
                    More details goes here!
                  </p>
                </div>
              </div>
            </div>

            <div className='w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4'>
              <div className='px-6'>
                <img
                  alt='...'
                  src='/images/EMBA.png'
                  className='shadow-lg rounded-full mx-auto max-w-120-px'
                />
                <div className='pt-6 text-center'>
                  <h5 className='text-xl font-bold'>EMBA</h5>
                  <p className='mt-1 text-sm text-blueGray-400 uppercase font-semibold'>
                    More details goes here!
                  </p>
                </div>
              </div>
            </div>

            <div className='w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4'>
              <div className='px-6'>
                <img
                  alt='...'
                  src='/images/EMFM.png'
                  className='shadow-lg rounded-full mx-auto max-w-120-px'
                />
                <div className='pt-6 text-center'>
                  <h5 className='text-xl font-bold'>EMFM</h5>
                  <p className='mt-1 text-sm text-blueGray-400 uppercase font-semibold'>
                    More details goes here!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='relative block bg-blueGray-800'>
        <div className='container mx-auto px-4 lg:pt-24 lg:pb-64'>
          <div className='flex flex-wrap text-center justify-center'>
            <div className='w-full lg:w-6/12 px-4'>
              <h2 className='text-4xl font-semibold'>Build something</h2>
              <p className='text-lg leading-relaxed mt-4 mb-4 text-blueGray-400'>
                Put the potentially record low maximum sea ice extent tihs year
                down to low ice. According to the National Oceanic and
                Atmospheric Administration, Ted, Scambos.
              </p>
            </div>
          </div>
          <div className='flex flex-wrap mt-12 justify-center'>
            <div className='w-full lg:w-3/12 px-4 text-center'>
              <div className='text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-red-500 inline-flex items-center justify-center'>
                <i className='fas fa-medal text-xl'></i>
              </div>
              <h6 className='text-xl mt-5 font-semibold'>Excelent Services</h6>
              <p className='mt-2 mb-4 text-blueGray-400'>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>

            <div className='w-full lg:w-3/12 px-4 text-center'>
              <div className='text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-red-500 inline-flex items-center justify-center'>
                <i className='fas fa-poll text-xl'></i>
              </div>
              <h5 className='text-xl mt-5 font-semibold'>Grow your market</h5>
              <p className='mt-2 mb-4 text-blueGray-400'>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>

            <div className='w-full lg:w-3/12 px-4 text-center'>
              <div className='text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-red-500 inline-flex items-center justify-center'>
                <i className='fas fa-lightbulb text-xl'></i>
              </div>
              <h5 className='text-xl mt-5 font-semibold'>Launch time</h5>
              <p className='mt-2 mb-4 text-blueGray-400'>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>

            <div className='w-full lg:w-3/12 px-4 text-center'>
              <div className='text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-red-500 inline-flex items-center justify-center'>
                <i className='fas fa-lightbulb text-xl'></i>
              </div>
              <h5 className='text-xl mt-5 font-semibold'>Launch time</h5>
              <p className='mt-2 mb-4 text-blueGray-400'>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
}
Home.getLayout = function (page) {
  return <>{page}</>;
};
