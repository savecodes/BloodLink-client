# BloodLink - Frontend

A modern blood donation platform built with React, Vite, and Firebase that connects blood donors with those in need.

## 🩸 About BloodLink

BloodLink is a comprehensive blood donation management system that helps:

- **Donors** find blood donation requests and contribute to saving lives
- **Volunteers** manage and coordinate blood donation activities
- **Administrators** oversee the entire platform and user management

## 🚀 Features

### For Donors

- Create and manage blood donation requests
- Search for donors by blood group, district, and upazila
- Track donation request status (Pending, In Progress, Completed, Canceled)
- Personal dashboard with donation statistics
- Make financial contributions through Stripe payment integration

### For Volunteers

- View platform statistics and analytics
- Access to donation request management
- Blood group distribution insights
- Platform overview dashboard

### For Administrators

- Complete user management (role assignment, blocking/unblocking)
- All donation requests management
- Platform statistics and analytics
- Blood group distribution charts
- Monthly funding growth tracking
- User role management (Admin, Volunteer, Donor)

## 🛠️ Technologies Used

### Core

- **React 19.2.0** - UI library
- **Vite 7.2.4** - Build tool and dev server
- **React Router 7.12.0** - Client-side routing
- **Tailwind CSS 4.1.18** - Styling framework

### State Management & Data Fetching

- **TanStack React Query 5.90.16** - Server state management
- **Axios 1.13.2** - HTTP client
- **React Hook Form 7.70.0** - Form handling

### Authentication & Backend

- **Firebase 12.7.0** - Authentication and user management

### UI Components & Utilities

- **Lucide React 0.562.0** - Icon library
- **Recharts 3.6.0** - Data visualization charts
- **React Hot Toast 2.6.0** - Toast notifications
- **Use Debounce 10.1.0** - Input debouncing
- **EmailJS Browser 4.4.1** - Email service integration

### Payment Integration

- **Stripe** - Payment processing

## 📋 Prerequisites

Before you begin, ensure you have installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- A code editor (VS Code recommended)

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/savecodes/BloodLink-client
cd bloodlink-client
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables Setup

Create a `.env` file in the root directory and add the following:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id

# Image upload
VITE_IMGBB_API_KEY=your_imagebb_api_key

# Backend API URL
VITE_API_URL=http://localhost:3000

# EmailJS Configuration (for contact form)
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

**Note:** Replace all placeholder values with your actual credentials.

### 4. Start Development Server

```bash
npm start
```

or

```bash
npm run dev
```

The application will open at `http://localhost:5173`

## 🧪 Test User Credentials

Use these credentials to test different user roles:

### Donor Account

- **Email:** rayhan@donor.com
- **Password:** Rayhan1@donor.com

### Volunteer Account

- **Email:** rayhan@vlunteer.com
- **Password:** Rayhan1@vlunteer.com

### Admin Account

- **Email:** rayhan@admin.com
- **Password:** Rayhan1@admin.com

## 📁 Project Structure

```
bloodlink-client/
├── public/ # Static assets
├── src/
│ ├── components/ # Reusable components
│ │ ├── LoadingSpinner/
│ │ ├── Pagination/
│ │ └── ...
│ ├── hooks/ # Custom React hooks
│ │ ├── useAuth.jsx
│ │ ├── useAxiosSecure.jsx
│ │ └── ...
│ ├── pages/ # Page components
│ │ ├── Admin/ # Admin dashboard & pages
│ │ ├── Volunteer/ # Volunteer dashboard & pages
│ │ ├── Donor/ # Donor dashboard & pages
│ │ └── ...
│ ├── services/ # API services and utilities
│ └── main.jsx # Entry point
├── .env # Environment variables
├── package.json # Dependencies
└── vite.config.js # Vite configuration
```

## 🔧 Available Scripts

- `npm start` - Start development server
- `npm run dev` - Start development server (alternative)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## 🌐 Key Features Breakdown

### Authentication

- Firebase email/password authentication
- Role-based access control (Admin, Volunteer, Donor)
- Protected routes based on user roles
- User status management (Active/Blocked)

### Dashboard Features

#### Admin Dashboard

- Total users, donation requests, and funding statistics
- Platform overview bar chart
- Daily funding growth (last 30 days) line chart
- Blood group distribution pie chart
- User management (role assignment, blocking)
- All donation requests management

#### Volunteer Dashboard

- Platform statistics overview
- Bar chart for users, requests, and funding
- Daily funding trend chart
- Blood group distribution visualization

#### Donor Dashboard

- Personal donation request management
- Create new donation requests
- Track request status
- Search for blood donors
- Make financial contributions

### Search & Filter

- Search users by name and email
- Filter donation requests by status
- Search donors by blood group, district, and upazila
- Pagination support for all listings

### Payment Integration

- Stripe payment gateway integration
- Secure payment processing
- Payment success/cancellation handling

## 🔒 Security Features

- Environment variables for sensitive data
- Secure Axios instance with interceptors
- Protected routes with role verification
- User status verification (blocked users can't post)
- Firebase authentication security rules

## 🎨 UI/UX Features

- Fully responsive design (mobile, tablet, desktop)
- Modern gradient backgrounds
- Smooth transitions and animations
- Toast notifications for user actions
- Loading states and spinners
- Interactive charts and visualizations
- Clean and intuitive interface

## 📱 Responsive Design

The application is fully responsive and optimized for:

- Mobile devices (320px - 768px)
- Tablets (768px - 1024px)
- Desktop (1024px and above)

## 🐛 Troubleshooting

### Common Issues

**Issue:** Development server not starting

```bash
# Solution: Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

**Issue:** Environment variables not loading

```bash
# Solution: Ensure .env file is in root directory
# Restart the development server after adding .env
```

**Issue:** Firebase authentication errors

```bash
# Solution: Verify Firebase configuration in .env
# Check Firebase console for correct credentials
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The build files will be in the `dist` directory.

### Deploy to Vercel/Netlify

1. Connect your repository
2. Set environment variables in hosting platform
3. Deploy from main branch

## 📄 License

This project is private and proprietary.

## 👨‍💻 Developer

Developed with ❤️ for saving lives through blood donation.

## 🤝 Contributing

This is a private project. For any queries or suggestions, please contact the administrator.

---

**Note:** Make sure the backend server is running before starting the frontend application. The frontend expects the backend API to be available at `http://localhost:3000` (or the URL specified in VITE_API_URL).
