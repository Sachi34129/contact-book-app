import React from 'react';

export default function Pagination({ page, setPage, total, limit }) {
  const totalPages = Math.max(1, Math.ceil(total / limit));
  if (totalPages <= 1) return null;

  return (
    <div className="pager">
      <button onClick={()=>setPage(1)} disabled={page===1}>First</button>
      <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}>Prev</button>
      <div className="small">Page {page} of {totalPages}</div>
      <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages}>Next</button>
      <button onClick={()=>setPage(totalPages)} disabled={page===totalPages}>Last</button>
    </div>
  );
}