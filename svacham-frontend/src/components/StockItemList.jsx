import { useState, useEffect } from 'react';
import stockItemAPI from '../services/stockItemAPI';
import StockItemFormModal from './StockItemFormModal';
import StockItemViewModal from './StockItemViewModal';
import '../styles/StockItemList.css';

function StockItemList(){
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
    try{ const data = await stockItemAPI.getAllStockItems(); setItems(Array.isArray(data)?data:[]);}catch(err){ console.error(err); setError('Failed to fetch items'); }finally{ setLoading(false); }
  };
  const fetchSummary=async()=>{ try{ const s = await stockItemAPI.getSummary(); setSummary(s);}catch(err){ console.error(err); } };

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(()=>{ fetchItems(); fetchSummary(); },[]);

  const handleAdd=()=>{ setEditing(null); setShowForm(true);}
  const handleEdit=(r)=>{ setEditing(r); setShowForm(true);}
  const handleView = async (r) => {
    setLoading(true);
    try {
      // prefer id-based lookup, fall back to seq
      const fresh = r?.id ? await stockItemAPI.getStockItemById(r.id) : (r?.seq ? await stockItemAPI.getStockItemBySeq(r.seq) : null);
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
        await stockItemAPI.deleteStockItem(idOrSeq);
      } catch (err) {
        console.warn('delete by id failed, trying delete by seq', err);
        await stockItemAPI.deleteStockItemBySeq(idOrSeq);
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
          await stockItemAPI.updateStockItem(idOrSeq, form);
        } catch (err) {
          console.warn('update by id failed, trying update by seq', err);
          await stockItemAPI.updateStockItemBySeq(idOrSeq, form);
        }
      } else {
        await stockItemAPI.createStockItem(form);
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
      const data = await stockItemAPI.getSorted(by);
      setItems(Array.isArray(data)?data:(Array.isArray(Object.values(data).flat())? Object.values(data).flat(): []));
      setSuccess('Sorted'); setTimeout(()=>setSuccess(''),2000);
    }catch(err){ console.error(err); setError('Sort failed'); }finally{ setLoading(false); }
  };

  const filtered = items.filter(i=>{
    const matches = !search || (i.itemName && i.itemName.toLowerCase().includes(search.toLowerCase())) || (i.seq && `${i.seq}`.includes(search));
    const matchesCat = !filterCat || i.itemCategory===filterCat;
    return matches && matchesCat;
  });

  // formatting helper (unused for stock items) kept for consistency if needed later
  return (
    <div className="stockitem-container">
      <div className="stockitem-header">
        <div><h1>Stock Items</h1><p>Manage stock items</p></div>
        <div style={{display:'flex',gap:'0.5rem'}}>
          <button className="btn-add" onClick={handleAdd}>➕ Add Item</button>
          <button className="btn-add" onClick={()=>handleSort('category')}>🔀 Sort</button>
        </div>
      </div>

      {summary && <div className="stockitem-summary"><div className="card"><h4>Total Items</h4><p>{summary.totalItems||0}</p></div><div className="card"><h4>Total Units</h4><p>{summary.totalUnits||0}</p></div></div>}

      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">{success}</div>}

      <div className="filters"><input placeholder="Search name or seq" value={search} onChange={e=>setSearch(e.target.value)} /><select value={filterCat} onChange={e=>setFilterCat(e.target.value)}><option value="">All Categories</option></select></div>

      <div className="table-wrap">{loading? <div className="loading">Loading...</div> : (
        <table className="stockitem-table"><thead><tr><th>Seq</th><th>Name</th><th>Category</th><th>Quantity</th><th>Total</th><th>Used</th><th>Remaining</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>{filtered.map(r=> (
          <tr key={r.id || r.seq}><td>{r.id || r.seq}</td><td>{r.itemName}</td><td>{r.itemCategory}</td><td>{r.quantity}</td><td>{r.totalStock}</td><td>{r.usedStock}</td><td>{r.remainingStock}</td><td><span className={`status ${r.status}`}>{r.status}</span></td><td className="actions"><button className="act view" onClick={()=>handleView(r)}>👁️ View</button><button className="act edit" onClick={()=>handleEdit(r)}>✏️ Edit</button><button className="act del" onClick={()=>handleDelete(r.id || r.seq)}>🗑️ Delete</button></td></tr>
        ))}</tbody></table>)}</div>

      <StockItemFormModal isOpen={showForm} onClose={()=>setShowForm(false)} onSubmit={handleSubmit} stockItemData={editing} />
      <StockItemViewModal isOpen={showView} onClose={()=>setShowView(false)} stockItem={selected} />
    </div>
  );
}

export default StockItemList;


