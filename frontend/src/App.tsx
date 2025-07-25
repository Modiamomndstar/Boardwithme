import { Routes, Route, useLocation } from 'react-router-dom';
import Landing from './pages/Landing';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ProfileUpdate from './pages/ProfileUpdate';
import TripList from './pages/TripList';
import BoardwithmeAds from './pages/BoardwithmeAds';
import Chat from './pages/Chat';
import AdminDashboard from './pages/AdminDashboard';
import PassengerDashboard from './pages/PassengerDashboard';
import DriverDashboard from './pages/DriverDashboard';
import About from './pages/About';
import Policy from './pages/Policy';
import DriverKYC from './pages/DriverKYC';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />
      <Route path="/policy" element={<Policy />} />
      <Route element={<Layout />}>
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/profile/update" element={<PrivateRoute><ProfileUpdate /></PrivateRoute>} />
        <Route path="/trips" element={<PrivateRoute><TripList /></PrivateRoute>} />
        <Route path="/boardwithme" element={<PrivateRoute><BoardwithmeAds /></PrivateRoute>} />
        <Route path="/chat/:tripId" element={<PrivateRoute><Chat /></PrivateRoute>} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/passenger" element={<PrivateRoute><PassengerDashboard /></PrivateRoute>} />
        <Route path="/dashboard/driver" element={<PrivateRoute><DriverDashboard /></PrivateRoute>} />
        <Route path="/kyc" element={<PrivateRoute><DriverKYC /></PrivateRoute>} />
      </Route>
    </Routes>
  );
}
