import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { THEME } from '../constants';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { UserRole } from '../types';

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    // When authentication state is resolved and a user exists, redirect them.
    if (!isLoading && user) {
      const dashboardPath = user.role === UserRole.ADMIN ? '/app/admin/dashboard' : '/app/employee/dashboard';
      navigate(dashboardPath, { replace: true });
    }
  }, [user, isLoading, navigate]);

  // While loading or if user exists (and redirect is pending), show a loading indicator.
  // This prevents the welcome page content from briefly appearing for logged-in users.
  if (isLoading || user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If not loading and no user, show the welcome page.
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-${THEME.accent} via-white to-${THEME.accent} p-6 text-center`}>
      <div className="absolute inset-0 opacity-10 bg-pattern"></div>
      <main className="z-10 animate-fadeIn"> 
        <h1 className={`text-5xl md:text-7xl font-bold text-${THEME.primary} drop-shadow-lg`}>
          VENDHAN INFO TECH
        </h1>
        <p className={`mt-4 text-xl md:text-2xl text-${THEME.secondary} font-light`}>
          Empowering Your Workforce.
        </p>
        <button
          onClick={() => navigate('/login')}
          className={`mt-12 inline-flex items-center px-10 py-4 bg-${THEME.primary} text-${THEME.primaryText} text-lg font-semibold rounded-lg shadow-xl hover:bg-opacity-85 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${THEME.primary} transition-all duration-300 ease-in-out hover:scale-105 transform`}
          aria-label="Proceed to Login"
        >
          Proceed to Login
          <ArrowRightIcon className="ml-3 h-6 w-6" />
        </button>
      </main>
      <footer className={`absolute bottom-6 text-center text-sm text-gray-500 z-10`}>
        <p>© {new Date().getFullYear()} Vendhan Info Tech. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default WelcomePage;