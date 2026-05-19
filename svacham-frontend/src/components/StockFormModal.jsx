import { useState, useEffect } from 'react';
import '../styles/OrderFormModal.css';

function StockFormModal({ isOpen, onClose, onSubmit, stockData = null }){
  const empty = { itemName:'', quality:'', itemCategory:'', stockUnit:'pcs', totalStock:'', usedStock:'', purchasedPricePerUnit:'', sellingPricePerUnit:'', stockAddedDate:'', status:'active', notes:'' };
  const [form,setForm]=useState(empty);
  const [errors,setErrors]=useState({});
  const [loading,setLoading]=useState(false);

  // disable hook linting for this simple assignment pattern
  // eslint-disable-next-line react-hooks/set-state-in-effect
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=>{
    if(stockData){
      setForm({
        itemName: stockData.itemName||'',
        quality: stockData.quality||'',
        itemCategory: stockData.itemCategory||'',
        stockUnit: stockData.stockUnit||'pcs',
        totalStock: stockData.totalStock||'',
        usedStock: stockData.usedStock||'',
        purchasedPricePerUnit: stockData.purchasedPricePerUnit||'',
        sellingPricePerUnit: stockData.sellingPricePerUnit||'',
        stockAddedDate: stockData.stockAddedDate||'',
        status: stockData.status||'active',
        notes: stockData.notes||''
      });
    } else setForm(empty);
    setErrors({});
  },[stockData,isOpen]);

  const validate = ()=>{
    const e = {};
    if(!form.itemName || !form.itemName.trim()) e.itemName='Item name required';
    if(!form.quality || !form.quality.trim()) e.quality='Quality required';
    if(!form.itemCategory || !form.itemCategory.trim()) e.itemCategory='Category required';
    if(form.totalStock==='' || isNaN(form.totalStock) || parseInt(form.totalStock)<0) e.totalStock='Total stock must be >=0';
    if(form.usedStock==='' || isNaN(form.usedStock) || parseInt(form.usedStock)<0) e.usedStock='Used stock must be >=0';
    if(form.purchasedPricePerUnit==='' || isNaN(form.purchasedPricePerUnit) || parseFloat(form.purchasedPricePerUnit)<0) e.purchasedPricePerUnit='Purchased price must be >=0';
    if(form.sellingPricePerUnit==='' || isNaN(form.sellingPricePerUnit) || parseFloat(form.sellingPricePerUnit)<0) e.sellingPricePerUnit='Selling price must be >=0';
    if(!form.stockAddedDate) e.stockAddedDate='Stock added date required';
    if(!form.status || !form.status.trim()) e.status='Status required';
    setErrors(e);
    return Object.keys(e).length===0;
  };

  const remaining = ()=>{
    const t = parseInt(form.totalStock)||0; const u = parseInt(form.usedStock)||0; return t - u;
  };

  const handleSubmit = async (ev)=>{
    ev.preventDefault();
    if(!validate()) return;
    setLoading(true);
    try{
      await onSubmit({
        itemName: form.itemName,
        quality: form.quality,
        itemCategory: form.itemCategory,
        stockUnit: form.stockUnit,
        totalStock: parseInt(form.totalStock)||0,
        usedStock: parseInt(form.usedStock)||0,
        purchasedPricePerUnit: parseFloat(form.purchasedPricePerUnit)||0,
        sellingPricePerUnit: parseFloat(form.sellingPricePerUnit)||0,
        stockAddedDate: form.stockAddedDate,
        status: form.status,
        notes: form.notes
      }, stockData?.seq);
      onClose();
    }catch(err){ console.error(err); }
    finally{ setLoading(false); }
  };

  if(!isOpen) return null;

  return (
    <div className="order-modal-overlay" onClick={onClose}>
      <div className="order-modal-content" onClick={(e)=>e.stopPropagation()}>
        <div className="order-modal-header"><h2>{stockData? 'Edit Stock':'Add Stock'}</h2><button className="order-close" onClick={onClose}>✕</button></div>
        <form className="order-form" onSubmit={handleSubmit}>
          <div className="order-grid">
            <div className="form-group"><label>Item Name *</label><input value={form.itemName} onChange={e=>setForm(f=>({...f, itemName: e.target.value}))} /><div className="error-message">{errors.itemName}</div></div>
            <div className="form-group"><label>Quality *</label><input value={form.quality} onChange={e=>setForm(f=>({...f, quality: e.target.value}))} /><div className="error-message">{errors.quality}</div></div>
            <div className="form-group"><label>Category *</label><input value={form.itemCategory} onChange={e=>setForm(f=>({...f, itemCategory: e.target.value}))} /><div className="error-message">{errors.itemCategory}</div></div>
            <div className="form-group"><label>Unit</label><input value={form.stockUnit} onChange={e=>setForm(f=>({...f, stockUnit: e.target.value}))} /></div>
            <div className="form-group"><label>Total Stock *</label><input type="number" value={form.totalStock} onChange={e=>setForm(f=>({...f, totalStock: e.target.value}))} /><div className="error-message">{errors.totalStock}</div></div>
            <div className="form-group"><label>Used Stock *</label><input type="number" value={form.usedStock} onChange={e=>setForm(f=>({...f, usedStock: e.target.value}))} /><div className="error-message">{errors.usedStock}</div></div>
            <div className="form-group"><label>Purchased Price *</label><input type="number" step="0.01" value={form.purchasedPricePerUnit} onChange={e=>setForm(f=>({...f, purchasedPricePerUnit: e.target.value}))} /><div className="error-message">{errors.purchasedPricePerUnit}</div></div>
            <div className="form-group"><label>Selling Price *</label><input type="number" step="0.01" value={form.sellingPricePerUnit} onChange={e=>setForm(f=>({...f, sellingPricePerUnit: e.target.value}))} /><div className="error-message">{errors.sellingPricePerUnit}</div></div>
            <div className="form-group"><label>Stock Added Date *</label><input type="date" value={form.stockAddedDate} onChange={e=>setForm(f=>({...f, stockAddedDate: e.target.value}))} /><div className="error-message">{errors.stockAddedDate}</div></div>
            <div className="form-group"><label>Status *</label><select value={form.status} onChange={e=>setForm(f=>({...f, status: e.target.value}))}><option value="active">Active</option><option value="inactive">Inactive</option><option value="reserved">Reserved</option></select><div className="error-message">{errors.status}</div></div>
            <div className="form-group full-width"><label>Notes</label><input value={form.notes} onChange={e=>setForm(f=>({...f, notes: e.target.value}))} /></div>

            <div className="form-group balance-display"><label>Remaining</label><div className="balance-value">{remaining()}</div></div>
          </div>

          <div className="modal-footer"><button type="button" className="btn-cancel" onClick={onClose} disabled={loading}>Cancel</button><button type="submit" className="btn-submit" disabled={loading}>{loading? 'Saving...': (stockData? 'Update':'Add Stock')}</button></div>
        </form>
      </div>
    </div>
  );
}

export default StockFormModal;


