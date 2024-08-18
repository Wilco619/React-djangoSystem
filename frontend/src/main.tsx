import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import App from './components/App';
import './index.css';
import Login from './components/Authentication/Login';
import Users from './components/Pages/Users';
import Dashboard from './components/Pages/Dashboard';
import ErrorPage from './components/ErrorPage';
import OTPform from './components/Authentication/OTPform';
import AdminRegistrationForm from './components/Authentication/AdminReg';
import CustomerRegistrationForm from './components/Authentication/CustomerReg';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/verify-otp",
    element: <OTPform />,
  },
  {
    path: "/home",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <Navigate to="dashboard" />, // Redirect /home to /home/dashboard
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <Users />,
        children: [
          {
            path: "AdminReg",
            element: <AdminRegistrationForm/>
          },
          {
            path: "StaffReg",
            element: <AdminRegistrationForm/>
          },
          {
            path: "CustomerReg",
            element: <CustomerRegistrationForm/>
          }
        ],
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

const Main: React.FC = () => {
  return <RouterProvider router={router} />;
};

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Main />
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
}
