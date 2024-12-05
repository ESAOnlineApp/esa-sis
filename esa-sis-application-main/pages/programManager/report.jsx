import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
// import Link from 'next/link';
import axios from 'axios';
import ReportById from './ReportById';
// import Reports from './Reports';

export default function Report() {
  const { data: session } = useSession();
  const router = useRouter()

  const redirect = () => {
    router.push('/AccessDenied')
  }

  const [majors, setMajors] = useState([])
  const [majorValue, setMajorValue] = useState([])
  const [selectMajor, setSelectMajor] = useState(false)
  const handleMajors = async () => {
    try {
      if(session.user?.role === '3'){
        const data = await axios.post('/api/pmApi/getMajorFromAs', {
          pm_ass_id: session.user?.userid
        })
  
        setMajors(data.data.data)
      }else if(session.user?.role === '2'){
        const data = await axios.post('/api/pmApi/getMajorFromMajor', {
          pm_id: session.user?.userid
        })
  
        setMajors(data.data.data)
      }

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
  
    handleMajors()

  }, [majorValue])
 

  return (
    <>
      <Head>
        <title>SIS Program Manager - Report</title>
      </Head>

      {session?.user.role === '2' || session?.user.role === "3" ? (<>
        <div className='grid lg:grid-cols-1 gap-5 mb-5'>
          {session.user?.hasMultiMajor === "true" ? <>
          {!selectMajor ?  
          <>
            <p className='text-gray-700 text-3xl pt-5 mb-10 font-bold'>Report</p>
          <label className=''>
              Major:
              <select
                onChange={(e) => {setMajorValue(e.target.value) ; setSelectMajor(true)}}
                value={majorValue}
                className="ml-12 w-60"

              >
                <option key={"uu2isdvf"} value="">
                  Choose a Major
                </option>
                {majors &&
                  majors.map((major) => (
                    <>
                      <option key={major.major_id} value={major.major_id}>
                        {major.major_name}
                      </option>
                    </>
                  ))}
              </select>
            </label>
          </> 

        :<></>}
       
            {selectMajor && majorValue != '' ? <ReportById majors={majors} setMajors={setMajors} majorValue={majorValue} setMajorValue={setMajorValue} />
            :<>
          
            </> }

          </> : <></>}
        </div>
      </>) : redirect()}
    </>
  );
}
Report.auth = true;
Report.adminOnly = true;
