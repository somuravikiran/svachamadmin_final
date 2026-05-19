import '../styles/OrderViewModal.css';

function SalaryViewModal({ isOpen, onClose, salary = null }){
  if(!isOpen || !salary) return null;
  const fmt = v=> v? `₹${parseFloat(v).toLocaleString('en-IN',{minimumFractionDigits:2})}`:'₹0.00';
  const fmtDate = d=> d? new Date(d).toLocaleDateString('en-IN'):'-';
  return (
    <div className="ov-overlay" onClick={onClose}>
      <div className="ov-content" onClick={(e)=>e.stopPropagation()}>
        <div className="ov-header"><h2>Salary Details</h2><button className="ov-close" onClick={onClose}>✕</button></div>
        <div className="ov-body">
          <div className="section"><h3>Employee</h3><p><strong>{salary.employeeName}</strong> - {salary.employeeRole}</p></div>
          <div className="section grid">
            <div><label>Salary Month</label><p>{salary.salaryMonth}</p></div>
            <div><label>Payment Date</label><p>{fmtDate(salary.paymentDate)}</p></div>
            <div><label>Month Salary</label><p>{fmt(salary.monthSalary)}</p></div>
            <div><label>Paid Amount</label><p>{fmt(salary.paidAmt)}</p></div>
            <div><label>Balance</label><p>{fmt(salary.balanceAmt)}</p></div>
            <div><label>Status</label><p>{salary.status}</p></div>
            <div><label>Payment Mode</label><p>{salary.paymentMode}</p></div>
          </div>
          {salary.notes && <div className="section"><h3>Notes</h3><p>{salary.notes}</p></div>}
        </div>
        <div className="ov-footer"><button className="btn-close" onClick={onClose}>Close</button></div>
      </div>
    </div>
  );
}

export default SalaryViewModal;

