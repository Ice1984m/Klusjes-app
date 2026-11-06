import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, PlusCircle, Smartphone, Monitor, User, 
  Wallet, Scale, Lock, ChevronDown, Check, Globe, LogOut 
} from 'lucide-react';

interface HeaderProps {
  currentTab: 'explore' | 'my-jobs' | 'wallet' | 'admin';
  setCurrentTab: (tab: 'explore' | 'my-jobs' | 'wallet' | 'admin') => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, setCurrentTab }) => {
  const { 
    currentUser, 
    users, 
    switchUser, 
    openJobWizard, 
    openAuthModal, 
    language, 
    setLanguage, 
    isMobileFrameView, 
    setIsMobileFrameView 
  } = useApp();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      
      {/* Top Demo Bar: Quick Persona Switcher for effortless testing */}
      <div className="bg-stone-900 text-stone-300 text-[11px] px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Test Modus:
          </span>
          <span className="text-stone-400 hidden sm:inline">Wissel direct tussen gebruikersrollen:</span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {users.map(u => {
            const isActive = u.id === currentUser.id;
            return (
              <button
                key={u.id}
                onClick={() => switchUser(u.id)}
                className={`px-2.5 py-0.5 rounded-full text-[11px] transition font-medium flex items-center gap-1 ${
                  isActive 
                    ? 'bg-emerald-600 text-white font-bold shadow-xs' 
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                <span>{u.name.split(' ')[0]}</span>
                <span className="text-[9px] opacity-75">
                  ({u.role === 'admin' ? 'Admin' : u.role === 'client' ? 'Klant' : u.performerStatus === 'bijberoep' ? 'Bijberoep' : 'Particulier'})
                </span>
              </button>
            );
          })}
        </div>

        {/* View mode toggle (Mobile frame vs Desktop) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMobileFrameView(!isMobileFrameView)}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 text-[10px] font-bold"
            title="Schakel tussen smartphonescherm en desktopscherm"
          >
            {isMobileFrameView ? <Monitor className="w-3 h-3 text-emerald-400" /> : <Smartphone className="w-3 h-3 text-emerald-400" />}
            <span>{isMobileFrameView ? 'Desktop Layout' : 'Mobiele App Frame'}</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setCurrentTab('explore')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-emerald-800 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-6 h-6 text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black text-stone-900 tracking-tight">KlusGarant</span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Escrow 72u
              </span>
            </div>
            <p className="text-[10px] text-stone-500 font-medium -mt-0.5 hidden sm:block">
              Eerlijk werk, veilig geregeld
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-stone-100/70 p-1 rounded-2xl border border-stone-200/60 text-xs font-bold">
          <button
            onClick={() => setCurrentTab('explore')}
            className={`px-4 py-2 rounded-xl transition ${
              currentTab === 'explore'
                ? 'bg-white text-emerald-950 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Klussen Ontdekken
          </button>

          <button
            onClick={() => setCurrentTab('my-jobs')}
            className={`px-4 py-2 rounded-xl transition ${
              currentTab === 'my-jobs'
                ? 'bg-white text-emerald-950 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {currentUser.role === 'client' ? 'Mijn Geplaatste Klussen' : 'Mijn Biedingen & Werk'}
          </button>

          {currentUser.role === 'performer' && (
            <button
              onClick={() => setCurrentTab('wallet')}
              className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${
                currentTab === 'wallet'
                  ? 'bg-white text-emerald-950 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Wallet className="w-3.5 h-3.5 text-emerald-700" />
              <span>Wallet (€ {currentUser.walletBalance})</span>
            </button>
          )}

          <button
            onClick={() => setCurrentTab('admin')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${
              currentTab === 'admin'
                ? 'bg-white text-emerald-950 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Scale className="w-3.5 h-3.5 text-stone-500" />
            <span>Admin Arbitrage</span>
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          
          {/* Post Job button for client */}
          <button
            onClick={openJobWizard}
            className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-2xl shadow-sm hover:shadow-md transition flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Klus Plaatsen</span>
            <span className="sm:hidden">Plaatsen</span>
          </button>

          {/* User Profile dropdown trigger */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 p-1.5 rounded-2xl border border-stone-200 hover:border-stone-300 bg-white transition shadow-xs"
            >
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name} 
                className="w-8 h-8 rounded-xl object-cover"
              />
              <span className="text-xs font-bold text-stone-800 hidden lg:inline max-w-[100px] truncate">
                {currentUser.name.split(' ')[0]}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
            </button>

            {/* Dropdown Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 z-50 animate-fadeIn">
                <div className="px-4 py-2.5 border-b border-stone-100">
                  <div className="font-bold text-stone-900 text-sm">{currentUser.name}</div>
                  <div className="text-xs text-stone-500">{currentUser.email}</div>
                  <div className="mt-1 flex items-center gap-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {currentUser.role === 'client' ? 'Opdrachtgever' : currentUser.role === 'admin' ? 'Beheerder' : 'Vakman'}
                    </span>
                    {currentUser.idVerified && (
                      <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
                        ID Geverifieerd
                      </span>
                    )}
                  </div>
                </div>

                <div className="py-1 text-xs text-stone-700">
                  <button
                    onClick={() => {
                      setCurrentTab('my-jobs');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-stone-50 font-medium"
                  >
                    Mijn Klussen & Biedingen
                  </button>

                  <button
                    onClick={() => {
                      setCurrentTab('wallet');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-stone-50 font-medium flex items-center justify-between"
                  >
                    <span>Stripe Wallet</span>
                    <span className="font-bold text-emerald-800">€ {currentUser.walletBalance}</span>
                  </button>

                  <button
                    onClick={() => {
                      openAuthModal('register');
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-stone-50 font-medium text-emerald-800"
                  >
                    Nieuw Account Registreren
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

    </header>
  );
};
