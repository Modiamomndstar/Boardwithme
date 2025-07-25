import { UserCircle, Car, ClipboardList, Users, MessageCircle } from 'lucide-react';
import { useEffect, useState } from "react";
import api from "../lib/api";

export default function Sidebar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    api.get("/auth/me/").then(res => setUser(res.data));
  }, []);

  return (
    <aside className="w-64 bg-white shadow-lg flex flex-col py-8 px-4 min-h-screen">
      <div className="flex items-center mb-8">
        <UserCircle className="w-10 h-10 text-green-700" />
        <div className="ml-3">
          <div className="font-bold text-lg">{user?.full_name}</div>
          <div className="text-xs text-gray-500">{user?.phone_number}</div>
        </div>
      </div>
      <nav className="flex flex-col gap-4">
        <a href="/dashboard/driver" className="font-semibold text-green-700 bg-green-100 rounded px-3 py-2 flex items-center gap-2"><ClipboardList /> Dashboard</a>
        <a href="/trips" className="hover:bg-gray-100 rounded px-3 py-2 flex items-center gap-2"><Car /> Trips</a>
        <a href="/boardwithme" className="hover:bg-gray-100 rounded px-3 py-2 flex items-center gap-2"><Users /> Boardwithme</a>
        <a href="/profile" className="hover:bg-gray-100 rounded px-3 py-2 flex items-center gap-2"><UserCircle /> Profile</a>
        <a href="/chat/1" className="hover:bg-gray-100 rounded px-3 py-2 flex items-center gap-2"><MessageCircle /> Chat</a>
      </nav>
    </aside>
  );
}
