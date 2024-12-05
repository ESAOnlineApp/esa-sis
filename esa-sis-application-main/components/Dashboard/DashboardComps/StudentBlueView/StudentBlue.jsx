// import { useDispatch } from 'react-redux';
// import { LowerButtons } from '../../components/Admin/LowerButtons';
// import { appIsWaiting } from '../../../redux/slices/appSlice';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import https from 'https';

const StudentBlue = () => {
  const [survey, setSurvey] = useState([]);
  const { data: session } = useSession();

  let userid = parseInt(session?.user.userid);
  // console.log("userID",userid);

  useEffect(() => {
    const BlueData = async () => {
      let { data } = await axios.get(
        `https://survey.esa.edu.lb/BPI/PathwayService.svc/PWBlueTasks?pathway=140&userid=${userid}&SubjectIDs=2024_DBA-RF-IR_09`,
        {
          httpsAgent: new https.Agent({
            rejectUnauthorized: false,
          }),
        }
      );
      // console.log("dataTask",data.Tasks)
      setSurvey(data.Tasks);
    };
    BlueData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const name = session.user?.name;
  const firstname = name.split(' ')[0];

  return (
    <>
      {/* Heading */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        {survey && survey.length > 0 && (
          <div className="text-center text-red-600">
            <h4>Dear {firstname} , your account is limited</h4>
            <p className="text-gray-700 text-xl pt-5 mb-10 ">
              Please Fill up the following survey to reactivate your account
            </p>
          </div>
        )}
        {/* Blue data Map */}

        {survey &&
          survey.map(({ ID, Name, Link, StartDate, DueDate }) => {
            return (
              <div key={ID}>
                <p className="text-gray-700 text-sm pt-5 ">
                  Start Date: {StartDate}
                </p>
                <p className="text-gray-700 text-xl pt-5 mb-2">{Name}</p>
                <p className="text-gray-700 text-xl pt-5 mb-2">
                  Follow the Link to take the Survey{' '}
                  <a className="underline" href={Link}>
                    Take Survey
                  </a>
                </p>
                <p className="text-green-700 text-sm pt-5 mb-10">
                  Due Date: {DueDate}
                </p>
                <hr className="h-px w-[50%] mx-auto my-8 bg-gray-200 border-0" />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default StudentBlue;
