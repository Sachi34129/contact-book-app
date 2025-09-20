import React, { useState } from 'react';
import { FiPhone, FiMail, FiEdit2, FiTrash2, FiCopy } from 'react-icons/fi';

export default function ContactTile({ contact, onDelete, onEdit }) {
  const [setCopyMsg] = useState('');
  const [deleting, setDeleting] = useState(false);

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      setCopyMsg('Failed');
    }
  };

  const handleDelete = () => {
    setDeleting(true);
    setTimeout(() => onDelete(contact.id), 260);
  };

  return (
    <div className={`tile ${deleting ? 'deleting' : ''}`}>
      <div className="top">
        <div>
          <div className="name" style={{ marginBottom: '12px' }}>
            {contact.name}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '6px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <FiPhone />
              <span className="small">{contact.phone}</span>
            </div>
            <button
              className="iconBtn copyBtn"
              onClick={() => copy(contact.phone)}
              title="Copy phone"
            >
              <FiCopy />
            </button>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <FiMail />
              <span className="small">{contact.email}</span>
            </div>
            <button
              className="iconBtn copyBtn"
              onClick={() => copy(contact.email)}
              title="Copy email"
            >
              <FiCopy />
            </button>
          </div>
        </div>

        {/* Edit/Delete buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button title="Edit" className="iconBtn" onClick={() => onEdit(contact)}>
            <FiEdit2 />
          </button>
          <button title="Delete" className="deleteBtn" onClick={handleDelete}>
            <FiTrash2 />
          </button>
        </div>
      </div>
    </div>
  );
}