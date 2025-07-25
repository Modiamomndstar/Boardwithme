import logo from '../assets/logo.jpg';

export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-green-600">
      <img src={logo} alt="BoardWithMe Logo" className="w-20 h-20 mb-4 object-contain" />
      <h2 className="text-white text-2xl font-bold mb-2">BoardWithMe</h2>
      <p className="text-white mb-6">Nigeria's Transport Platform</p>
      <div className="loader-circle"></div>
      <style>
        {`
          .loader-circle {
            border: 6px solid #fff;
            border-top: 6px solid #15803d;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        `}
      </style>
    </div>
  );
}
