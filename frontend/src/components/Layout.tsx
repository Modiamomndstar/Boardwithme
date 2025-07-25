import { Outlet, useLocation } from "react-router-dom";
import SidebarLayout from "./SidebarLayout";
import Navbar from "./Navbar";

export default function Layout() {
  const location = useLocation();
  // Show sidebar for all authenticated pages (adjust as needed)
  const showSidebar = location.pathname.startsWith("/dashboard")
    || location.pathname.startsWith("/trips")
    || location.pathname.startsWith("/boardwithme")
    || location.pathname.startsWith("/profile")
    || location.pathname.startsWith("/chat")
    || location.pathname.startsWith("/kyc");

  return showSidebar ? (
    <SidebarLayout>
      <Outlet />
    </SidebarLayout>
  ) : (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
