//Kimibwmversion\boardwithme\frontend\src\pages\Landing.tsx
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logo from '../assets/logo.jpg';
import Loader from '../components/Loader';

export default function Landing() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState([
    { text: "BoardWithMe made my interstate travel so easy and safe. Highly recommended!", user: "Ada, Lagos" },
    { text: "As a driver, I found the platform reliable and the payment secure.", user: "Musa, Abuja" },
    // Add more from backend later
  ]);

  useEffect(() => {
    // Simulate loading for 1.5 seconds
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 to-blue-200 flex flex-col">
      <nav className="flex items-center justify-between p-4 bg-white shadow">
        <div className="flex items-center">
          <img src={logo} alt="BoardWithMe Logo" className="w-8 h-8 mr-2 object-contain" />
          <span className="font-bold text-xl text-green-700">BoardWithMe</span>
        </div>
        <div className="flex gap-4">
          <button onClick={() => navigate('/about')} className="text-green-700 font-semibold">About</button>
          <button onClick={() => navigate('/login')} className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold">Sign In</button>
          <button onClick={() => navigate('/register')} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold">Register</button>
        </div>
      </nav>
      <main className="flex-grow flex flex-col items-center justify-center">
        <div className="text-center mt-16">
          <img src={logo} alt="BoardWithMe Logo" className="w-20 h-20 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-2">Welcome to BoardWithMe</h1>
          <p className="text-lg text-white mb-8">
            Nigeria's premier transport platform connecting verified drivers and passengers for safe, reliable inter and intra-state travel.
          </p>
          <button onClick={() => navigate('/register')} className="bg-white text-green-700 px-6 py-3 rounded-lg font-bold shadow">
            Get Started Today
          </button>
        </div>
        <section className="mt-16 max-w-3xl w-full mx-auto bg-white rounded-xl shadow p-8">
          <h2 className="text-2xl font-bold mb-4 text-green-700">Why Choose BoardWithMe?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex flex-col items-center">
              <span className="bg-green-100 p-3 rounded-full mb-2">
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#15803d"/><path d="M12 17c2.21 0 4-1.79 4-4h-8c0 2.21 1.79 4 4 4z" fill="#fff"/></svg>
              </span>
              <span className="font-bold text-green-700">Verified Drivers</span>
              <span className="text-gray-500 text-sm text-center">All drivers undergo thorough KYC verification for your safety</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="bg-blue-100 p-3 rounded-full mb-2">
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="8" fill="#15803d"/><rect x="7" y="11" width="10" height="2" fill="#fff"/></svg>
              </span>
              <span className="font-bold text-green-700">Secure Payments</span>
              <span className="text-gray-500 text-sm text-center">Escrow system ensures safe transactions for all parties</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="bg-purple-100 p-3 rounded-full mb-2">
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#a78bfa"/><path d="M8 12h8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
              </span>
              <span className="font-bold text-green-700">Real-time Chat</span>
              <span className="text-gray-500 text-sm text-center">Communicate with your travel group before and during trips</span>
            </div>
          </div>
          <h2 className="text-xl font-bold mb-2 text-green-700">User Testimonials</h2>
          <div className="overflow-x-auto whitespace-nowrap space-x-4 flex py-4">
            {testimonials.map((t, i) => (
              <div key={i} className="inline-block min-w-[300px] max-w-xs bg-gray-50 rounded-lg shadow px-4 py-3 mx-2">
                <blockquote className="text-gray-700 mb-1">"{t.text}"</blockquote>
                <span className="text-xs text-gray-400">– {t.user}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
