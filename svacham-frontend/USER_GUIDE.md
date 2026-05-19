# User Guide - SVACHAM Client Management System

## 🎯 Complete Navigation & Usage Guide

---

## 🏠 Main Dashboard

When you first open the application at `http://localhost:5173`:

```
┌─────────────────────────────────────────────────────────────┐
│ SVACHAM  [☰] 🔍 Search...          🔔 [●] | 👤 User       │  ← NAVBAR
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Welcome to SVACHAM                                         │
│  Your comprehensive management solution              │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │    👥    │  │    🧾    │  │    📦    │  │    💰    │   │
│  │ Clients  │  │ GST Bill │  │  Order   │  │ Salary   │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │    💸    │  │    📊    │  │    📇    │  │    🏦    │   │ DASHBOARD
│  │ Spending │  │  Stock   │  │Stock Item│  │  Bank    │   │ CARDS
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Actions on Dashboard**:
- Click any card (especially Clients 👥) to navigate
- Use menu icon (☰) to open/close sidebar
- Use search bar to search across all modules
- Click notification bell to see updates
- Click user profile for account options

---

## 📋 Sidebar Menu

Click the hamburger icon (☰) to open sidebar or click any menu item:

```
┌──────────────────────┐
│ Menu         [  ×  ] │ ← Close button
├──────────────────────┤
│ 👥  Client           │ ← Active: Client Management
│ 🧾  GST Bill         │
│ 📦  Order            │
│ 💰  Salary           │
│ 💸  Spending         │
│ 📊  Stock            │
│ 📇  Stock Item       │
│ 🏦  Bank Details     │
└──────────────────────┘
```

**Sidebar Features**:
- Click any menu item to navigate
- Hover effects show active state
- Click overlay to close
- Responsive - collapses on mobile

---

## 👥 Clients Management Page

Click on "Clients" (👥) to access the main client management interface:

```
┌────────────────────────────────────────────────────────────────┐
│ Clients Management               [➕ Add New Client]          │  ← Header
│ Manage and track all your clients information and payments    │  ← Description
├────────────────────────────────────────────────────────────────┤
│
│ Summary Metrics:
│ ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ │ Total Clients│  │ Total Amount │  │ Total Paid   │  │ Total Balance│
│ │      25      │  │   ₹125,000   │  │   ₹79,500    │  │   ₹45,500    │
│ └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘
│
│ Filters & Search:
│ ┌─────────────────────────────────┐  ┌──────────────┐
│ │🔍 Search by name, phone, city... │  │ All States ▼ │
│ └─────────────────────────────────┘  └──────────────┘
│
│ Clients Table:
│ ┌──────────────────────────────────────────────────────────────┐
│ │ Name        │ Phone      │ City     │ State │ Total │ Balance│
│ ├──────────────────────────────────────────────────────────────┤
│ │ [A] John Doe│ 9876543210 │ Mumbai   │  MH   │ ₹5000 │ ₹2500 │
│ │             │            │          │       │       │ [👁️ ✏️ 🗑️] │
│ ├──────────────────────────────────────────────────────────────┤
│ │ [J] Jane Dev│ 9123456789 │ Delhi    │  DL   │ ₹8000 │ ₹1000 │
│ │             │            │          │       │       │ [👁️ ✏️ 🗑️] │
│ └──────────────────────────────────────────────────────────────┘
│
│ Showing 2 of 25 clients
└────────────────────────────────────────────────────────────────┘
```

---

## ➕ Adding a New Client

### Step 1: Click "Add New Client" Button
Located in top-right of page header

### Step 2: Form Modal Opens
```
┌──────────────────────────────────────────────┐
│ Add New Client               [  ×  ]        │  ← Close button
├──────────────────────────────────────────────┤
│                                              │
│ Client Name *     │ Phone Number *           │
│ [________________]│ [________________]       │
│                                              │
│ City *            │ State *                  │
│ [________________]│ [________________]       │
│                                              │
│ Address * (Required)                        │
│ ┌──────────────────────────────────────────┐ │
│ │                                          │ │
│ └──────────────────────────────────────────┘ │
│                                              │
│ Total Amount *    │ Amount Paid *            │
│ [________________]│ [________________]       │
│                                              │
│ Balance Amount                               │
│ ┌──────────────────────────────────────────┐ │
│ │         ₹2,500.00                        │ │
│ └──────────────────────────────────────────┘ │
│                                              │
│ [Cancel]                    [Add Client]    │
└──────────────────────────────────────────────┘
```

### Step 3: Fill Form & Validate
- All fields marked with * are required
- Phone must be 10 digits starting with 6-9
- Amount Paid cannot exceed Total Amount
- Balance auto-calculates as: Total Amount - Amount Paid

### Step 4: Submit
- Click "Add Client" button
- Form validates all fields
- Success message appears
- Table updates with new client

---

## 👁️ Viewing Client Details

### Method 1: Click View Button (👁️)
In the client table row, click the eye icon

### View Modal Opens
```
┌──────────────────────────────────────────────────┐
│ Client Details                      [  ×  ]     │
├──────────────────────────────────────────────────┤
│                                                  │
│ Personal Information                            │
│ ────────────────────────────────────────────    │
│ Client Name: John Doe                           │
│ Phone: 9876543210                               │
│ Address: 123 Main Street                        │
│ City: Mumbai        State: Maharashtra          │
│                                                  │
│ Financial Information                           │
│ ────────────────────────────────────────────    │
│ ┌─────────────┐  ┌──────────────┐  ┌────────┐ │
│ │Total Amount │  │ Amount Paid  │  │Balance │ │
│ │  ₹5,000.00  │  │  ₹2,500.00   │  │₹2,500 │ │
│ └─────────────┘  └──────────────┘  └────────┘ │
│                                                  │
│ Audit Information                               │
│ ────────────────────────────────────────────    │
│ Created: 18 May 2024, 10:30 AM                  │
│ Updated: 18 May 2024, 10:30 AM                  │
│                                                  │
│                       [Close]                    │
└──────────────────────────────────────────────────┘
```

**Features**:
- All client information displayed
- Financial info color-coded
- Timestamps for tracking
- Read-only view

---

## ✏️ Editing a Client

### Method: Click Edit Button (✏️)
In the client table row, click the pencil icon

### Edit Form Opens
Same as Add form, but:
- Populated with existing client data
- Button says "Update Client"
- All validations apply

### Make Changes & Submit
- Update any field
- Balance recalculates automatically
- Click "Update Client"
- Success message appears
- Table updates

---

## 🗑️ Deleting a Client

### Method: Click Delete Button (🗑️)
In the client table row, click the trash icon

### Confirmation Dialog
```
Are you sure you want to delete this client?

