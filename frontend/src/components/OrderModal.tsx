'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function OrderModal({
  isOpen,
  onClose,
  photoId,
}: {
  isOpen: boolean;
  onClose: () => void;
  photoId: string;
}) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    city: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const shipping_address = `${form.country}, ${form.city}, ${form.address}`;

    const payload = {
      first_name: form.firstName,
      last_name: form.lastName,
      email: form.email,
      shipping_address,
      photo_id: photoId,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Error creating order');

      const data = await res.json();

      if (data?.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        throw new Error('Failed to get payment link');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to place order. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#1B263B] text-white p-6 rounded-2xl w-full max-w-md shadow-xl border border-white/10"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Place Order</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            required
            className="w-full px-4 py-3 bg-[#0D1B2A] rounded-xl border border-white/10 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            required
            className="w-full px-4 py-3 bg-[#0D1B2A] rounded-xl border border-white/10 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="w-full px-4 py-3 bg-[#0D1B2A] rounded-xl border border-white/10 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Country"
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
            required
            className="w-full px-4 py-3 bg-[#0D1B2A] rounded-xl border border-white/10 focus:outline-none"
          />
          <input
            type="text"
            placeholder="City"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            required
            className="w-full px-4 py-3 bg-[#0D1B2A] rounded-xl border border-white/10 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            required
            className="w-full px-4 py-3 bg-[#0D1B2A] rounded-xl border border-white/10 focus:outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#F97316] hover:bg-orange-600 py-3 rounded-xl font-bold transition shadow-lg disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Confirm Order'}
          </button>
        </form>
        <button onClick={onClose} className="mt-4 text-sm text-gray-400 hover:underline">
          Cancel
        </button>
      </motion.div>
    </div>
  );
}
