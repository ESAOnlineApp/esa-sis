import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
// import Link from 'next/link';


export default function Payments() {
  const { data: session } = useSession();
  const router = useRouter()
  const redirect = () => { 
    router.push('/AccessDenied')
  }
  
  return (
    <>
      <Head>
        <title>SIS Admin - Payments</title>
      </Head>

     {session?.user.role === '2' || session?.user.role === "3"? ( <>
        <p className='text-gray-700 text-3xl pt-5 mb-10 font-bold'>Payments</p>

        <div className='grid lg:grid-cols-1 gap-5 mb-5'>Payments Table</div>
      </>) : redirect()}
    </>
  );
}
Payments.auth = true;
Payments.adminOnly = true;
