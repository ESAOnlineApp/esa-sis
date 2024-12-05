import { forwardRef } from "react";
import Link from "next/link";
// import {
//   PencilIcon,
//   Cog8ToothIcon,
//   ComputerDesktopIcon,
//   CreditCardIcon,
//   TableCellsIcon,
//   CalendarDaysIcon,
//   ClipboardDocumentListIcon,
//   PencilSquareIcon,
//   HandRaisedIcon,
//   UserGroupIcon,
//   NewspaperIcon,
//   AcademicCapIcon,
//   WalletIcon,
// } from '@heroicons/react/24/solid';
import StudentView from "./DashboardComps/StudentView";
import ProgramManagerView from "./DashboardComps/ProgramManagerView";
import AdminView from "./DashboardComps/AdminView";
// import { useRouter } from 'next/router';
// import selection_data from '../../utilities/selection_data';
import { useSession } from "next-auth/react";
import SuperAdminView from "./DashboardComps/SuperAdminView";
// import { useSelector } from 'react-redux';
// import esaLogo from '../../public/images/esa.png';
// import Image from 'next/image';
// eslint-disable-next-line no-unused-vars
const DashboardSideBar = forwardRef(({ showNav }, ref) => {
  // const router = useRouter();
  // eslint-disable-next-line no-unused-vars
  const { status, data: session } = useSession();
  // const appState = useSelector(
  //   (state) => state.persistedReducer.app_state.appState
  // );

  // console.log(session);
  return (
    <>
      <div ref={ref} className="fixed w-52 h-full overflow-auto bg-white z-10">
        <div className="flex justify-center mt-2 mb-2">
          <Link href="/" className="text-lg font-bold mt-1">
            <picture>
              <img
                className="w-32 h-auto"
                src={
                  "https://res.cloudinary.com/ds6avfn6i/image/upload/v1684261612/esaonlineapp/public/esa-logo_y9a1ha.png"
                }
                // src={appState.appVar.esa_logo}
                alt="ESA logo"
              />
            </picture>
          </Link>
        </div>
        {session?.user.role === "0" && <AdminView />}
        {session?.user.role === "4" && <SuperAdminView />}

        {session?.user.role === "1" && <StudentView />}

        {(session?.user.role === "2" || session?.user.role === "3" )&& <ProgramManagerView />}
      </div>
    </>
  );
});

DashboardSideBar.displayName = "DashboardSideBar";

export default DashboardSideBar;
