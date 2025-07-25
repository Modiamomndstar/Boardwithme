import logo from '../assets/logo.jpg';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <nav className="flex items-center justify-between p-4 bg-white shadow w-full">
        <div className="flex items-center">
          <img src={logo} alt="BoardWithMe Logo" className="w-8 h-8 mr-2 object-contain" />
          <span className="font-bold text-xl text-green-700">BoardWithMe</span>
        </div>
      </nav>
      <div className="max-w-2xl w-full mx-auto mt-12 bg-white rounded-xl shadow p-8">
        <h1 className="text-3xl font-bold mb-4 text-green-700">About BoardWithMe</h1>
        <p className="mb-4 text-gray-700">
          BoardWithMe is Nigeria's premier transport platform, connecting verified drivers and passengers for safe, reliable inter and intra-state travel.
        </p>
        <h2 className="text-xl font-bold mb-2 text-green-700">Our Mission</h2>
        <p className="mb-4 text-gray-700">
          To revolutionize transportation in Nigeria by providing a secure, efficient, and user-friendly platform that connects travelers with verified transport providers.
        </p>
        <h2 className="text-xl font-bold mb-2 text-green-700">Key Features</h2>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
          <li>Comprehensive KYC verification for all drivers</li>
          <li>Secure escrow payment system</li>
          <li>Real-time trip tracking and communication</li>
          <li>Group booking capabilities</li>
          <li>BoardWithMe Ads for finding travel partners</li>
          <li>24/7 customer support</li>
        </ul>
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2 text-green-700">Frequently Asked Questions</h2>
          <ul className="list-disc pl-6 text-gray-700">
            <li>
              <b>How do I register?</b> <br />
              Click the Register button on the landing page and fill in your details.
            </li>
            <li>
              <b>Is my payment safe?</b> <br />
              Yes, all payments are handled through our secure escrow system.
            </li>
            <li>
              <b>How do I contact support?</b> <br />
              Email support@boardwithme.com or use the chat feature after login.
            </li>
            <li>
              <b>Can I travel as a group?</b> <br />
              Yes, use BoardWithMe Ads to find travel partners and book group trips.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
