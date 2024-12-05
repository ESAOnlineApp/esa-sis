import Head from 'next/head';
// import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import StudentGrades from '../../components/Dashboard/StudentGrades';
import axios from 'axios';
import { useEffect, useState } from 'react';
import StudentGradesRTF from '../../components/Dashboard/studentGradesRTF';
import StudentGradesGMP from '../../components/Dashboard/StudentGradesGMP';
import StudentGradesEXED from '../../components/Dashboard/StudentGradeEXED';


export default function Grades() {


  const { data: session } = useSession();
  const [studentGrades, setStudentGrades] = useState([])
  const router = useRouter()
  const redirect = () => {
    router.push('/AccessDenied')
  }
  // Function to extract the first word before a hyphen "-"
  const getFirstWordBeforeHyphen = (text) => {
    if (text) {
      const words = text.split("-");
      if (words.length > 0) {
        return words[0];
      }
    }
    return "";
  };
  // Function to extract the first word before a hyphen "-"
  const getFirstWordAfterHyphen = (text) => {
    if (text) {
      const words = text.split("-");
      if (words.length > 0) {
        return words[1];
      }
    }
    return "";
  };

  const firstMajorWord = getFirstWordBeforeHyphen(session?.user.majorName);
  const secondMajorWord = getFirstWordAfterHyphen(session?.user.majorName);
  const isExeMajor = firstMajorWord === "EXED";

  const getGrade = async () => {
    try {
      const data = await axios.post('/api/user/StudentGrades', {
        table:'student_grades',
        studentId: session.user?.userid
      })

      setStudentGrades(data.data.data.rows)
    } catch (error) {
      return error
    }
  }

  const getGradesRTF = async () => {
    try {
      const data = await axios.post('/api/user/StudentGrades', {
        table:'grades_rtf',
        studentId: session.user?.userid
      })

      setStudentGrades(data.data.data.rows)
    } catch (error) {
      return error
    }
  }
  const getGradesGMP = async () => {
    try {

      const data = await axios.post('/api/user/StudentGrades', {
        table:'grades_gmp',
        studentId: session.user?.userid

      })

      setStudentGrades(data.data.data.rows)
    } catch (error) {
      return error
    }
  }

  const getGradesEXED= async () => {
    try {

      const data = await axios.post('/api/user/StudentGrades', {
        table:'grade_exed',
        studentId: session.user?.userid

      })

      setStudentGrades(data.data.data.rows)
    } catch (error) {
      return error
    }
  }
  useEffect(() => {
    if(!isExeMajor){
      getGrade();
    }else if(isExeMajor && secondMajorWord === 'GMP'){
      getGradesGMP();
    }else if(isExeMajor && (secondMajorWord === 'Digital Transformation in Financial Services' || secondMajorWord === 'Digital Transformation')){

      getGradesRTF();
      
    }else if(isExeMajor){
      getGradesEXED();
    }
   
  }, [])

  return (
    <>
      <Head>
        <title>SIS - Grades</title>
      </Head>
      <>
        {session?.user.role === '1' ? (
          <>
            <p className='text-gray-700 text-3xl pt-5 mb-10 font-bold text-primary'>Grades</p>
            {!isExeMajor ?
            <StudentGrades studentGrades={studentGrades} setStudentGrades={setStudentGrades} />
             : isExeMajor && (secondMajorWord === 'Digital Transformation in Financial Services' || secondMajorWord==='Digital Transformation')? 
             <StudentGradesRTF studentGrades={studentGrades} setStudentGrades={setStudentGrades} />
             :isExeMajor && secondMajorWord === 'GMP'?
              <StudentGradesGMP  studentGrades={studentGrades} setStudentGrades={setStudentGrades} />
             : isExeMajor ?<StudentGradesEXED  studentGrades={studentGrades} setStudentGrades={setStudentGrades} />:<></>
          }

          </>

        ) : redirect()}
      </>
    </>
  );
}
Grades.auth = true;
Grades.adminOnly = true;
