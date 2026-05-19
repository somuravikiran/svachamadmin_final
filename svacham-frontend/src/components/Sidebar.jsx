import '../styles/Sidebar.css';

function Sidebar({ isOpen, onClose, onNavigate }) {
  const menuItems = [
    { id: 0, label: 'Dashboard', icon: '🏠', page: 'dashboard' },
    { id: 1, label: 'Client', icon: '👥', page: 'clients' },
    { id: 2, label: 'GST Bill', icon: '🧾', page: 'gstbill' },
    { id: 3, label: 'Order', icon: '📦', page: 'order' },
    { id: 4, label: 'Salary', icon: '💰', page: 'salary' },
    { id: 5, label: 'Spending', icon: '💸', page: 'spending' },
    { id: 6, label: 'Stock', icon: '📊', page: 'stock' },
    { id: 7, label: 'Stock Item', icon: '📇', page: 'stockitem' },
    { id: 8, label: 'Bank Details', icon: '🏦', page: 'bankdetails' },
  ];

  const handleMenuClick = (page) => {
    if (onNavigate) {
      onNavigate(page);
    }
    onClose();
  };

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Menu</h2>
          <button className="close-btn" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <a
              key={item.id}
              href="#"
              className="sidebar-link"
              onClick={(e) => {
                e.preventDefault();
                handleMenuClick(item.page);
              }}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;

