import { useState, useEffect } from 'react';
import gstbillAPI from '../services/gstbillAPI';
import GstBillFormModal from './GstBillFormModal';
import GstBillViewModal from './GstBillViewModal';
import '../styles/GstBillList.css';

function GstBillList(){
  const [bills,setBills]=useState([]);
  const [loading,setLoading]=useState(false);
  const [showForm,setShowForm]=useState(false);
  const [editing,setEditing]=useState(null);
  const [showView,setShowView]=useState(false);
  const [selected,setSelected]=useState(null);
  const [search,setSearch]=useState('');
  const [filterStatus,setFilterStatus]=useState('');
  const [summary,setSummary]=useState(null);
  const [error,setError]=useState('');
  const [success,setSuccess]=useState('');

  useEffect(()=>{ fetchBills(); fetchSummary(); },[]);

  const fetchBills=async()=>{
    setLoading(true); setError('');
    try{
      const data = await gstbillAPI.getAllBills();
      setBills(Array.isArray(data)?data:[]);
    }catch(err){ setError('Failed to fetch bills'); }
    finally{ setLoading(false); }
  };

  const fetchSummary=async()=>{
    try{ const s = await gstbillAPI.getSummary(); setSummary(s); }catch(e){}
  };

  const handleAdd=()=>{ setEditing(null); setShowForm(true);}
  const handleEdit=(b)=>{ setEditing(b); setShowForm(true);}
  const handleView=(b)=>{ setSelected(b); setShowView(true);}

  const handleDelete=async(id)=>{
    if(!window.confirm('Delete this bill?')) return;
    try{ await gstbillAPI.deleteBill(id); setSuccess('Deleted'); fetchBills(); fetchSummary(); setTimeout(()=>setSuccess(''),3000);}catch(e){ setError('Delete failed'); }
  };

  const handleSubmit=async(form,id)=>{
    try{
      if(id) await gstbillAPI.updateBill(id,form); else await gstbillAPI.createBill(form);
      fetchBills(); fetchSummary(); setTimeout(()=>setSuccess('Saved'),2000);
    }catch(e){ setError('Save failed'); }
  };

  const filtered = bills.filter(b=>{
    const matchesSearch = !search || b.vendorName.toLowerCase().includes(search.toLowerCase()) || b.billNumber.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !filterStatus || b.status===filterStatus;
    return matchesSearch && matchesStatus;
  });

  const fmt = v => v? `₹${parseFloat(v).toLocaleString('en-IN',{minimumFractionDigits:2})}`:'₹0.00';

  return (
    <div className="gst-container">
      <div className="gst-header">
        <div>
          <h1>GST Bills</h1>
          <p>Manage purchase bills and GST amounts</p>
        </div>
        <button className="btn-add" onClick={handleAdd}>➕ Add Bill</button>
      </div>

      {summary && (
        <div className="gst-summary">
          <div className="card"><h4>Total Bills</h4><p>{summary.totalBills||0}</p></div>
          <div className="card"><h4>Total Bill Amount</h4><p>{fmt(summary.totalBillAmount)}</p></div>
          <div className="card"><h4>Total GST Amount</h4><p>{fmt(summary.totalGstAmount)}</p></div>
          <div className="card"><h4>Total With GST</h4><p>{fmt(summary.totalAmountWithGst)}</p></div>
        </div>
      )}

      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">{success}</div>}

      <div className="filters">
        <input placeholder="Search vendor or bill no" value={search} onChange={(e)=>setSearch(e.target.value)} />
        <select value={filterStatus} onChange={(e)=>setFilterStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="partial">Partial</option>
        </select>
      </div>

      <div className="table-wrap">
        {loading? <div className="loading">Loading...</div> : (
          <table className="gst-table">
            <thead>
              <tr>
                <th>Vendor</th>
                <th>Bill No</th>
                <th>GST No</th>
                <th>Bill Amt</th>
                <th>GST Amt</th>
                <th>Total</th>
                <th>Date</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(b=> (
                <tr key={b.id}>
                  <td>{b.vendorName}</td>
                  <td>{b.billNumber}</td>
                  <td>{b.gstNumber}</td>
                  <td>{fmt(b.billAmt)}</td>
                  <td>{fmt(b.gstAmt)}</td>
                  <td>{fmt(b.totalAmt)}</td>
                  <td>{b.billDate}</td>
                  <td>{b.paymentMethod}</td>
                  <td><span className={`status ${b.status}`}>{b.status}</span></td>
                  <td className="actions">
                    <button className="act view" onClick={()=>handleView(b)}>👁️ View</button>
                    <button className="act edit" onClick={()=>handleEdit(b)}>✏️ Edit</button>
                    <button className="act del" onClick={()=>handleDelete(b.id)}>🗑️ Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <GstBillFormModal isOpen={showForm} onClose={()=>setShowForm(false)} onSubmit={handleSubmit} billData={editing} />
      <GstBillViewModal isOpen={showView} onClose={()=>setShowView(false)} billData={selected} />
    </div>
  );
}

export default GstBillList;

