import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../lib/api';
import logo from '../assets/logo.jpg';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const location = useLocation();
  const links = [
    { label: 'Trips', to: '/trips' },
    { label: 'Boardwithme', to: '/boardwithme' },
    { label: 'Profile', to: '/profile' },
    { label: 'Chat', to: '/chat/1' },
  ];

  useEffect(() => {
    api.get('/auth/me/')
      .then(res => setUserType(res.data.user_type))
      .catch(() => setUserType(null));
  }, []);

  const dashboardPath = userType === 'driver'
    ? '/dashboard/driver'
    : userType === 'passenger'
    ? '/dashboard/passenger'
    : '/login';

  return (
    <header className="bg-primary text-white shadow">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <Link to="/dashboard/passenger" className="flex items-center text-xl font-bold">
          <img src={logo} alt="BoardWithMe Logo" className="w-8 h-8 mr-2 object-contain" />
          BoardWithMe
        </Link>
        <nav className="hidden md:flex space-x-4">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`hover:underline px-2 py-1 rounded ${location.pathname.startsWith(l.to) ? 'bg-white/20' : ''}`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={dashboardPath}
            className={`hover:underline px-2 py-1 rounded ${location.pathname.startsWith(dashboardPath) ? 'bg-white/20' : ''}`}
          >
            Dashboard
          </a>
        </nav>
        <button onClick={() => setOpen(!open)} className="md:hidden">
          {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <nav className="md:hidden px-4 py-2 space-y-2 bg-primary/90">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`block px-2 py-1 rounded ${location.pathname.startsWith(l.to) ? 'bg-white/20' : ''}`}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={dashboardPath}
            className={`block px-2 py-1 rounded ${location.pathname.startsWith(dashboardPath) ? 'bg-white/20' : ''}`}
            onClick={() => setOpen(false)}
          >
            Dashboard
          </a>
        </nav>
      )}
    </header>
  );
}
