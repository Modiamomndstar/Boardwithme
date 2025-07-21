import { useEffect, useState } from 'react';
import api from '../lib/api';
import Button from '../components/Button';

interface Ad {
  id: number;
  origin: string;
  destination: string;
  passenger_price: number;
  seats_booked: number;
  total_seats_needed: number;
}

export default function BoardwithmeAds() {
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    api.get('/ads/').then(res => setAds(res.data));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Boardwithme Ads</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {ads.map(ad => (
          <div key={ad.id} className="bg-white rounded-xl shadow p-4">
            <h2 className="font-bold">{ad.origin} → {ad.destination}</h2>
            <p>₦{ad.passenger_price}</p>
            <p>{ad.seats_booked}/{ad.total_seats_needed} seats taken</p>
            <Button>Join</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
