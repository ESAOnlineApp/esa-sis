import React from 'react';
import {
  PencilIcon,
  Cog8ToothIcon,
  ComputerDesktopIcon,
  // CreditCardIcon,
  // TableCellsIcon,
  // CalendarDaysIcon,
  ClipboardDocumentListIcon,
  // PencilSquareIcon,
  // HandRaisedIcon,
  // UserGroupIcon,
  // NewspaperIcon,
  // AcademicCapIcon,
  // WalletIcon,
  ArrowPathIcon,
  ChartBarIcon,
  WalletIcon,
  ArrowDownCircleIcon,
  UserGroupIcon,
  // UserPlusIcon,
  PlusCircleIcon
} from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import Link from 'next/link';

const AdminView = () => {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col">
        {/* Account Managment */}

        <Link href="/admin/Accounts">
          <div
            className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == '/admin/Accounts' ||
              router.pathname == '/admin/CreateTeacherAccount' ||
              router.pathname == '/admin/createAccount' ||
              router.pathname == '/admin/create' ||
              router.pathname == '/admin/UploadStudent' ||
              router.pathname == '/admin/UploadTeacher' || 
              router.pathname == '/admin/UploadSTAlumni' ||
              router.pathname == '/admin/StudentAccount'

                ? 'bg-blue-100 text-blue-500'
                : 'text-gray-400 hover:bg-blue-100 hover:text-blue-500'
            }`}
            disabled={true}
          >
            <div className="mr-2">
              <UserGroupIcon className="h-5 w-5" />
            </div>
            <div>
              <p>ESA Team Accounts</p>
            </div>
          </div>
        </Link>

        <Link href="/admin/Download">
          <div
            className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == '/admin/Download'
                ? 'bg-blue-100 text-blue-500'
                : 'text-gray-400 hover:bg-blue-100 hover:text-blue-500'
            }`}
          >
            <div className="mr-2">
              <ArrowDownCircleIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Download</p>
            </div>
          </div>
        </Link>

        {/* Create Section */}

        {/* <Link href="/admin/createAccount">
          <div
            className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/admin/createAccount"
                ? "bg-blue-100 text-blue-500"
                : "text-gray-400 hover:bg-blue-100 hover:text-blue-500"
            }`}
            disabled={true}
          >
            <div className="mr-2">
              <UserPlusIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Create Accounts</p>
            </div>
          </div>
        </Link> */}
        <Link href="/admin/Courses">
          <div
            className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == '/admin/Courses' ||
              router.pathname == '/admin/createCourse' ||
              router.pathname == '/admin/assign' ||
              router.pathname == '/admin/UploadCourses'
                ? 'bg-blue-100 text-blue-500'
                : 'text-gray-400 hover:bg-blue-100 hover:text-blue-500'
            }`}
            disabled={true}
          >
            <div className="mr-2">
              <WalletIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Courses</p>
            </div>
          </div>
        </Link>

        <Link href="/admin/Addition">
          <div
            className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == '/admin/Addition'
                ? 'bg-blue-100 text-blue-500'
                : 'text-gray-400 hover:bg-blue-100 hover:text-blue-500'
            }`}
            disabled={true}
          >
            <div className="mr-2">
              <PlusCircleIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Addition</p>
            </div>
          </div>
        </Link>

        <Link href="/admin/ResetPassword">
          <div
            className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == '/admin/ResetPassword'
                ? 'bg-blue-100 text-blue-500'
                : 'text-gray-400 hover:bg-blue-100 hover:text-blue-500'
            }`}
            disabled={true}
          >
            <div className="mr-2">
              <ArrowPathIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Reset Password</p>
            </div>
          </div>
        </Link>

        {/* Profile Section */}
        <Link href="/admin/profile">
          <div
            className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == '/admin/profile'
                ? 'bg-blue-100 text-blue-500'
                : 'text-gray-400 hover:bg-blue-100 hover:text-blue-500'
            }`}
          >
            <div className="mr-2">
              <PencilIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Edit Profile</p>
            </div>
          </div>
        </Link>
        {/* Main Board Section */}
        <Link href="/admin/main">
          <div
            // className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
            //   router.pathname == "/admin/main"
            //     ? "bg-red-100 text-red-500"
            //     : "text-gray-400 hover:bg-blue-100 hover:text-blue-500"
            // }`}
            className={`pl-2 py-3 mx-5  text-red-400 hover:bg-red-100 hover:text-red-500 rounded text-center cursor-pointer mb-3 flex items-center transition-colors bg-red-100 text-red-500"
                
            `}
          >
            <div className="mr-2">
              <ComputerDesktopIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Main Board</p>
            </div>
          </div>
        </Link>
        {/* Statistics Section */}
        <Link href="/admin/Statistics">
          <div
            // className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
            //   router.pathname == "/admin/main"
            //     ? "bg-red-100 text-red-500"
            //     : "text-gray-400 hover:bg-blue-100 hover:text-blue-500"
            // }`}
            className={`pl-2 py-3 mx-5  text-red-400 hover:bg-red-100 hover:text-red-500 rounded text-center cursor-pointer mb-3 flex items-center transition-colors bg-red-100 text-red-500"
                
            `}
          >
            <div className="mr-2">
              <ChartBarIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Statistics</p>
            </div>
          </div>
        </Link>
        {/* Settings Section */}
        <Link href="/admin/main">
          <div
            // className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
            //   router.pathname == "/admin/main"
            //     ? "bg-red-100 text-red-500"
            //     : "text-gray-400 hover:bg-blue-100 hover:text-blue-500"
            // }`}
            className={`pl-2 py-3 mx-5  text-red-400 hover:bg-red-100 hover:text-red-500 rounded text-center cursor-pointer mb-3 flex items-center transition-colors bg-red-100 text-red-500"
                
            `}
          >
            <div className="mr-2">
              <Cog8ToothIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Settings</p>
            </div>
          </div>
        </Link>
        {/* Report Section */}

        <Link href="/admin/report">
          <div
            // className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
            //   router.pathname == "/admin/main"
            //     ? "bg-red-100 text-red-500"
            //     : "text-gray-400 hover:bg-blue-100 hover:text-blue-500"
            // }`}
            className={`pl-2 py-3 mx-5  text-red-400 hover:bg-red-100 hover:text-red-500 rounded text-center cursor-pointer mb-3 flex items-center transition-colors bg-red-100 text-red-500"
                
            `}
          >
            <div className="mr-2">
              <ClipboardDocumentListIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Report</p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default AdminView;
