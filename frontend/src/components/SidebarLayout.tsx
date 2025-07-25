import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  UserCircle, Car, ClipboardList, Users, MessageCircle, Menu, ChevronLeft
} from "lucide-react";
import api from "../lib/api";
import logo from "../assets/logo.jpg";

const navItems = [
  { label: "Dashboard", icon: ClipboardList, to: "/dashboard/driver" },
  { label: "Trips", icon: Car, to: "/trips" },
  { label: "Boardwithme", icon: Users, to: "/boardwithme" },
  { label: "Profile", icon: UserCircle, to: "/profile" },
  { label: "Chat", icon: MessageCircle, to: "/chat/1" },
];

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    api.get("/auth/me/").then(res => setUser(res.data));
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`bg-white shadow-lg flex flex-col py-6 px-2 transition-all duration-200 ${collapsed ? "w-20" : "w-64"}`}>
        <div className="flex items-center mb-8 px-2">
          <img src={logo} alt="Logo" className="w-10 h-10 mr-2 object-contain" />
          {!collapsed && <span className="font-bold text-lg text-green-700">BoardWithMe</span>}
        </div>
        <button
          className="mb-6 ml-auto mr-2 text-gray-400 hover:text-green-700"
          onClick={() => setCollapsed(c => !c)}
        >
          {collapsed ? <Menu /> : <ChevronLeft />}
        </button>
        <div className="flex items-center mb-8 px-2">
          <UserCircle className="w-8 h-8 text-green-700" />
          {!collapsed && (
            <div className="ml-3">
              <div className="font-bold">{user?.full_name}</div>
              <div className="text-xs text-gray-500">{user?.phone_number}</div>
            </div>
          )}
        </div>
        <nav className="flex flex-col gap-2">
          {navItems.map(item => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2 rounded transition
                ${location.pathname.startsWith(item.to)
                  ? "bg-green-100 text-green-700 font-semibold"
                  : "hover:bg-gray-100 text-gray-700"}
                `}
            >
              <item.icon className="w-5 h-5" />
              {!collapsed && item.label}
            </Link>
          ))}
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 min-h-screen p-6 md:p-10">{children}</main>
    </div>
  );
}
