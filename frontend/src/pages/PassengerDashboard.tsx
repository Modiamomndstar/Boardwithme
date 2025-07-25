import { useEffect, useState } from "react";
import { UserCircle, Search, PlusCircle } from "lucide-react";
import api from "../lib/api";

export default function PassengerDashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    api.get("/auth/me/")
      .then(res => setUser(res.data));
  }, []);

  if (!user) return <div className="p-8">Loading...</div>;

  return (
    <div>
      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-green-600 to-green-400 rounded-xl shadow p-8 mb-8 flex items-center">
        <UserCircle className="w-16 h-16 text-white mr-6" />
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome, {user.full_name}!</h1>
          <div className="text-white text-lg">Phone: {user.phone_number}</div>
        </div>
      </div>
      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <a href="/trips" className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center hover:shadow-2xl transition">
          <Search className="w-10 h-10 text-green-600 mb-4" />
          <h2 className="text-xl font-bold text-green-700 mb-2">Find Trips</h2>
          <p className="text-gray-600 text-center">Search and book interstate or intrastate rides.</p>
        </a>
        <a href="/boardwithme" className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center hover:shadow-2xl transition">
          <PlusCircle className="w-10 h-10 text-green-600 mb-4" />
          <h2 className="text-xl font-bold text-green-700 mb-2">Post Ad</h2>
          <p className="text-gray-600 text-center">Create a group request and wait for drivers.</p>
        </a>
      </div>
    </div>
  );
}
