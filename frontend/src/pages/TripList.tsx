import { useEffect, useState } from 'react';
import { Car } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../lib/api';

export default function TripList() {
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState<any>({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await api.get('/auth/me/');
        setUser(userRes.data);
        const tripsRes = await api.get('/trips/');
        setTrips(tripsRes.data);
        setLoading(false);
      } catch (err: any) {
        toast.error('Failed to load data');
        setError('Could not load trips');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p className="p-6 text-center text-gray-500">Loading...</p>;
  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Available Trips</h1>
      {!trips.length ? (
        <p className="text-center text-gray-500">No trips found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map(trip => (
            <div key={trip.id} className="bg-white rounded-xl shadow hover:shadow-2xl transition p-6 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <Car className="h-5 w-5 text-green-600" />
                <h2 className="text-lg font-semibold text-neutral truncate">
                  {trip.origin} → {trip.destination}
                </h2>
              </div>
              <p className="text-sm text-gray-600"><strong>Date:</strong> {trip.date}</p>
              <p className="text-sm text-gray-600"><strong>Pickup:</strong> {trip.pickup_point}</p>
              <p className="text-sm text-gray-600"><strong>Seats:</strong> {trip.available_seats}/{trip.total_seats}</p>
              <p className="text-lg font-bold text-green-700 mt-2">₦{trip.passenger_price}</p>
              <button
                onClick={() => navigate(`/book/${trip.id}`)}
                disabled={trip.available_seats === 0}
                className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg disabled:opacity-50"
              >
                Book Seat
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
