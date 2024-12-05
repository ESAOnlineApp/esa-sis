import { useState, useEffect, Fragment } from 'react';
import DashboardSideBar from './DashboardSideBar';
import DashboardTopBar from './DashboardTopBar';
import { Transition } from '@headlessui/react';
import { DefaultSeo } from 'next-seo';
import { useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import Head from 'next/head';

export default function AdminLayout({ children }) {
  const [showNav, setShowNav] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const appState = useSelector(
    (state) => state.persistedReducer.app_state.appState
  );

  let pagetitle = 'ESA SIS Application';
  let description = 'ESA SIS Application';
  let og_description = 'ESA SIS Application';
  let URL = 'https://www.esa.edu.lb/english/home';
  // FIXME: Dear SIS team developper please change the logo URL to the new one
  let LogoURL = appState.appVar.esa_logo;
  const { data: session } = useSession();

  function handleResize() {
    if (innerWidth <= 640) {
      setShowNav(false);
      setIsMobile(true);
    } else {
      setShowNav(true);
      setIsMobile(false);
    }
  }

  useEffect(() => {
    if (typeof window != 'undefined') {
      addEventListener('resize', handleResize);
    }

    return () => {
      removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Head>
        <link rel="icon" href="/public/esa.ico" />
      </Head>
      <DefaultSeo
        title={pagetitle}
        description={description}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: [
              'ESA BUSINESS SCHOOL',
              'ESA SIS Application',
              'BBA (Bachelor in Business Administration)',
              'DBA (Doctorate in Business Administration)',
              // 'DU (Diplome Universitaire en Recherche)',
              'EMBA (Executive Masters in Business Administration)',
              'EMFM (Executive Master in Financial Management)',
              'MBA (Master in Business Administration)',
              'MEMS (Master Executif en Management de la Santé)',
              'MENT (Masters in Entrepreneurship)',
              'MIAD (Master in International Affairs and Diplomacy)',
              'MIM (International Masters In Management)',
              'MSM (Mastère de Spécialisation en Marketing et Communication)',
            ],
          },
        ]}
        openGraph={{
          site_name: 'ESA SIS Application',
          type: 'website',
          locale: 'en_IE',
          url: `${URL}`,
          title: `${pagetitle}`,
          description: `${og_description}`,
          images: [
            {
              url: `${LogoURL}`,
              alt: `${
                session?.user.major
                  ? session?.user.major
                  : 'ESA BUSINESS SCHOOL - SIS Application'
              }`,
            },
          ],
        }}
        twitter={{
          handle: '@ESABeirut',
          site: '@ESABeirut',
          cardType: 'summary_large_image',
          title: `${pagetitle}`,
          description: `${description}`,
          image: `${LogoURL}`,
        }}
      />

      <DashboardTopBar showNav={showNav} setShowNav={setShowNav} />
      <Transition
        as={Fragment}
        show={showNav}
        enter="transform transition duration-[400ms]"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transform duration-[400ms] transition ease-in-out"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <DashboardSideBar showNav={showNav} />
      </Transition>
      <main
        className={`pt-16 transition-all duration-[400ms] ${
          showNav && !isMobile ? 'pl-56' : ''
        }`}
      >
        <div className="px-4 md:px-16">{children}</div>
      </main>
    </>
  );
}
