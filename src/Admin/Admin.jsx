import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white shadow-md" style={{height:'5rem'}}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo or Title */}
          <div className="text-2xl font-bold">
            Admin Dashboard
          </div>

          {/* Navigation Buttons */}
          <div className="flex space-x-4">
           
            <button
              onClick={() => navigate('/admin/')}
              className=" text-white font-semibold py-2 px-4 rounded"
            >
              User Management
            </button>
            <button
              onClick={() => navigate('/admin/contentManagement')}
              className=" text-white font-semibold py-2 px-4 rounded"
            >
              Content Management
            </button>
            <button
              onClick={() => navigate('/admin/analytics')}
              className=" text-white font-semibold py-2 px-4 rounded"
            >
              Analytics & Reports
            </button>
            <button
              onClick={() => navigate('/admin/finance')}
              className=" text-white font-semibold py-2 px-4 rounded"
            >
              Finance Tracking
            </button>
          </div>
        </div>
      </nav>

      {/* Content Section */}
      
        <Outlet />
        
    </div>
  );
};

export default Admin;
