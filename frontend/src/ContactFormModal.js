import React, { useState, useEffect } from 'react';

export default function ContactFormModal({ open, onClose, onSave, initial }) {
  const [form, setForm] = useState({ name:'', email:'', phone:'' });
  const [error, setError] = useState('');

  useEffect(()=> {
    setForm(initial ?? { name:'', email:'', phone:'' });
    setError('');
  }, [initial, open]);

  if (!open) return null;

  const validate = (f) => {
    if (!f.name?.trim() || !f.email?.trim() || !f.phone?.trim()) return 'All fields required';
    if (!/^\S+@\S+\.\S+$/.test(f.email)) return 'Invalid email';
    if (!/^\d{10}$/.test(f.phone)) return 'Phone must be 10 digits';
    return '';
  };

  const submit = async (e) => {
    e.preventDefault();
    const eMsg = validate(form);
    if (eMsg) { setError(eMsg); return; }
    await onSave(form); // parent handles API and closing
  };

  return (
    <div className="modalOverlay" onMouseDown={onClose}>
      <div className="modal" onMouseDown={e=>e.stopPropagation()}>
        <h3>{initial ? 'Edit Contact' : 'Add New Contact'}</h3>
        <form onSubmit={submit}>
          <div className="formRow">
            <label className="small">Name</label>
            <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Full name" />
          </div>
          <div className="formRow">
            <label className="small">Email</label>
            <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="email@example.com" />
          </div>
          <div className="formRow">
            <label className="small">Phone</label>
            <input value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} placeholder="10 digit phone" />
          </div>
          {error && <div className="formError">{error}</div>}
          <div style={{display:'flex', justifyContent:'flex-end', gap:8, marginTop:10}}>
            <button type="button" className="btnGhost" onClick={onClose}>Cancel</button>
            <button className="button" type="submit">{initial ? 'Save Changes' : 'Save Contact'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}