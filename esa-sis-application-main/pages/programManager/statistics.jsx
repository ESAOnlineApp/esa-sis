import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
// import Link from 'next/link';
import axios from 'axios';
import * as XLSX from "xlsx";
import StatisticsTable from '../../components/Dashboard/StatisticsTable';
// import Reports from './Reports';

export default function Statistics() {
  const { data: session } = useSession();
  const router = useRouter()

  const redirect = () => {
    router.push('/AccessDenied')
  }

  const [majors, setMajors] = useState([])
  const [majorValue, setMajorValue] = useState([])
  const [selectMajor, setSelectMajor] = useState(false)
  const [promotionValue, setPromotionValue] = useState(null)
  const [promotions, setPrototions] = useState([])
  const [thefemalepercent, setFemalepercent] = useState([])
  const [themalepercent, setMalepercent] = useState([])
  const [theselMajor, setTheMajor] = useState([])
  const [theAvg, setAvg] = useState([])
  const [companyStats, setCompanyStats] = useState([])

  const handlePromotions = async () => {
    try {
        const { data } = await axios.post('/api/pmApi/getPromotionsByMajor', {
          majorID: majorValue,
        });
        setPrototions(data)
        console.log('the promotions : ', data)
        return;
      
    } catch (error) {
      console.log('this error from handlePromotion : ', error)
      return;
    }
  };

  useEffect(() => {
    handlePromotions()
    setPromotionValue(null)
  },[majorValue])

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
  }, [])

  useEffect(() => {
    let calStat = async () => {
      function calculateAge(dateOfBirth) {
        const dob = new Date(dateOfBirth);
        const today = new Date();
        const ageInMilliseconds = today - dob;
        const ageInYears = Math.floor(ageInMilliseconds / (365.25 * 24 * 60 * 60 * 1000));
        return ageInYears;
    }
    
    const {data} = await axios.post('/api/pmApi/statistics',{
        major_id: majorValue,
        promotion: promotionValue
    })
    console.log('the data of the statistics : ', data.data)
    const studentIDs = data.data.map(student => student.student_id);
    const companyRes = await axios.post('/api/pmApi/statisticsCompany',{
      studentIDs: studentIDs
      })
      console.log('companyRes : ', companyRes)

      const calculatePercentages = (array) => {
        const totalCount = array.length;
        const establishmentCounts = array.reduce((acc, item) => {
          const establishment = item.establishment || 'empty';
          acc[establishment] = (acc[establishment] || 0) + 1;
          return acc;
        }, {});
      
        const establishmentPercentages = Object.keys(establishmentCounts).map(key => ({
          establishment: key,
          percentage: ((establishmentCounts[key] / totalCount) * 100).toFixed(2)
        }));
      
        return establishmentPercentages;
      };
      
      const establishmentPercentages = calculatePercentages(companyRes.data.data);
      console.log('establishmentPercentages : ', establishmentPercentages)
      setCompanyStats(establishmentPercentages)
    let femalecount = 0
    let malecount = 0
    let age = 0
    let avg=0
    let sum= data.data.length
    data?.data.map(ind => {
        ind.gender === 'Female' ? femalecount++ : malecount++;
        age+=calculateAge(ind.dateofbirth)
        console.log(calculateAge(ind.dateofbirth))
})
   avg = sum !== 0 ? age/sum : 0;
   let femalepercent = sum !== 0 ? (femalecount/sum*100).toFixed(2) : 0;
   let malepercent = sum !== 0 ? (malecount/sum*100).toFixed(2) : 0;
   let theMajor = majors.filter(major => major.major_id === majorValue)[0].major_name;

   setFemalepercent(femalepercent)
   setMalepercent(malepercent)
   setTheMajor(theMajor)
   setAvg(avg)
    }
    selectMajor && majorValue != '' && calStat()

    
  },[selectMajor,majorValue,promotionValue])

  const exportData = async() => {
    try {

    const additionalDataObject = companyStats.reduce((obj, item) => {
      // obj[item.key] = item.value;
      obj[item.establishment] = `${item.percentage} %`;
      return obj;
    }, {});

    console.log('additionalDataObject : ', additionalDataObject)

    const stats = [{
       'MajorName': theselMajor,
       'Promotion': promotionValue,
       'Male Ratio': `${themalepercent} %`,
       'Female Ratio': `${thefemalepercent} %`,
       'Average Age': theAvg,
       ...additionalDataObject
    }]

      // Convert modified data to XLSX format
      const ws = XLSX.utils.json_to_sheet(stats);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Attendance Report");

      // Save the file
      const fileName = `Major-.xlsx`;
      XLSX.writeFile(wb, fileName);
      
    } catch (error) {
      console.error("Error exporting data: ", error);
    }
  };
 

  return (
    <>
      <Head>
        <title>SIS Program Manager - Statistics</title>
      </Head>

      {session?.user.role === '2' || session?.user.role === "3" ? (<>
        <div className='grid lg:grid-cols-1 gap-5 mb-5'>
        <p className='text-gray-700 text-3xl pt-5 mb-10 font-bold'>Statistics</p>
        <div className='flex flex-col'>
        <div className='flex justify-around items-center flex-col h-40 lg:flex-row sm:h-auto'>
          {session.user?.hasMultiMajor === "true" ? <>
          <>
          <label className='mb-4 md:mt-3 md:w-40'>
              <select
                onChange={(e) => {setMajorValue(e.target.value) ; setSelectMajor(true)}}
                value={majorValue}

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
            <label className="mb-4 md:mt-3 md:w-40">
              
              <select
                onChange={(e) => setPromotionValue(e.target.value)}
                value={promotionValue}
              >
                <option key={"uu2isdvf"} value="">
                  Choose a Promotion
                </option>
                {promotions &&
                  promotions.map((promotion) => (
                    <option key={promotion.promotion_id} value={promotion.promotion_name}>
                      {promotion.promotion_name}
                    </option>
                  ))}
              </select>
            </label>
          </> 
       
            {selectMajor && majorValue != '' ? <button
              className="primary-button btnCol text-white  w-60 hover:text-white hover:font-bold self-center"
              type="button"
              onClick={exportData}
            >
              Export
            </button>

            :<>
          
            </> }
          </> : <></>}
        </div>
        {selectMajor && majorValue != '' &&
            <StatisticsTable theselMajor={theselMajor} promotionValue={promotionValue} themalepercent={themalepercent} thefemalepercent={thefemalepercent} theAvg={theAvg} companyStats={companyStats}/>
            }
          </div>
        </div>
      </>) : redirect()}
    </>
  );
}
Statistics.auth = true;
Statistics.adminOnly = true;
