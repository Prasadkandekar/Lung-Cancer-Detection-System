import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Settings as Lungs, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Lungs className="h-8 w-8 text-blue-500" />
            <span className="text-xl font-bold">LungDetect AI</span>
          </Link>
          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="hover:text-blue-500 transition-colors">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="hover:text-blue-500 transition-colors">
                  Dashboard
                </Link>
                <Link to="/guides" className="hover:text-blue-500 transition-colors">
                  Guides
                </Link>
                <Link to="/team" className="hover:text-blue-500 transition-colors">
                  Team
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 hover:text-red-500 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;