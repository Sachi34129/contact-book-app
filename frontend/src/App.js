import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import ContactFormModal from './ContactFormModal';
import ContactList from './ContactList';
import Pagination from './Pagination';
import { FiSearch, FiPlus } from 'react-icons/fi';

const API_URL = process.env.REACT_APP_API_URL;

const LIMIT = 8;

function App(){
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function load() {
      await fetchContacts(page, search);
    }
    load();
  }, [page, search]);

  async function fetchContacts(p=1, q=''){
    setLoading(true);
    try{
      const res = await axios.get(`${API_URL}/contacts?page=${p}&limit=${LIMIT}&q=${encodeURIComponent(q)}`);
      // server returns {contacts, total}
      setContacts(res.data.contacts || []);
      setTotal(res.data.total || 0);
    }catch(err){
      console.error(err);
    } finally { setLoading(false); }
  }

  const openAdd = ()=> { setEditing(null); setModalOpen(true); };
  const handleSave = async (form) => {
    try {
      if (editing) {
        // update existing contact
        const res = await axios.put(`${API_URL}/contacts/${editing.id}`, form);
        setContacts(prev =>
          prev.map(c => (c.id === editing.id ? res.data : c))
        );
      } else {
        // add new contact
        const res = await axios.post(`${API_URL}/contacts`, form);
        setContacts(prev => [res.data, ...prev]);
        setTotal(t => t + 1);
      }
      setModalOpen(false);
      setEditing(null);
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.error || 'Failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/contacts/${id}`);
      setContacts(prev => prev.filter(c=>c.id !== id));
      setTotal(t=>Math.max(0,t-1));
    } catch (err) { console.error(err); alert('Delete failed'); }
  };

  const handleEdit = (contact) => {
    setEditing(contact);
    setModalOpen(true);
  };

  return (
    <div className="app">
      <div className="container">
        <div className="header">
          <div className="search">
            <div className="icon"><FiSearch/></div>
            <input placeholder="Search contacts..." value={search} onChange={e=>setSearch(e.target.value)} />
          </div>
          <button className="addBtn" onClick={openAdd}>
            <FiPlus/> Add Contact
          </button>
        </div>

        <ContactList contacts={contacts} onDelete={handleDelete} onEdit={handleEdit} loading={loading} />

        <Pagination page={page} setPage={setPage} total={total} limit={LIMIT} />

        <ContactFormModal open={modalOpen} initial={editing} onClose={()=>setModalOpen(false)} onSave={handleSave} />
      </div>
    </div>
  );
}

export default App;