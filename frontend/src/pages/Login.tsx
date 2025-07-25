import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import api from '../lib/api'; // <-- add this import

export default function Login() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetValue, setResetValue] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    setLoading(true);
    try {
      const res = await api.post('/auth/login/', {
        phone_number: phone,
        password,
      });
      localStorage.setItem('access', res.data.access);
      localStorage.setItem('refresh', res.data.refresh);

      // Fetch user type after login
      const userRes = await api.get('/auth/me/');
      const userType = userRes.data.user_type;
      toast.success('Welcome back! 🚌');
      if (userType === "driver") {
        navigate('/dashboard/driver');
      } else {
        navigate('/dashboard/passenger');
      }
    } catch (err: any) {
      toast.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    toast.info('OTP sent to your phone/email!');
    setShowReset(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-secondary to-green-400">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center text-primary mb-6">Welcome back</h1>

        <form onSubmit={e => { e.preventDefault(); login(); }}>
          <label className="block mb-4">
            <span className="text-sm text-gray-700">Phone</span>
            <input
              name="phone"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              placeholder="08012345678"
              maxLength={11}
              pattern="0\d{10}"
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </label>

          <label className="block mb-4">
            <span className="text-sm text-gray-700">Password</span>
            <div className="relative">
              <input
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={show ? 'text' : 'password'}
                placeholder="••••••••"
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setShow(!show)}
              >
                {show ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 transition"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <button
          type="button"
          className="w-full mt-2 text-green-700 underline"
          onClick={() => setShowReset(true)}
        >
          Forgot password?
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          No account?{' '}
          <a href="/register" className="text-primary underline">
            Register
          </a>
        </p>
      </div>

      <Modal isOpen={showReset} onClose={() => setShowReset(false)} title="Reset Password">
        <input
          value={resetValue}
          onChange={e => setResetValue(e.target.value)}
          placeholder="Email or phone"
          className="w-full p-2 border rounded mb-4"
        />
        <button
          className="w-full bg-green-600 text-white py-2 rounded"
          onClick={handleReset}
        >
          Send OTP
        </button>
      </Modal>
    </div>
  );
}
