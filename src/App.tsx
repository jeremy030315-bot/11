/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Dog, 
  Cat, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  User, 
  PlusCircle, 
  ListTodo, 
  ChevronRight,
  Star,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Camera
} from 'lucide-react';
import { ServiceType, PetOrder, UserProfile } from './types';

// Mock Data
const MOCK_USER: UserProfile = {
  id: 'u1',
  name: 'Jeremy',
  role: 'owner',
  isVerified: true,
  avatar: 'https://picsum.photos/seed/petowner/100/100',
  rating: 4.9,
  completedOrders: 12
};

const MOCK_ORDERS: PetOrder[] = [
  {
    id: 'o1',
    type: 'feeding',
    petName: 'Mimi',
    petType: 'cat',
    address: 'Chaoyang District, Beijing',
    time: 'Today 18:00',
    price: 80,
    status: 'pending',
    ownerId: 'u1',
    createdAt: Date.now() - 3600000
  },
  {
    id: 'o2',
    type: 'walking',
    petName: 'Buddy',
    petType: 'dog',
    address: 'Haidian District, Beijing',
    time: 'Tomorrow 09:00',
    price: 60,
    status: 'accepted',
    ownerId: 'u1',
    providerId: 'p1',
    createdAt: Date.now() - 7200000
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'orders' | 'profile'>('home');
  const [user, setUser] = useState<UserProfile>(MOCK_USER);
  const [orders, setOrders] = useState<PetOrder[]>(MOCK_ORDERS);
  const [showPostingModal, setShowPostingModal] = useState(false);
  const [view, setView] = useState<'main' | 'post' | 'verify' | 'success'>('main');

  // Simulated switch between Owner and Provider mode for demo
  const toggleRole = () => {
    setUser(prev => ({
      ...prev,
      role: prev.role === 'owner' ? 'provider' : 'owner'
    }));
  };

  const handlePostOrder = () => {
    setView('success');
    setTimeout(() => {
      setView('main');
      setActiveTab('orders');
    }, 2000);
  };

  return (
    <div className="mobile-container">
      {/* Header */}
      <header className="mini-header">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white">
            <Dog size={20} />
          </div>
          <h1 className="font-bold text-lg tracking-tight">PetCare</h1>
        </div>
        <button 
          onClick={toggleRole}
          className="text-xs font-medium px-3 py-1 bg-slate-100 rounded-full text-slate-600 hover:bg-slate-200 transition-colors"
        >
          Switch to {user.role === 'owner' ? 'Caregiver' : 'Owner'}
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 space-y-6"
            >
              {/* Hero / Welcome */}
              <section className="bg-gradient-to-br from-brand-primary to-indigo-700 rounded-2xl p-6 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold mb-1">Hello, {user.name}!</h2>
                  <p className="text-white/80 text-sm">
                    {user.role === 'owner' 
                      ? "Who's looking for care today?" 
                      : "Ready to help some furry friends?"}
                  </p>
                </div>
                <Dog className="absolute -right-4 -bottom-4 text-white/10 w-32 h-32 rotate-12" />
              </section>

              {user.role === 'owner' ? (
                <>
                  {/* Service Selection */}
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => setView('post')}
                      className="bg-white p-6 rounded-2xl border border-slate-100 card-shadow flex flex-col items-center gap-3 hover:border-brand-primary transition-all group"
                    >
                      <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Cat size={28} />
                      </div>
                      <span className="font-semibold">Cat Feeding</span>
                      <span className="text-xs text-slate-400">From ¥80/visit</span>
                    </button>
                    <button 
                      onClick={() => setView('post')}
                      className="bg-white p-6 rounded-2xl border border-slate-100 card-shadow flex flex-col items-center gap-3 hover:border-brand-primary transition-all group"
                    >
                      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Dog size={28} />
                      </div>
                      <span className="font-semibold">Dog Walking</span>
                      <span className="text-xs text-slate-400">From ¥60/30min</span>
                    </button>
                  </div>

                  {/* Safety Banner */}
                  <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-start gap-3">
                    <ShieldCheck className="text-emerald-600 shrink-0" size={20} />
                    <div>
                      <h4 className="text-sm font-semibold text-emerald-900">Verified Caregivers Only</h4>
                      <p className="text-xs text-emerald-700 mt-0.5">Every professional undergoes real-name authentication and pet care testing.</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Caregiver Dashboard */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-slate-800">Nearby Orders</h3>
                      <span className="text-xs text-brand-primary font-medium">Live Updates</span>
                    </div>
                    
                    {orders.filter(o => o.status === 'pending').map(order => (
                      <div key={order.id} className="bg-white p-4 rounded-2xl border border-slate-100 card-shadow space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${order.type === 'feeding' ? 'bg-orange-50 text-orange-500' : 'bg-blue-50 text-blue-500'}`}>
                              {order.type === 'feeding' ? <Cat size={20} /> : <Dog size={20} />}
                            </div>
                            <div>
                              <h4 className="font-semibold text-slate-900">{order.type === 'feeding' ? 'Cat Feeding' : 'Dog Walking'}</h4>
                              <p className="text-xs text-slate-500">{order.petName} • {order.petType}</p>
                            </div>
                          </div>
                          <span className="text-lg font-bold text-brand-primary">¥{order.price}</span>
                        </div>
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-xs text-slate-600">
                            <MapPin size={14} className="text-slate-400" />
                            <span>{order.address}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-600">
                            <Clock size={14} className="text-slate-400" />
                            <span>{order.time}</span>
                          </div>
                        </div>
                        <button className="w-full py-2.5 bg-brand-primary text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 transition-colors">
                          Accept Order
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          )}

          {activeTab === 'orders' && (
            <motion.div 
              key="orders"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="p-4 space-y-4"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-4">My Orders</h2>
              {orders.map(order => (
                <div key={order.id} className="bg-white p-4 rounded-2xl border border-slate-100 card-shadow flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${order.type === 'feeding' ? 'bg-orange-50 text-orange-500' : 'bg-blue-50 text-blue-500'}`}>
                      {order.type === 'feeding' ? <Cat size={20} /> : <Dog size={20} />}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{order.petName}'s {order.type === 'feeding' ? 'Feeding' : 'Walk'}</h4>
                      <p className="text-xs text-slate-500">{order.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      order.status === 'pending' ? 'bg-amber-50 text-amber-600' : 
                      order.status === 'accepted' ? 'bg-blue-50 text-blue-600' : 
                      'bg-emerald-50 text-emerald-600'
                    }`}>
                      {order.status.toUpperCase()}
                    </span>
                    <p className="text-sm font-bold text-slate-900 mt-1">¥{order.price}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'profile' && (
            <motion.div 
              key="profile"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 space-y-6"
            >
              {/* Profile Header */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img src={user.avatar} className="w-20 h-20 rounded-2xl object-cover border-2 border-white shadow-md" referrerPolicy="no-referrer" />
                  {user.isVerified && (
                    <div className="absolute -bottom-1 -right-1 bg-brand-primary text-white p-1 rounded-full border-2 border-white">
                      <CheckCircle2 size={14} />
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-medium capitalize">{user.role}</span>
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                      <Star size={12} fill="currentColor" />
                      <span>{user.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl text-center">
                  <span className="block text-2xl font-bold text-slate-900">{user.completedOrders}</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Orders Done</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl text-center">
                  <span className="block text-2xl font-bold text-slate-900">¥1,280</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Total Spent</span>
                </div>
              </div>

              {/* Menu */}
              <div className="bg-white rounded-2xl border border-slate-100 card-shadow overflow-hidden">
                <button 
                  onClick={() => setView('verify')}
                  className="w-full px-4 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors border-b border-slate-50"
                >
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="text-brand-primary" size={20} />
                    <span className="text-sm font-medium">Real-name Verification</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-emerald-600 font-medium">Verified</span>
                    <ChevronRight size={16} className="text-slate-300" />
                  </div>
                </button>
                <button className="w-full px-4 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors border-b border-slate-50">
                  <div className="flex items-center gap-3">
                    <User className="text-slate-400" size={20} />
                    <span className="text-sm font-medium">My Pets</span>
                  </div>
                  <ChevronRight size={16} className="text-slate-300" />
                </button>
                <button className="w-full px-4 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="text-slate-400" size={20} />
                    <span className="text-sm font-medium">Help & Support</span>
                  </div>
                  <ChevronRight size={16} className="text-slate-300" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/90 backdrop-blur-lg border-t border-slate-100 px-6 py-3 flex justify-between items-center safe-area-bottom z-50">
        <button 
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'home' ? 'text-brand-primary' : 'text-slate-400'}`}
        >
          <Dog size={24} />
          <span className="text-[10px] font-bold">Home</span>
        </button>
        <button 
          onClick={() => setActiveTab('orders')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'orders' ? 'text-brand-primary' : 'text-slate-400'}`}
        >
          <ListTodo size={24} />
          <span className="text-[10px] font-bold">Orders</span>
        </button>
        <button 
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'profile' ? 'text-brand-primary' : 'text-slate-400'}`}
        >
          <User size={24} />
          <span className="text-[10px] font-bold">Profile</span>
        </button>
      </nav>

      {/* Post Order View */}
      <AnimatePresence>
        {view === 'post' && (
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-white flex flex-col max-w-md mx-auto"
          >
            <div className="p-4 flex items-center justify-between border-b border-slate-100">
              <button onClick={() => setView('main')} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <ArrowLeft size={20} />
              </button>
              <h2 className="font-bold">Post Request</h2>
              <div className="w-10" />
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="space-y-4">
                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Service Details</label>
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-4 border-2 border-brand-primary bg-indigo-50 rounded-2xl flex flex-col items-center gap-2">
                    <Cat className="text-brand-primary" />
                    <span className="text-sm font-bold">Feeding</span>
                  </button>
                  <button className="p-4 border-2 border-slate-100 rounded-2xl flex flex-col items-center gap-2 text-slate-400">
                    <Dog />
                    <span className="text-sm font-bold">Walking</span>
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Pet Name</label>
                <input type="text" placeholder="e.g. Mimi" className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-brand-primary outline-none font-medium" />
              </div>
              <div className="space-y-4">
                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Address</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input type="text" placeholder="Enter your address" className="w-full p-4 pl-12 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-brand-primary outline-none font-medium" />
                </div>
              </div>
              <div className="space-y-4">
                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Preferred Time</label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input type="text" placeholder="e.g. Today 18:00" className="w-full p-4 pl-12 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-brand-primary outline-none font-medium" />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <span className="text-slate-500 font-medium">Estimated Price</span>
                <span className="text-2xl font-bold text-brand-primary">¥80</span>
              </div>
              <button 
                onClick={handlePostOrder}
                className="w-full py-4 bg-brand-primary text-white rounded-2xl font-bold text-lg shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-[0.98]"
              >
                Confirm & Post
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success View */}
      <AnimatePresence>
        {view === 'success' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[70] bg-white flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6"
            >
              <CheckCircle2 size={48} />
            </motion.div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Order Posted!</h2>
            <p className="text-slate-500">Wait for a nearby caregiver to accept your request.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Verification View */}
      <AnimatePresence>
        {view === 'verify' && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed inset-0 z-[60] bg-white flex flex-col max-w-md mx-auto"
          >
            <div className="p-4 flex items-center justify-between border-b border-slate-100">
              <button onClick={() => setView('main')} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <ArrowLeft size={20} />
              </button>
              <h2 className="font-bold">Identity Verification</h2>
              <div className="w-10" />
            </div>
            <div className="flex-1 p-6 space-y-8">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-brand-primary/10 text-brand-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck size={32} />
                </div>
                <h3 className="text-xl font-bold">Real-name Authentication</h3>
                <p className="text-sm text-slate-500">To ensure the safety of our community, all users must verify their identity.</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                  <input type="text" placeholder="As shown on ID" className="w-full p-4 bg-slate-50 rounded-xl border-none outline-none font-medium" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">ID Number</label>
                  <input type="text" placeholder="18-digit ID number" className="w-full p-4 bg-slate-50 rounded-xl border-none outline-none font-medium" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-[3/2] bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-brand-primary hover:text-brand-primary transition-colors cursor-pointer">
                    <Camera size={24} />
                    <span className="text-[10px] font-bold">ID Front</span>
                  </div>
                  <div className="aspect-[3/2] bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-brand-primary hover:text-brand-primary transition-colors cursor-pointer">
                    <Camera size={24} />
                    <span className="text-[10px] font-bold">ID Back</span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 p-4 rounded-xl flex items-start gap-3">
                <AlertCircle className="text-amber-500 shrink-0" size={18} />
                <p className="text-[10px] text-amber-700 leading-relaxed font-medium">
                  Your information is encrypted and only used for verification purposes. We will never share your ID details with third parties.
                </p>
              </div>
            </div>
            <div className="p-6">
              <button 
                onClick={() => setView('main')}
                className="w-full py-4 bg-brand-primary text-white rounded-2xl font-bold text-lg shadow-lg hover:bg-indigo-700 transition-all"
              >
                Submit Verification
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
