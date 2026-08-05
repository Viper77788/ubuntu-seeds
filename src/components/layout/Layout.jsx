import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from '../shared/WhatsAppButton';

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col max-w-full overflow-x-hidden relative">
      <Navbar />
      <main className="flex-1 max-w-full overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