[CANCEL]  [CONFIRM]
```

### After Confirmation
- Client removed from database
- Success message appears
- Table updates
- Summary recalculates

---

## 🔍 Searching Clients

### Search Box
Located in Filters section
```
┌──────────────────────────────────┐
│ 🔍 Search by name, phone, city...│
└──────────────────────────────────┘
```

### Search Functionality
- **Search by**: 
  - Client name (any part)
  - Phone number (digits)
  - City name (any part)
- **Case-insensitive**: "john" finds "John Doe"
- **Real-time**: Updates table as you type
- **Combined with filter**: Works with state filter

### Examples:
- Type "john" → finds "John Doe"
- Type "9876" → finds phones containing 9876
- Type "mumbai" → finds clients in Mumbai

---

## 🏷️ Filtering by State

### State Filter Dropdown
Located in Filters section
```
┌──────────────────┐
│ All States    ▼  │
└──────────────────┘
```

### Available Options:
- All States (default - shows all)
- Maharashtra (MH)
- Delhi (DL)
- Gujarat (GJ)
- Uttar Pradesh (UP)
- Tamil Nadu (TN)
- Karnataka (KA)
- And all other Indian states

### Usage:
1. Click dropdown
2. Select state
3. Table filters to show only that state's clients
4. Search still works within filtered results
5. Select "All States" to reset

---

## 📊 Dashboard Summary

### Summary Cards Show (Updated Instantly):

| Card | Shows |
|------|-------|
| **Total Clients** | Count of all clients in database |
| **Total Amount** | Sum of all totalAmt values |
| **Total Paid** | Sum of all amtPaid values |
| **Total Balance** | Sum of all balAmt values |

### Color Coding:
- 💜 **Purple Gradient**: Primary metrics
- 🟢 **Green**: Paid amounts
- 🔴 **Pink**: Balance amounts

---

## ⚠️ Error Messages & Alerts

### Form Validation Errors
```
Cell Name ✗ Client name is required
Phone No ✗ Invalid Indian mobile number
Address ✗ Address is required
City ✗ City is required
State ✗ State is required
Total Amt ✗ Total amount must be a valid positive number
Amt Paid ✗ Amount paid cannot exceed total amount
```

### System Alerts (Top of Page)

**Success** (Green):
```
✓ Client created successfully!
```

**Error** (Red):
```
✗ Failed to fetch clients. Please try again.
```

**Auto-dismiss**: After 3 seconds

---

## 📱 Mobile View

### Responsive Breakpoints:

**Tablet** (768px - 1023px):
- Table columns adjusted
- Font sizes reduced
- Summary cards in 2 columns
- Sidebar width reduced

**Mobile** (480px - 767px):
- Single column layout
- Table in card format
- Buttons in row
- Full-width inputs on modal
- Smaller fonts

**Small Mobile** (<480px):
- Most compact view
- Touch-friendly buttons
- Single column everything
- Optimized spacing

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Esc` | Close any open modal |
| `Tab` | Navigate form fields |
| `Enter` | Submit form |
| `Ctrl+K` | Focus search (browser feature) |

