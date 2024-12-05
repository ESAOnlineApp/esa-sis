const axios = require("axios");

// import axios from "axios";

async function handler() {
  // console.log('hello')
  try {
    // let {data} = await axios.get("https://survey.esa.edu.lb/BPI/PathwayService.svc/PWGetUserPreventAccess?pathway=140&userid=201705636");

    // "https://survey.esa.edu.lb/BPI/PathwayService.svc/PWBlueTasks?pathway=140&userid=201705636&SubjectIDs=2022_EMBA-CC-08_01,2022_EMBA-S-04_01,2022_EMBA-EC-03_02,2022_EMBA-EC-09_01"

    let { data } = await axios.get(
      "https://survey.esa.edu.lb/BPI/PathwayService.svc/PWBlueTasks?pathway=140&userid=201705636&SubjectIDs=2022_EMBA-CC-08_01,2022_EMBA-S-04_01,2022_EMBA-EC-03_02,2022_EMBA-EC-09_01"
    );

    console.log(data);
    //  return data
  } catch (error) {
    // return error;
    console.log("the error is: ", error);
  }
}
// export default handler;
module.exports = handler;

// export default async function Home({data}) {
//     // console.log(data)
//     // try {
//     //     // let {data} = await axios.get("https://survey.esa.edu.lb/BPI/PathwayService.svc/PWGetUserPreventAccess?pathway=140&userid=201705636");

//     //     // "https://survey.esa.edu.lb/BPI/PathwayService.svc/PWBlueTasks?pathway=140&userid=201705636&SubjectIDs=2022_EMBA-CC-08_01,2022_EMBA-S-04_01,2022_EMBA-EC-03_02,2022_EMBA-EC-09_01"

//     //     let {data} = await axios.get("https://survey.esa.edu.lb/BPI/PathwayService.svc/PWBlueTasks?pathway=140&userid=201705636&SubjectIDs=2022_EMBA-CC-08_01,2022_EMBA-S-04_01,2022_EMBA-EC-03_02,2022_EMBA-EC-09_01");

//     //      // console.log(data)
//     //     //  return data

//     // } catch (error) {
//     //     // return error;
//     //     // console.log('the error is: ', error)
//     // }
//   return (
//     <>
//     <div>Hello world</div>
//     </>
//   )
// }

// export async function getStaticPaths() {
//   const { data } = await axios.get('https://survey.esa.edu.lb/BPI/PathwayService.svc/PWGetUserPreventAccess?pathway=140&userid=201705636');
//   // Process the data and return an array of objects containing `params` key
//   return {
//     paths:data,
//     fallback: false
//   }
// }

// export async function getServerSideProps() {
//     const {data} = await axios.get('https://survey.esa.edu.lb/BPI/PathwayService.svc/PWGetUserPreventAccess?pathway=140&userid=201705636');

//     return {
//       props: {
//         // dates: data?.map(cov => cov.date),
//         data: data.Tasks
//       },
//     };
//   }

// export async function getServerSideProps() {
//   try {
//     const {data} = await axios.get('https://survey.esa.edu.lb/BPI/PathwayService.svc/PWGetUserPreventAccess?pathway=140&userid=201705636');
//     return {
//       props: {
//         data
//       }
//     }
//   } catch (error) {
//     console.error(error);
//     return {
//       props: {}
//     }
//   }
// }
