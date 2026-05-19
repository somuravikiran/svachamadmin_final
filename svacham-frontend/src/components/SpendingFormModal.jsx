import { useState, useEffect } from 'react';
import '../styles/OrderFormModal.css';

function SpendingFormModal({ isOpen, onClose, onSubmit, spendingData = null }){
  const empty = { itemName:'', itemCategory:'', description:'', amt:'', spentDate:'', vendorName:'', paymentMode:'Cash', status:'paid' };
  const [form,setForm]=useState(empty);
  const [errors,setErrors]=useState({});
  const [loading,setLoading]=useState(false);

  // disable hook linting for this simple assignment pattern
  // eslint-disable-next-line react-hooks/set-state-in-effect
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=>{
    if(spendingData){
      setForm({
        itemName: spendingData.itemName||'',
        itemCategory: spendingData.itemCategory||'',
        description: spendingData.description||'',
        amt: spendingData.amt||'',
        spentDate: spendingData.spentDate||'',
        vendorName: spendingData.vendorName||'',
        paymentMode: spendingData.paymentMode||'Cash',
        status: spendingData.status||'paid'
      });
    }else setForm(empty);
    setErrors({});
  },[spendingData,isOpen]);

  const validate = ()=>{
    const e = {};
    if(!form.itemName || !form.itemName.trim()) e.itemName='Item name required';
    if(!form.itemCategory || !form.itemCategory.trim()) e.itemCategory='Category required';
    if(form.amt==='' || isNaN(form.amt) || parseFloat(form.amt)<0) e.amt='Amount must be >=0';
    if(!form.spentDate) e.spentDate='Spent date required';
    if(!form.vendorName || !form.vendorName.trim()) e.vendorName='Vendor required';
    if(!form.paymentMode || !form.paymentMode.trim()) e.paymentMode='Payment mode required';
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
        description: form.description,
        amt: parseFloat(form.amt)||0,
        spentDate: form.spentDate,
        vendorName: form.vendorName,
        paymentMode: form.paymentMode,
        status: form.status
      }, spendingData?.id || spendingData?.seq || spendingData?._id);
      onClose();
    }catch(err){ console.error(err); }
    finally{ setLoading(false); }
  };

  if(!isOpen) return null;

  return (
    <div className="order-modal-overlay" onClick={onClose}>
      <div className="order-modal-content" onClick={(e)=>e.stopPropagation()}>
        <div className="order-modal-header"><h2>{spendingData? 'Edit Spending':'Add Spending'}</h2><button className="order-close" onClick={onClose}>✕</button></div>
        <form className="order-form" onSubmit={handleSubmit}>
          <div className="order-grid">
            <div className="form-group"><label>Item Name *</label><input value={form.itemName} onChange={e=>setForm(f=>({...f, itemName: e.target.value}))} /><div className="error-message">{errors.itemName}</div></div>
            <div className="form-group"><label>Category *</label><input value={form.itemCategory} onChange={e=>setForm(f=>({...f, itemCategory: e.target.value}))} /><div className="error-message">{errors.itemCategory}</div></div>
            <div className="form-group full-width"><label>Description</label><input value={form.description} onChange={e=>setForm(f=>({...f, description: e.target.value}))} /></div>
            <div className="form-group"><label>Amount *</label><input type="number" step="0.01" value={form.amt} onChange={e=>setForm(f=>({...f, amt: e.target.value}))} /><div className="error-message">{errors.amt}</div></div>
            <div className="form-group"><label>Spent Date *</label><input type="date" value={form.spentDate} onChange={e=>setForm(f=>({...f, spentDate: e.target.value}))} /><div className="error-message">{errors.spentDate}</div></div>
            <div className="form-group"><label>Vendor Name *</label><input value={form.vendorName} onChange={e=>setForm(f=>({...f, vendorName: e.target.value}))} /><div className="error-message">{errors.vendorName}</div></div>
            <div className="form-group"><label>Payment Mode *</label><select value={form.paymentMode} onChange={e=>setForm(f=>({...f, paymentMode: e.target.value}))}><option>Cash</option><option>Bank Transfer</option><option>UPI</option><option>Cheque</option></select><div className="error-message">{errors.paymentMode}</div></div>
            <div className="form-group"><label>Status *</label><select value={form.status} onChange={e=>setForm(f=>({...f, status: e.target.value}))}><option value="paid">Paid</option><option value="pending">Pending</option><option value="cancelled">Cancelled</option></select><div className="error-message">{errors.status}</div></div>
          </div>

          <div className="modal-footer"><button type="button" className="btn-cancel" onClick={onClose} disabled={loading}>Cancel</button><button type="submit" className="btn-submit" disabled={loading}>{loading? 'Saving...': (spendingData? 'Update':'Add Spending')}</button></div>
        </form>
      </div>
    </div>
  );
}

export default SpendingFormModal;


