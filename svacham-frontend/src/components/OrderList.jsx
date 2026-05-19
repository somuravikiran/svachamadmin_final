import { useState, useEffect } from 'react';
import orderAPI from '../services/orderAPI';
import OrderFormModal from './OrderFormModal';
import OrderViewModal from './OrderViewModal';
import '../styles/OrderList.css';

function OrderList(){
  const [orders,setOrders]=useState([]);
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

  const fetchOrders=async()=>{
    setLoading(true); setError('');
    try{ const data = await orderAPI.getAllOrders(); setOrders(Array.isArray(data)?data:[]);}catch(err){ console.error(err); setError('Failed to fetch orders'); }finally{ setLoading(false); }
  };
  const fetchSummary=async()=>{ try{ const s = await orderAPI.getSummary(); setSummary(s);}catch(err){ console.error(err); } };

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(()=>{ fetchOrders(); fetchSummary(); },[]);

  const handleAdd=()=>{ setEditing(null); setShowForm(true);}
  const handleEdit=(o)=>{ setEditing(o); setShowForm(true);}
  const handleView=async(o)=>{
    setLoading(true);
    try{
      const fresh = await orderAPI.getOrderById(o.id);
      setSelected(fresh || o);
    }catch(err){ console.error(err); setSelected(o); }
    finally{ setLoading(false); setShowView(true); }
  }
  const handleDelete=async(id)=>{ if(!window.confirm('Delete this order?')) return; try{ await orderAPI.deleteOrder(id); setSuccess('Deleted'); fetchOrders(); fetchSummary(); setTimeout(()=>setSuccess(''),3000);}catch(err){ console.error(err); setError('Delete failed'); }};
  const handleSubmit=async(form,id)=>{ try{ if(id) await orderAPI.updateOrder(id,form); else await orderAPI.createOrder(form); fetchOrders(); fetchSummary(); setTimeout(()=>setSuccess('Saved'),2000);}catch(err){ console.error(err); setError('Save failed'); }};

  const handleSortByStatus=async()=>{
    setLoading(true); setError('');
    try{
      const data = await orderAPI.getSortedByStatus(filterStatus || undefined);
      // backend may return array or object grouped by status
      if (Array.isArray(data)) setOrders(data);
      else if (data && typeof data === 'object'){
        const orderOf = ['pending','confirmed','completed','cancelled'];
        const flat = [];
        orderOf.forEach(st => { if (Array.isArray(data[st])) flat.push(...data[st]); });
        // fallback: if flat empty, just push all values
        if (flat.length === 0) Object.values(data).forEach(v=> Array.isArray(v) && flat.push(...v));
        setOrders(flat);
      } else setOrders([]);
      setSuccess('Sorted by status'); setTimeout(()=>setSuccess(''),2000);
    }catch(err){ console.error(err); setError('Failed to sort'); }
    finally{ setLoading(false); }
  };

  const filtered = orders.filter(o=>{
    const matches = !search || (o.clientName && o.clientName.toLowerCase().includes(search.toLowerCase())) || (o.id && o.id.includes(search));
    const matchesStatus = !filterStatus || o.orderStatus===filterStatus;
    return matches && matchesStatus;
  });

  const fmt = v=> v? `₹${parseFloat(v).toLocaleString('en-IN',{minimumFractionDigits:2})}`:'₹0.00';
  return (
    <div className="order-container">
      <div className="order-header">
        <div><h1>Orders</h1><p>Manage customer orders</p></div>
        <div style={{display:'flex',gap:'0.5rem'}}>
          <button className="btn-add" onClick={handleAdd}>➕ Add Order</button>
          <button className="btn-add" onClick={handleSortByStatus} title="Fetch orders grouped/sorted by status">🔀 Sort by Status</button>
        </div>
      </div>

      {summary && <div className="order-summary"><div className="card"><h4>Total Orders</h4><p>{summary.totalOrders||0}</p></div><div className="card"><h4>Total Amount</h4><p>{fmt(summary.totalAmount)}</p></div><div className="card"><h4>Total Pending</h4><p>{fmt(summary.totalPending)}</p></div></div>}

      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">{success}</div>}

      <div className="filters"><input placeholder="Search client or id" value={search} onChange={e=>setSearch(e.target.value)} /><select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)}><option value="">All Status</option><option value="pending">Pending</option><option value="confirmed">Confirmed</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option></select></div>

      <div className="table-wrap">{loading? <div className="loading">Loading...</div> : (
        <table className="order-table"><thead><tr><th>Order ID</th><th>Client</th><th>Order Date</th><th>Delivery</th><th>Total</th><th>Paid</th><th>Pending</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>{filtered.map(o=> (
          <tr key={o.id}><td>{o.id}</td><td>{o.clientName}</td><td>{o.orderDate}</td><td>{o.deliveryDate||'-'}</td><td>{fmt(o.totalAmt)}</td><td>{fmt(o.paidAmt)}</td><td>{fmt(o.pendingAmt)}</td><td><span className={`status ${o.orderStatus}`}>{o.orderStatus}</span></td><td className="actions"><button className="act view" onClick={()=>handleView(o)}>👁️ View</button><button className="act edit" onClick={()=>handleEdit(o)}>✏️ Edit</button><button className="act del" onClick={()=>handleDelete(o.id)}>🗑️ Delete</button></td></tr>
        ))}</tbody></table>)}</div>

      <OrderFormModal isOpen={showForm} onClose={()=>setShowForm(false)} onSubmit={handleSubmit} orderData={editing} />
      <OrderViewModal isOpen={showView} onClose={()=>setShowView(false)} order={selected} />
    </div>
  );
}

export default OrderList;

