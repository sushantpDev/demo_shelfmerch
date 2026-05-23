import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gift, Shield, Zap, ArrowRight, Star } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const partners = [
    { name: 'Toast', color: 'bg-orange-100 text-orange-600' },
    { name: 'Salesforce', color: 'bg-blue-100 text-blue-600' },
    { name: 'IBM', color: 'bg-indigo-100 text-indigo-600' },
    { name: 'Stripe', color: 'bg-purple-100 text-purple-600' },
  ];

  const features = [
    {
      icon: <Gift className="w-6 h-6" />,
      title: 'Premium Rewards',
      desc: 'Curated selection of top-brand merchandise, electronics, and gift cards.',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure SSO',
      desc: 'Log in with your corporate Identity Provider. No new passwords needed.',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Instant Redemption',
      desc: 'Use your earned reward points to order gifts delivered to your door.',
    },
  ];

  const categories = [
    { name: 'Electronics', emoji: '🎧', bg: 'from-blue-500 to-cyan-400' },
    { name: 'Apparel', emoji: '👕', bg: 'from-pink-500 to-rose-400' },
    { name: 'Gift Cards', emoji: '💳', bg: 'from-amber-500 to-yellow-400' },
    { name: 'Office', emoji: '📓', bg: 'from-emerald-500 to-green-400' },
    { name: 'Lifestyle', emoji: '☕', bg: 'from-violet-500 to-purple-400' },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero */}
      <section className="relative text-center pt-12 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4 fill-current" /> Corporate Gifting Platform
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
            Turn Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-500">Reward Points</span> Into Premium Gifts
          </h1>
          <p className="text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed">
            ShelfMerch partners with leading companies to let employees redeem their hard-earned points for top-brand merchandise, electronics, and more.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/login')}
              className="group px-8 py-4 bg-slate-900 text-white rounded-2xl font-semibold text-lg hover:bg-primary transition-all shadow-xl hover:shadow-primary/30 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              Corporate Login
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white text-slate-700 rounded-2xl font-semibold text-lg border border-slate-200 hover:border-primary/30 hover:text-primary transition-all"
            >
              Browse Catalog
            </button>
          </div>
        </motion.div>
      </section>

      {/* Trusted Partners */}
      <section className="text-center">
        <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-4">Trusted by leading companies</p>
        <div className="flex flex-wrap justify-center gap-3">
          {partners.map((p) => (
            <span key={p.name} className={`${p.color} px-5 py-2 rounded-full text-sm font-semibold`}>
              {p.name}
            </span>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section id="categories">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className={`bg-gradient-to-br ${cat.bg} p-6 rounded-2xl text-white text-center cursor-pointer hover:scale-105 transition-transform shadow-lg`}
            >
              <div className="text-4xl mb-2">{cat.emoji}</div>
              <p className="font-semibold text-sm">{cat.name}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section>
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-10">Why ShelfMerch?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary mb-4">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{f.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
