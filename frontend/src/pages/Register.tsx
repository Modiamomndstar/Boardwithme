import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    user_type: 'passenger',
    phone_number: '',
    password: '',
    full_name: '',
    state: 'Lagos',
  });
  const navigate = useNavigate();

  const next = () => setStep(s => s + 1);
  const prev = () => setStep(s => s - 1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    await axios.post('http://localhost:8000/api/auth/register/', data);
    navigate('/');
  };

  /* ---------- slides ---------- */
  if (step === 1)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-primary text-white">
        <h1 className="text-2xl mb-4">1. Choose account type</h1>
        <button onClick={() => { setData({...data, user_type:'passenger'}); next(); }} className="bg-green-600 p-3 m-2 rounded w-48">Passenger</button>
        <button onClick={() => { setData({...data, user_type:'driver'}); next(); }} className="bg-green-600 p-3 m-2 rounded w-48">Driver</button>
      </div>
    );

  if (step === 2)
    return (
      <Slide title="2. Phone & Password">
        <input name="phone_number" value={data.phone_number} onChange={handleChange} placeholder="+2348012345678" className="input" />
        <input name="password" type="password" value={data.password} onChange={handleChange} placeholder="Password" className="input" />
        <Nav prev={prev} next={next} />
      </Slide>
    );

  if (step === 3)
    return (
      <Slide title="3. Personal details">
        <input name="full_name" value={data.full_name} onChange={handleChange} placeholder="Full name" className="input" />
        <select name="state" value={data.state} onChange={handleChange} className="input">
          {['Lagos','Abuja','Kano','Port Harcourt','Oyo','Others'].map(s => <option key={s}>{s}</option>)}
        </select>
        <button onClick={handleSubmit} className="bg-green-600 p-3 rounded w-full">Finish</button>
        <Nav prev={prev} />
      </Slide>
    );
}

/* helper components */
function Slide({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary text-white">
      <div className="bg-white/10 p-6 rounded-xl w-full max-w-sm">
        <h1 className="text-xl mb-4">{title}</h1>
        <div className="space-y-3">{children}</div>
      </div>
    </div>
  );
}
function Nav({ prev, next }: { prev?: () => void; next?: () => void }) {
  return (
    <div className="flex justify-between mt-4">
      {prev && <button onClick={prev} className="bg-gray-600 px-4 py-2 rounded">Back</button>}
      {next && <button onClick={next} className="bg-green-600 px-4 py-2 rounded">Next</button>}
    </div>
  );
}
