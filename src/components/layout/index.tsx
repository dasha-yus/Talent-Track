import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from './navbar/Navbar';

export const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Suspense fallback={<></>}>
          <Outlet />
        </Suspense>
      </main>
      {/* <ToastContainer /> */}
    </>
  );
};
