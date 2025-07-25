import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

export default function Policy() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <nav className="flex items-center justify-between p-4 bg-white shadow w-full">
        <span className="font-bold text-xl text-green-700">BoardWithMe Policy</span>
      </nav>
      <div className="max-w-2xl w-full mx-auto mt-12 bg-white rounded-xl shadow p-8">
        <h1 className="text-3xl font-bold mb-4 text-green-700">BoardWithMe Policy</h1>
        <p className="mb-4 text-gray-700">
          Welcome to BoardWithMe. By using our platform, you agree to the following terms and policies:
        </p>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
          <li><b>Safety:</b> All drivers must pass KYC verification. Passengers must provide valid contact details.</li>
          <li><b>Payments:</b> All payments are processed via our secure escrow system. Refunds are subject to trip cancellation policy.</li>
          <li><b>Conduct:</b> Users must treat each other respectfully. Abuse, harassment, or discrimination will result in account suspension.</li>
          <li><b>Data Privacy:</b> We protect your personal data and do not share it with third parties except as required by law.</li>
          <li><b>Trip Rules:</b> Drivers must adhere to scheduled trips. Passengers must arrive on time. No illegal goods or activities allowed.</li>
          <li><b>Dispute Resolution:</b> Contact our support for any disputes. We aim to resolve issues fairly and promptly.</li>
          <li><b>Updates:</b> BoardWithMe may update this policy at any time. Continued use means acceptance of changes.</li>
        </ul>
        <p className="text-gray-700 mb-8">For full details, contact support@boardwithme.com.</p>
        <div className="flex gap-4">
          <Button onClick={() => navigate('/login')}>Go to Login</Button>
          <Button variant="secondary" onClick={() => navigate('/register')}>Go to Signup</Button>
        </div>
      </div>
    </div>
  );
}
