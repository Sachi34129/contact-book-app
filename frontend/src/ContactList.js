import React from 'react';
import ContactTile from './ContactTile';

export default function ContactList({ contacts, onDelete, onEdit, loading }) {
  if (loading) return <div style={{display:'flex',justifyContent:'center',padding:40}}><div className="spinner"></div></div>;
  if (!contacts.length) return <div style={{padding:20}}>No contacts found.</div>;

  return (
    <div className="grid">
      {contacts.map(c => (
        <ContactTile key={c.id} contact={c} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
}