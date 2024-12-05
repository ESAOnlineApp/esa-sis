/*
 * Created By: KANSO Adi, Jaber Mohamad
 * Project: SIS Application
 * File: components\Layout.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */
import Head from 'next/head';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
// import selection_data from '../utilities/selection_data';
import { DefaultSeo } from 'next-seo';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useSelector } from 'react-redux';

export default function Layout({ children, title }) {
  let pagetitle = 'ESA SIS Application';
  let description = 'ESA SIS Application';
  let og_description = 'ESA SIS Application';

  const appState = useSelector(
    (state) => state.persistedReducer.app_state.appState
  );

  let URL = 'https://www.esa.edu.lb/english/home';
  let LogoURL = appState.appVar.esa_logo;

  const { data: session } = useSession();

  switch (true) {
    case session?.user.major === 'BBA (Bachelor in Business Administration)': {
      pagetitle = pagetitle + '-' + session?.user.major;
      description = `<p>The Bachelor of Business Administration(BBA) is a unique program offered to young Baccalaureate holders, based on three pillars: academic excellence - international openness - development of employability.</p>
        <p>Our highly professionalizing BBA allows you to develop both your technical skills and your future leader personality, enabling you to claim the best opportunities on the labor market.</p>`;
      og_description = `
        <h3> Objectives</h3>
        <p>The Bachelor of Business Administration(BBA) is a unique program offered to young Baccalaureate holders, based on three pillars: academic excellence - international openness - development of employability.</p>
        <p>Our highly professionalizing BBA allows you to develop both your technical skills and your future leader personality, enabling you to claim the best opportunities on the labor market.</p>
        
        <h3>PROGRAM STRUCTURE</h3>
        <p>24 hours per week, except during internshipDuration: 3 years (6 semesters) or 4 years (8 semesters, 3 of which will be at ESSEC Business School) </p>
        
        <h3>DIPLOMAS</h3>
        <p>At the end of the second year, you may choose between:</p>
        <ul>
            <li>A three-year program to obtain the ESA BBA, with 180 validated ECTS credits</li>
            <li>A four-year program to obtain two diplomas from ESSEC Global BBA and ESA Global BBA, with 240 validated ECTS credits.</li>
        </ul> `;
      URL =
        'https://www.esa.edu.lb/english/bachelor-in-business-administration';
      LogoURL =
        'https://res.cloudinary.com/ds6avfn6i/image/upload/v1675418104/esaonlineapp/SEO/bba_d4anvf.png';

      break;
    }
    case session?.user.major ===
      'MSM (Mastère de Spécialisation en Marketing et Communication)': {
        pagetitle = pagetitle + '-' + session?.user.major;
        description = `<p>The Specialized Master in Marketing and Communication is a program that combines marketing/communication and management, in order to equip students with the skills and knowledge to succeed an international, cutting-edge career in marketing. The program offers students the opportunity to master and deepen the knowledge of the necessary theories and tools for the evolution of your functions.</p>`;
        og_description = `
        <h3> Objectives</h3>
        <p>The Specialized Master in Marketing and Communication is a program that combines marketing/communication and management, in order to equip students with the skills and knowledge to succeed an international, cutting-edge career in marketing. The program offers students the opportunity to master and deepen the knowledge of the necessary theories and tools for the evolution of your functions.</p>
        
        
        <h3>PROGRAM STRUCTURE</h3>
        <p>Duration : 16 months</p>
        <p>Courses are held one week out of every three, from Tuesday to Friday from 4:30 P.M. to 9:00 P.M. and on Saturday from 9:00 A.M to 1.30 P.M.</p>
        <p>An optional international seminar is organized in Europe every year.</p>
        
        <h3>DIPLOMAS</h3>
        <p>TWO INTERNATIONAL DIPLOMAS</p>
        <ul>
            <li>Specialized Master in Marketing and Communication from the ESA</li>
            <li>Specialized Executive Master in Marketing and Communication from ESCP Europe</li>
        </ul> `;

        URL =
          'https://www.esa.edu.lb/english/mastere-de-specialisation-en-marketing-et-communication/mastere-de-specialisation-en-marketing-et-communication';
        LogoURL =
          'https://res.cloudinary.com/ds6avfn6i/image/upload/v1675418103/esaonlineapp/SEO/msm_yurwon.png';

        break;
      }
    case session?.user.major ===
      'EMFM (Executive Master in Financial Management)': {
        pagetitle = pagetitle + '-' + session?.user.major;
        description = `<p>Deliver to professionals working in finance comprehensive knowledge and skills to master the techniques and tools of finance management, with a balance between corporate finance, investment, and financial markets subjects.</p> `;
        og_description = `
        <h3> Objectives</h3>
        <p>Deliver to professionals working in finance comprehensive knowledge and skills to master the techniques and tools of finance management, with a balance between corporate finance, investment, and financial markets subjects. </p>
        
        <h3>PROGRAM STRUCTURE</h3>
        <p>Duration: 18 months</p>

        <h3>Organization of courses:</h3>
        <p>Courses are given on a monthly basis, in 3-day modules</p>
        <p>Courses by SDA Bocconi professors are delivered once per month, on Wednesday evenings from 6pm to 9pm , Thursdays and Fridays from 9am to 6pm.</p>
        <p>Courses by ESA professors are delivered once per month, on Thursdays, Fridays from 9am to 6pm and Saturday mornings from 9am to 12pm.</p>
        <p>Optional international summer study trip to Milan hosted by SDA Bocconi School of Management.</p>

        
        <h3>DIPLOMAS</h3>
        <p>AN INTERNATIONAL DIPLOMA </p>
        <ul>
            <li>The Executive Master in Financial Management is a co-branded degree, delivered jointly by ESA Business School and SDA Bocconi School of Management.</li>
        </ul> `;
        URL =
          'https://www.esa.edu.lb/english/executive-master-in-financial-management';
        LogoURL =
          'https://res.cloudinary.com/ds6avfn6i/image/upload/v1675418103/esaonlineapp/SEO/emfm_essvvs.png';

        break;
      }
    case session?.user.major ===
      'MEMS (Master Executif en Management de la Santé)': {
        pagetitle = pagetitle + '-' + session?.user.major;
        description = `<p>The Executive Masters in Healthcare Management aims to train experts on the evaluation of health actions and the steering of organizations and projects in the health, social and hospital sector.</p>`;
        og_description = `
        <h3> Objectives</h3>
        <p>The Executive Masters in Healthcare Management aims to train experts on the evaluation of health actions and the steering of organizations and projects in the health, social and hospital sector.</p>
       
        
        <h3>PROGRAM STRUCTURE</h3>
        <p>The program extends over 16 months.</p>
        <p>Courses take place once every 2 weeks, on Friday and Saturday or Thursday, Friday and Saturday from 9:00 A.M to 5:00 P.M.</p>
        <p>An international seminar is organized in Paris every year.</p>
        
        <h3>DIPLOMAS</h3>
        <p></p>
        <ul>
            <li>Executive Masters in Healthcare Management from the ESA</li>
            <li>Master 2 "AMES" – Analysis and management of healthcare institutions, delivered by Université de Paris Cité, state diploma</li>
        </ul> `;
        URL =
          'https://www.esa.edu.lb/english/program/master-executif-en-management-de-la-sante';
        LogoURL =
          'https://res.cloudinary.com/ds6avfn6i/image/upload/v1675418103/esaonlineapp/SEO/mems_qalxgn.png';

        break;
      }
    case session?.user.major === 'MENT (Masters in Entrepreneurship)': {
      pagetitle = pagetitle + '-' + session?.user.major;
      description = `<p>The Master’s degree in Entrepreneurship enables you to acquire the necessary knowledge and tools to develop an expertise and a global overview on entrepreneurship.</p>
      <p>Whether you become an entrepreneur or a specialist in entrepreneurial practices, this program will be your assurance to a quick integration into the professional world of tomorrow.</p>
      `;
      og_description = `
        <h3> Objectives</h3>
        <p>The Master’s degree in Entrepreneurship enables you to acquire the necessary knowledge and tools to develop an expertise and a global overview on entrepreneurship.</p>
        <p>Whether you become an entrepreneur or a specialist in entrepreneurial practices, this program will be your assurance to a quick integration into the professional world of tomorrow.</p>
        
        <h3>PROGRAM STRUCTURE</h3>
        <p>12 months: blended online and on campus course</p>
        <p>Classes are held on a weekly basis from 5:30pm till 8:30pm</p>
        <p>The Master’s degree in Entrepreneurship is a unique program based on the “learning by doing” pedagogy of HEC Paris which combines theoretical courses, specialized seminars and field missions.</p>
        <p>Courses are given by international professors and experts who participated in the development of start-ups and entrepreneurial projects in France and Lebanon.</p>
        <p>This immersion into the entrepreneurial world allows you to witness the rise of an enterprise and learn to manage complex and sometimes extreme managerial situations</p>
       
        
        <h3>DIPLOMAS</h3>
        <ul>
            <li>Masters in Innovation and Entrepreneurship by ESA Business school</li>
            <li>Certificate of innovation and Entrepreneurship by HEC PARIS</li>
        </ul> `;
      URL = 'https://www.esa.edu.lb/program/masters-in-entrepreneurship';
      LogoURL =
        'https://res.cloudinary.com/ds6avfn6i/image/upload/v1675418104/esaonlineapp/SEO/ment_bcnitn.png';
      break;
    }
    case session?.user.major ===
      'MIAD (Master in International Affairs and Diplomacy)': {
        pagetitle = pagetitle + '-' + session?.user.major;
        description = `<p>ESA’s Masters in International Affairs and Diplomacy is aimed at students who wish to deepen their knowledge in the field of international affairs and who are interested in careers in diplomacy.</p>`;
        og_description = `
        <h3> Objectives</h3>
        <p>ESA’s Masters in International Affairs and Diplomacy is aimed at students who wish to deepen their knowledge in the field of international affairs and who are interested in careers in diplomacy.</p>
        <p>ESA's Masters in International Affairs and Diplomacy aims to train students in the culture of diplomacy and field practices, know-how, fundamental theoretical knowledge, and language elements of international business.</p>
        <p>The program provides practical instructions delivered by ESA and the United Nations Institute for Training and Research (UNITAR) faculty, resulting in a unique learning experience to train future business executives, diplomats and senior international civil servants.</p>
        <p>The program is composed of theoretical lessons and practical approaches. It is followed by an internship and an end-of-year project. Students, depending on their profiles, will have the opportunity to live an experience at various UN entities or other international organisations and NGOs with the individualised support and coaching of UNITAR. With UNITAR’s guidance, students will be prepared on interview skills and CV/Cover Letter writing, as well as receiving general guidance navigating the UN System.</p>
        <p>The internship can be carried out within one of the UN funds, programs or agencies, in a specialized UN institute*, within one of the UN regional economic commissions, in another international organisation, or an NGO. At the end of the year and after the validation of the curriculum, students will receive a diploma of "Master in International Affairs and Diplomacy" co-signed by ESA and UNITAR.</p>
        
        <h3>FORMAT</h3>
        <p>10 modules of 18h each, classes from 4PM to 8:30PM</p>

        <h3>DURATION</h3>
        <p>12 months</p> `;
        URL =
          'https://www.esa.edu.lb/english/master-in-international-affairs-and-diplomacy';
        LogoURL =
          'https://res.cloudinary.com/ds6avfn6i/image/upload/v1675418104/esaonlineapp/SEO/miad_ikxbx6.png';
        break;
      }
    case session?.user.major === 'MIM (International Masters In Management)': {
      pagetitle = pagetitle + '-' + session?.user.major;
      description = `<p>This program is intended for high-potential students who wish to deepen their knowledge in international management. A panel of specializations offered in the second year will allow them to go deeper in the field of their choice, to complete the knowledge acquired in the first year and to give them the necessary tools to become tomorrow's leaders and entrepreneurs. </p>`;
      og_description = `
        <h3> Objectives</h3>
        <p>This program is intended for high-potential students who wish to deepen their knowledge in international management. A panel of specializations offered in the second year will allow them to go deeper in the field of their choice, to complete the knowledge acquired in the first year and to give them the necessary tools to become tomorrow's leaders and entrepreneurs. </p>
        <p>ESA's Master in International Management (MIM) aims to train promising young students in new international management practices, regardless of their previous academic background. Thanks to partnerships with the most prestigious management schools in Europe, the program offers excellent academic content in the fields of marketing, finance, luxury goods and consulting and is taught by a faculty of international renown.</p>
        <p>The second year of the MIM offers students the choice of a specialization aimed at providing them with the tools for understanding and analysis necessary for their success in a specific management field. Any transition to the second year including the choice of specialization is conditioned by the review of a file submitted to a selection jury.</p>
        
        <h3>FORMAT</h3>
        <p>Twenty-two and a half hours of weekly teaching (Monday to Friday, from 16:00 to 20:30)</p>

        <h3>DURATION</h3>
        <p>Twenty-four months</p> `;
      URL =
        'https://www.esa.edu.lb/english/masters-in-international-management';
      LogoURL =
        'https://res.cloudinary.com/ds6avfn6i/image/upload/v1675418103/esaonlineapp/SEO/mim_cegcdz.png';
      break;
    }
    case session?.user.major === 'DBA (Doctorate in Business Administration)': {
      pagetitle = pagetitle + '-' + session?.user.major;
      description = `<p>Professionals wishing to undertake research work, to go further in their knowledge on a particular field, while remaining in business.</p>`;
      og_description = `
        <h3> Objectives</h3>
        <p>Professionals wishing to undertake research work, to go further in their knowledge on a particular field, while remaining in business.</p>
    
        
        <h3>PROGRAM STRUCTURE</h3>
        <p>Part Time program</p>
        <p>Organization of courses: once a month - Thursday, Friday and Saturday</p>

        
        <h3>DIPLOMAS</h3>
        <p></p>
        <ul>
            <li>The Doctorate in Business Administration from ESA Business School</li>
            <li>The Executive Doctorate in Business Administration from Université Cote D’azur – IAE de Nice</li>
        </ul> `;
      URL =
        'https://www.esa.edu.lb/english/program/doctorate-in-business-administration';
      LogoURL =
        'https://res.cloudinary.com/ds6avfn6i/image/upload/v1675418103/esaonlineapp/SEO/dba_yipjuh.png';
      break;
    }
    case session?.user.major === 'MBA (Master in Business Administration)': {
      pagetitle = pagetitle + '-' + session?.user.major;
      description = `<p>The MBA program is a high-level training in management, launched by ESA since its foundation in 1996. It is the ideal program to help students master the language and tools of management, develop entrepreneurial skills, achieve their business plans, meet the new challenges of the labor market that has become extremely competitive, and go international.<p>`;
      og_description = `
      
        <h3> AMBA ACCREDITATION</h3>
        <p>ESA Business School is the first in Lebanon to obtain the AMBA Accreditation, the highest international distinction for MBA and Executive MBA programs.</p>
        <p>The programs have been reaccredited for 5 years in 2022. </p>

        <h3> Objectives</h3>
        <p>The MBA program is a high-level training in management, launched by ESA since its foundation in 1996. It is the ideal program to help students master the language and tools of management, develop entrepreneurial skills, achieve their business plans, meet the new challenges of the labor market that has become extremely competitive, and go international. </p>
        <p>Within the MBA curriculum at ESA Business School, an emphasis on Entrepreneurship courses and tools will be offered through certain modules and seminars. It can enable students to play a role in the economic development of the country by initiating and implementing a start-up business or by being innovative within the organization they work for, for better performance and actions taken.</p>
        
        <h3>PROGRAM STRUCTURE</h3>
        <p>The program extends over 16 months of courses.</p>
        <p>Courses are held on a week-on, week-off basis, from Monday to Friday from 05:00 pm till 09:00 pm, except for: </p>
        <ul>
            <li>2 seminars: delivered Thursday, Friday and Saturday, from 09:00 am till 06:00 pm.</li>
            <li>1 seminar: delivered from Wednesday to Saturday, from 09:00 am till 06:30 pm.</li>
        </ul>
        <p>An international seminar of 5 days is held in Paris every year.</p>
        
        <h3>DIPLOMAS</h3>
        <p>TWO INTERNATIONAL DIPLOMAS</p>
        <ul>
            <li>The MBA from ESA Business School </li>
            <li>The DESM (Diplôme d'Études Supérieures en Management) from ESCP Business School</li>
        </ul> `;
      URL = 'https://www.esa.edu.lb/master-in-business-administration';
      LogoURL =
        'https://res.cloudinary.com/ds6avfn6i/image/upload/v1675418103/esaonlineapp/SEO/mba_lqslwp.png';
      break;
    }
    case session?.user.major ===
      'EMBA (Executive Masters in Business Administration)': {
        pagetitle = pagetitle + '-' + session?.user.major;
        description = `<p>The EMBA allows executives and managers to grasp the different dynamics of the business world today. This program allows students to acquire complete mastery of the management tools and concepts. It provides real insight into the strategic layer of business, where leadership and decision-making are at the heart of the process.</p>`;
        og_description = `
        <h3> Objectives</h3>
        <p>The EMBA allows executives and managers to grasp the different dynamics of the business world today. This program allows students to acquire complete mastery of the management tools and concepts. It provides real insight into the strategic layer of business, where leadership and decision-making are at the heart of the process.</p>
        
        <h3>PROGRAM STRUCTURE</h3>
        <p>Duration: 18 months</p>
        <p>Organization of courses: once a month - Thursday, Friday and Saturday Schedule: from 9:00 A.M. to 6:00 P.M.</p>
        
        <h3>DIPLOMAS</h3>
        <p>TWO INTERNATIONAL DIPLOMAS</p>
        <ul>
            <li>Executive MBA from the ESA Business School</li>
            <li>Executive MBA from ESCP Business School</li>
        </ul> `;
        URL = 'https://www.esa.edu.lb/executivemba';
        LogoURL =
          'https://res.cloudinary.com/ds6avfn6i/image/upload/v1675418104/esaonlineapp/SEO/emba_xgdmzb.png';
        break;
      }
  }

  return (
    <>
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
              alt: `${session?.user.major
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

      <div>
        <Head>
          <title>
            {title ? title + '- ESA SIS Application' : 'ESA SIS Application'}
          </title>
          {/* Other head elements */}
        </Head>
        <div>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
        <footer>
          {/* Other footer content */}
          <Link href="/privacy-policy.txt">
            <a>Privacy Policy</a>
          </Link>
        </footer>
      </div>
    </>
  );
}