---

## 💡 Tips & Tricks

### 1. Quick Search
- Don't need exact - partial matches work
- Case-insensitive - "john" finds "JOHN"
- Search across name, phone, and city simultaneously

### 2. Filter + Search Combination
- Set state filter first (e.g., Maharashtra)
- Then search within that state's clients
- Best for large datasets

### 3. Balance Tracking
- Check "Total Balance" card regularly
- Use View modal for individual details
- Export might be available in future

### 4. Form Tips
- Balance calculates automatically
- Phone format: 10 digits, starts with 6-9
- Amounts can have decimals (e.g., 1000.50)
- All times in local timezone

### 5. Data Safety
- Deletion requires confirmation
- No auto-save - submit when ready
- Edit only changes your fields

---

## 🆘 Troubleshooting

### Table Shows No Clients
**Cause**: Database empty or API not running
**Fix**: 
1. Add a new client first
2. Ensure backend is running on :8080
3. Check browser console for errors

### Form Won't Submit
**Cause**: Validation errors
**Fix**:
1. Check all fields have red ✗ markers
2. Fix errors as suggested
3. Ensure Phone is valid Indian format
4. Ensure Amount Paid ≤ Total Amount

### Search Not Working
**Cause**: No clients match
**Fix**:
1. Clear search box
2. Check state filter
3. Add more clients
4. Verify spelling

### Modal Won't Close
**Cause**: Stuck/browser issue
**Fix**:
1. Press Esc key
2. Refresh page
3. Clear browser cache

---

## 🎓 Use Cases

### Use Case 1: Managing Retail Clients
1. Add clients with business information
2. Track payments in installments
3. Monitor outstanding balance
4. Generate summary for accounting

### Use Case 2: Service Business
1. Add client details with contact info
2. Track total vs paid amounts
3. Identify pending payments
4. Filter by service region (state)

### Use Case 3: B2B Invoicing
1. Maintain client database
2. Track invoice amounts
3. Monitor payment status
4. Generate reports

---

## 📞 Getting Help

### If Something Goes Wrong:

1. **Check Browser Console** (Press F12)
   - Look for red error messages
   - Note the error text

2. **Check Network Tab** (Press F12 → Network)
   - Verify API requests are being sent
   - Check response status codes

3. **Common Issues**:
   - 404: Backend API not running
   - 500: Backend error - check server logs
   - CORS: Backend CORS not configured

4. **Refresh Page**:
   - Command: Ctrl+R (or Cmd+R on Mac)
   - Hard Refresh: Ctrl+Shift+R (clears cache)

5. **Restart Dev Server**:
   ```bash
   npm run dev
   ```

---

## 💬 Feature Requests & Feedback

Potential future features:
- [ ] Bulk export to CSV/PDF
- [ ] Advanced reporting
- [ ] Payment tracking history
- [ ] Automated reminders
- [ ] Multi-user support
- [ ] Real-time sync
- [ ] Offline mode
- [ ] Dark mode

---

## ✨ Feature Summary

✅ Full CRUD operations (Create, Read, Update, Delete)
✅ Real-time search and filtering
✅ Dashboard summary metrics
✅ Responsive mobile design
✅ Form validation
✅ Error handling
✅ Professional UI
✅ Fast and efficient
✅ Production-ready
✅ Easy to use

---

**Version**: 1.0.0  
**Last Updated**: May 18, 2026  
**Status**: Production Ready ✅

Start managing your clients now! 🚀

