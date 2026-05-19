# SVACHAM Frontend - Client Management System

A modern React frontend for managing clients with real-time data operations, built with Vite and featuring a professional UI with Tailwind-inspired styling.

## 📋 Features

### Client Management Module
- **Add Client** - Create new client with validation
- **View Client** - Display full client details in a modal
- **Edit Client** - Update existing client information
- **Delete Client** - Remove client from system
- **Search** - Search clients by name, phone, or city
- **Filter** - Filter clients by state
- **Summary Dashboard** - View total clients, amount, paid, and balance

### API Endpoints
The frontend connects to these backend endpoints:

```
POST   /api/clients              - Create new client
GET    /api/clients              - Get all clients
GET    /api/clients/{id}         - Get client by ID
PUT    /api/clients/{id}         - Update client
DELETE /api/clients/{id}         - Delete client
GET    /api/clients/summary      - Get dashboard summary
```

## 🛠️ Project Structure

```
svacham-frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx                 # Navigation bar with search & notifications
│   │   ├── Sidebar.jsx                # Collapsible sidebar menu
│   │   ├── ClientList.jsx             # Main client management page
│   │   ├── ClientFormModal.jsx        # Add/Edit client modal
│   │   └── ClientViewModal.jsx        # View client details modal
│   ├── services/
│   │   └── clientAPI.js               # API service layer
│   ├── styles/
│   │   ├── Navbar.css                 # Navbar styling
│   │   ├── Sidebar.css                # Sidebar styling
│   │   ├── ClientList.css             # Client list page styling
│   │   ├── ClientFormModal.css        # Form modal styling
│   │   └── ClientViewModal.css        # View modal styling
│   ├── App.jsx                        # Main app component with routing
│   ├── App.css                        # App-wide styles
│   ├── index.css                      # Global styles & color scheme
│   └── main.jsx                       # Entry point
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── package.json                       # Dependencies
├── vite.config.js                     # Vite configuration
└── README.md                          # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Backend API running on `http://localhost:8080`

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will be available at `http://localhost:5173`

## 🎨 UI Components

### ClientList Component
Main page for managing clients with:
- Summary cards showing key metrics
- Search and filter functionality
- Responsive data table
- Action buttons (View, Edit, Delete)
- Empty and loading states

### ClientFormModal Component
Modal for adding/editing clients with:
- Form validation
- Real-time balance calculation
- Error messages
- Loading state

### ClientViewModal Component
Modal for viewing client details with:
- Personal information section
- Financial information display
- Audit information (created/updated dates)
- Formatted currency display

## 📱 Responsive Design

The UI is fully responsive with breakpoints:
- **Desktop** (1024px+) - Full layout
- **Tablet** (768px - 1023px) - Adjusted spacing and grid
- **Mobile** (480px - 767px) - Stacked layout
- **Small Mobile** (<480px) - Optimized for small screens

## 🎯 Color Scheme

```css
Primary Gradient:  #667eea → #764ba2
Accent Color:      #ff6b9d
Sidebar Dark:      #1a1a2e
Background Light:  #f5f7fa
Success:           #10b981
Error:             #ff6b6b
```

## 📝 Form Validations

### Client Form Properties

| Field | Validation | Example |
|-------|-----------|---------|
| Client Name | Required, non-empty | John Doe |
| Phone No | Valid Indian mobile (10 digits, 6-9 start) | 9876543210 |
| Address | Required, non-empty | 123 Main St |
| City | Required, non-empty | Mumbai |
| State | Required, non-empty | Maharashtra |
| Total Amount | Positive decimal, >= 0 | 5000.00 |
| Amount Paid | Positive decimal, >= 0, <= Total | 2500.00 |

## 🔄 API Service

The `clientAPI.js` service provides methods for:

```javascript
import clientAPI from '../services/clientAPI';

// Create client
await clientAPI.createClient(clientData);

// Get all clients
await clientAPI.getAllClients();

// Get client by ID
await clientAPI.getClientById(id);

// Update client
await clientAPI.updateClient(id, clientData);

// Delete client
await clientAPI.deleteClient(id);

// Get summary
await clientAPI.getSummary();

// Get clients by state
await clientAPI.getClientsByState(state);
```

## ⚡ Performance

- **Bundle Size**: ~200KB JavaScript (optimized)
- **CSS**: ~9KB (gzipped)
- **Build Time**: <2 seconds
- **Load Time**: Instant with Vite

## 🔐 Security Features

- Input validation on all forms
- Phone number format validation
- Amount validation (no negative values)
- XSS protection through React
- CORS support (configured for localhost:8080)

## 🐛 Error Handling

- User-friendly error messages
- Automatic error dismissal after 3 seconds
- Loading states during operations
- Confirmation dialogs for destructive actions

## 🌟 Key Features

### Real-time Calculations
- Balance amount automatically calculated as: Total Amount - Amount Paid
- Summary metrics updated instantly

### Smart Search
- Search across multiple fields (name, phone, city)
- Case-insensitive search
- Real-time filtering

### State Management
- React hooks for state management
- Modals for focused interactions
- Real-time list updates

## 📦 Dependencies

```json
{
  "react": "^19.2.6",
  "react-dom": "^19.2.6",
  "axios": "^1.16.1",
  "react-router-dom": "^7.15.1"
}
```

## 🔧 Configuration

### API Base URL
To change the API endpoint, edit `src/services/clientAPI.js`:

```javascript
const API_BASE_URL = 'http://localhost:8080/api/clients';
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates a `dist` folder ready for deployment.

### Deployment Checklist

- [ ] Update API_BASE_URL for production
- [ ] Set up environment variables
- [ ] Configure CORS on backend
- [ ] Test all API endpoints
- [ ] Verify error handling
- [ ] Check responsive design on multiple devices

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📝 Notes

- All forms include real-time validation
- Balance calculation is automatic
- Modals prevent page navigation until closed
- Search is case-insensitive
- State filtering is case-sensitive

## 🆘 Troubleshooting

### API Connection Issues
If you see "Failed to fetch clients":
1. Ensure backend is running on `http://localhost:8080`
2. Check CORS configuration on backend
3. Verify network connectivity

### Form Validation Not Working
- Check browser console for errors
- Verify regex patterns for phone numbers
- Ensure all required fields are filled

### Styling Issues
- Clear browser cache
- Run `npm run build` again
- Check CSS file imports in components

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vite.dev)
- [Axios Documentation](https://axios-http.com)

---

**Last Updated**: May 18, 2026

For support, contact the development team or check the backend API documentation.

