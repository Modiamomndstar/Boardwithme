// frontend/src/pages/Login.tsx
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/auth/login/', {
        phone_number: phone,
        password,
      });
      localStorage.setItem('access', res.data.access);
      localStorage.setItem('refresh', res.data.refresh);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-700 via-green-600 to-green-500">
      <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md p-8 rounded-xl w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-6 text-white">Welcome back</h1>
        {error && <p className="mb-4 text-red-300 text-center">{error}</p>}
        <Input label="Phone" placeholder="+2348012345678" value={phone} onChange={e => setPhone(e.target.value)} />
        <Input label="Password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
        <Button type="submit">Sign in</Button>
        <p className="text-center text-sm text-white/70 mt-4">
          No account?{' '}
          <a href="/register" className="underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}
