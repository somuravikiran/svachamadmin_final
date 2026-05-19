 import '../styles/BankDetailsViewModal.css';

function BankDetailsViewModal({ isOpen, onClose, bank = null }){
  if(!isOpen || !bank) return null;
  const fmt = v=> v!=null ? `₹${parseFloat(v).toLocaleString('en-IN',{minimumFractionDigits:2})}`:'₹0.00';
  return (
    <div className="sv-overlay" onClick={onClose}>
      <div className="sv-content" onClick={(e)=>e.stopPropagation()}>
        <div className="sv-header"><h2>Bank Account {bank.seq? `#${bank.seq}` : ''}</h2><button className="sv-close" onClick={onClose}>✕</button></div>
        <div className="sv-body">
          <div className="section"><h3>{bank.holderName}</h3><p>{bank.bankName} - ****{bank.last4Acc}</p></div>
          <div className="section grid">
            <div><label>Amt Credited</label><p>{fmt(bank.amtCredited)}</p></div>
            <div><label>Amt Deposited</label><p>{fmt(bank.amtDeposited)}</p></div>
            <div><label>Account Balance</label><p>{fmt(bank.accountBal)}</p></div>
          </div>
        </div>
        <div className="sv-footer"><button className="btn-close" onClick={onClose}>Close</button></div>
      </div>
    </div>
  );
}

export default BankDetailsViewModal;

