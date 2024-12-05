import Head from 'next/head';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { appIsWaiting } from '../../redux/slices/appSlice';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import TabsComponent from '../../components/tabs/TabsComponent';
// import axios from 'axios';
import Items from './items';
// import Link from 'next/link';


export default function Financial() {
  // const appState = useSelector(
  //   (state) => state.persistedReducer.app_state.appState
  // );
  // console.log('appState.isWaiting==', appState.isWaiting);
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

  return (
    <>
      <Head>
        <title>SIS - Financial</title>
      </Head>

     {session?.user.role === '1' ? ( 
      <>
     <p className='text-gray-700 text-3xl pt-5 mb-10 font-bold text-primary'>Financial</p>
     <TabsComponent items={items} />
      </>
     ) : redirect()}

    </>
  );
}

const items = [
  {
    title: 'History',
    content: (
      <div className='border-2 border-primary rounded-lg p-4'>
        <h1 className='text-3xl text-primary'>Title Test 1</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
          aperiam asperiores doloribus velit dolore magnam ex consectetur fugit
          earum illum qui similique architecto dolorum, minima enim quidem
          voluptatibus at nulla deleniti harum! Totam, mollitia quos voluptatem
          deleniti provident obcaecati rerum.
        </p>
      </div>
    ),
  },
  {
    title: 'Future Payment',
    content: (
<Items />
    ),
  },
];
Financial.auth = true;
Financial.adminOnly = true;
