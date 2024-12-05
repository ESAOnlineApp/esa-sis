import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Link from 'next/link';

const SocialIcons = () => {
  return (
    <div className='flex flex-col max-[300px]:hidden relative bg-gray-600 p-2 gap-2 rounded-lg'>
      <Link
        href={'#'}
        className='bg-blue-500 text-white hover:text-white hover:bg-blue-600 p-1'
      >
        <FacebookIcon fontSize='large' />
      </Link>
      <Link
        href={'#'}
        className='bg-rose-500 text-white hover:text-white hover:bg-rose-600  p-1'
      >
        <InstagramIcon fontSize='large' />
      </Link>
      <Link
        href={'#'}
        className='bg-green-500 text-white hover:text-white hover:bg-green-600  p-1'
      >
        <WhatsAppIcon fontSize='large' />
      </Link>
      <Link
        href={'#'}
        className='bg-blue-500 text-white hover:text-white hover:bg-blue-600  p-1'
      >
        <TwitterIcon fontSize='large' />
      </Link>
      <Link
        href={'#'}
        className='bg-blue-600 text-white hover:text-white hover:bg-blue-700  p-1'
      >
        <LinkedInIcon fontSize='large' />
      </Link>
    </div>
  );
};

export default SocialIcons;
