import { useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import ClientList from './components/ClientList'
import GstBillList from './components/GstBillList'
import OrderList from './components/OrderList'
import SalaryList from './components/SalaryList'
import SpendingList from './components/SpendingList'
import StockList from './components/StockList'
import StockItemList from './components/StockItemList'
import BankDetailsList from './components/BankDetailsList'
import './App.css'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState('dashboard')

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleCloseSidebar = () => {
    setSidebarOpen(false)
  }

  const handleNavigate = (page) => {
    setCurrentPage(page)
    setSidebarOpen(false)
  }

  return (
    <div className="app-container">
      <Navbar onToggleSidebar={handleToggleSidebar} />
      <Sidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} onNavigate={handleNavigate} />
      <main className="main-content">
        {currentPage === 'dashboard' && (
          <section className="dashboard">
            <div className="welcome-section">
              <h1>Welcome to SVACHAM</h1>
              <p>Your comprehensive management solution</p>
            </div>

            <div className="dashboard-grid">
              <div className="dashboard-card" onClick={() => handleNavigate('clients')}>
                <div className="card-icon">👥</div>
                <h3>Clients</h3>
                <p>Manage your clients</p>
              </div>
              <div className="dashboard-card" onClick={() => handleNavigate('gstbill')}>
                <div className="card-icon">🧾</div>
                <h3>GST Bills</h3>
                <p>View GST invoices</p>
              </div>
              <div className="dashboard-card" onClick={() => handleNavigate('order')}>
                <div className="card-icon">📦</div>
                <h3>Orders</h3>
                <p>Track orders</p>
              </div>
              <div className="dashboard-card" onClick={() => handleNavigate('salary')}>
                <div className="card-icon">💰</div>
                <h3>Salary</h3>
                <p>Manage salaries</p>
              </div>
              <div className="dashboard-card" onClick={() => handleNavigate('spending')}>
                <div className="card-icon">💸</div>
                <h3>Spending</h3>
                <p>Track expenses</p>
              </div>
              <div className="dashboard-card" onClick={() => handleNavigate('stock')}>
                <div className="card-icon">📊</div>
                <h3>Stock</h3>
                <p>Inventory management</p>
              </div>
              <div className="dashboard-card" onClick={() => handleNavigate('stockitem')}>
                <div className="card-icon">📇</div>
                <h3>Stock Items</h3>
                <p>Manage items</p>
              </div>
              <div className="dashboard-card" onClick={() => handleNavigate('bankdetails')}>
                <div className="card-icon">🏦</div>
                <h3>Bank Details</h3>
                <p>Banking information</p>
              </div>
            </div>
          </section>
        )}

        {currentPage === 'clients' && <ClientList />}
        {currentPage === 'gstbill' && <GstBillList />}
        {currentPage === 'order' && <OrderList />}
        {currentPage === 'salary' && <SalaryList />}
        {currentPage === 'spending' && <SpendingList />}
        {currentPage === 'stock' && <StockList />}
        {currentPage === 'stockitem' && <StockItemList />}
        {currentPage === 'bankdetails' && <BankDetailsList />}
      </main>
    </div>
  )
}

export default App
