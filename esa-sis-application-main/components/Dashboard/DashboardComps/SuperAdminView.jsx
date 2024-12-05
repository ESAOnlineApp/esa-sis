import React from 'react';
import {
  // PencilIcon,
  // Cog8ToothIcon,
  // ComputerDesktopIcon,
  // // CreditCardIcon,
  // // TableCellsIcon,
  // // CalendarDaysIcon,
  // ClipboardDocumentListIcon,
  // PencilSquareIcon,
  // HandRaisedIcon,
  // UserGroupIcon,
  // NewspaperIcon,
  // AcademicCapIcon,
  // WalletIcon,
  // ChartBarIcon,
  // UserGroupIcon,
  UserPlusIcon,
} from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import Link from 'next/link';

const SuperAdminView = () => {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col">
        {/* Account Managment */}

        <Link href="/superAdmin/ResetPassword">
          <div
            className={`pl-2 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == '/admin/ResetPassword'
                ? 'bg-blue-100 text-blue-500'
                : 'text-gray-400 hover:bg-blue-100 hover:text-blue-500'
            }`}
            disabled={true}
          >
            <div className="mr-2">
              <UserPlusIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Reset Password</p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default SuperAdminView;
