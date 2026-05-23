import React, { useState } from 'react';
import { resolveIdpForEmail } from '../config/idpConfig';
import { Mail, ArrowRight, Building } from 'lucide-react';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your work email.');
      return;
    }

    setLoading(true);
    setError('');

    const idp = resolveIdpForEmail(email);

    if (idp) {
      // Route to the appropriate Identity Provider
      setTimeout(() => {
        window.location.href = `${idp.authorizeEndpoint}?client_id=${idp.clientId}&redirect_uri=${encodeURIComponent(idp.redirectUri)}&email=${encodeURIComponent(email)}`;
      }, 500); // Small delay for UX transition
    } else {
      setLoading(false);
      setError(`No Identity Provider configured for ${email.split('@')[1] || 'this domain'}.`);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <motion.div 
        className="w-full max-w-md bg-white p-8 rounded-3xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] border border-slate-100"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-center mb-6">
          <div className="bg-primary/10 p-4 rounded-full text-primary">
            <Building className="w-8 h-8" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">Corporate Login</h2>
        <p className="text-center text-slate-500 mb-8 text-sm">Enter your work email to be securely routed to your company's Identity Provider.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-xl text-sm border border-red-100">
              {error}
            </div>
          )}
          
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g., husain@toast.com"
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all"
              required
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-slate-900 hover:bg-primary text-white rounded-2xl font-medium transition-colors flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Routing...' : 'Continue'}
            {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-400">
          <p>Try: husain@toast.com or john@salesforce.com</p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
