import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

const SSOCallback = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    console.log("URL Params: ", window.location.search);
    console.log("Extracted Token: ", token);

    if (token) {
      try {
        sessionStorage.setItem('token', token);
        const decoded = jwtDecode(token);
        
        // Extract employee info
        const employeeInfo = {
          employeeId: decoded.id || decoded.employeeId || decoded._id,
          name: decoded.name || decoded.fullName,
          email: decoded.email,
          rewardPoints: decoded.rewardPoints || decoded.balance || 0,
          isAdmin: decoded.isAdmin || false
        };

        login(employeeInfo, token);
        navigate('/dashboard', { replace: true });
      } catch (err) {
        console.error("Token decoding failed", err);
        setError("Authentication Failed: Invalid Token format");
      }
    } else {
      setError("Authentication Failed: No Token Provided");
    }
  }, [navigate, login]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <div className="glass p-8 rounded-2xl max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Auth Failed</h2>
          <p className="text-slate-600 mb-6">{error}</p>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-primary transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-20">
      <div className="glass p-8 rounded-2xl w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Authenticating...</h2>
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-slate-500">Please wait while we establish your session.</p>
      </div>
    </div>
  );
};

export default SSOCallback;
