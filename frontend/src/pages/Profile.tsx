import { useEffect, useState } from 'react';
import api from '../lib/api';

export default function Profile() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    api.get('/auth/me/').then(res => setUser(res.data));
  }, []);

  if (!user) return <p className="p-4">Loading…</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl">Hello {user.full_name}</h1>
      <p>Phone: {user.phone_number}</p>
    </div>
  );
}
