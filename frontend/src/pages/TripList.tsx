// frontend/src/pages/TripList.tsx
import { useEffect, useState } from 'react';
import api from '../lib/api';
import Button from '../components/Button';

interface Trip {
  id: number;
  origin: string;
  destination: string;
  date: string;
  passenger_price: number;
  available_seats: number;
}

export default function TripList() {
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    api.get('/trips/').then(res => setTrips(res.data));
  }, []);

  const book = (tripId: number, seats: number) => {
    api.post('/bookings/', { trip: tripId, seats_booked: seats })
      .then(() => alert('Booked!'))
      .catch(err => alert(err.response.data));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Available Trips</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {trips.map(t => (
          <div key={t.id} className="bg-white rounded-xl shadow p-4">
            <h2 className="font-bold">{t.origin} → {t.destination}</h2>
            <p>Date: {t.date}</p>
            <p>Price: ₦{t.passenger_price}</p>
            <p>Seats left: {t.available_seats}</p>
            <Button onClick={() => book(t.id, 1)}>Book 1 seat</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
