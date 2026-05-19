# Quick Start Guide

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Running the Application

```bash
# Install dependencies (if not already done)
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

## File Structure

```
svacham-frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation bar component
│   │   └── Sidebar.jsx         # Sidebar menu component
│   ├── styles/
│   │   ├── Navbar.css          # Navbar styling
│   │   └── Sidebar.css         # Sidebar styling
│   ├── App.jsx                 # Main app component
│   ├── App.css                 # App styling
│   ├── index.css               # Global styles
│   ├── main.jsx                # Entry point
│   └── assets/                 # Images and icons
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── package.json
├── vite.config.js
└── eslint.config.js
```

## Key Features

### 1. Navbar
- **Logo/Brand**: "SVACHAM" displayed prominently
- **Search Function**: Search bar in the center
- **Notifications**: Bell icon with dropdown menu showing recent notifications
- **User Profile**: Display user avatar and name
- **Menu Toggle**: Hamburger menu to open/close sidebar

### 2. Sidebar
- **8 Menu Items**:
  - 👥 Client
  - 🧾 GST Bill
  - 📦 Order
  - 💰 Salary
  - 💸 Spending
  - 📊 Stock
  - 📇 Stock Item
  - 🏦 Bank Details

- **Features**:
  - Hidden by default
  - Smooth slide-in animation
  - Hover effects on menu items
  - Icon + Label for each item
  - Click overlay to close
  - Responsive design

### 3. Dashboard
- Welcome section with gradient heading
- 8 feature cards matching sidebar items
- Hover animations
- Responsive grid layout

## Color Scheme

| Element | Color | Hex Value |
|---------|-------|-----------|
| Primary Gradient | Purple to Dark Purple | #667eea → #764ba2 |
| Accent | Pink | #ff6b9d |
| Sidebar Background | Dark Blue | #1a1a2e |
| Main Background | Light Blue | #f5f7fa |
| Text Primary | Dark Gray | #333333 |
| Text Secondary | Medium Gray | #666666 |

## Interactive Elements

### Navbar Interactions
- **Menu Button**: Click to toggle sidebar visibility
- **Search Bar**: Type to search (functionality to be implemented)
- **Notification Bell**: Click to see notifications dropdown
- **User Profile**: Click for user menu (functionality to be implemented)

### Sidebar Interactions
- **Menu Items**: Click to navigate (routing to be implemented)
- **Hover Effect**: Color changes and icon scales up
- **Close Button**: Click or click overlay to close
- **Smooth Animation**: Slide-in/out effect on open/close

### Dashboard Cards
- **Hover Effect**: Card elevates with enhanced shadow
- **Icon Animation**: Icon scales and rotates on hover
- **Responsive**: Adjusts layout for different screen sizes

## Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px to 1023px
- **Mobile**: Below 768px
- **Small Mobile**: 480px and below

## Customization

### Change Primary Color
Edit `index.css` and update:
```css
--primary-gradient: linear-gradient(135deg, #YOUR_COLOR_1 0%, #YOUR_COLOR_2 100%);
--primary: #YOUR_COLOR_1;
--primary-dark: #YOUR_COLOR_2;
```

### Add New Menu Items
Edit `Sidebar.jsx` and add to `menuItems` array:
```javascript
{ id: 9, label: 'New Item', icon: '🎯' }
```

### Modify Notifications
Edit `Navbar.jsx` and update `notifications` state:
```javascript
const [notifications, setNotifications] = useState([
  { id: 1, message: 'Your message', time: 'time ago' },
]);
```

## Performance

- **Build Size**: ~9KB CSS (gzipped: ~2.47KB)
- **Bundle Size**: ~198KB JavaScript (gzipped: ~62.48KB)
- **Build Time**: < 1.5 seconds

## Common Tasks

### Toggle Sidebar Programmatically
```javascript
const [sidebarOpen, setSidebarOpen] = useState(false);
const handleToggleSidebar = () => setSidebarOpen(!sidebarOpen);
```

### Add Routing
Replace `href="#"` with `Link` from react-router-dom:
```javascript
import { Link } from 'react-router-dom';
<Link to="/client">Client</Link>
```

### Implement Search
Update `handleSearch` in `Navbar.jsx` to implement desired functionality.

## Troubleshooting

**Issue**: Sidebar not appearing
- Solution: Check that sidebar state is being passed correctly from App.jsx

**Issue**: Styling not applied
- Solution: Verify CSS files are imported in components

**Issue**: Build fails
- Solution: Run `npm install` to ensure all dependencies are installed

## Support & Documentation

For more information about React, Vite, and styling, refer to:
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vite.dev)
- [MDN CSS Guide](https://developer.mozilla.org/en-US/docs/Web/CSS)

