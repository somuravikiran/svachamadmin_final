import { useState, useEffect } from 'react';
import spendingAPI from '../services/spendingAPI';
import SpendingFormModal from './SpendingFormModal';
import SpendingViewModal from './SpendingViewModal';
import '../styles/SpendingList.css';

function SpendingList(){
  const [items,setItems]=useState([]);
  const [loading,setLoading]=useState(false);
  const [showForm,setShowForm]=useState(false);
  const [editing,setEditing]=useState(null);
  const [showView,setShowView]=useState(false);
  const [selected,setSelected]=useState(null);
  const [search,setSearch]=useState('');
  const [filterCategory,setFilterCategory]=useState('');
  const [summary,setSummary]=useState(null);
  const [error,setError]=useState('');
  const [success,setSuccess]=useState('');

  const fetchItems=async()=>{
    setLoading(true); setError('');
    try{ const data = await spendingAPI.getAllSpendings(); setItems(Array.isArray(data)?data:[]);}catch(err){ console.error(err); setError('Failed to fetch spendings'); }finally{ setLoading(false); }
  };
  const fetchSummary=async()=>{ try{ const s = await spendingAPI.getSummary(); setSummary(s);}catch(err){ console.error(err); } };

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(()=>{ fetchItems(); fetchSummary(); },[]);

  const handleAdd=()=>{ setEditing(null); setShowForm(true);}
  const handleEdit=(r)=>{ setEditing(r); setShowForm(true);}
  const handleView = async (r) => {
    setLoading(true);
    try {
      // prefer id-based lookup, fall back to seq
      const fresh = r?.id ? await spendingAPI.getSpendingById(r.id) : (r?.seq ? await spendingAPI.getSpendingBySeq(r.seq) : null);
      setSelected(fresh || r);
    } catch (err) {
      console.error(err);
      setSelected(r);
    } finally {
      setLoading(false);
      setShowView(true);
    }
  };

  const handleDelete = async (idOrSeq) => {
    if (!window.confirm('Delete this record?')) return;
    try {
      // prefer id-based delete, fall back to seq endpoint
      try {
        await spendingAPI.deleteSpending(idOrSeq);
      } catch (err) {
        console.warn('delete by id failed, trying delete by seq', err);
        await spendingAPI.deleteSpendingBySeq(idOrSeq);
      }
      setSuccess('Deleted');
      fetchItems();
      fetchSummary();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error(err);
      setError(typeof err === 'string' ? err : (err?.message || 'Delete failed'));
    }
  };

  const handleSubmit = async (form, idOrSeq) => {
    try {
      if (idOrSeq) {
        // prefer id-based update, fall back to seq
        try {
          await spendingAPI.updateSpending(idOrSeq, form);
        } catch (err) {
          console.warn('update by id failed, trying update by seq', err);
          await spendingAPI.updateSpendingBySeq(idOrSeq, form);
        }
      } else {
        await spendingAPI.createSpending(form);
      }
      fetchItems();
      fetchSummary();
      setTimeout(() => setSuccess('Saved'), 2000);
    } catch (err) {
      console.error(err);
      setError(typeof err === 'string' ? err : (err?.message || 'Save failed'));
    }
  };

  const handleSort=async(by)=>{
    setLoading(true); setError('');
    try{
      const data = await spendingAPI.getSorted(by);
      setItems(Array.isArray(data)?data:(Array.isArray(Object.values(data).flat())? Object.values(data).flat(): []));
      setSuccess('Sorted'); setTimeout(()=>setSuccess(''),2000);
    }catch(err){ console.error(err); setError('Sort failed'); }finally{ setLoading(false); }
  };

  const filtered = items.filter(i=>{
    const matches = !search || (i.itemName && i.itemName.toLowerCase().includes(search.toLowerCase())) || (i.id && i.id.includes(search));
    const matchesCat = !filterCategory || i.itemCategory===filterCategory;
    return matches && matchesCat;
  });

  const fmt = v=> v? `₹${parseFloat(v).toLocaleString('en-IN',{minimumFractionDigits:2})}`:'₹0.00';
  const fmtDate = d=> d? new Date(d).toLocaleDateString('en-IN'):'-';

  return (
    <div className="spending-container">
      <div className="spending-header">
        <div><h1>Spendings</h1><p>Track company expenditures</p></div>
        <div style={{display:'flex',gap:'0.5rem'}}>
          <button className="btn-add" onClick={handleAdd}>➕ Add Spending</button>
          <button className="btn-add" onClick={()=>handleSort('category')}>🔀 Sort</button>
        </div>
      </div>

      {summary && <div className="spending-summary"><div className="card"><h4>Total Records</h4><p>{summary.totalRecords||0}</p></div><div className="card"><h4>Total Amount</h4><p>{fmt(summary.totalAmount)}</p></div></div>}

      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">{success}</div>}

      <div className="filters"><input placeholder="Search item or id" value={search} onChange={e=>setSearch(e.target.value)} /><select value={filterCategory} onChange={e=>setFilterCategory(e.target.value)}><option value="">All Categories</option><option value="office">Office</option><option value="production">Production</option><option value="others">Others</option></select></div>

      <div className="table-wrap">{loading? <div className="loading">Loading...</div> : (
        <table className="spending-table"><thead><tr><th>Seq</th><th>Item</th><th>Category</th><th>Vendor</th><th>Spent Date</th><th>Amount</th><th>Payment Mode</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>{filtered.map(r=> (
          <tr key={r.seq || r.id}><td>{r.seq || r.id}</td><td>{r.itemName}</td><td>{r.itemCategory}</td><td>{r.vendorName}</td><td>{fmtDate(r.spentDate)}</td><td>{fmt(r.amt)}</td><td>{r.paymentMode}</td><td><span className={`status ${r.status}`}>{r.status}</span></td><td className="actions"><button className="act view" onClick={()=>handleView(r)}>👁️ View</button><button className="act edit" onClick={()=>handleEdit(r)}>✏️ Edit</button><button className="act del" onClick={()=>handleDelete(r.id || r.seq)}>🗑️ Delete</button></td></tr>
        ))}</tbody></table>)}</div>

      <SpendingFormModal isOpen={showForm} onClose={()=>setShowForm(false)} onSubmit={handleSubmit} spendingData={editing} />
      <SpendingViewModal isOpen={showView} onClose={()=>setShowView(false)} spending={selected} />
    </div>
  );
}

export default SpendingList;


