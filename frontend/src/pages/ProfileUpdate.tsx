import { useEffect, useState } from 'react';
import api from '../lib/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

type ProfileData = {
  full_name: string;
  phone_number: string;
  email: string;
  address: string;
  state: string;
  city: string;
  gender: string;
  age_bracket: string;
  occupation: string;
};

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

export default function ProfileUpdate() {
  const [data, setData] = useState<ProfileData>({
    full_name: "",
    phone_number: "",
    email: "",
    address: "",
    state: "",
    city: "",
    gender: "",
    age_bracket: "",
    occupation: "",
  });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/auth/me/').then(res => setData(res.data));
  }, []);

  function validate() {
    const err: { [k: string]: string } = {};
    if (!data.full_name) err.full_name = "Full name is required";
    if (!/^0\d{10}$/.test(data.phone_number)) err.phone_number = "Enter a valid 11-digit Nigerian phone number";
    if (data.email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) err.email = "Invalid email";
    if (!data.state) err.state = "Select your state";
    if (!data.gender) err.gender = "Select your gender";
    if (!data.age_bracket) err.age_bracket = "Select your age bracket";
    if (!data.occupation) err.occupation = "Select your occupation";
    setErrors(err);
    return Object.keys(err).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await api.put('/auth/profile/update/', data);
      toast.success("Profile updated!");
      navigate('/profile');
    } catch (err: any) {
      if (err.response?.data) {
        const errors = err.response.data;
        Object.values(errors).forEach((msg: any) => {
          toast.error(Array.isArray(msg) ? msg.join(' ') : msg);
        });
      } else {
        toast.error("Update failed");
      }
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  }

  return (
    <div className="max-w-lg mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Update Profile</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          name="full_name"
          value={data.full_name}
          onChange={handleChange}
          placeholder="Full name"
          className={`w-full p-3 border rounded-lg ${errors.full_name ? "border-red-400" : "border-gray-300"}`}
          required
        />
        {errors.full_name && <p className="text-red-500 text-xs">{errors.full_name}</p>}
        <input
          name="phone_number"
          value={data.phone_number}
          onChange={handleChange}
          placeholder="08012345678"
          className={`w-full p-3 border rounded-lg ${errors.phone_number ? "border-red-400" : "border-gray-300"}`}
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
          className={`w-full p-3 border rounded-lg ${errors.email ? "border-red-400" : "border-gray-300"}`}
          type="email"
        />
        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
        <input
          name="address"
          value={data.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full p-3 border rounded-lg border-gray-300"
        />
        <select
          name="state"
          value={data.state}
          onChange={handleChange}
          className={`w-full p-3 border rounded-lg ${errors.state ? "border-red-400" : "border-gray-300"}`}
          required
        >
          <option value="">Select your state</option>
          {states.map(s => <option key={s}>{s}</option>)}
        </select>
        {errors.state && <p className="text-red-500 text-xs">{errors.state}</p>}
        <input
          name="city"
          value={data.city}
          onChange={handleChange}
          placeholder="City"
          className="w-full p-3 border rounded-lg border-gray-300"
        />
        <select
          name="gender"
          value={data.gender}
          onChange={handleChange}
          className={`w-full p-3 border rounded-lg ${errors.gender ? "border-red-400" : "border-gray-300"}`}
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
          className={`w-full p-3 border rounded-lg ${errors.age_bracket ? "border-red-400" : "border-gray-300"}`}
          required
        >
          <option value="">Select age bracket</option>
          {ageBrackets.map(a => <option key={a}>{a}</option>)}
        </select>
        {errors.age_bracket && <p className="text-red-500 text-xs">{errors.age_bracket}</p>}
        <select
          name="occupation"
          value={data.occupation}
          onChange={handleChange}
          className={`w-full p-3 border rounded-lg ${errors.occupation ? "border-red-400" : "border-gray-300"}`}
          required
        >
          <option value="">Select occupation</option>
          {occupations.map(o => <option key={o}>{o}</option>)}
        </select>
        {errors.occupation && <p className="text-red-500 text-xs">{errors.occupation}</p>}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
}
