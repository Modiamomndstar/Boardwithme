import { useEffect, useState } from 'react';
import { UserCircle } from 'lucide-react';
import api from '../lib/api';

export default function Profile() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    api.get('/auth/me/').then(res => setUser(res.data));
  }, []);

  if (!user) return <p className="p-4">Loading…</p>;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow p-8 flex items-center gap-6 mb-8">
        <UserCircle className="w-16 h-16 text-green-600" />
        <div>
          <h1 className="text-2xl font-bold mb-2">{user.full_name}</h1>
          <div className="text-gray-600 mb-1">Phone: {user.phone_number}</div>
          <div className="text-gray-600 mb-1">Role: {user.user_type}</div>
          <div className="text-gray-600 mb-1">Email: {user.email || "—"}</div>
          <div className="text-gray-600 mb-1">Address: {user.address || "—"}</div>
          <div className="text-gray-600 mb-1">State: {user.state || "—"}</div>
          <div className="text-gray-600 mb-1">City: {user.city || "—"}</div>
          <div className="text-gray-600 mb-1">Gender: {user.gender || "—"}</div>
          <div className="text-gray-600 mb-1">Age: {user.age_bracket || "—"}</div>
          <div className="text-gray-600 mb-1">Occupation: {user.occupation || "—"}</div>
        </div>
      </div>
      <button
        className="px-6 py-2 bg-green-600 text-white rounded-lg"
        onClick={() => window.location.href = '/profile/update'}
      >
        Edit Profile
      </button>
    </div>
  );
}
