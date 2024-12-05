import { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
// import moment from 'moment';
import moment from 'moment-timezone';
import {
  SevenColGrid,
  Wrapper,
  HeadDays,
  DateControls,
  StyledEvent,
  HighLevelPageStyle,
  // SeeMore,
  // PortalWrapper,
  // ScheduleForm,
} from './Calender.styled';
import { useRouter } from 'next/router';
import { NotificatonMessage } from '../../components/Dashboard/WarningMessage';
import { DAYS, MOCKAPPS } from './conts';
import {
  datesAreOnSameDay,
  // getDarkColor,
  getDaysInMonth,
  getMonthYear,
  getSortedDays,
  nextMonth,
  prevMonth,
  // range,
  // sortDays
} from './utils';
import {
  ArrowLeftCircleIcon,
  ArrowLeftIcon,
  ArrowRightCircleIcon,
  ArrowRightIcon,
  PlusCircleIcon,
  // TrashIcon,
} from '@heroicons/react/24/solid';
import CustomSelectBox from '../../pages/programManager/customSelectBox';
import axios from 'axios';
import { WarningMessageSchedule } from '../Dashboard/WarningMessage';
const formatTime = (timeWithTimeZone) => {
  const [time] = timeWithTimeZone.split('+'); // Remove the timezone offset
  const [hours, minutes] = time.split(':');
  const formattedHours = parseInt(hours) % 12 === 0 ? 12 : parseInt(hours) % 12;

  const period = parseInt(hours) < 12 ? 'AM' : 'PM';
  return `${formattedHours}:${minutes} ${period}`;
};
function modifyDate(dateString) {
  // Create a new Date object from the provided dateString
  let modifiedDate = new Date(dateString);

  // Add one day to the date
  modifiedDate.setDate(modifiedDate.getDate() + 1);
  const formattedDate = modifiedDate.toISOString().split('T')[0] + "T00:00:00.000Z";
  return formattedDate;
}




export const CalenderById = ({ schedule, setSchedule }) => {
  const [select, setSelect] = useState(false);
  const [occupiedRooms, setOccupiedRooms] = useState([]);
  const [remainingRooms, setRemainingRooms] = useState([]);
  const { data: session } = useSession();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState(MOCKAPPS);
  const dragDateRef = useRef();
  const dragindexRef = useRef();
  // const [showPortal, setShowPortal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showFormEdit, setShowFormEdit] = useState(false);
  const [portalData, setPortalData] = useState({});
  const [classes, setClasses] = useState('');
  const [allClasses, setAllClasses] = useState([]);
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');
  const [place, setPlace] = useState('');
  const [hasFetched, setHasFetched] = useState(false)
  // const [isSave, setIsSave] = useState(false);
  const [theDate, setTheDate] = useState('');
  const [scheduleDate, setScheduleDate] = useState([]);
  // const [allRoomBuilding, setAllRoomBuilding] = useState([]);
  const [allroomName, setAllRoomName] = useState([]);
  const [roomBuilding, setRoomBuilding] = useState('');
  const [roomName, setRoomName] = useState('');
  const [tmpscheduleID, setTmpscheduleID] = useState(null);
  const [confirmOpenMessage, setConfirmOpenMessage] = useState(false);
  const [click, setIsClick] = useState(false);
  const [clickEdit, setIsClickEdit] = useState(false);
  const [student, setStudent] = useState([]);
  const [messages, setMessage] = useState('');
  const [sharepointId, setSharePointId] = useState('')
  const [fromSharePoint, setFromTimeEditSharePoint] = useState('')
  const [toSharePoint, setToTimeEditSharePoint] = useState('')
  const [attendanceId, setAttendanceId] = useState()
  const [editOnline, setEditOnline] = useState()
  const [confirmOpenMessageNotification, setConfirmOpenMessageNotification] =
    useState(false);
  const [isEdit, setIsEdit] = useState(false)
  const [isOnline, setIsOnline] = useState('')
  const [confirmOccupied, setConfirmOccupied] = useState(false);
  const [zoomUserId, setZoomUserId] = useState()
  const [zoom_id, setZoomID] = useState()
  const [googleToken, setGoogleToken] = useState([])

  const [courseName, setCourseName] = useState('')

  const [allCourses, setAllCourses] = useState([]);
  const [studentGoogle, setStudentGoogleAccess] = useState([]);

  const [urlZoom , setZoomUrl] = useState('')
  
  const [errorType, setErrorType] = useState('');
  // eslint-disable-next-line no-unused-vars

  const [errorBuilding, setErrorBuilding] = useState('');
  const [errorLocation, setErrorLocation] = useState('');
  const [errorStart, setErrorStart] = useState('');
  const [errorClass, setErrorClass] = useState('');
  const [errorEnd, setErrorEnd] = useState('');


  const getAllRooms = async () => {
    try {
      let table = 'rooms';
      let { data } = await axios.post('/api/pmApi/getAll', { table });
      setAllRoomName(data.rows);
    } catch (error) {
      // console.log(error);
    }
  };

  const createBooking = async (data) => {
    const batchSize = 30; // Set the batch size according to your needs
    const totalBatches = Math.ceil(data.length / batchSize);
  
    try {
      for (let i = 0; i < totalBatches; i++) {
        const startIdx = i * batchSize;
        const endIdx = startIdx + batchSize;
        const batchData = data.slice(startIdx, endIdx).map(item => ({
          BookedBy: item.BookedBy,
          BookingDate: item.BookingDate,
          BookingDay: item.BookingDay,
          FromTime: item.FromTime,
          ToTime: item.ToTime,
          Space: item.Space,
          Title: item.Title,
          Id: item.Id
        }));
  
        await fetch('/api/pmApi/createBooking', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(batchData)
        });
      }
    } catch (error) {
      console.error('Error creating bookings:', error);
      return { ok: false, error: error.message };
    }
  };
  
  



  const getRoomBooking = async () => {
    try {
      const accessToken = await getSharePointToken();

      const apiUrl = `https://esalb.sharepoint.com/sites/RoomBooking/_api/web/lists/getbytitle('BookingRoom')/items`;

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          Accept: 'application/json;odata=verbose',
          'Content-Type': 'application/json;odata=verbose',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      await createBooking(data.d.results)


    } catch (error) {
      console.error('Error checking room availability in SharePoint:', error.message);
      // Assuming an error means the room is not available
      return { ok: false, result: false };
    }
  };



  const getZoomToken = async () => {
    try {
      const response = await fetch('/api/zoom_api/getZoomAccessToken', {
        method: 'GET',
        headers: {
          'Accept': 'application/json;odata=verbose',
          'Content-Type': 'application/json;odata=verbose',
        },
      });

      const data = await response.json();

      if (!data.access_token) {
        throw new Error('Access token not obtained');
      }

      return data.access_token;
    } catch (error) {
      console.error('Error obtaining SharePoint access token:', error.message);
      throw error;
    }
  };

  const getZoomUser = async () => {
    try {
      const access_token = await getZoomToken()
      const payload = {
        email: session.user?.email,
        accessToken: access_token
      }
      const response = await axios.post(`/api/zoom_api/getZoomUser`, payload)
      setZoomUserId(response.data.data.id)

    } catch (error) {
      return error
    }
  }

  const handleCreateZoomMeeting = async (class_id, day, fromTime, to_time) => {
    try {

      const formattedDate = moment(day).format('YYYY-MM-DD');
      const access_token = await getZoomToken();

      // Combine the date and time and format it as a full ISO string
      const localDateTime = `${formattedDate}T${fromTime}`;

      // Convert the local time to UTC
      const utcDateTime = moment.tz(localDateTime, 'Asia/Beirut').utc().format('YYYY-MM-DDTHH:mm:ss[Z]');

      // // Calculate duration in minutes
      // const fromDateTime = moment.tz(localDateTime, 'Asia/Beirut');
      // const toDateTime = moment.tz(`${formattedDate}T${to_time}`, 'Asia/Beirut');
      // Parse time strings into Date objects
      const startDate = new Date(`2000-01-01T${fromTime}:00`);
      const endDate = new Date(`2000-01-01T${to_time}:00`);

      // Calculate difference in milliseconds
      const differenceMs = endDate - startDate;

      // Convert milliseconds to minutes
      const minutesDifference = Math.floor(differenceMs / (1000 * 60));
      // const durationInMinutes = toDateTime.diff(fromDateTime, 'minutes');

      const payload = {
        classId: `${class_id}`,
        date: utcDateTime,  // Use utcDateTime instead of formattedDateTime
        accessToken: access_token,
        userId: zoomUserId,
        createAt: utcDateTime,  // You might want to choose either date or createAt
        minDuration: minutesDifference, // Add duration to the payload
      };

      const response = await axios.post('/api/zoom_api/createZoom', payload);

      return { zoom_id: response.data.data.id, zoom_url: response.data.data.join_url };
    } catch (error) {
      return error;
    }
  };




  const handleCreateZoomMeetingEdit = async (courseName, day, fromTime, toTime) => {
    try {
      const formattedDate = moment(day).format('YYYY-MM-DD');
      const access_token = await getZoomToken();

      // Combine the date and time
      const localDateTime = `${formattedDate} ${fromTime}`;
      const localToDateTime = `${formattedDate} ${toTime}`;

      // Parse the local time
      const parsedDateTime = moment.tz(localDateTime, 'YYYY-MM-DD hh:mm A', 'Asia/Beirut');
      const parsedToDateTime = moment.tz(localToDateTime, 'YYYY-MM-DD hh:mm A', 'Asia/Beirut');

      // Convert the local time to UTC
      const utcDateTime = parsedDateTime.utc().format('YYYY-MM-DDTHH:mm:ss[Z]');

      // Calculate duration in minutes
      const durationInMinutes = parsedToDateTime.diff(parsedDateTime, 'minutes');

      const payload = {
        classId: `${courseName}`,
        date: utcDateTime,
        accessToken: access_token,
        userId: zoomUserId,
        createAt: utcDateTime,
        duration: durationInMinutes, // Add duration to the payload
      };
      const response = await axios.post('/api/zoom_api/createZoom', payload);

      return { zoom_id: response.data.data.id, zoom_url: response.data.data.join_url };
    } catch (error) {
      return error;
    }
  };


  const handleUpdateZoomOnlineSchedule = async (zoomId, zoomUrl, attendanceID) => {
    try {
      await axios.post(`/api/pmApi/updateScheduleMeet`, {
        zoom_id: zoomId.toString(), // Convert to string explicitly
        zoom_url: zoomUrl,
        attendance_id: attendanceID
      });
    } catch (error) {
      return error;
    }
  };

  const handleDeleteZoom = async (zoom_id) => {
    try {
      const access_token = await getZoomToken()
      const payload = {
        zoomId: zoom_id,
        accessToken: access_token
      }
      await axios.post('/api/zoom_api/DeleteZoom', payload)
    } catch (error) {
      return error
    }
  }

  const handleUpdateZoom = async (zoom_id, scheduleDate, title, fromTime, toTime) => {
    try {


      const formattedDate = moment(scheduleDate).format('YYYY-MM-DD');

      // Combine the date and time and format it as a full ISO string
      const localDateTime = `${formattedDate}T${fromTime}`;

      // Convert the local time to UTC
      const utcDateTime = moment.tz(localDateTime, 'Asia/Beirut').utc().format('YYYY-MM-DDTHH:mm:ss[Z]');
      const startDate = new Date(`2000-01-01T${fromTime}:00`);
      const endDate = new Date(`2000-01-01T${toTime}:00`);

      // Calculate difference in milliseconds
      const differenceMs = endDate - startDate;

      // Convert milliseconds to minutes
      const minutesDifference = Math.floor(differenceMs / (1000 * 60));
      const access_token = await getZoomToken()
      const payload = {
        zoomId: zoom_id,
        accessToken: access_token,
        date: utcDateTime,
        classId: title,
        createAt: utcDateTime,
        minDuration: minutesDifference

      }

      await axios.post('/api/zoom_api/updateZoom', payload)
    } catch (error) {
      return error
    }
  }

  useEffect(() => {
    getZoomUser()
  }, [])



  // useEffect(() => {
  //   getRoomBooking();
  // }, []);
  const [allrooms, setAllrooms] = useState([]);



  useEffect(() => {
    // console.log('allroom', allrooms);
  }, [allrooms]);




  let allStages = [];
  const [building, setBuilding] = useState('');
  const handleStages = (selectedValue) => {

    setBuilding(selectedValue);
    setAllrooms([]);

    allroomName.forEach((room) => {
      if (room.room_building === selectedValue) {
        setAllrooms((prevAllRooms) => [...prevAllRooms, room.room_name]);
      }
    });

    return allrooms
  };



  const allroomsRef = useRef([]);
  const handleStages1 = (selectedValue) => {
    allroomName.forEach((room) => {
      if (room.room_building === selectedValue) {
        allroomsRef.current.push(room.room_name);
      }
    });
  };

  isEdit && handleStages1(roomBuilding);

  allroomName.forEach((room) => {
    if (!allStages.includes(room.room_building)) {
      allStages.push(room.room_building);
    }
  });

  const router = useRouter();
  const { majorId } = router.query

  const getSchedule = async () => {
    const datesArray = [];
    schedule.forEach((sched) => {
      console.log('sched' , sched)
      datesArray.push({
        tmpschedule_id: sched.tmpschedule_id,
        class_id: sched.class_id,
        date: new Date(sched.day),
        course: sched.course_name,
        courseID: sched.course_id,
        title: sched.course_name,
        type: sched.course_type,
        teacherId:sched.teacher_id,
        teacher: `${sched.teacher_firstname} ${sched.teacher_lastname}`,
        from: sched.from_time,
        to: sched.to_time,
        room_building: sched.room_building,
        room_name: sched.room_name,
        attendanceId: sched.attendance_id,
        sharepointId: sched.sharepoint_id,
        is_online: sched.is_online,
        attendance_id: sched.attendance_id,
        zoom_meeting_id: sched.zoom_meeting_id,
        zoom_url: sched.zoom_url,
        promotions:sched.promotion,
    
        color: '#00CED1',
      });
    });

    setScheduleDate(datesArray);
  };
 
  const getData = async () => {
    try {
      let pmID = majorId;
      let { data } = await axios.post('/api/pmApi/getScheduleByPMId', { pmID });
      setSchedule(data.data);
    } catch (error) {
      return error;
    }
  };

  const getCourse = async () => {
    let { data } = await axios.post('/api/pmApi/getAll', {
      table: "courses"
    });
    // console.log("all classes:  ==> ", data.rows);

    // setAllClasses(data.rows.map(clas => clas.course_id))
    setAllCourses(data.rows);
  };

  const getClass = async () => {
    let table = 'tmpclass';
    let colName = 'major_id';
    let val = majorId;
    let { data } = await axios.post('/api/pmApi/getAllCondition', {
      table,
      colName,
      val,
    });

    console.log("all classes:  ==> ", data.rows);

    // setAllClasses(data.rows.map(clas => clas.course_id))
    setAllClasses(data.rows);
  };
  useEffect(() => {
    const fetchData = async () => {
      await getAllRooms();
      await getCourse()
    }
    fetchData()

  }, [])
  useEffect(() => {
    getSchedule();
    getClass();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schedule]);
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchBook = async () => {
    try {
      // Check if all required fields are filled
      if (building !== '' && fromTime !== '' && toTime !== '') {
        const occupiedRoomsArray = [];
        const dates = new Date(theDate);
        const formattedDate = moment(dates).format('YYYY-MM-DDT00:00:00[Z]');
        const fromTimeSplit = fromTime;
        const toTimeSplit = toTime;
        const datess = formattedDate.split('T')[0];
        const offset = 2;
        const fromTimes = moment(`${datess}T${fromTimeSplit}:00.000`).utcOffset(offset, true).toISOString();
        const toTimes = moment(`${datess}T${toTimeSplit}:00.000`).utcOffset(offset, true).toISOString();

        if (fromTimes && toTimes && building && isOnline === 'false') {
          const formattedFromTime = fromTimes.replace(/\.\d{3}Z/, 'Z');
          const formattedToTime = toTimes.replace(/\.\d{3}Z/, 'Z');

          const payload = {
            space: building,
            date: formattedDate,
            FromTime: formattedFromTime,
            ToTime: formattedToTime,
          };

          const response = await axios.post('/api/pmApi/getBooking', payload);

          const data = response.data.data;
          if (response.data.success === true) {
            data.forEach(item => {
              occupiedRoomsArray.push(item.rooms);
            });

            setOccupiedRooms(occupiedRoomsArray);

            const remainingRoomsArray = allrooms.filter(room => !occupiedRooms.includes(room));
            setRemainingRooms(remainingRoomsArray);
          } else {
            setRemainingRooms(allrooms);
          }
        } else {
          console.error('fromTimes or toTimes is null or undefined');
        }
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    const parseTimeString = (timeString) => {
      const [fromTimeString, toTimeString] = timeString.split(' to ');
      const fromTimes = convertToDesiredFormat(fromTimeString);
      const toTimes = convertToDesiredFormat(toTimeString);
      return [fromTimes, toTimes];
    };

    const convertToDesiredFormat = (timeString) => {
      const date = new Date(`2000-01-01 ${timeString}`);
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const formattedTime = `${hours}:${minutes}:00+02`;
      return formattedTime;
    };

    const dynamicFromTime = fromTime;
    const dynamicToTime = toTime;
    const dynamicTimeString = `${dynamicFromTime} to ${dynamicToTime}`;
    const [fromTimes, toTimes] = parseTimeString(dynamicTimeString);

    searchBookEdit(theDate, building, fromTimes, toTimes);
  }, [building, fromTime, toTime]);

  useEffect(() => {
    if (!hasFetched) {
      searchBook();
    }
  }, [building, fromTime, toTime, hasFetched]);


  useEffect(() => {

    // This will be triggered when occupiedRooms or allrooms changes
    const remainingRoomsArray = allrooms.filter((room) => !occupiedRooms.includes(room));
    setRemainingRooms(remainingRoomsArray);

  }, [occupiedRooms, allrooms, building]);

  const searchBookEdit = async (date, building, from_Time, to_Time) => {
    try {


      const occupiedRoomsArray = [];
      const dates = new Date(date);
      const formattedDate = moment(dates).format('YYYY-MM-DDT00:00:00[Z]');
      const fromTimeSplit = from_Time.split('+')[0];
      const toTimeSplit = to_Time.split('+')[0];
      const datess = formattedDate.split('T')[0];
      // Beirut/Lebanon is in UTC+2 during standard time and UTC+3 during daylight saving time
      const utcOffset = 4;
      // Convert the local time to UTC and adjust to Beirut/Lebanon time zone
      const fromTimes = moment(`${datess}T${fromTimeSplit}Z`).utcOffset(utcOffset, true).toISOString();
      const toTimes = moment(`${datess}T${toTimeSplit}Z`).utcOffset(utcOffset, true).toISOString();
      if (fromTimes && toTimes) {
        const formattedFromTime = fromTimes.replace(/\.\d{3}Z/, 'Z');
        const formattedToTime = toTimes.replace(/\.\d{3}Z/, 'Z');

        const payload = {
          space: building,
          date: formattedDate,
          FromTime: formattedFromTime,
          ToTime: formattedToTime,
        };

        const response = await axios.post('/api/pmApi/getBooking', payload);

        const data = response.data.data;

        if (response.data.success === true) {
          // Collect occupied rooms
          data.forEach(item => {
            occupiedRoomsArray.push(item.rooms);
          });


          // Set state to store occupied rooms
          setOccupiedRooms(occupiedRoomsArray);
          // Set state to store remaining rooms
          const remainingRoomsArray = allrooms.filter(room =>

            !occupiedRooms.includes(room)

          );


          setRemainingRooms(remainingRoomsArray);

        } else {
          // If data.data.success is not true, set all rooms as remaining

          setRemainingRooms(allrooms);
        }
      } else {
        console.error('fromTimes or toTimes is null or undefined');
      }


    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const areDatesEqual = (date1, date2) => {
    return date1.getTime() === date2.getTime();
  };

  const handleAddPrevious = (data) => {
    // console.log("date.getFullYear() === > >", data.date.getFullYear());
    // console.log("date.getMonth() === > >", data.date.getMonth());
    // console.log("date.getDate() === >", data.date.getDate());

    let ifPreviousExists = events.some((ev) =>
      areDatesEqual(
        ev.date,
        new Date(
          data.date.getFullYear(),
          data.date.getMonth(),
          data.date.getDate() - 1
        )
      )
    );
    // // console.log('if exists previously ===>>',)

    !ifPreviousExists &&
      setEvents((prev) => [
        ...prev,
        {
          date: new Date(
            data.date.getFullYear(),
            data.date.getMonth(),
            data.date.getDate() - 1
          ),
          title: data.title,
          color: '#8ABAD3',
          type: data.type,
          teacher: 'peter germanos',
          from: data.from,
          to: data.to,
          place: data.place,
          course: 'MAth21',
        },
      ]);
  };
  const handleOpenNotificatonMessages = () => {
    setConfirmOpenMessageNotification(true);
  };
  const handleCloseNotificatonMessages = () => {
    setConfirmOpenMessageNotification(false);
    setIsOnline('')
  };
  const handleOpenMessages = () => {
    setConfirmOccupied(true);
  };
  const handleCloseMessages = () => {
    setIsClick(false);
    setConfirmOccupied(false);
  };

  const handleAddNext = (data) => {
    // console.log("date.getFullYear() === > >", data.date.getFullYear());
    // console.log("date.getMonth() === > >", data.date.getMonth());
    // console.log("date.getDate() === >", data.date.getDate());

    let ifNextExists = events.some((ev) =>
      areDatesEqual(
        ev.date,
        new Date(
          data.date.getFullYear(),
          data.date.getMonth(),
          data.date.getDate() + 1
        )
      )
    );
    // // console.log('if exists previously ===>>',)dr

    !ifNextExists &&
      setEvents((prev) => [
        ...prev,
        {
          date: new Date(
            data.date.getFullYear(),
            data.date.getMonth(),
            data.date.getDate() + 1
          ),
          title: data.title,
          color: '#8ABAD3',
          type: data.type,
          teacher: 'peter germanos',
          from: data.from,
          to: data.to,
          place: data.place,
          course: 'MAth21',
        },
      ]);
  };

  const drag = (index, e) => {
    dragindexRef.current = { index, target: e.target };
  };

  const onDragEnter = (date, e) => {
    e.preventDefault();
    dragDateRef.current = { date, target: e.target.id };
  };

  const drop = async (ev, e) => {
    e.preventDefault();

    if (
      !(
        (new Date(ev.date).getFullYear(),
          new Date(ev.date).getMonth(),
          new Date(ev.date).getDate()) ==
        (new Date(dragDateRef.current.date).getFullYear(),
          new Date(dragDateRef.current.date).getMonth(),
          new Date(dragDateRef.current.date).getDate())
      )
    ) {
      handlePlace(ev.room_name);
      if (place != '') {

        const attendanceData = await handleCreateAttendanceDragDrop(
          ev,
          dragDateRef.current.date,
          place
        );

        if (attendanceData.data.code != 200) {

          let { data } = await axios.post('/api/pmApi/createSingleSchedule', {
            classID: ev.class_id,
            day: modifyDate(dragDateRef.current.date),
            fromTime: ev.from,
            toTime: ev.to,
            room_id: place,
            pm_id: session.user.userid,
            attendanceId: attendanceData.data.data,
            is_online: ev.is_online
          });

          if (ev.is_online === true) {
            if (data.success) {
              const response = await handleCreateZoomMeeting(ev.title, new Date(dragDateRef.current.date), ev.from, ev.to)
              await handleUpdateZoomOnlineSchedule(response.zoom_id, response.zoom_url, attendanceData.data.data , response.zoom_url)
              await handleInsertGoogleEvent(new Date(dragDateRef.current.date), ev.from, ev.to , attendanceData.data.data)

              setStudent([]);
              getData();
            }
          } else {
            if (data.success) {

              await handleDragRoomBooking(new Date(dragDateRef.current.date), ev.from, ev.to, attendanceData.data.data, ev.course , ev.room_name , ev.room_building)
              await handleInsertGoogleEventOnSite(new Date(dragDateRef.current.date), ev.from, ev.to , attendanceData.data.data)

              setStudent([]);
              getData();
            }

          }


        } else {
          setConfirmOpenMessageNotification(true);
          setMessage(attendanceData.data.message);
        }
      } else {
        setConfirmOpenMessageNotification(true);
        setMessage('missing data , please try again!');
      }
    }
  };



  const handlePlace = (selectedValue) => {
    // handlePlace
    // Do something with the selected value
    // console.log("Selected Value:", selectedValue);
    // setPlace(selectedValue)

    setRoomName(selectedValue)

    setPlace(
      selectedValue.length > 0 &&
      allroomName.filter((room) => room.room_name === selectedValue)[0]
        .room_id
    );
  };

  const handleFrom = (e) => {
    setFromTimeEditSharePoint(e.target.value)
    setFromTime(e.target.value);
    // Do something with the selected value
    // console.log("Selected Value:", selectedValue);
    // setFromTime(selectedValue);
  };

  const handleTo = (e) => {
    // Do something with the selected value
    // console.log("Selected Value:", selectedValue);
    setToTimeEditSharePoint(e.target.value)
    setToTime(e.target.value);
  };

  const handleClass = (selectedValue) => {
    const foundCourse = allCourses.find((clas) => clas.course_id === selectedValue);

    if (foundCourse) {
      const courseName = foundCourse.course_name;
      setCourseName(courseName);
    } else {
      console.log("Course not found in allCourses");
    }

    setSelect(true);
    selectedValue.length > 0 &&
      setClasses(
        allClasses.filter((clas) => clas.course_id === selectedValue)[0].tmpclass_id
      );
  };

  const addEvent = (date, event) => {
    event.preventDefault();
    setShowForm(true);
    if (!event.target.classList.contains('StyledEvent')) {
      getRoomBooking()
      date.setHours(0);
      date.setSeconds(0);
      date.setMilliseconds(0);
      // console.log("date.setHours(0) === > >", date.setHours(0));
      // console.log("date.setSeconds(0) === > >", date.setSeconds(0));
      // console.log("date.setMilliseconds(0) === > >", date.setMilliseconds(0));
      // console.log("date===>", date);
      setTheDate(date);
    }
  };
  const deleteTable = async () => {
    try {
      await axios.post('/api/pmApi/deleteBooking')
    } catch (error) {
      return error
    }
  }
  const handleClose = () => {
    deleteTable()
    setRemainingRooms([])
    setIsOnline('')
    setZoomID()
    setSelect(false)
    setShowForm(false);
    setHasFetched(false)
  };

  useEffect(() => {
    getStudentSchedule();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [student, select]);

  const getStudentSchedule = async () => {
    if (select && !hasFetched) {
      try {
        const payload1 = {
          table: 'tmpclass',
          Where: 'tmpclass_id',
          id: classes,
        };

        const data1 = await axios.post('/api/pmApi/getAllCourses', payload1);

        const course_id = data1.data.data[0].course_id;
        const payload2 = {
          table: 'courses',
          Where: 'course_id',
          id: course_id,
        };

        const data2 = await axios.post('/api/pmApi/getAllCourses', payload2);

        if (data2.data.data[0].course_type !== 'Elective') {
          let major_id = majorId;
          let promotion = data1.data.data[0].promotion.replace(/\s/g, '');
          const { data } = await axios.post('/api/pmApi/getAllStudent', {
            major_id,
            promotion,
          });
          await handleAccessToken(data.data);
          setStudent(data.data);
          setHasFetched(true);
        } else {
          const payload = {
            major_id: majorId,
            promotion: data1.data.data[0].promotion.replace(/\s/g, ''),
            course_id: course_id,
          };
          try {
            const data = await axios.post('/api/pmApi/getStudentAssign', payload);
            await handleAccessToken(data.data.data);
            setHasFetched(true);
            setStudent(data.data.data);
          } catch (error) {
            let major_id = majorId;
            let promotion = data1.data.data[0].promotion.replace(/\s/g, '');
            const { data } = await axios.post('/api/pmApi/getAllStudent', {
              major_id,
              promotion,
            });
            await handleAccessToken(data.data);
            setStudent(data.data);
            setHasFetched(true);
          }
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setHasFetched(false); // Reset hasFetched when classes change
    }
  };


  const handleCreateAttendance = () => {
    return new Promise((resolve, reject) => {
      try {
        const payload1 = {
          table: 'tmpclass',
          Where: 'tmpclass_id',
          id: classes,
        };

        axios
          .post('/api/pmApi/getAllCourses', payload1)
          .then((response1) => {
            const teacher_id = response1.data.data[0].teacher_id;
            const course_id = response1.data.data[0].course_id;
            const payload = {
              teacher_id,
              course_id,
              attendance_date: modifyDate(theDate),
              major_id: majorId,
              fromTime: fromTime,
              toTime: toTime,
              room_id: place,
            };

            axios
              .post('/api/pmApi/createAttendanceReport', payload)
              .then(async (response2) => {
                const attendance_id = response2.data.data;

                if (attendance_id) {
                  await axios.post('/api/pmApi/createAttendanceStudent', {
                    attendance_id,
                    student_id: student,
                  });

                }

                resolve(response2);
              })
              .catch((error) => {
                if (error.response && error.response.data.success === false) {
                  setConfirmOccupied(true);
                  setMessage(error.response.data.message);
                }

                reject(error);
              });
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  };
  const getStudentsDragDrop = (ev) => {
    return new Promise((resolve, reject) => {
      if (ev.class_id != ' ') {
        try {
          const payload1 = {
            table: 'tmpclass',
            Where: 'tmpclass_id',
            id: ev.class_id,
          };

          axios
            .post('/api/pmApi/getAllCourses', payload1)
            .then(async (data1) => {
              const course_id = data1.data.data[0].course_id;
              const payload2 = {
                table: 'courses',
                Where: 'course_id',
                id: course_id,
              };

              try {
                const data2 = await axios.post(
                  '/api/pmApi/getAllCourses',
                  payload2
                );

                if (data2.data.data[0].course_type !== 'Elective') {
                  let major_id = majorId;
                  let promotion = data1.data.data[0].promotion.replace(
                    /\s/g,
                    ''
                  );
                  const { data } = await axios.post(
                    '/api/pmApi/getAllStudent',
                    {
                      major_id,
                      promotion,
                    }
                  );
                  await handleAccessToken(data.data)
                  resolve(data.data);
                } else {
                  const payload = {
                    major_id: majorId,
                    promotion: data1.data.data[0].promotion.replace(/\s/g, ''),
                    course_id: course_id,
                  };

                  try {
                    const data = await axios.post(
                      '/api/pmApi/getStudentAssign',
                      payload
                    );
                    await handleAccessToken(data.data.data)
                    resolve(data.data.data);
                  } catch (error) {
                    let major_id = majorId;
                    let promotion = data1.data.data[0].promotion.replace(
                      /\s/g,
                      ''
                    );
                    const { data } = await axios.post(
                      '/api/pmApi/getAllStudent',
                      {
                        major_id,
                        promotion,
                      }
                    );
                    await handleAccessToken(data.data)
                    resolve(data.data);
                  }
                }
              } catch (error) {
                reject(error);
              }
            })
            .catch((error) => {
              reject(error);
            });
        } catch (error) {
          reject(error);
        }
      }
    });
  };
  console.log('googleToken' , student)
  const handleCreateAttendanceDragDrop = (ev, date, place) => {
    return new Promise((resolve, reject) => {
      try {
        const payload1 = {
          table: 'tmpclass',
          Where: 'tmpclass_id',
          id: ev.class_id,
        };

        axios
          .post('/api/pmApi/getAllCourses', payload1)
          .then(async (data1) => {

            const payload = {
              teacher_id: data1.data.data[0].teacher_id,
              course_id: data1.data.data[0].course_id,
              attendance_date: modifyDate(date),
              major_id: majorId,
              fromTime: ev.from,
              toTime: ev.to,
              room: place,
            };
            const data = await axios.post(
              '/api/pmApi/createAttendanceReport',
              payload
            );

            const response = await getStudentsDragDrop(ev);
            const attendance_id = data.data.data;
            if (attendance_id) {
       
                await axios.post('/api/pmApi/createAttendanceStudent', {
                  attendance_id,
                  student_id:response,
                });
            }
            resolve(data);
          })
          .catch((error) => {
            if (error.response && error.response.data.success === false) {
              setConfirmOccupied(true);
              setMessage(error.response.data.message);
            }

            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      

      if (isOnline === 'true') {
        if(zoomUserId === undefined){
          setErrorType(`Email ${session.user?.email} Zoom account Not Activated`);
          setIsClick(false)
          return;
        }
      }

      if (fromTime === '') {
        setErrorStart('Please Fill The Start Date');
        setIsClick(false)
        return;
      }
      if (toTime === '') {
        setErrorEnd('Please Fill The End Date');
        setIsClick(false)
        return;
      }
      if (isOnline !=='false' && isOnline !=='true') {
        setErrorType('Please Fill The Type');
        setIsClick(false)
        return;
      }
      if(isOnline === 'false'){
        if (building === '') {
          setErrorBuilding('Please Fill The Building');
          setIsClick(false)
          return;
        }
        if (place === '') {
          setErrorLocation('Please Fill The Location');
          setIsClick(false)
          return;
        }
      }

      // dateFrom
      if (fromTime > toTime) {
        setErrorStart('The start time is greater than end date');
        setIsClick(false)
        return;
        // alert('The start date is greater than end date');
      } else if (fromTime === toTime) {
        // alert('The date from and to are equal');
       
        setErrorStart('The time from and to are equal');
        setIsClick(false)
        return;
      }
      if ( toTime < fromTime) {
        // alert('The end date is less than start date');
        
        setErrorEnd('The end time is less than start date');
        setIsClick(false)
        return;
      } else if ( toTime === fromTime) {
        // alert('The date from and to are equal');
        setErrorEnd('The time from and to are equal');
        setIsClick(false)
        return;
      }
      setIsClick(true);
      // Create attendance data
      const attendanceData = await handleCreateAttendance();
      if(attendanceData.data.code === 200){
        setConfirmOccupied(true);
        setMessage(attendanceData.data.message);
      }


      // Proceed based on the type of class
      if (isOnline === 'true') {
        // Payload for online class
        const payload = {

          classID: classes,
          day: modifyDate(theDate),
          fromTime: fromTime,
          toTime: toTime,
          room_id: '75',
          pm_id: session.user.userid,
          attendanceId: attendanceData.data.data,
          is_online: isOnline
        };

        // The rest of your code remains unchanged
        let { data } = await axios.post('/api/pmApi/createSingleSchedule', payload);
        const response = await handleCreateZoomMeeting(courseName, theDate, fromTime, toTime)
        await handleInsertGoogleEvent(theDate, fromTime, toTime, attendanceData.data.data, response.zoom_url)


        await handleUpdateZoomOnlineSchedule(response.zoom_id, response.zoom_url, attendanceData.data.data)

        // console.log("axios data ==>  ", place);
        if (data.success) {
          deleteTable()
          setShowForm(false);
          setIsClick(false);
          setStudent([]);
          setRemainingRooms([])
          getData();
          setIsOnline('')
          setErrorBuilding('')
          setErrorClass('')
          setErrorEnd('')
          setErrorLocation('')
          setErrorStart('')
          setErrorType('')
          setZoomID('')

        } setPortalData

      } else {
        // Payload for in-person class
        const payload = {
          classID: classes,
          day: modifyDate(theDate),
          fromTime: fromTime,
          toTime: toTime,
          room_id: place,
          pm_id: session.user.userid,
          attendanceId: attendanceData.data.data,
          is_online: isOnline
        };



        // The rest of your code remains unchanged
        let { data } = await axios.post('/api/pmApi/createSingleSchedule', payload);

        // console.log("axios data ==>  ", place);
        if (data.success) {
          await handleSharePointBookingRoom(theDate, attendanceData.data.data , courseName)
          await handleInsertGoogleEventOnSite(theDate, fromTime, toTime, roomName, building, attendanceData.data.data)
          deleteTable()
          setShowForm(false);
          setIsClick(false);
          setStudent([]);
          setRemainingRooms([])
          setErrorBuilding('')
          setErrorClass('')
          setErrorEnd('')
          setErrorLocation('')
          setErrorStart('')
          setErrorType('')
          getData();
          setIsOnline('')
        } setPortalData
      }




      // }

    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const studentGoogleAccess = async(event)=>{
    try {
      const payload = {
        table:'google_calendar',
        Where:'attendence_id',
        id:event.attendance_id
      }
      const response = await axios.post('/api/pmApi/getAllCourses', payload)
      setStudentGoogleAccess(response)
      const payload2 = {
        table:'users',
        Where:'userid',
        id:response.data.data[0].user_id
      }
     
      if(response.data.success === true){
       
        const response2 = await axios.post('/api/pmApi/getAllCourses', payload2)
        await handleAccessToken(response2.data.data)
      }


    
     
    } catch (error) {
      return error
    }
  }
  const handleOnClickEvent = async(event) => {
 
    await studentGoogleAccess(event)
    setConfirmOpenMessage(true);
    // setShowPortal(true);
    setPortalData(event);
  };

  const handlePotalClose = () => {
    // setShowPortal(false)
    deleteTable()
    setConfirmOpenMessage(false);
  };

  const handleDelete = async () => {
    // setEvents((prevEvents) =>
    //   prevEvents.filter((ev) => ev.date !== portalData.date)
    // );
    // handlePotalClose();
    // console.log("portalData", portalData)
    try {
      if (portalData.is_online === true) {
        const payload = {
          table: 'attendance',
          colName: 'attendance_id',
          id: portalData.attendanceId,
        };
        const payload2 = {
          table: 'attendance_report',
          colName: 'attendance_id',
          id: portalData.attendanceId,
        };
        const payload1 = {
          table: 'google_calendar',
          colName: 'attendence_id',
          id: portalData.attendanceId,
        };
        await deleteFromGoogleCalendar(studentGoogle)
        await axios.post('/api/pmApi/delete', payload1);
        await axios.post('/api/pmApi/delete', payload);
        // console.log(data1)

        let table = 'tmpschedule';
        let colName = 'tmpschedule_id';
        let id = portalData.tmpschedule_id;
        let { data } = await axios.post('/api/pmApi/delete', {
          table,
          colName,
          id,
        });

        await axios.post('/api/pmApi/delete', payload2);
        // Delete from SharePoint booking room


        if (data.rowCount > 0) {
          await handleDeleteZoom(portalData.zoom_meeting_id)
          await deleteTable()
          handlePotalClose();
          getData();
        }

      } else {
        const payload = {
          table: 'attendance',
          colName: 'attendance_id',
          id: portalData.attendanceId,
        };
        const payload2 = {
          table: 'attendance_report',
          colName: 'attendance_id',
          id: portalData.attendanceId,
        };
        const payload1 = {
          table: 'google_calendar',
          colName: 'attendence_id',
          id: portalData.attendanceId,
        };
        await deleteFromGoogleCalendar(studentGoogle)
        await axios.post('/api/pmApi/delete', payload1);
        await axios.post('/api/pmApi/delete', payload);
        // console.log(data1)

        let table = 'tmpschedule';
        let colName = 'tmpschedule_id';
        let id = portalData.tmpschedule_id;
        let { data } = await axios.post('/api/pmApi/delete', {
          table,
          colName,
          id,
        });

        await axios.post('/api/pmApi/delete', payload2);
        // Delete from SharePoint booking room
        const { success } = await deleteFromSharePointBookingRoom(portalData.sharepointId);

        if (data.rowCount > 0 && success) {

          await deleteTable()
          handlePotalClose();
          getData();
        }
      }




    } catch (error) {
      return error;
    }

    // // console.log(id)
  };

  // Your client-side code
  const getSharePointToken = async () => {
    try {
      const response = await fetch('/api/pmApi/getsharePointToken', {
        method: 'GET',
        headers: {
          'Accept': 'application/json;odata=verbose',
          'Content-Type': 'application/json;odata=verbose',
        },
      });

      const data = await response.json();

      if (!data.access_token) {
        throw new Error('Access token not obtained');
      }

      return data.access_token;
    } catch (error) {
      console.error('Error obtaining SharePoint access token:', error.message);
      throw error;
    }
  };

  const deleteFromSharePointBookingRoom = async (sharepointId) => {

    try {
      const accessToken = await getSharePointToken();

      const apiUrl =
        `https://esalb.sharepoint.com/sites/RoomBooking/_api/web/lists/getbytitle('BookingRoom')/items/getbyid('${sharepointId}')`;


      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          Accept: "application/json;odata=verbose",
          "Content-Type": "application/json;odata=verbose",
          Authorization: `Bearer ${accessToken}`,
          'If-Match': '*'
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        return { success: true }
      }
    } catch (error) {

      return { success: false }

    }
  };
  const handleCloseEdit = () => {
    setRemainingRooms([])
    setAllrooms([])
    deleteTable()
    setIsOnline('')
    setShowFormEdit(false);
  };
  const studentEdit = async(ev)=>{
    console.log('event.promotion' , ev)
    try {
      let major_id = majorId;
      let promotion = ev.promotions.replace(/\s/g, '');
      const { data } = await axios.post('/api/pmApi/getAllStudent', {
        major_id,
        promotion,
      });
      console.log('data',data)
      setStudent(data.data);
     
    } catch (error) {
      return error
    }
  }
  useEffect(()=>{
    studentEdit()
  },[isEdit])
  const handleEdit = async (e, event, date) => {
    console.log('edit' , event)
    await studentEdit(event)
    await studentGoogleAccess(event)
    // searchBook()
    setZoomUrl(event.zoom_url)
    setCourseName(event.title)
    setAttendanceId(event.attendance_id)
    setSharePointId(event.sharepoint_id)
    setZoomID(event.zoom_meeting_id)
    setEditOnline(event.is_online)

    handleStages(event.room_building)

    e.preventDefault();

    await getRoomBooking()
    setShowFormEdit(true);
    setIsEdit(true)

    searchBookEdit(date, event.room_building, event.from, event.to)
    setSharePointId(event.sharepointId)
    setFromTimeEditSharePoint(event.from)
    setToTimeEditSharePoint(event.to)

    // console.log(event);
    setIsOnline(event.is_online)

    setFromTime(formatTime(event.from));
    setToTime(formatTime(event.to));
    setClasses(event.courseID);
    setRoomBuilding(event.room_building);
    setRoomName(event.room_name);
    setTheDate(date);
    setTmpscheduleID(event.tmpschedule_id);
  };


  const handleSaveEdit = async (e) => {
    
    e.preventDefault();
    setIsClickEdit(true);
    // setShowFormEdit(false)
    // console.log("the edit form: ==> ", {
    //   classID:
    //     typeof classes === "string"
    //       ? allClasses.filter((clas) => clas.course_id === classes)[0]
    //           .tmpclass_id
    //       : classes,
    //   day: theDate,
    //   fromTime: fromTime,
    //   toTime: toTime,
    //   room_id:
    //     place > 0
    //       ? place
    //       : allroomName.filter((rom) => rom.room_name === roomName)[0].room_id,
    //   pm_id: session.user.userid,
    //   tmpscheduleID,
    // });
    // tmpscheduleID, classID, day, fromTime, toTime, room_id, pm_id
    // let pmID = session.user.userid;
    let schedData = {
      tmpscheduleID: tmpscheduleID,
      classID:
        typeof classes === 'string'
          ? allClasses.find((clas) => clas.course_id === classes)?.tmpclass_id
          : classes,
      day: modifyDate(theDate),
      fromTime: fromTime,
      toTime: toTime,
      room_id:
        place > 0
          ? place
          : allroomName.find((rom) => rom.room_name === roomName)?.room_id,
      pm_id: session.user.userid,
      is_online: isOnline,
      student: student,
      building: roomBuilding,
      room_name: roomName,
      oldData: scheduleDate
    };
    
    // Assuming teacher_id and courseName are available in the current scope
    const matchingClass = allClasses.find((clas) => clas.tmpclass_id===classes);
      
  
    schedData.teacher_id = matchingClass ? matchingClass.teacher_id : scheduleDate[0].teacherId;
    console.log('matchingClass' , schedData)
    schedData.courseName = matchingClass ? matchingClass.course_id : scheduleDate[0].courseID;
    if (editOnline === isOnline) {
      if (editOnline === true) {
        let { data } = await axios.post(
          '/api/pmApi/updateSingleSchedule',
          schedData
        );
       

        if (data.success) {

          await handleUpdateZoom(zoom_id, theDate, courseName, fromTime, toTime)
          await handleUpdateGoogleCalenderZoom(schedData, studentGoogle ,urlZoom)

          getData();
          setIsOnline('')
          setIsClickEdit(false);
          setShowFormEdit(false);
        }

      } else {
        let { data } = await axios.post(
          '/api/pmApi/updateSingleSchedule',
          schedData
        );
       
        if (data.success) {
          await handleUpdateGoogleCalender(schedData, studentGoogle , roomName , building)


          await UpdateFromSharePointBookingRoom(sharepointId, theDate)

          getData();
          setIsOnline('')
          setIsClickEdit(false);
          setShowFormEdit(false);

        }

      }

    } else {
      if (isOnline === "true") {
        let { data } = await axios.post(
          '/api/pmApi/updateSingleSchedule',
          schedData
        );
        


        if (data.success) {
          await deleteFromSharePointBookingRoom(sharepointId);
          const response = await handleCreateZoomMeetingEdit(courseName, theDate, fromTime, toTime)
          await handleUpdateZoomOnlineSchedule(response.zoom_id, response.zoom_url, attendanceId)
          await handleUpdateGoogleCalenderZoom(schedData, studentGoogle , response.zoom_url)
          await axios.post('/api/pmApi/deleteSharePointId', {
            attendance_id: attendanceId
          })

          getData();
          setIsClickEdit(false);
          setShowFormEdit(false);
          setIsOnline('')
        }

      } else {
        let { data } = await axios.post(
          '/api/pmApi/updateSingleSchedule',
          schedData
        );
        if (data.success) {

          await handleSharePointBookingRoom(theDate, attendanceId , courseName)
          await handleUpdateGoogleCalender(schedData, studentGoogle ,roomName , building)

          await handleDeleteZoom(zoom_id)
          await axios.post('/api/pmApi/deleteZoomSchedule', {
            attendance_id: attendanceId
          })
          
          getData();
          setIsClickEdit(false);
          setShowFormEdit(false);
          setIsOnline('')
          if (isOnline === false) {
            await UpdateFromSharePointBookingRoom(sharepointId, theDate)
            await handleUpdateGoogleCalender(schedData, studentGoogle , roomName , building)

            getData();
            setIsClickEdit(false);
            setShowFormEdit(false);
            setIsOnline('')

          }


        }

      }

    }
    // console.log("schedData  :", schedData);


    // console.log("the update change:  ", data);
  };


  const UpdateFromSharePointBookingRoom = async (sharepointId, date) => {

    try {
      const accessToken = await getSharePointToken();
      const dates = new Date(date);
      const bookingDay = new Date()
      const formattedBookingDay = moment(bookingDay).format('MM/DD/YYYY');

      const formattedDate = moment(dates).format('YYYY-MM-DD');
      const fromTimeSplit = fromSharePoint.split('+')[0];
      const toTimeSplit = toSharePoint.split('+')[0];

      // Beirut/Lebanon is in UTC+2 during standard time and UTC+3 during daylight saving time
      const utcOffset = 4; // Change this value if daylight saving time is not in effect

      // Convert the local time to UTC and adjust to Beirut/Lebanon time zone
      const fromTimes = moment(`${formattedDate}T${fromTimeSplit}Z`).utcOffset(utcOffset, true).toISOString();
      const toTimes = moment(`${formattedDate}T${toTimeSplit}Z`).utcOffset(utcOffset, true).toISOString();

      const apiUrl =
        `https://esalb.sharepoint.com/sites/RoomBooking/_api/web/lists/getbytitle('BookingRoom')/items/getbyid('${sharepointId}')`;


      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          Accept: "application/json;odata=verbose",
          "Content-Type": "application/json;odata=verbose",
          Authorization: `Bearer ${accessToken}`,
          'If-Match': '*'
        },
        body: JSON.stringify({
          __metadata: {
            type: "SP.Data.BookingRoomListItem",
          },
          Title: `${roomName}`,
          Space: `${building}`,
          BookedBy: `${session.user?.name}`,
          BookingDate: date, // Use the current date in the iteration
          BookingDay: formattedBookingDay,
          FromTime: fromTimes,
          ToTime: toTimes,
        }),
      });


      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        return { success: true }
      }
    } catch (error) {

      return { success: false }

    }
  };


  const handleSharePointBookingRoom = async (date, attendance_id , courseName) => {
    try {
      const accessToken = await getSharePointToken();
      const dates = new Date(date);
      const bookingDay = new Date()
      const formattedBookingDay = moment(bookingDay).format('MM/DD/YYYY');

      const formattedDate = moment(dates).format('YYYY-MM-DD');
      const fromTimeSplit = fromSharePoint.split('+')[0];
      const toTimeSplit = toSharePoint.split('+')[0];

      // Beirut/Lebanon is in UTC+2 during standard time and UTC+3 during daylight saving time
      const utcOffset = 3; // Change this value if daylight saving time is not in effect

      // Convert the local time to UTC and adjust to Beirut/Lebanon time zone
      const fromTimes = moment(`${formattedDate}T${fromTimeSplit}Z`).utcOffset(utcOffset, true).toISOString();
      const toTimes = moment(`${formattedDate}T${toTimeSplit}Z`).utcOffset(utcOffset, true).toISOString();

      const apiUrl =
        "https://esalb.sharepoint.com/sites/RoomBooking/_api/web/lists/getbytitle('BookingRoom')/items";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Accept: "application/json;odata=verbose",
          "Content-Type": "application/json;odata=verbose",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({

          __metadata: {
            type: "SP.Data.BookingRoomListItem",
          },
          Title: `${roomName}`,
          Space: `${building}`,
          BookedBy: `${session.user?.name}`,
          BookingDate: dates,
          BookingDay: `${formattedBookingDay}`,
          FromTime: fromTimes,
          ToTime: toTimes,
          Description:`${courseName}`
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();


      // Log the ID of the newly added item
      if (data && data.d && data.d.Id) {
        // Update the SharePoint ID in the schedule
        await axios.post("/api/pmApi/UpdateSharePointIdSchedule", {
          sharepointId: data.d.Id,
          attendanceId: attendance_id,
        });

      }
    } catch (error) {
      console.error("Error submitting booking to SharePoint:", error.message);
    }
  };

  const handleDragRoomBooking = async (date, from, to, attendance_id , courseName ,roomName , roomSpace) => {
    try {
      console.log('courseName' , courseName)
      const accessToken = await getSharePointToken();
      const dates = new Date(date);
      const bookingDay = new Date();
      const formattedBookingDay = moment(bookingDay).format('MM/DD/YYYY');
  
      const formattedDate = moment(dates).format('YYYY-MM-DD');
      const fromTimeSplit = from.split('+')[0];
      const toTimeSplit = to.split('+')[0];
  
      // Beirut/Lebanon is in UTC+2 during standard time and UTC+3 during daylight saving time
      const utcOffset = 3; // Change this value if daylight saving time is not in effect
  
      // Convert the local time to UTC and adjust to Beirut/Lebanon time zone
      const fromTimes = moment(`${formattedDate}T${fromTimeSplit}`).utcOffset(utcOffset, true).toISOString();
      const toTimes = moment(`${formattedDate}T${toTimeSplit}`).utcOffset(utcOffset, true).toISOString();
  
      const apiUrl =
        "https://esalb.sharepoint.com/sites/RoomBooking/_api/web/lists/getbytitle('BookingRoom')/items";
  
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Accept: "application/json;odata=verbose",
          "Content-Type": "application/json;odata=verbose",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          __metadata: {
            type: "SP.Data.BookingRoomListItem",
          },
          Title: `${roomName}`,
          Space: `${roomSpace}`,
          BookedBy: `${session.user?.name}`,
          BookingDate: dates.toISOString(), // Use ISO string format for the date
          BookingDay: `${formattedBookingDay}`,
          FromTime: moment(fromTimes).toISOString(), // Add the UTC offset to adjust the time
          ToTime: moment(toTimes).toISOString(), // Add the UTC offset to adjust the time
          Description: `${courseName}`
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      // Log the ID of the newly added item
      if (data && data.d && data.d.Id) {
        // Update the SharePoint ID in the schedule
        await axios.post("/api/pmApi/UpdateSharePointIdSchedule", {
          sharepointId: data.d.Id,
          attendanceId: attendance_id,
        });
      }
    } catch (error) {
      console.error("Error submitting booking to SharePoint:", error.message);
    }
  };
  const handleAccessToken = async (studentDetails) => {
    console.log('studentDetails' , studentDetails)
    try {
      const refreshToken = await axios.post('/api/google-api/getRefreshToken', {
        oldRefreshToken: studentDetails
      })

      setGoogleToken(refreshToken.data.data)
    } catch (error) {
      return error
    }
  }

console.log('googleToken' , student)

  const handleInsertGoogleEvent = async (day, fromTime, to_time, attendanceId, zoomURL) => {

    try {

      const accessToken = googleToken
      // Define the schedule data
      const formattedDate = moment(day).format('YYYY-MM-DD');
      // Combine the date and time and format it as a full ISO string
      const localDateTime = `${formattedDate}T${fromTime}:00`;
      const localDateToTime = `${formattedDate}T${to_time}:00`;

      const schedule = {
        summary: `${courseName}`,
        description: `Online-${zoomURL}`,
        start: { dateTime: localDateTime, timeZone: 'Asia/Beirut' },
        end: { dateTime: localDateToTime, timeZone: 'Asia/Beirut' },
      };



      await axios.post('/api/google-api/addSchedule', {
        access_Token: accessToken,
        event: schedule,
        attendance_id: attendanceId
      })


    } catch (error) {
      return error
    }
  }

  const handleInsertGoogleEventOnSite = async (day, fromTime, to_time, roomName, building, attendanceId) => {

    try {

      const accessToken = googleToken
      // Define the schedule data
      const formattedDate = moment(day).format('YYYY-MM-DD');
      // Combine the date and time and format it as a full ISO string
      const localDateTime = `${formattedDate}T${fromTime}:00`;
      const localDateToTime = `${formattedDate}T${to_time}:00`;


      const schedule = {
        summary: `${courseName}`,
        description: `Room-${roomName} building-${building}`,
        start: { dateTime: localDateTime, timeZone: 'Asia/Beirut' },
        end: { dateTime: localDateToTime, timeZone: 'Asia/Beirut' },
      };
      await axios.post('/api/google-api/addSchedule', {
        access_Token: accessToken,
        event: schedule,
        attendance_id: attendanceId
      })


      // if(response.statusText === 'OK'){
      //  const logs= await axios.post('/api/pmApi/fillgoogleCalender' , {
      //     student_id: '2024124599',
      //     event_id:response.data.event.id

      //   })
      //   console.log(logs)
      // }

    } catch (error) {
      return error
    }
  }

  const deleteFromGoogleCalendar = async(event_id)=>{
    try {
     
      const payload = {
        access_token :googleToken,
        eventId:event_id
      }
       await axios.post(`/api/google-api/deleteSchedule` , payload)
    } catch (error) {
      return error
    }
   }

   const handleUpdateGoogleCalender = async (data, event_id , roomName ,roomBuilding) => {
    try {
      const formattedDate = moment(data.day).format('YYYY-MM-DD');
      let fromTime = moment.tz(data.fromTime, 'hh:mm A', 'Asia/Beirut');
      let toTime = moment.tz(data.toTime, 'hh:mm A', 'Asia/Beirut');
  
      // Check if the time is in PM or AM format and adjust if needed
      if (!fromTime.isValid() || !toTime.isValid()) {
        throw new Error('Invalid time format');
      }
  
      const localDateTime = `${formattedDate}T${fromTime.format('HH:mm')}:00`;
      const localDateToTime = `${formattedDate}T${toTime.format('HH:mm')}:00`;
  
      const newData = {
        summary: `${courseName}`,
        description: `R-${roomName}-B-${roomBuilding}`,
        start: { dateTime: localDateTime, timeZone: 'Asia/Beirut' },
        end: { dateTime: localDateToTime, timeZone: 'Asia/Beirut' },
      };
  
      const payload = {
        accessToken: googleToken,
        eventId: event_id,
        newData: newData,
      };
  
      await axios.post('/api/google-api/updateSchedule', payload);
    } catch (error) {
      return error;
    }
  };

  const handleUpdateGoogleCalenderZoom = async (data, event_id , zoomURL) => {
    try {
      console.log(zoomURL)
      const formattedDate = moment(data.day).format('YYYY-MM-DD');
      let fromTime = moment.tz(data.fromTime, 'hh:mm A', 'Asia/Beirut');
      let toTime = moment.tz(data.toTime, 'hh:mm A', 'Asia/Beirut');
  
      // Check if the time is in PM or AM format and adjust if needed
      if (!fromTime.isValid() || !toTime.isValid()) {
        throw new Error('Invalid time format');
      }
  
      const localDateTime = `${formattedDate}T${fromTime.format('HH:mm')}:00`;
      const localDateToTime = `${formattedDate}T${toTime.format('HH:mm')}:00`;
  
      const newData = {
        summary: `${courseName}`,
        description: `Online-${zoomURL}`,
        start: { dateTime: localDateTime, timeZone: 'Asia/Beirut' },
        end: { dateTime: localDateToTime, timeZone: 'Asia/Beirut' },
      };
  
      const payload = {
        accessToken: googleToken,
        eventId: event_id,
        newData: newData,
      };
  
      await axios.post('/api/google-api/updateSchedule', payload);
    } catch (error) {
      return error;
    }
  };



  return (
    <>
      <HighLevelPageStyle>
        <Wrapper>
          <DateControls>
            {/* <button
          onClick={(e) => {
            e.preventDefault();
            prevMonth(currentDate, setCurrentDate)
        }}
        >left</button> */}
            <ArrowLeftCircleIcon
              className="w-10 h-10 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                prevMonth(currentDate, setCurrentDate);
              }}
            />
            {getMonthYear(currentDate)}
            {/* <button
          onClick={(e) => {
            e.preventDefault();
            nextMonth(currentDate, setCurrentDate)
        }}
        >right</button> */}

            <ArrowRightCircleIcon
              className="w-10 h-10 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                nextMonth(currentDate, setCurrentDate);
              }}
            />
          </DateControls>
          <SevenColGrid>
            {DAYS.map((day, index) => (
              <HeadDays key={index} className="nonDRAG">
                {day}
              </HeadDays>
            ))}
          </SevenColGrid>

          <SevenColGrid
            fullheight={true}
            is28Days={getDaysInMonth(currentDate) === 28}
          >
            {getSortedDays(currentDate).map((day, index) => (
              <div
                key={index}
                id={`${currentDate.getFullYear()}/${currentDate.getMonth()}/${day}`}
                onDragEnter={(e) =>
                  onDragEnter(
                    new Date(
                      currentDate.getFullYear(),
                      currentDate.getMonth(),
                      day
                    ),
                    e
                  )
                }
                onDragOver={(e) => e.preventDefault()}
              // onDragEnd={(e)=>drop(e)}
              >
                <span
                  className={`nonDRAG ${datesAreOnSameDay(
                    new Date(),
                    new Date(
                      currentDate.getFullYear(),
                      currentDate.getMonth(),
                      day
                    )
                  )
                    ? 'active'
                    : ''
                    }`}
                >
                  {day}
                </span>

                {/* <EventWrapper>
              {events.map(
                (ev, index) =>
                {
                  // console.log('ev:===> ',ev)
                  // console.log(ev.date)
                  // console.log(new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    day
                  ))
                  // console.log('isld==>',datesAreOnSameDay(
                    ev.date,
                    new Date(
                      currentDate.getFullYear(),
                      currentDate.getMonth(),
                      day
                    )
                  ) )
                  datesAreOnSameDay(
                    ev.date,
                    new Date(
                      currentDate.getFullYear(),
                      currentDate.getMonth(),
                      day
                    )
                  ) 
                  && (     
                    // <div>{ev.title}</div>                
                    <StyledEvent
                    //   onDragStart={(e) => drag(index, e)}
                      onClick={() => handleOnClickEvent(ev)}
                    //   draggable
                      className="StyledEvent"
                      id={`${ev.color} ${ev.title}`}
                      key={ev.title}
                      bgColor={ev.color}
                    >
                      {ev.title}
                    </StyledEvent>
                  )
                  
                }
                  
              )}
              {day && <PlusCircleIcon className="h-7 w-7 cursor-pointer" onClick={(e) =>
                    addEvent(
                      new Date(
                        currentDate.getFullYear(),
                        currentDate.getMonth(),
                        day
                      ),
                      e
                    )
                  }/>}
                  

            </EventWrapper> */}

                <EventWrapper>
                  {scheduleDate.map(
                    (ev, index) =>
                      datesAreOnSameDay(
                        ev.date,
                        new Date(
                          currentDate.getFullYear(),
                          currentDate.getMonth(),
                          day
                        )
                      ) && (
                        <StyledEvent
                          className="StyledEvent"
                          onDragStart={(e) => drag(index, e)}
                          draggable
                          id={`${ev.color} ${ev.title}`}
                          key={`${ev.title} ${Math.floor(Math.random() * (100 - 1 + 1)) + 1
                            }`}
                          bgColor={ev.color}
                          onDragOver={(e) => e.preventDefault()}
                          onDragEnd={(e) => drop(ev, e)}
                        >
                          <div className="flex justify-between" name="arrows">
                            <ArrowLeftIcon
                              className="h-7 w-7 cursor-pointer"
                              id="left"
                              onClick={() => handleAddPrevious(ev)}
                            />
                            <ArrowRightIcon
                              className="h-7 w-7 cursor-pointer"
                              id="right"
                              onClick={() => handleAddNext(ev)}
                            />
                          </div>

                          <div>{ev.course}</div>
                          {/* <div>{ev.title}</div> */}
                          <div>{ev.type}</div>
                          <div>{ev.teacher}</div>
                          <div>{formatTime(ev.from)}</div>
                          <div>{formatTime(ev.to)}</div>
                          {!ev.is_online ?
                            <>
                              <div>{ev.room_building}</div>
                              <div>{ev.room_name}</div>
                            </> : <>

                              <div>Online</div>
                            </>}

                          <div name="actors">
                            <span
                              name="edit"
                              onClick={(e) =>
                                handleEdit(
                                  e,
                                  ev,
                                  new Date(
                                    currentDate.getFullYear(),
                                    currentDate.getMonth(),
                                    day
                                  )
                                )



                              }
                            >
                              edit
                            </span>
                            <span
                              name="delete"
                              onClick={() => handleOnClickEvent(ev)}
                            >
                              delete
                            </span>
                          </div>
                        </StyledEvent>
                      )
                  )}
                </EventWrapper>
                {day && (
                  <PlusCircleIcon
                    className="h-10 w-10 cursor-pointer"
                    onClick={(e) =>

                      addEvent(
                        new Date(
                          currentDate.getFullYear(),
                          currentDate.getMonth(),
                          day
                        ),
                        e
                      )
                    }
                  />
                )}
              </div>
            ))}
          </SevenColGrid>
          {/* {showPortal && (
        <Portal
          {...portalData}
          handleDelete={handleDelete}
          handlePotalClose={handlePotalClose}
        />
      )} */}
          {confirmOpenMessage && (
            <WarningMessageSchedule
              details={portalData}
              confirmOpenDelete={handleDelete}
              handleConfirmClose={handlePotalClose}
            />
          )}
         {showForm && (
            <AddSchedules
              errorBuilding={errorBuilding}
              errorEnd={errorEnd}
              classes={classes}
              errorStart={errorStart}
              fromTime={fromTime}
              toTime={toTime}
              place={place}
              errorType={errorType}
              errorLocation={errorLocation}
              handleClose={handleClose}
              isOnline={isOnline}
              setIsOnline={setIsOnline}
              click={click}
              remainingRooms={remainingRooms}
              allroomsRef={allroomsRef}
              allStages={allStages}
              handleStages={handleStages}
              handleOpenNotificatonMessages={handleOpenMessages}
              handleCloseNotificatonMessages={handleCloseMessages}
              messages={messages}
              building={building}
              allrooms={allrooms}
              confirmOccupied={confirmOccupied}
              allClasses={allClasses}
              handleClass={handleClass}
              handleFrom={handleFrom}
              handleTo={handleTo}
              handlePlace={handlePlace}
              theroom={allroomName}
              errorClass={errorClass}
              handleSave={handleSave}
            />
          )}
          {confirmOpenMessageNotification && (
            <NotificatonMessage
              handleOpenNotificatonMessages={handleOpenNotificatonMessages}
              handleCloseNotificatonMessages={handleCloseNotificatonMessages}
              messages={messages}
            />
          )}
          {confirmOccupied && (
            <NotificatonMessage
              handleOpenNotificatonMessages={handleOpenMessages}
              handleCloseNotificatonMessages={handleCloseMessages}
              messages={messages}
            />
          )}

          {showFormEdit && (
            <AddSchedule
              isOnline={isOnline}
              setIsOnline={setIsOnline}
              searchBookEdit={searchBookEdit}
              remainingRooms={remainingRooms}
              handleClose={handleCloseEdit}
              handleStages={handleStages}
              allrooms={allrooms}
              allStages={allStages}
              allroomsRef={allroomsRef}
              allClasses={allClasses}
              UpdateFromSharePointBookingRoom={UpdateFromSharePointBookingRoom}
              handleClass={handleClass}
              clickEdit={clickEdit}
              handleFrom={handleFrom}
              handleTo={handleTo}
              handlePlace={handlePlace}
              theroom={allroomName}
              handleSave={handleSaveEdit}
              thefrom={fromTime}
              theto={toTime}
              theclass={classes}
              theroombuilding={roomBuilding}
              theroomname={roomName}
              isEdit={isEdit}
            />
          )}
        </Wrapper>
      </HighLevelPageStyle>
    </>
  );
};

const EventWrapper = ({ children }) => {
  // if (children.filter((child) => child).length)
  return (
    <>
      {children}
      {/* {children.filter((child) => child).length > 2 && (
          <SeeMore
            onClick={(e) => {
              e.stopPropagation();
              // console.log("clicked p");
            }}
          >
            see more...
          </SeeMore>
        )} */}
    </>
  );
};

const formatTimeForInput = (time) => {
  return moment(time, 'h:mm A').format('HH:mm');
};

const AddSchedule = ({
  isOnline,
  setIsOnline,
  remainingRooms,
  handlePlace,
  handleFrom,
  building,
  handleTo,
  allClasses,
  handleClass,
  handleClose,
  handleSave,
  // theroom,
  thefrom,
  theto,
  theclass,
  allrooms,
  handleStages,
  allroomsRef,
  clickEdit,
  theroombuilding,
  theroomname,
  allStages,
  // isEdit,
}) => {
  let classNames = allClasses.map((clss) => clss.course_id)
  // console.log(allrooms , 'allrooms')

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-full sm:w-auto my-6 mx-2 sm:mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-3 sm:p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-gray-700 text-lg sm:text-3xl font-bold">
                Update Schedule
              </h3>
              <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-lg sm:text-3xl leading-none font-semibold outline-none focus:outline-none">
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-lg sm:text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-3 sm:p-6 pr-4 sm:pr-12 flex-auto overflow-y-scroll">
              <div className="sm:flex">
                <div className="mb-4 sm:mr-8 sm:w-1/2">
                  <label className="text-gray-700 block mb-2">
                    Class:
                  </label>
                  <CustomSelectBox
                    options={classNames}
                    placeholder="Select Class"
                    onSelect={handleClass}
                    oldvalue={theclass}
                    styled="font-medium h-auto items-center border-[1px] border-zinc-300 self-center w-full sm:w-60 inline-block ml-[8px]"
                  />

                </div>

              </div>
              <div className="sm:flex ">
                <div className='mb-4 sm:mr-8 sm:w-1/2'>
                  <label className="text-gray-700 block mb-2">
                    From:
                  </label>
                  <input
                    type="time"
                    value={formatTimeForInput(thefrom)}
                    onChange={handleFrom}
                    className="font-medium h-auto items-center border-[1px] border-zinc-300 self-center w-full sm:w-60 inline-block ml-[8px]"
                  />

                </div>
                <div className='mb-4 sm:mr-8 sm:w-1/2'>
                  <label className="text-gray-700  mb-2">
                    To:
                  </label>
                  <input
                    type="time"
                    value={formatTimeForInput(theto)}
                    onChange={handleTo}
                    className="font-medium h-auto items-center border-[1px] border-zinc-300 self-center w-full sm:w-60 inline-block ml-[8px]"
                  />


                </div>



              </div>

              <div className="mb-4 sm:w-1/2">
                <label className="text-gray-700 block mb-2">
                  Type:
                </label>
                <select
                  className="font-medium h-auto items-center border-[1px] border-zinc-300 self-center w-full sm:w-60 inline-block ml-[8px]"
                  onChange={(e) => setIsOnline(e.target.value)}
                  value={isOnline}
                >

                  <option value="true">Online</option>
                  <option value="false">Onsite</option>
                </select>

              </div>
              {isOnline === false || isOnline === 'false' ?
              <>
                              <div className="sm:flex">
                  <div className="mb-4 sm:mr-8 sm:w-1/2">
                    <label className="text-gray-700 block mb-2">
                      Building:
                    </label>
                    <CustomSelectBox
                      options={allStages}
                      placeholder="Select Location"
                      onSelect={handleStages}
                      styled="font-medium h-auto items-center border-[1px] border-zinc-300 self-center w-full sm:w-60 inline-block ml-[8px]"
                      enable={false}
                      oldvalue={theroombuilding}
                    />

                  </div>
                  {(theroombuilding?.length > 0 || (building.length > 0 && allrooms.length > 0)) &&
                    <div className="mb-4 sm:w-1/2">
                      <label className="text-gray-700 block mb-2">
                        Location:
                      </label>
                      <CustomSelectBox
                        options={remainingRooms.length > 0 ? remainingRooms : allroomsRef.current}
                        placeholder="Select Location"
                        onSelect={handlePlace}
                        styled="font-medium h-auto items-center border-[1px] border-zinc-300 self-center w-full sm:w-60 inline-block ml-[8px]"
                        enable={false}
                        oldvalue={theroomname}
                      />

                    </div>
                  }
                </div>
              
              </>:<></>

              }
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-3 sm:p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="primary-button btnCol text-white hover:text-white hover:font-bold mr-2 sm:mr-4"
                type="button"
                onClick={handleSave}
                disabled={clickEdit}
              >
                Save
              </button>
              <button
                className="bg-red-500 text-white px-3 sm:px-4 py-2 rounded"
                type="button"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>

  );




};

const AddSchedules = ({
  isOnline,
  setIsOnline,
  handlePlace,
  handleFrom,
  handleTo,
  allClasses,
  handleClass,
  handleClose,
  errorBuilding,
  errorEnd,
  errorLocation,
  // classes,
  errorStart,
  errorType,
  handleSave,
  // fromTime,
  // toTime,
  // theroom,
  click,
  allrooms,
  handleCloseNotificatonMessages,
  handleOpenNotificatonMessages,
  messages,
  confirmOccupied,
  // thefrom,
  // theto,
  // theclass,
  errorClass,
  theroombuilding,
  handleStages,
  allStages,
  building,
  allroomsRef,
  remainingRooms,
  // theroomname,
  // isEdit,
  // place
}) => {
  let classNames = allClasses.map((clss) => clss.course_id);


  return (
    <>
      {click && confirmOccupied ? (
        <>
          <>
            ({' '}
            <NotificatonMessage
              handleOpenNotificatonMessages={handleOpenNotificatonMessages}
              handleCloseNotificatonMessages={handleCloseNotificatonMessages}
              messages={messages}
            />
            )
          </>
        </>
      ) : click && !confirmOccupied ? (
        <>
          <div className="justify-center items-center flex  overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-3/4 my-6 p-20 m-20 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between opacity-5 p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold opacity-5">
                    Modal Title
                  </h3>
                  <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none">
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 pr-12">
                  <div className="flex flex-col mb-10 mr-0 justify-center">
                    <div
                      role="status"
                      className="flex flex-col  justify-center absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
                    >
                      <div className="flex justify-center pb-12">
                        <svg
                          aria-hidden="true"
                          className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                      </div>
                      <div className="flex justify-center">
                        <h5 className="text-gray-700 text-base">
                          please wait until process complete...
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b"></div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full sm:w-auto my-6 mx-2 sm:mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-3 sm:p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-gray-700 text-lg sm:text-3xl font-bold">
                    Create Schedule
                  </h3>
                  <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-lg sm:text-3xl leading-none font-semibold outline-none focus:outline-none">
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-lg sm:text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-3 sm:p-6 pr-4 sm:pr-12 flex-auto overflow-y-scroll">
                  <div className="sm:flex">
                    <div className="mb-4 sm:mr-8 sm:w-1/2">
                      <label className="text-gray-700 block mb-2">
                        Class:
                      </label>
                      <CustomSelectBox
                        options={classNames}
                        placeholder="Select Class"
                        onSelect={handleClass}
                        styled="font-medium h-auto items-center border-[1px] border-zinc-300 self-center w-full sm:w-60 inline-block ml-[8px]"
                      />
                      <div className="text-red-500 mt-1">{errorClass}</div>
                    </div>

                  </div>
                  <div className="sm:flex ">
                    <div className='mb-4 sm:mr-8 sm:w-1/2'>
                      <label className="text-gray-700 block mb-2">
                        From:
                      </label>
                      <input
                        type="time"
                        onChange={handleFrom}
                        className="font-medium h-auto items-center border-[1px] border-zinc-300 self-center w-full sm:w-60 inline-block ml-[8px]"
                      />
                      <div className="text-red-500 mt-1">{errorStart}</div>
                    </div>
                    <div className='mb-4 sm:mr-8 sm:w-1/2'>
                      <label className="text-gray-700  mb-2">
                        To:
                      </label>
                      <input
                        type="time"
                        onChange={handleTo}
                        className="font-medium h-auto items-center border-[1px] border-zinc-300 self-center w-full sm:w-60 inline-block ml-[8px]"
                      />
                      <div className="text-red-500 mt-1">{errorEnd}</div>

                    </div>
                  </div>

                  <div className="mb-4 sm:w-1/2">
                    <label className="text-gray-700 block mb-2">
                      Type:
                    </label>
                    <select
                      className="font-medium h-auto items-center border-[1px] border-zinc-300 self-center w-full sm:w-60 inline-block ml-[8px]"
                      onChange={(e) => setIsOnline(e.target.value)}
                      value={isOnline}
                    >
                      <option value=" ">Choose Value..</option>
                      <option value="true">Online</option>
                      <option value="false">Onsite</option>
                    </select>
                    <div className="text-red-500 mt-1">{errorType}</div>
                  </div>
                  {isOnline === 'false' &&
                    <div className="sm:flex">
                      <div className="mb-4 sm:mr-8 sm:w-1/2">
                        <label className="text-gray-700 block mb-2">
                          Building:
                        </label>
                        <CustomSelectBox
                          options={allStages}
                          placeholder="Select Location"
                          onSelect={handleStages}
                          styled="font-medium h-auto items-center border-[1px] border-zinc-300 self-center w-full sm:w-60 inline-block ml-[8px]"
                          enable={false}
                        />
                        <div className="text-red-500 mt-1">{errorBuilding}</div>
                      </div>
                      {(theroombuilding?.length > 0 || (building.length > 0 && allrooms.length > 0)) &&
                        <div className="mb-4 sm:w-1/2">
                          <label className="text-gray-700 block mb-2">
                            Location:
                          </label>
                          <CustomSelectBox
                            options={remainingRooms.length > 0 ? remainingRooms : allroomsRef.current}
                            placeholder="Select Location"
                            onSelect={handlePlace}
                            styled="font-medium h-auto items-center border-[1px] border-zinc-300 self-center w-full sm:w-60 inline-block ml-[8px]"
                            enable={false}
                          />
                          <div className="text-red-500 mt-1 ">{errorLocation}</div>
                        </div>
                      }
                    </div>
                  }
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-3 sm:p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="primary-button btnCol text-white hover:text-white hover:font-bold mr-2 sm:mr-4"
                    type="button"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 sm:px-4 py-2 rounded"
                    type="button"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>



      )}
    </>
  );
};