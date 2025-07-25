import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import logo from '../assets/logo.jpg';

const states = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT","Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara"
];
const genders = ["Male", "Female"];
const ageBrackets = [
  "15-20", "21-25", "26-30", "31-40", "41-50", "51+"
];
const occupations = [
  "Student",
  "Government worker/Civil servant",
  "Business owner",
  "Private company staff",
  "Self employed",
  "Transporter",
  "Others"
];

type RegisterData = {
  user_type: string;
  username: string;
  phone_number: string; // <-- change from phone to phone_number
  email: string;
  password: string;
  confirm: string;
  full_name: string;
  state: string;
  city: string;
  gender: string;
  age_bracket: string;
  occupation: string;
  frequent_traveler: string;
  experience_years: string;
  policy_accepted: boolean;
  code: string;
};

export default function Register() {
  const [step, setStep] = useState(1);
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState<RegisterData>({
    user_type: searchParams.get("type") || "",
    username: "",
    phone_number: "",
    email: "",
    password: "",
    confirm: "",
    full_name: "",
    state: "",
    city: "",
    gender: "",
    age_bracket: "",
    occupation: "",
    frequent_traveler: "",
    experience_years: "",
    policy_accepted: false,
    code: "",
  });
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.get('type')) {
      setData(d => ({ ...d, user_type: searchParams.get('type')! }));
      setStep(2); // Skip user type step if already chosen
    }
  }, [searchParams]);

  useEffect(() => {
    // Optionally, fetch cities based on state from API here
    setCity(""); // Reset city when state changes
  }, [data.state]);

  // Validation logic
  function validateStep() {
    let err = {};
    if (step === 1) {
      if (!data.user_type) err.user_type = "Please select account type";
    }
    if (step === 2) {
      if (!data.username) err.username = "Username is required";
      if (!data.phone_number) err.phone_number = "Phone number is required";
      if (data.phone_number && !/^0\d{10}$/.test(data.phone_number)) {
        err.phone_number = "Enter a valid 11-digit Nigerian phone number";
      }
      if (data.email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) err.email = "Invalid email";
      if (!data.password) err.password = "Password is required";
      if (data.password.length < 6) err.password = "Password must be at least 6 characters";
      if (data.password !== data.confirm) err.confirm = "Passwords do not match";
    }
    if (step === 3) {
      if (!data.full_name) err.full_name = "Full name is required";
      if (!data.state) err.state = "Select your state";
      if (!data.gender) err.gender = "Select your gender";
      if (!data.age_bracket) err.age_bracket = "Select your age bracket";
      if (!data.occupation) err.occupation = "Select your occupation";
      if (data.user_type === "passenger" && !data.frequent_traveler) err.frequent_traveler = "Select an option";
      if (data.user_type === "driver" && !data.experience_years) err.experience_years = "Select years of experience";
      if (!data.policy_accepted) err.policy_accepted = "You must accept the policy";
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  }

  function next() {
    if (validateStep()) {
      if (step === 2) setModalOpen(true);
      else setStep(step + 1);
    }
  }
  function prev() {
    setStep(step - 1);
  }

  function handleVerify(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (data.code === "123456") {
      setModalOpen(false);
      setStep(3);
    } else {
      setErrors({ code: "Invalid code. Try 123456." });
    }
  }

  const register = async () => {
    setSubmitting(true);
    try {
      await axios.post('http://localhost:8000/api/auth/register/', data);
      toast.success('Account created! Please log in.');
      if (data.email) {
        toast.info('A verification email has been sent to your address.');
      }
      navigate('/login');
    } catch (err: any) {
      if (err.response?.data) {
        const errors = err.response.data;
        console.log(errors); // Add this line
        // Show all field errors if present
        if (typeof errors === 'object') {
          Object.values(errors).forEach((msg: any) => {
            toast.error(Array.isArray(msg) ? msg.join(' ') : msg);
          });
        } else {
          toast.error(errors.detail || 'Registration failed');
        }
      } else {
        toast.error('Registration failed');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative min-h-[80vh] overflow-y-auto">
        {/* Bus Icon and tagline */}
        <div className="flex flex-col items-center mb-4">
          <span className="mb-2">
            <img src={logo} alt="BoardWithMe Logo" className="w-20 h-20 object-contain" />
          </span>
          <p className="text-center text-gray-500 text-sm mb-2">
            Nigeria's premier ride-sharing for interstate & intrastate travel
          </p>
        </div>
        {/* Step indicator */}
        <div className="flex justify-center mb-4">
          {[1,2,3].map(i => (
            <span key={i} className={`h-2 w-8 mx-1 rounded-full ${step === i ? "bg-green-600" : "bg-gray-300"}`}></span>
          ))}
        </div>
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center mb-4">
          {step === 1 && "Sign Up"}
          {step === 2 && "Account Details"}
          {step === 3 && "Personal Information"}
        </h2>
        {/* Step 1: Choose account type */}
        {step === 1 && (
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => { setData({ ...data, user_type: "passenger" }); setStep(2); }}
              className={`w-full bg-green-100 border border-green-300 rounded-xl p-6 flex flex-col items-center transition ${data.user_type === "passenger" ? "ring-2 ring-green-600" : ""}`}
            >
              <span className="bg-green-300 rounded-full p-2 mb-2">
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" fill="#15803d"/><path fill="#15803d" d="M4 20v-2a4 4 0 014-4h8a4 4 0 014 4v2"/></svg>
              </span>
              <span className="font-bold text-lg text-green-900">Passenger</span>
              <span className="text-gray-500 text-sm">Find and book seats for your journey</span>
            </button>
            <button
              type="button"
              onClick={() => { setData({ ...data, user_type: "driver" }); setStep(2); }}
              className={`w-full bg-blue-100 border border-blue-300 rounded-xl p-6 flex flex-col items-center transition ${data.user_type === "driver" ? "ring-2 ring-blue-600" : ""}`}
            >
              <span className="bg-blue-300 rounded-full p-2 mb-2">
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path fill="#15803d" d="M5 17v-2a3 3 0 013-3h8a3 3 0 013 3v2"/><circle cx="12" cy="7" r="4" fill="#15803d"/></svg>
              </span>
              <span className="font-bold text-lg text-blue-900">Driver</span>
              <span className="text-gray-500 text-sm">Offer rides and earn money</span>
            </button>
            {errors.user_type && <p className="text-red-500 text-sm mt-2">{errors.user_type}</p>}
          </div>
        )}
        {/* Step 2: Account details */}
        {step === 2 && (
          <form className="space-y-4" onSubmit={e => { e.preventDefault(); next(); }}>
            <input
              name="username"
              value={data.username}
              onChange={handleChange}
              placeholder="Username"
              className={`w-full p-3 border rounded-lg focus:ring-2 ${errors.username ? "border-red-400" : "border-gray-300"} focus:ring-green-600`}
              required
            />
            {errors.username && <p className="text-red-500 text-xs">{errors.username}</p>}
            <input
              name="phone_number"
              value={data.phone_number}
              onChange={handleChange}
              placeholder="08012345678"
              className={`w-full p-3 border rounded-lg focus:ring-2 ${errors.phone_number ? "border-red-400" : "border-gray-300"} focus:ring-green-600`}
              type="tel"
              maxLength={11}
              pattern="0\d{10}"
              required
            />
            {errors.phone_number && <p className="text-red-500 text-xs">{errors.phone_number}</p>}
            <input
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Email (optional)"
              className={`w-full p-3 border rounded-lg focus:ring-2 ${errors.email ? "border-red-400" : "border-gray-300"} focus:ring-green-600`}
              type="email"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={data.password}
                onChange={handleChange}
                placeholder="Password"
                className={`w-full p-3 border rounded-lg focus:ring-2 ${errors.password ? "border-red-400" : "border-gray-300"} focus:ring-green-600`}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
            <div className="relative">
              <input
                name="confirm"
                type={showConfirm ? "text" : "password"}
                value={data.confirm}
                onChange={handleChange}
                placeholder="Confirm Password"
                className={`w-full p-3 border rounded-lg focus:ring-2 ${errors.confirm ? "border-red-400" : "border-gray-300"} focus:ring-green-600`}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-400"
                onClick={() => setShowConfirm(!showConfirm)}
                tabIndex={-1}
              >
                {showConfirm ? "Hide" : "Show"}
              </button>
            </div>
            {errors.confirm && <p className="text-red-500 text-xs">{errors.confirm}</p>}
            <div className="flex justify-between mt-6">
              <button type="button" onClick={prev} className="px-4 py-2 bg-gray-300 rounded-lg">Back</button>
              <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg">Next</button>
            </div>
          </form>
        )}
        {/* Step 3: Personal info */}
        {step === 3 && (
          <form className="space-y-4" onSubmit={e => { e.preventDefault(); setShowSummary(true); }}>
            <input
              name="full_name"
              value={data.full_name}
              onChange={handleChange}
              placeholder="Full name"
              className={`w-full p-3 border rounded-lg focus:ring-2 ${errors.full_name ? "border-red-400" : "border-gray-300"} focus:ring-green-600`}
              required
            />
            {errors.full_name && <p className="text-red-500 text-xs">{errors.full_name}</p>}
            <select
              name="state"
              value={data.state}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 ${errors.state ? "border-red-400" : "border-gray-300"} focus:ring-green-600`}
              required
            >
              <option value="">Select your state</option>
              {states.map(s => <option key={s}>{s}</option>)}
            </select>
            {errors.state && <p className="text-red-500 text-xs">{errors.state}</p>}
            {data.state && (
              <input
                name="city"
                value={data.city}
                onChange={handleChange}
                placeholder="Enter your city"
                className="w-full p-3 border rounded-lg focus:ring-2 border-gray-300 focus:ring-green-600"
                required
              />
            )}
            <select
              name="gender"
              value={data.gender}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 ${errors.gender ? "border-red-400" : "border-gray-300"} focus:ring-green-600`}
              required
            >
              <option value="">Select gender</option>
              {genders.map(g => <option key={g}>{g}</option>)}
            </select>
            {errors.gender && <p className="text-red-500 text-xs">{errors.gender}</p>}
            <select
              name="age_bracket"
              value={data.age_bracket}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 border-gray-300 focus:ring-green-600"
              required
            >
              <option value="">Select age bracket</option>
              {ageBrackets.map(a => <option key={a}>{a}</option>)}
            </select>
            <select
              name="occupation"
              value={data.occupation}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 border-gray-300 focus:ring-green-600"
              required
            >
              <option value="">Select occupation</option>
              {occupations.map(o => <option key={o}>{o}</option>)}
            </select>
            {data.user_type === "passenger" && (
              <select
                name="frequent_traveler"
                value={data.frequent_traveler}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 border-gray-300 focus:ring-green-600"
                required
              >
                <option value="">Are you a frequent traveler?</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            )}
            {data.user_type === "driver" && (
              <input
                name="experience_years"
                value={data.experience_years}
                onChange={handleChange}
                placeholder="Years of driving experience"
                className="w-full p-3 border rounded-lg focus:ring-2 border-gray-300 focus:ring-green-600"
                type="number"
                min="0"
                required
              />
            )}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="policy_accepted"
                checked={data.policy_accepted}
                onChange={e => setData({ ...data, policy_accepted: e.target.checked })}
                required
                className="mr-2"
              />
              <span className="text-gray-700 text-sm">
                I have read and accept the <a href="/policy" target="_blank" className="text-green-700 underline">BoardWithMe Policy</a>
              </span>
            </div>
            {errors.policy_accepted && <p className="text-red-500 text-xs">{errors.policy_accepted}</p>}
            <div className="flex justify-between mt-6">
              <button type="button" onClick={prev} className="px-4 py-2 bg-gray-300 rounded-lg">Back</button>
              <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg">Create Account</button>
            </div>
          </form>
        )}
        {/* Modal for phone verification */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xs">
              <h3 className="text-lg font-bold mb-2 text-center">Verify Phone Number</h3>
              <p className="text-sm text-gray-500 mb-4 text-center">
                Enter the 6-digit code sent to your phone ({data.phone_number}). <br />
                <span className="text-xs text-gray-400">Use <b>123456</b> for demo.</span>
              </p>
              <form onSubmit={handleVerify} className="space-y-2">
                <input
                  name="code"
                  value={data.code}
                  onChange={handleChange}
                  placeholder="Enter code"
                  className={`w-full p-3 border rounded-lg focus:ring-2 ${errors.code ? "border-red-400" : "border-gray-300"} focus:ring-green-600`}
                  required
                />
                {errors.code && <p className="text-red-500 text-xs">{errors.code}</p>}
                <button type="submit" className="w-full px-4 py-2 bg-green-600 text-white rounded-lg">Verify</button>
                <button type="button" className="w-full px-4 py-2 bg-gray-200 rounded-lg" onClick={() => setModalOpen(false)}>Cancel</button>
              </form>
            </div>
          </div>
        )}
        {/* Summary modal */}
        {showSummary && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-bold mb-2 text-center">Confirm Your Details</h3>
              <ul className="mb-4 text-sm text-gray-700">
                <li><b>Full Name:</b> {data.full_name}</li>
                <li><b>Username:</b> {data.username}</li>
                <li><b>Phone:</b> {data.phone_number}</li>
                <li><b>Email:</b> {data.email || "N/A"}</li>
                <li><b>State:</b> {data.state}</li>
                <li><b>City:</b> {data.city}</li>
                <li><b>Gender:</b> {data.gender}</li>
                <li><b>Age Bracket:</b> {data.age_bracket}</li>
                <li><b>Occupation:</b> {data.occupation}</li>
                {data.user_type === "passenger" && <li><b>Frequent Traveler:</b> {data.frequent_traveler}</li>}
                {data.user_type === "driver" && <li><b>Experience Years:</b> {data.experience_years}</li>}
              </ul>
              <div className="flex gap-2">
                <button onClick={() => { setShowSummary(false); register(); }} className="w-full px-4 py-2 bg-green-600 text-white rounded-lg" disabled={submitting}>
                  Confirm & Submit
                </button>
                <button onClick={() => setShowSummary(false)} className="w-full px-4 py-2 bg-gray-200 rounded-lg">
                  Edit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
