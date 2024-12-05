import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
// import CustomSelectBox from "./customSelectBox";
import { useEffect, useState } from 'react';
import axios from 'axios';
// import CourseSchedule from '../../components/Dashboard/Schedule/CourseSchedule';
import { Calender } from '../../components/calenderComponent/Calender';
// import moment from 'moment';

export default function Schedule() {
  const { data: session } = useSession();
  const router = useRouter();
  const [promotion, setPromotion] = useState([]);
  const [schedule, setSchedule] = useState([]);
  // const [promotionSchedule, setPromotionSchedule] = useState('');
  const redirect = () => {
    router.push('/AccessDenied');
  };

  // const clientId = '42910b5b-82de-425f-81fd-fbfc51089a4a@f64c300e-4a43-49ab-8bc9-471ab9b9544e';
  // const clientSecret = '5LXGHVnrQYtOVdJV5yt9lpv20TgYYxQ3KVVgCYdkDGE=';
  // const tenantId = 'f64c300e-4a43-49ab-8bc9-471ab9b9544e';
  // const resource = 'https://esalb.sharepoint.com'; // SharePoint API endpoint
  
  // // Your client-side code
  // const getSharePointToken = async () => {
  //   try {
  //     const response = await fetch('/api/pmApi/getsharePointToken', {
  //       method: 'POST',
  //       headers: {
  //         'Accept':'application/json;odata=verbose',
  //         'Content-Type':'application/json;odata=verbose',
  //       },
  //       body: JSON.stringify({
  //         clientId: `${clientId}`,
  //         clientSecret: `${clientSecret}`,
  //         tenantId: `${tenantId}`,
  //         resource: `${resource}`,
  //       }),
  //     });
  
  //     const data = await response.json();
  
  //     if (!data.access_token) {
  //       throw new Error('Access token not obtained');
  //     }
  
  //     return data.access_token;
  //   } catch (error) {
  //     console.error('Error obtaining SharePoint access token:', error.message);
  //     throw error;
  //   }
  // };



  // const getRoomBooking = async () => {
  //   try {
  //     const accessToken = await getSharePointToken();
  
  //     const apiUrl = `https://esalb.sharepoint.com/sites/test2/_api/web/lists/getbytitle('BookingRoom')/items`;
  
  //     const response = await fetch(apiUrl, {
  //       method: 'GET',
  //       headers: {
  //         Accept: 'application/json;odata=verbose',
  //         'Content-Type': 'application/json;odata=verbose',
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });
  
  //     const data = await response.json();
  //     if (data.d.results.length > 0) {
  //       for (const booking of data.d.results) {
  //         // Format the date to 'YYYY-MM-DDT00:00:00Z'
  //         const formattedDate = moment(booking.Date).format('YYYY-MM-DDT00:00:00[Z]');
  
  //         // Make the API call
  //         const result = await axios.post('/api/pmApi/createBooking', {
  //           bookingId: booking.ID,
  //           room: booking.Title,
  //           space: booking.Space,
  //           bookingBy: booking.BookingBy,
  //           date: formattedDate,
  //           fromTime: booking.FromTime,
  //           toTime: booking.ToTime,
  //         });
  //         console.log(result);
  //       }
  //     }
  
  //     return { ok: true, result: data };
  
  //   } catch (error) {
  //     console.error('Error checking room availability in SharePoint:', error.message);
  //     // Assuming an error means the room is not available
  //     return { ok: false, result: false };
  //   }
  // };
  
  // useEffect(() => {
  //   getRoomBooking();
  // }, []);
  useEffect(() => {
    const getMajor = async () => {
      let table = 'major';
      let { data } = await axios.post('/api/pmApi/getAll', { table });

      const datesArray = [];
      data.rows.forEach((student) => {
        datesArray.push(student.major_name);
      });

      // setMajor(datesArray);
    };
    getMajor();

    getPromotion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getPromotion = async () => {
    let table = 'promotions';
    let Where = 'major_id';
    let id = session.user.majorid;
    let { data } = await axios.post('/api/pmApi/getAllCourses', {
      table,
      Where,
      id,
    });

    const datesArray = [];
    data.data.forEach((prom) => {
      datesArray.push(prom.promotion_name);
    });

    setPromotion(datesArray);
  };

  useEffect(() => {
    handlePromotion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [null]);
  const handlePromotion = async (event) => {
    try {
      const payload = {
        promotion_name: event,
        major_id: session.user.majorid,
      };
      const data = await axios.post('/api/pmApi/filterSchedule', payload);
      setSchedule(data.data.data);
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      <Head>
        <title>SIS Admin - Schedule</title>
      </Head>

      {session?.user.role === '2' || session?.user.role === '3' ? (
        <>
          <p className="text-gray-700 text-3xl pt-5 mb-10 font-bold">
            Schedule
          </p>

          <div className="grid lg:grid-cols-1 gap-5 mb-5"></div>
          <form>
            <div className="grid grid-cols-1 gap-4 min-[850px]:grid-cols-2 min-[1100px]:grid-cols-3 mb-3 pb-4 border-blue-300 border-b-2">
              <label className="w-[350px]">
                Promotion:
                {/* {
                  <CustomSelectBox
                    options={promotion}
                    placeholder="Select Promotion"
                    onSelect={handlePromotion}
                    styled={
                      "font-medium h-auto items-center border-[1px] border-zinc-300 self-center w-40 inline-block ml-[8px]"
                    }
                  />
                } */}
                <select
                  className="ml-9 w-40"
                  //  value={promotion}
                  onChange={(e) => handlePromotion(e.target.value)}
                >
                  <option value="">Promotion</option>
                  <>
                    <>
                      {promotion.length > 0 ? (
                        promotion.map((item, index) => (
                          // console.log(item)
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))
                      ) : (
                        <option value={''}>NO promotion</option>
                      )}
                    </>
                  </>
                </select>
              </label>

              {/* <label>
            Major:

            <CustomSelectBox 
            options={major}
            placeholder="Select Major"
            onSelect={handleMajor}
            styled={"font-medium h-auto items-center border-[1px] border-zinc-300 self-center w-40 inline-block ml-10"}
            />
          </label> */}
            </div>
            {/* <StudentsList users={users} setUsers={setUsers} /> */}
            <div className="grid lg:grid-cols-1 gap-5 mb-5">
              {/* <CourseSchedule /> */}
              <Calender schedule={schedule} setSchedule={setSchedule} />
            </div>
          </form>
        </>
      ) : (
        redirect()
      )}
    </>
  );
}
Schedule.auth = true;
Schedule.adminOnly = true;
