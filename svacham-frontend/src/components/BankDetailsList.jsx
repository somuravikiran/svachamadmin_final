import { useState, useEffect } from 'react';
import bankDetailsAPI from '../services/bankDetailsAPI';
import BankDetailsFormModal from './BankDetailsFormModal';
import BankDetailsViewModal from './BankDetailsViewModal';
import '../styles/BankDetailsList.css';

function BankDetailsList(){
  const [items,setItems]=useState([]);
  const [loading,setLoading]=useState(false);
  const [showForm,setShowForm]=useState(false);
  const [editing,setEditing]=useState(null);
  const [showView,setShowView]=useState(false);
  const [selected,setSelected]=useState(null);
  const [search,setSearch]=useState('');
  const [summary,setSummary]=useState(null);
  const [error,setError]=useState('');
  const [success,setSuccess]=useState('');

  const fetchItems=async()=>{
    setLoading(true); setError('');
    try{ const data = await bankDetailsAPI.getAllBankDetails(); setItems(Array.isArray(data)?data:[]);}catch(err){ console.error(err); setError('Failed to fetch bank details'); }finally{ setLoading(false); }
  };
  const fetchSummary=async()=>{ try{ const s = await bankDetailsAPI.getSummary(); setSummary(s);}catch(err){ console.error(err); } };

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(()=>{ fetchItems(); fetchSummary(); },[]);

  const handleAdd=()=>{ setEditing(null); setShowForm(true);}
  const handleEdit=(r)=>{ setEditing(r); setShowForm(true);}
  const handleView = async (r) => {
    setLoading(true);
    try {
      // prefer id-based lookup, fall back to seq
      const fresh = r?.id ? await bankDetailsAPI.getBankDetailById(r.id) : (r?.seq ? await bankDetailsAPI.getBankDetailBySeq(r.seq) : null);
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
      // prefer id-based delete, fall back to seq
      try {
        await bankDetailsAPI.deleteBankDetail(idOrSeq);
      } catch (err) {
        console.warn('delete by id failed, trying delete by seq', err);
        await bankDetailsAPI.deleteBankDetailBySeq(idOrSeq);
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
          await bankDetailsAPI.updateBankDetail(idOrSeq, form);
        } catch (err) {
          console.warn('update by id failed, trying update by seq', err);
          await bankDetailsAPI.updateBankDetailBySeq(idOrSeq, form);
        }
      } else {
        await bankDetailsAPI.createBankDetail(form);
      }
      fetchItems();
      fetchSummary();
      setTimeout(() => setSuccess('Saved'), 2000);
    } catch (err) {
      console.error(err);
      setError(typeof err === 'string' ? err : (err?.message || 'Save failed'));
    }
  };

  const filtered = items.filter(i=> ( !search || (i.holderName && i.holderName.toLowerCase().includes(search.toLowerCase())) || (i.seq && `${i.seq}`.includes(search)) ));

  const fmt = v=> v!=null ? `₹${parseFloat(v).toLocaleString('en-IN',{minimumFractionDigits:2})}`:'₹0.00';

  return (
    <div className="bank-container">
      <div className="bank-header">
        <div><h1>Bank Details</h1><p>Manage bank accounts</p></div>
        <div style={{display:'flex',gap:'0.5rem'}}>
          <button className="btn-add" onClick={handleAdd}>➕ Add Account</button>
        </div>
      </div>

      {summary && <div className="bank-summary"><div className="card"><h4>Total Accounts</h4><p>{summary.totalAccounts||0}</p></div><div className="card"><h4>Total Balance</h4><p>{fmt(summary.totalBalance)}</p></div></div>}

      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">{success}</div>}

      <div className="filters"><input placeholder="Search holder or seq" value={search} onChange={e=>setSearch(e.target.value)} /></div>

      <div className="table-wrap">{loading? <div className="loading">Loading...</div> : (
        <table className="bank-table"><thead><tr><th>Seq</th><th>Holder</th><th>Bank</th><th>Last4Acc</th><th>Credited</th><th>Deposited</th><th>Balance</th><th>Actions</th></tr></thead>
        <tbody>{filtered.map(r=> (
          <tr key={r.id || r.seq}><td>{r.id || r.seq}</td><td>{r.holderName}</td><td>{r.bankName}</td><td>{r.last4Acc}</td><td>{fmt(r.amtCredited)}</td><td>{fmt(r.amtDeposited)}</td><td>{fmt(r.accountBal)}</td><td className="actions"><button className="act view" onClick={()=>handleView(r)}>👁️ View</button><button className="act edit" onClick={()=>handleEdit(r)}>✏️ Edit</button><button className="act del" onClick={()=>handleDelete(r.id || r.seq)}>🗑️ Delete</button></td></tr>
        ))}</tbody></table>)}</div>

      <BankDetailsFormModal isOpen={showForm} onClose={()=>setShowForm(false)} onSubmit={handleSubmit} bankData={editing} />
      <BankDetailsViewModal isOpen={showView} onClose={()=>setShowView(false)} bank={selected} />
    </div>
  );
}

export default BankDetailsList;


