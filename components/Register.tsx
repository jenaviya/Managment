import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '../types';
import { APP_NAME, THEME } from '../constants';
import BackButton from './Common/BackButton'; 

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.EMPLOYEE); 
  
  // Renamed 'error' from useAuth to 'authErrorHook' to avoid conflict.
  const { register, isLoading, error: authErrorHook, clearError } = useAuth();
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(null);


  useEffect(() => {
    return () => {
      clearError();
      setFormError(null);
    };
  }, [clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setFormError(null);

    if (password !== confirmPassword) {
      setFormError("Passwords do not match!"); 
      return;
    }
    if (!username || !email || !password || !firstName || !lastName) {
      setFormError("Please fill all required fields.");
      return;
    }
    if (password.length < 6) {
        setFormError("Password must be at least 6 characters long.");
        return;
    }
    
    try {
        await register({ username, email, password, role, firstName, lastName });
        alert('User registered successfully.'); 
        navigate('/app/admin/employees'); 
    } catch (err: any) {
        // The error from the auth hook will be displayed automatically.
        // We can set a local form error as a fallback.
        setFormError(err.message || "An unexpected error occurred during registration.");
    }
  };
  
  const inputBaseClasses = `mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-${THEME.secondary} focus:border-${THEME.secondary} sm:text-sm placeholder-gray-400`;
  const selectBaseClasses = `mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-${THEME.secondary} focus:border-${THEME.secondary} sm:text-sm`;
  const buttonPrimaryClasses = `w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-${THEME.primaryText} bg-${THEME.primary} hover:bg-opacity-85 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${THEME.primary} disabled:opacity-50 transition duration-150 ease-in-out`;
  const buttonSecondaryClasses = `w-full flex justify-center py-2 px-4 mt-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${THEME.secondary} transition duration-150 ease-in-out`;

  return (
    <div className={`min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-${THEME.accent} via-white to-${THEME.accent} p-6 pt-10`}>
      <div className="w-full max-w-lg relative z-10"> 
        <BackButton /> 
      </div>
      <div className={`w-full max-w-lg bg-white p-8 rounded-xl shadow-2xl mt-0 relative z-10`}> 
        <h1 className={`text-4xl font-bold text-center text-${THEME.primary} mb-2`}>{APP_NAME}</h1>
        <h2 className={`text-2xl font-semibold text-center text-${THEME.secondary} mb-8`}>Add New User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className={`block text-sm font-medium text-${THEME.accentText}`}>First Name</label>
              <input id="firstName" type="text" required value={firstName} onChange={(e) => {setFirstName(e.target.value); setFormError(null); clearError();}} className={inputBaseClasses} placeholder="John"/>
            </div>
            <div>
              <label htmlFor="lastName" className={`block text-sm font-medium text-${THEME.accentText}`}>Last Name</label>
              <input id="lastName" type="text" required value={lastName} onChange={(e) => {setLastName(e.target.value); setFormError(null); clearError();}} className={inputBaseClasses} placeholder="Doe"/>
            </div>
          </div>
          <div>
            <label htmlFor="username" className={`block text-sm font-medium text-${THEME.accentText}`}>Username</label>
            <input id="username" type="text" required value={username} onChange={(e) => {setUsername(e.target.value); setFormError(null); clearError();}} className={inputBaseClasses} placeholder="newuser"/>
          </div>
          <div>
            <label htmlFor="email" className={`block text-sm font-medium text-${THEME.accentText}`}>Email</label>
            <input id="email" type="email" required value={email} onChange={(e) => {setEmail(e.target.value); setFormError(null); clearError();}} className={inputBaseClasses} placeholder="user@example.com"/>
          </div>
          <div>
            <label htmlFor="password" className={`block text-sm font-medium text-${THEME.accentText}`}>Password</label>
            <input id="password" type="password" required value={password} onChange={(e) => {setPassword(e.target.value); setFormError(null); clearError();}} className={inputBaseClasses} placeholder="Min. 6 characters" />
          </div>
          <div>
            <label htmlFor="confirmPassword" className={`block text-sm font-medium text-${THEME.accentText}`}>Confirm Password</label>
            <input id="confirmPassword" type="password" required value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value); setFormError(null); clearError();}} className={inputBaseClasses} />
          </div>
          
          <div>
            <label htmlFor="role" className={`block text-sm font-medium text-${THEME.accentText}`}>Role</label>
            <select id="role" value={role} onChange={(e) => setRole(e.target.value as UserRole)} className={selectBaseClasses}>
              <option value={UserRole.EMPLOYEE}>Employee</option>
              <option value={UserRole.ADMIN}>Admin</option>
            </select>
          </div>

          {(formError || authErrorHook) && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
              <p>{formError || authErrorHook}</p>
            </div>
          )}

          <div>
            <button type="submit" disabled={isLoading} className={buttonPrimaryClasses}>
              {isLoading ? 'Registering...' : 'Register User'}
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={() => navigate('/app/admin/employees')} 
              className={buttonSecondaryClasses}
              aria-label="Cancel registration and return to manage employees"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;