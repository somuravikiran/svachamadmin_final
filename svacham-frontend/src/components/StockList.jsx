import { useState, useEffect } from 'react';
import stockAPI from '../services/stockAPI';
import StockFormModal from './StockFormModal';
import StockViewModal from './StockViewModal';
import '../styles/StockList.css';

function StockList(){
  const [items,setItems]=useState([]);
  const [loading,setLoading]=useState(false);
  const [showForm,setShowForm]=useState(false);
  const [editing,setEditing]=useState(null);
  const [showView,setShowView]=useState(false);
  const [selected,setSelected]=useState(null);
  const [search,setSearch]=useState('');
  const [filterCat,setFilterCat]=useState('');
  const [summary,setSummary]=useState(null);
  const [error,setError]=useState('');
  const [success,setSuccess]=useState('');

  const fetchItems=async()=>{
    setLoading(true); setError('');
    try{ const data = await stockAPI.getAllStocks(); setItems(Array.isArray(data)?data:[]);}catch(err){ console.error(err); setError('Failed to fetch stocks'); }finally{ setLoading(false); }
  };
  const fetchSummary=async()=>{ try{ const s = await stockAPI.getSummary(); setSummary(s);}catch(err){ console.error(err); } };

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(()=>{ fetchItems(); fetchSummary(); },[]);

  const handleAdd=()=>{ setEditing(null); setShowForm(true);}
  const handleEdit=(r)=>{ setEditing(r); setShowForm(true);}
  const handleView=async(r)=>{ setLoading(true); try{ const fresh = await stockAPI.getStockBySeq(r.seq); setSelected(fresh || r);}catch(err){ console.error(err); setSelected(r);}finally{ setLoading(false); setShowView(true);} };
  const handleDelete=async(seq)=>{ if(!window.confirm('Delete this record?')) return; try{ await stockAPI.deleteStockBySeq(seq); setSuccess('Deleted'); fetchItems(); fetchSummary(); setTimeout(()=>setSuccess(''),3000);}catch(err){ console.error(err); setError('Delete failed'); }};
  const handleSubmit=async(form,seq)=>{ try{ if(seq) await stockAPI.updateStockBySeq(seq,form); else await stockAPI.createStock(form); fetchItems(); fetchSummary(); setTimeout(()=>setSuccess('Saved'),2000);}catch(err){ console.error(err); setError('Save failed'); }};

  const handleSort=async(by)=>{
    setLoading(true); setError('');
    try{
      const data = await stockAPI.getSorted(by);
      setItems(Array.isArray(data)?data:(Array.isArray(Object.values(data).flat())? Object.values(data).flat(): []));
      setSuccess('Sorted'); setTimeout(()=>setSuccess(''),2000);
    }catch(err){ console.error(err); setError('Sort failed'); }finally{ setLoading(false); }
  };

  const filtered = items.filter(i=>{
    const matches = !search || (i.itemName && i.itemName.toLowerCase().includes(search.toLowerCase())) || (i.seq && `${i.seq}`.includes(search));
    const matchesCat = !filterCat || i.itemCategory===filterCat;
    return matches && matchesCat;
  });

  const fmt = v=> v!=null ? `₹${parseFloat(v).toLocaleString('en-IN',{minimumFractionDigits:2})}`:'₹0.00';
  const fmtDate = d=> d? new Date(d).toLocaleDateString('en-IN'):'-';

  return (
    <div className="stock-container">
      <div className="stock-header">
        <div><h1>Stock</h1><p>Manage inventory items</p></div>
        <div style={{display:'flex',gap:'0.5rem'}}>
          <button className="btn-add" onClick={handleAdd}>➕ Add Stock</button>
          <button className="btn-add" onClick={()=>handleSort('category')}>🔀 Sort</button>
        </div>
      </div>

      {summary && <div className="stock-summary"><div className="card"><h4>Total Records</h4><p>{summary.totalRecords||0}</p></div><div className="card"><h4>Total Units</h4><p>{summary.totalUnits||0}</p></div><div className="card"><h4>Inventory Value</h4><p>{fmt(summary.totalInventoryValue)}</p></div></div>}

      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">{success}</div>}

      <div className="filters"><input placeholder="Search name or seq" value={search} onChange={e=>setSearch(e.target.value)} /><select value={filterCat} onChange={e=>setFilterCat(e.target.value)}><option value="">All Categories</option></select></div>

      <div className="table-wrap">{loading? <div className="loading">Loading...</div> : (
        <table className="stock-table"><thead><tr><th>Seq</th><th>Item</th><th>Quality</th><th>Category</th><th>Unit</th><th>Total</th><th>Used</th><th>Remaining</th><th>Purchased</th><th>Selling</th><th>Added</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>{filtered.map(r=> (
          <tr key={r.seq || r.id}><td>{r.seq || r.id}</td><td>{r.itemName}</td><td>{r.quality}</td><td>{r.itemCategory}</td><td>{r.stockUnit}</td><td>{r.totalStock}</td><td>{r.usedStock}</td><td>{r.remainingStock}</td><td>{fmt(r.purchasedPricePerUnit)}</td><td>{fmt(r.sellingPricePerUnit)}</td><td>{fmtDate(r.stockAddedDate)}</td><td><span className={`status ${r.status}`}>{r.status}</span></td><td className="actions"><button className="act view" onClick={()=>handleView(r)}>👁️ View</button><button className="act edit" onClick={()=>handleEdit(r)}>✏️ Edit</button><button className="act del" onClick={()=>handleDelete(r.seq || r.id)}>🗑️ Delete</button></td></tr>
        ))}</tbody></table>)}</div>

      <StockFormModal isOpen={showForm} onClose={()=>setShowForm(false)} onSubmit={handleSubmit} stockData={editing} />
      <StockViewModal isOpen={showView} onClose={()=>setShowView(false)} stock={selected} />
    </div>
  );
}

export default StockList;

