import { useState, useEffect } from 'react';
import '../styles/OrderFormModal.css';

function StockItemFormModal({ isOpen, onClose, onSubmit, stockItemData = null }){
  const empty = { itemName:'', itemCategory:'', quantity:'', totalStock:'', usedStock:'', status:'active', notes:'' };
  const [form,setForm]=useState(empty);
  const [errors,setErrors]=useState({});
  const [loading,setLoading]=useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(()=>{
    if(stockItemData){
      setForm({
        itemName: stockItemData.itemName||'',
        itemCategory: stockItemData.itemCategory||'',
        quantity: stockItemData.quantity||'',
        totalStock: stockItemData.totalStock||'',
        usedStock: stockItemData.usedStock||'',
        status: stockItemData.status||'active',
        notes: stockItemData.notes||''
      });
    }else setForm(empty);
    setErrors({});
  },[stockItemData,isOpen]);

  const validate = ()=>{
    const e = {};
    if(!form.itemName || !form.itemName.trim()) e.itemName='Item name required';
    if(!form.itemCategory || !form.itemCategory.trim()) e.itemCategory='Category required';
    if(form.quantity==='' || isNaN(form.quantity) || parseInt(form.quantity)<0) e.quantity='Quantity >=0';
    if(form.totalStock==='' || isNaN(form.totalStock) || parseInt(form.totalStock)<0) e.totalStock='Total stock >=0';
    if(form.usedStock==='' || isNaN(form.usedStock) || parseInt(form.usedStock)<0) e.usedStock='Used stock >=0';
    if(!form.status || !form.status.trim()) e.status='Status required';
    setErrors(e);
    return Object.keys(e).length===0;
  };

  const handleSubmit = async (ev)=>{
    ev.preventDefault();
    if(!validate()) return;
    setLoading(true);
    try{
      await onSubmit({
        itemName: form.itemName,
        itemCategory: form.itemCategory,
        quantity: parseInt(form.quantity)||0,
        totalStock: parseInt(form.totalStock)||0,
        usedStock: parseInt(form.usedStock)||0,
        status: form.status,
        notes: form.notes
      }, stockItemData?.seq);
      onClose();
    }catch(err){ console.error(err); }
    finally{ setLoading(false); }
  };

  if(!isOpen) return null;

  return (
    <div className="order-modal-overlay" onClick={onClose}>
      <div className="order-modal-content" onClick={(e)=>e.stopPropagation()}>
        <div className="order-modal-header"><h2>{stockItemData? 'Edit Item':'Add Item'}</h2><button className="order-close" onClick={onClose}>✕</button></div>
        <form className="order-form" onSubmit={handleSubmit}>
          <div className="order-grid">
            <div className="form-group"><label>Item Name *</label><input value={form.itemName} onChange={e=>setForm(f=>({...f, itemName: e.target.value}))} /><div className="error-message">{errors.itemName}</div></div>
            <div className="form-group"><label>Category *</label><input value={form.itemCategory} onChange={e=>setForm(f=>({...f, itemCategory: e.target.value}))} /><div className="error-message">{errors.itemCategory}</div></div>
            <div className="form-group"><label>Quantity *</label><input type="number" value={form.quantity} onChange={e=>setForm(f=>({...f, quantity: e.target.value}))} /><div className="error-message">{errors.quantity}</div></div>
            <div className="form-group"><label>Total Stock *</label><input type="number" value={form.totalStock} onChange={e=>setForm(f=>({...f, totalStock: e.target.value}))} /><div className="error-message">{errors.totalStock}</div></div>
            <div className="form-group"><label>Used Stock *</label><input type="number" value={form.usedStock} onChange={e=>setForm(f=>({...f, usedStock: e.target.value}))} /><div className="error-message">{errors.usedStock}</div></div>
            <div className="form-group"><label>Status *</label><select value={form.status} onChange={e=>setForm(f=>({...f, status: e.target.value}))}><option value="active">Active</option><option value="inactive">Inactive</option><option value="reserved">Reserved</option></select><div className="error-message">{errors.status}</div></div>
            <div className="form-group full-width"><label>Notes</label><input value={form.notes} onChange={e=>setForm(f=>({...f, notes: e.target.value}))} /></div>
          </div>

          <div className="modal-footer"><button type="button" className="btn-cancel" onClick={onClose} disabled={loading}>Cancel</button><button type="submit" className="btn-submit" disabled={loading}>{loading? 'Saving...': (stockItemData? 'Update':'Add Item')}</button></div>
        </form>
      </div>
    </div>
  );
}

export default StockItemFormModal;

