import { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';

export default function BoardwithmeAds() {
  const [ads, setAds] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/ads/').then(r => setAds(r.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Board with Me Ads</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ads.map(ad => (
          <div key={ad.id} className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <Users className="w-10 h-10 text-green-600 mb-2" />
            <h2 className="font-bold text-lg mb-1">{ad.origin} → {ad.destination}</h2>
            <p className="text-green-700 font-bold mb-1">₦{ad.passenger_price}</p>
            <p className="text-gray-600 mb-2">{ad.seats_booked}/{ad.total_seats_needed} seats booked</p>
            <button onClick={() => navigate(`/ads/${ad.id}/join`)} className="bg-green-600 text-white px-4 py-2 rounded">
              Join
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
