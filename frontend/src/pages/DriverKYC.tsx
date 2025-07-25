import { useState } from 'react';
import api from '../lib/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function DriverKYC() {
  const [data, setData] = useState<any>({
    license_number: "",
    vehicle_reg: "",
    vehicle_type: "",
    total_seats: "",
    garage: "",
    bank_name: "",
    bank_account: "",
    driver_type: "",
    license_file: null,
    vehicle_file: null,
  });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function validate() {
    const err: { [k: string]: string } = {};
    if (!data.license_number) err.license_number = "License number is required";
    if (!data.vehicle_reg) err.vehicle_reg = "Vehicle registration is required";
    if (!data.vehicle_type) err.vehicle_type = "Vehicle type is required";
    if (!data.total_seats) err.total_seats = "Total seats is required";
    if (!data.driver_type) err.driver_type = "Select driver type";
    if (data.driver_type === "garage" && !data.garage) err.garage = "Garage name is required";
    if (!data.bank_name) err.bank_name = "Bank name is required";
    if (!/^\d{10,20}$/.test(data.bank_account)) err.bank_account = "Enter a valid account number";
    if (!data.license_file) err.license_file = "Upload license file";
    if (!data.vehicle_file) err.vehicle_file = "Upload vehicle file";
    setErrors(err);
    return Object.keys(err).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([k, v]) => {
        if (v !== null) formData.append(k, v as any);
      });
      await api.post('/auth/kyc/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success("KYC submitted!");
      navigate('/profile');
    } catch (err: any) {
      toast.error("KYC submission failed");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, files } = e.target as any;
    setData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
    setErrors({ ...errors, [name]: undefined });
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-8">
      <h1 className="text-2xl font-bold mb-4">Driver KYC</h1>
      <form className="space-y-4" onSubmit={handleSubmit} encType="multipart/form-data">
        <input name="license_number" value={data.license_number} onChange={handleChange} placeholder="License number"
          className={`w-full p-3 border rounded-lg ${errors.license_number ? "border-red-400" : "border-gray-300"}`} required />
        <input name="vehicle_reg" value={data.vehicle_reg} onChange={handleChange} placeholder="Vehicle registration"
          className={`w-full p-3 border rounded-lg ${errors.vehicle_reg ? "border-red-400" : "border-gray-300"}`} required />
        <input name="vehicle_type" value={data.vehicle_type} onChange={handleChange} placeholder="Vehicle type"
          className={`w-full p-3 border rounded-lg ${errors.vehicle_type ? "border-red-400" : "border-gray-300"}`} required />
        <input name="total_seats" value={data.total_seats} onChange={handleChange} placeholder="Total seats" type="number" min="1"
          className={`w-full p-3 border rounded-lg ${errors.total_seats ? "border-red-400" : "border-gray-300"}`} required />
        <select name="driver_type" value={data.driver_type} onChange={handleChange}
          className={`w-full p-3 border rounded-lg ${errors.driver_type ? "border-red-400" : "border-gray-300"}`} required>
          <option value="">Select driver type</option>
          <option value="freelance">Freelance</option>
          <option value="garage">Garage-affiliated</option>
        </select>
        {data.driver_type === "garage" && (
          <input name="garage" value={data.garage} onChange={handleChange} placeholder="Garage name"
            className={`w-full p-3 border rounded-lg ${errors.garage ? "border-red-400" : "border-gray-300"}`} required />
        )}
        <input name="bank_name" value={data.bank_name} onChange={handleChange} placeholder="Bank name"
          className={`w-full p-3 border rounded-lg ${errors.bank_name ? "border-red-400" : "border-gray-300"}`} required />
        <input name="bank_account" value={data.bank_account} onChange={handleChange} placeholder="Bank account number"
          className={`w-full p-3 border rounded-lg ${errors.bank_account ? "border-red-400" : "border-gray-300"}`} required />
        <div>
          <label className="block mb-1">Upload License File</label>
          <input name="license_file" type="file" accept="image/*,application/pdf" onChange={handleChange}
            className={`w-full ${errors.license_file ? "border-red-400" : "border-gray-300"}`} required />
        </div>
        <div>
          <label className="block mb-1">Upload Vehicle File</label>
          <input name="vehicle_file" type="file" accept="image/*,application/pdf" onChange={handleChange}
            className={`w-full ${errors.vehicle_file ? "border-red-400" : "border-gray-300"}`} required />
        </div>
        <button type="submit" className="w-full px-4 py-2 bg-green-600 text-white rounded-lg" disabled={loading}>
          {loading ? "Submitting..." : "Submit KYC"}
        </button>
      </form>
    </div>
  );
}
