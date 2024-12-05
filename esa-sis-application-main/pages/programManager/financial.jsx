import Head from 'next/head';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { appIsWaiting } from '../../redux/slices/appSlice';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import TabsComponent from '../../components/tabs/TabsComponent';
// import axios from 'axios';
import Items from './items';
import CustomSelectBox from './customSelectBox';
import axios from 'axios';
// import Link from 'next/link';


export default function Financial() {
  // const appState = useSelector(
  //   (state) => state.persistedReducer.app_state.appState
  // );
  // console.log('appState.isWaiting==', appState.isWaiting);
  const [studentFull, setStudentFull] = useState([])
  const [studentNames, setStudentNames] = useState([])
  const [studentPimsId, setStudentPimsId] = useState(null)
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(appIsWaiting(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  const { data: session } = useSession();
  const router = useRouter()

  const redirect = () => {
    router.push('/AccessDenied')
  }
  const handleStatus = (selectedValue) => {
    if(selectedValue?.length > 0){
    let theId = selectedValue?.split('-')[1].trim() 
    setStudentPimsId(studentFull.filter(student => theId == student.student_id)[0].pims_id)
    }
  }
  useEffect(() =>{
    let getExtramajor = async () => {
      try{
        let body = { pmID: session?.user?.userid}
      let result = await axios.post('/api/pmApi/pmExtraMajor', body)
        getStudents({extraMajorId:result.data.data[0].major_id});
      return
      }catch (error){
        console.log('the error in requesting pims data is : ', error)
        return;
      }
    }
    let getStudents = async ({extraMajorId}) => {
      console.log('the extra major is : ', extraMajorId)
      try{
        let body = { major_id : session?.user.majorid , extra_major: extraMajorId}
      let result = await axios.post('/api/pmApi/studentsFinancial', body)
      setStudentFull(result?.data.data)
      return
      }catch (error){
        console.log('the error in requesting pims data is : ', error)
        return;
      }
    }

    if(session?.user?.hasMultiMajor == 'true'){
      getExtramajor();
    }else{
      getStudents({extraMajorId:null});
    }

  } ,[])
  
  useEffect(() => {
    studentFull.length > 0 && studentNames.length == 0 && studentFull.map(name => 
      setStudentNames(prev => [...prev, `${name.student_firstname} ${name.student_lastname} - ${name.student_id}`])
  )
  },[studentFull])


      const items = [
    {
      title: 'Future Payment',
      content: (
        <Items studentPimsId={studentPimsId}/>
      ),
    },
  ];


  return (
    <>
      <Head>
        <title>SIS - Financial</title>
      </Head>

      {session?.user.role === '2' ? (
        <>
          <p className='text-3xl pt-5 mb-10 font-bold text-primary'>Financial</p>

          <div className="grid grid-cols-1 gap-4 min-[850px]:grid-cols-2 min-[1100px]:grid-cols-3 mb-3 pb-4 border-blue-300 border-b-2">
            <label>
              Status:
              {
                <CustomSelectBox
                  options={studentNames}
                  placeholder="Select Username"
                  onSelect={handleStatus}
                  styled={
                    'font-medium h-auto items-center border-[1px] border-zinc-300 self-center w-40 inline-block ml-10'
                  }
                />
              }
            </label>
          </div>
          <TabsComponent items={items} />
        </>
      ) : redirect()}

    </>
  );
}


Financial.auth = true;
Financial.adminOnly = true;
