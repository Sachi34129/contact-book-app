import React, { useState, useEffect } from 'react';

export default function ContactForm({ onSave, initial }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (initial) setForm(initial);
  }, [initial]);

  const validate = ({ name, email, phone }) => {
    if (!name || !email || !phone) return 'All fields required';
    if (!/^\S+@\S+\.\S+$/.test(email)) return 'Invalid email';
    if (!/^\d{10}$/.test(phone)) return 'Phone must be 10 digits';
    return null;
  };

  const submit = async (e) => {
    e.preventDefault();
    const eMsg = validate(form);
    if (eMsg) return setErr(eMsg);
    try {
      await onSave(form);
      setForm({ name: '', email: '', phone: '' });
      setErr(null);
    } catch (err) {
      setErr(err?.response?.data?.error || 'Failed');
    }
  };

  return (
    <form onSubmit={submit}>
      <input
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="Name"
      />
      <input
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        placeholder="Email"
      />
      <input
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        placeholder="Phone"
      />
      <button type="submit">{initial ? 'Update' : 'Add'}</button>
      {err && <div style={{ color: 'red' }}>{err}</div>}
    </form>
  );
}