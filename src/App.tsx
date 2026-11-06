import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CategoryFilter } from './components/CategoryFilter';
import { JobCard } from './components/JobCard';
import { JobWizardModal } from './components/JobWizardModal';
import { JobDetailModal } from './components/JobDetailModal';
import { AuthModal } from './components/AuthModal';
import { LegalModals } from './components/LegalModals';
import { SubscriptionModal } from './components/SubscriptionModal';
import { DisputeModal } from './components/DisputeModal';
import { PerformerProfileModal } from './components/PerformerProfileModal';
import { WalletView } from './components/WalletView';
import { AdminPortal } from './components/AdminPortal';
import { ChatModal } from './components/ChatModal';
import { MyJobsOverview } from './components/MyJobsOverview';
import { 
  Search, MapPin, ShieldCheck, Sparkles, Plus, 
  Lock, Clock, Filter, ArrowRight, UserPlus, CheckCircle2 
} from 'lucide-react';

const MainContent: React.FC = () => {
  const { 
    jobs, 
    currentUser, 
    openJobWizard, 
    openAuthModal, 
    setSubscriptionModalOpen,
    isMobileFrameView,
    setIsMobileFrameView 
  } = useApp();

  const [currentTab, setCurrentTab] = useState<'explore' | 'my-jobs' | 'wallet' | 'admin'>('explore');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'in_escrow' | 'completed'>('all');

  // Filter jobs
  const filteredJobs = jobs.filter(job => {
    const matchesCat = selectedCategory ? job.category === selectedCategory : true;
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.postalCode.includes(searchQuery);
    
    const matchesStatus = 
      statusFilter === 'all' ? true :
      statusFilter === 'open' ? job.status === 'open' :
      statusFilter === 'in_escrow' ? (job.status === 'in_escrow' || job.status === 'completed_pending_review') :
      job.status === 'paid_out';

    return matchesCat && matchesSearch && matchesStatus;
  });

  // User's own jobs or bids
  const myJobs = jobs.filter(job => {
    if (currentUser.role === 'client') {
      return job.clientId === currentUser.id;
    } else {
      return job.acceptedPerformerId === currentUser.id;
    }
  });

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans">
      <Header currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* Main Body with optional Mobile Smartphone Container */}
      <main className="flex-1">
        {isMobileFrameView ? (
          /* Mobile Device Frame Simulation */
          <div className="py-6 flex justify-center bg-stone-900/10 backdrop-blur-xs min-h-[90vh]">
            <div className="w-full max-w-[410px] bg-white rounded-[44px] shadow-2xl border-[10px] border-stone-800 overflow-hidden flex flex-col h-[850px] relative">
              {/* iPhone Island / Notch */}
              <div className="bg-stone-800 text-white pt-2 pb-1.5 px-6 flex items-center justify-between text-[11px] font-bold">
                <span>20:57</span>
                <div className="w-20 h-4 bg-black rounded-full" />
                <div className="flex items-center gap-1">
                  <span>5G</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Scrollable Mobile Body */}
              <div className="flex-1 overflow-y-auto pb-16">
                {currentTab === 'explore' && (
                  <div className="p-4 space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                      <input
                        type="text"
                        placeholder="Zoek klus of stad..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-stone-100 rounded-2xl text-xs focus:outline-none"
                      />
                    </div>

                    <CategoryFilter
                      selectedCategory={selectedCategory}
                      onSelectCategory={setSelectedCategory}
                    />

                    <div className="flex items-center justify-between text-xs font-bold text-stone-600">
                      <span>{filteredJobs.length} zoekertjes in de buurt</span>
                    </div>

                    <div className="space-y-4">
                      {filteredJobs.map(job => (
                        <JobCard key={job.id} job={job} />
                      ))}
                    </div>
                  </div>
                )}

                {currentTab === 'my-jobs' && (
                  <div className="p-4">
                    <MyJobsOverview />
                  </div>
                )}

                {currentTab === 'wallet' && (
                  <div className="p-4">
                    <WalletView />
                  </div>
                )}

                {currentTab === 'admin' && (
                  <div className="p-4">
                    <AdminPortal />
                  </div>
                )}
              </div>

              {/* Mobile Bottom Navigation Bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-stone-200 py-2.5 px-6 flex items-center justify-around text-[10px] font-bold text-stone-600">
                <button 
                  onClick={() => setCurrentTab('explore')} 
                  className={`flex flex-col items-center gap-1 ${currentTab === 'explore' ? 'text-emerald-800' : ''}`}
                >
                  <Search className="w-5 h-5" />
                  <span>Ontdekken</span>
                </button>
                <button 
                  onClick={openJobWizard} 
                  className="w-10 h-10 -mt-5 rounded-full bg-emerald-800 text-white flex items-center justify-center shadow-lg hover:scale-105 transition"
                >
                  <Plus className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => setCurrentTab('my-jobs')} 
                  className={`flex flex-col items-center gap-1 ${currentTab === 'my-jobs' ? 'text-emerald-800' : ''}`}
                >
                  <Clock className="w-5 h-5" />
                  <span>Mijn Klussen</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Standard Desktop & Responsive Web Layout */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            
            {/* VIEW 1: EXPLORE JOBS */}
            {currentTab === 'explore' && (
              <div className="space-y-8">
                
                {/* Hero Section */}
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-900 text-white p-6 sm:p-10 shadow-xl">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="max-w-2xl relative z-10 space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-700/50 text-xs font-bold text-emerald-200">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>72-Uurs Escrow Kwaliteitsinspectie</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                      Jouw klus in vertrouwde handen.
                    </h1>

                    <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
                      Plaats eenvoudig jouw werkje en ontvang geheime offertes van betrouwbare particulieren en zelfstandigen in jouw regio. Veilig vooraf gereserveerd in escrow.
                    </p>

                    {/* Subscription callout for clients */}
                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <button
                        onClick={openJobWizard}
                        className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-extrabold text-sm rounded-2xl shadow-lg transition flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Klus Plaatsen (Ontvang Offertes)</span>
                      </button>

                      <button
                        onClick={() => openAuthModal('register', 'performer')}
                        className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-2xl border border-white/20 transition flex items-center gap-1.5"
                      >
                        <UserPlus className="w-4 h-4" />
                        <span>Gratis Aanmelden als Vakman</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Search & Filters */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    {/* Search bar */}
                    <div className="relative flex-1">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                      <input
                        type="text"
                        placeholder="Zoek op werkzaamheden, postcode of stad (bv. snoeien, Antwerpen, 9000, sanitair)..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-stone-200 shadow-xs focus:ring-2 focus:ring-emerald-700/30 focus:outline-none text-sm"
                      />
                    </div>

                    {/* Status filter tabs */}
                    <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-2xl text-xs font-bold shrink-0">
                      <button
                        onClick={() => setStatusFilter('all')}
                        className={`px-3 py-2 rounded-xl transition ${statusFilter === 'all' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'}`}
                      >
                        Alles ({jobs.length})
                      </button>
                      <button
                        onClick={() => setStatusFilter('open')}
                        className={`px-3 py-2 rounded-xl transition ${statusFilter === 'open' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'}`}
                      >
                        Open ({jobs.filter(j => j.status === 'open').length})
                      </button>
                      <button
                        onClick={() => setStatusFilter('in_escrow')}
                        className={`px-3 py-2 rounded-xl transition ${statusFilter === 'in_escrow' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'}`}
                      >
                        In Escrow / 72u ({jobs.filter(j => j.status === 'in_escrow' || j.status === 'completed_pending_review').length})
                      </button>
                    </div>
                  </div>

                  {/* Category Pills */}
                  <CategoryFilter
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                  />
                </div>

                {/* Job Cards Grid */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-black text-stone-900">
                      Beschikbare Klussen in de Regio
                    </h2>
                    <span className="text-xs font-bold text-stone-500">
                      {filteredJobs.length} opdrachten gevonden
                    </span>
                  </div>

                  {filteredJobs.length === 0 ? (
                    <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-3">
                      <p className="text-stone-500 text-sm">
                        Geen zoekertjes gevonden met deze filters.
                      </p>
                      <button
                        onClick={() => {
                          setSelectedCategory(null);
                          setSearchQuery('');
                          setStatusFilter('all');
                        }}
                        className="text-xs font-bold text-emerald-800 underline"
                      >
                        Reset alle filters
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredJobs.map(job => (
                        <JobCard key={job.id} job={job} />
                      ))}
                    </div>
                  )}
                </div>

                {/* Value Proposition Callouts */}
                <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-200/80 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                      1
                    </div>
                    <h4 className="font-bold text-stone-900 text-sm">Blind-Bidding Eerlijkheid</h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Offertebedragen zijn uitsluitend zichtbaar voor de aanbieder. Zo voorkomen we prijsdumping en concurreren vakmensen op echte kwaliteit.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                      2
                    </div>
                    <h4 className="font-bold text-stone-900 text-sm">72-Uurs Kwaliteitsinspectie</h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Na afronding start automatisch een klok van 72 uur. Keur het werk goed om uit te betalen, of meld tijdig een gebrek bij ons geschillenteam.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                      3
                    </div>
                    <h4 className="font-bold text-stone-900 text-sm">10% Platformcommissie</h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Vakmensen registreren 100% gratis. Er wordt enkel 10% verrekend bij een succesvol goedgekeurde opdracht. 90% gaat direct naar de vakman.
                    </p>
                  </div>
                </div>

              </div>
            )}

            {/* VIEW 2: MY JOBS */}
            {currentTab === 'my-jobs' && (
              <MyJobsOverview />
            )}

            {/* VIEW 3: STRIPE WALLET */}
            {currentTab === 'wallet' && (
              <WalletView />
            )}

            {/* VIEW 4: ADMIN PORTAL */}
            {currentTab === 'admin' && (
              <AdminPortal />
            )}

          </div>
        )}
      </main>

      <Footer />

      {/* Global Interactive Modals */}
      <JobWizardModal />
      <JobDetailModal />
      <AuthModal />
      <LegalModals />
      <SubscriptionModal />
      <DisputeModal />
      <PerformerProfileModal />
      <ChatModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
