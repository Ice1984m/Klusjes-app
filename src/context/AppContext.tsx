import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Job, Offer, EscrowTransaction, DisputeRecord, ChatMessage } from '../types';
import { INITIAL_USERS, INITIAL_JOBS, INITIAL_OFFERS, INITIAL_TRANSACTIONS, INITIAL_DISPUTES, INITIAL_CHAT_MESSAGES } from '../data/initialData';

interface AppContextType {
  currentUser: User;
  users: User[];
  jobs: Job[];
  offers: Offer[];
  transactions: EscrowTransaction[];
  disputes: DisputeRecord[];
  messages: ChatMessage[];
  selectedJobId: string | null;
  selectedPerformerId: string | null;
  chatJobId: string | null;
  language: 'nl' | 'fr';
  isMobileFrameView: boolean;
  
  // Modal states
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register';
  authPreselectedRole: 'client' | 'performer';
  isJobWizardOpen: boolean;
  isLegalTermsOpen: boolean;
  isLegalPrivacyOpen: boolean;
  isSubscriptionModalOpen: boolean;
  isDisputeModalOpen: boolean;
  
  // Actions
  switchUser: (userId: string) => void;
  setLanguage: (lang: 'nl' | 'fr') => void;
  setIsMobileFrameView: (val: boolean) => void;
  openAuthModal: (mode?: 'login' | 'register', role?: 'client' | 'performer') => void;
  closeAuthModal: () => void;
  openJobWizard: () => void;
  closeJobWizard: () => void;
  openJobDetail: (jobId: string) => void;
  closeJobDetail: () => void;
  openPerformerProfile: (performerId: string) => void;
  closePerformerProfile: () => void;
  openChat: (jobId: string) => void;
  closeChat: () => void;
  openDisputeModal: (jobId: string) => void;
  closeDisputeModal: () => void;
  setLegalTermsOpen: (open: boolean) => void;
  setLegalPrivacyOpen: (open: boolean) => void;
  setSubscriptionModalOpen: (open: boolean) => void;
  
  // Business logic operations
  registerUser: (userData: Partial<User>) => User;
  purchaseSubscription: (userId: string) => void;
  createJob: (jobData: Omit<Job, 'id' | 'createdAt' | 'status'>) => Job;
  submitOffer: (offerData: Omit<Offer, 'id' | 'createdAt' | 'status' | 'lifecycleStatus'>) => Offer;
  acceptOfferAndFundEscrow: (jobId: string, offerId: string) => void;
  markJobAsCompleted: (jobId: string) => void;
  approveEscrowPayout: (jobId: string) => void;
  fileDispute: (jobId: string, reason: string, evidencePhotos: string[]) => void;
  resolveDispute: (disputeId: string, resolution: 'payout' | 'refund' | 'split', adminNotes: string) => void;
  verifyUserKyc: (userId: string, approve: boolean) => void;
  sendMessage: (jobId: string, text: string) => void;
  markOfferAsSeen: (offerId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Persistence via localStorage or defaults
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('kg_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUserId, setCurrentUserId] = useState<string>('client-sarah');

  const [jobs, setJobs] = useState<Job[]>(() => {
    const saved = localStorage.getItem('kg_jobs');
    return saved ? JSON.parse(saved) : INITIAL_JOBS;
  });

  const [offers, setOffers] = useState<Offer[]>(() => {
    const saved = localStorage.getItem('kg_offers');
    return saved ? JSON.parse(saved) : INITIAL_OFFERS;
  });

  const [transactions, setTransactions] = useState<EscrowTransaction[]>(() => {
    const saved = localStorage.getItem('kg_txs');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [disputes, setDisputes] = useState<DisputeRecord[]>(() => {
    const saved = localStorage.getItem('kg_disputes');
    return saved ? JSON.parse(saved) : INITIAL_DISPUTES;
  });

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('kg_messages');
    return saved ? JSON.parse(saved) : INITIAL_CHAT_MESSAGES;
  });

  // UI state
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [selectedPerformerId, setSelectedPerformerId] = useState<string | null>(null);
  const [chatJobId, setChatJobId] = useState<string | null>(null);
  const [language, setLanguage] = useState<'nl' | 'fr'>('nl');
  const [isMobileFrameView, setIsMobileFrameView] = useState<boolean>(false);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('register');
  const [authPreselectedRole, setAuthPreselectedRole] = useState<'client' | 'performer'>('performer');
  const [isJobWizardOpen, setIsJobWizardOpen] = useState<boolean>(false);
  const [isLegalTermsOpen, setLegalTermsOpen] = useState<boolean>(false);
  const [isLegalPrivacyOpen, setLegalPrivacyOpen] = useState<boolean>(false);
  const [isSubscriptionModalOpen, setSubscriptionModalOpen] = useState<boolean>(false);
  const [isDisputeModalOpen, setIsDisputeModalOpen] = useState<boolean>(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('kg_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('kg_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('kg_offers', JSON.stringify(offers));
  }, [offers]);

  useEffect(() => {
    localStorage.setItem('kg_txs', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('kg_disputes', JSON.stringify(disputes));
  }, [disputes]);

  useEffect(() => {
    localStorage.setItem('kg_messages', JSON.stringify(messages));
  }, [messages]);

  const currentUser = users.find(u => u.id === currentUserId) || users[0];

  const switchUser = (userId: string) => {
    setCurrentUserId(userId);
  };

  const openAuthModal = (mode: 'login' | 'register' = 'register', role: 'client' | 'performer' = 'performer') => {
    setAuthModalMode(mode);
    setAuthPreselectedRole(role);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => setIsAuthModalOpen(false);
  const openJobWizard = () => setIsJobWizardOpen(true);
  const closeJobWizard = () => setIsJobWizardOpen(false);
  const openJobDetail = (jobId: string) => {
    setSelectedJobId(jobId);

    // If client of this job or admin opens the job, auto-mark 'nieuw' offers as 'gezien'
    const targetJob = jobs.find(j => j.id === jobId);
    if (targetJob && (currentUser.id === targetJob.clientId || currentUser.role === 'admin')) {
      const now = new Date().toISOString();
      setOffers(prev => prev.map(o => {
        if (o.jobId === jobId && (o.lifecycleStatus === 'nieuw' || !o.lifecycleStatus)) {
          return {
            ...o,
            lifecycleStatus: 'gezien',
            seenAt: now
          };
        }
        return o;
      }));
    }
  };

  const closeJobDetail = () => setSelectedJobId(null);
  const openPerformerProfile = (id: string) => setSelectedPerformerId(id);
  const closePerformerProfile = () => setSelectedPerformerId(null);
  const openChat = (jobId: string) => setChatJobId(jobId);
  const closeChat = () => setChatJobId(null);
  const openDisputeModal = (jobId: string) => {
    setSelectedJobId(jobId);
    setIsDisputeModalOpen(true);
  };
  const closeDisputeModal = () => setIsDisputeModalOpen(false);

  // Registration
  const registerUser = (userData: Partial<User>): User => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: userData.name || 'Nieuwe Gebruiker',
      email: userData.email || '',
      role: userData.role || 'performer',
      avatar: userData.avatar || `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80`,
      phone: userData.phone || '',
      city: userData.city || 'Brussel',
      postalCode: userData.postalCode || '1000',
      country: userData.country || 'BE',
      performerStatus: userData.performerStatus || 'particulier',
      vatNumber: userData.vatNumber,
      idVerified: userData.idVerified || false,
      nationalRegisterNumber: userData.nationalRegisterNumber,
      bio: userData.bio || '',
      selectedCategories: userData.selectedCategories || ['algemeen'],
      portfolioPhotos: userData.portfolioPhotos || [],
      rating: 5.0,
      completedJobsCount: 0,
      walletBalance: 0,
      pendingEscrowBalance: 0,
      hasActiveSubscription: userData.role === 'client' ? false : undefined
    };

    setUsers(prev => [newUser, ...prev]);
    setCurrentUserId(newUser.id);
    setIsAuthModalOpen(false);
    return newUser;
  };

  // Subscription (€50/year)
  const purchaseSubscription = (userId: string) => {
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);

    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        return {
          ...u,
          hasActiveSubscription: true,
          subscriptionExpiresAt: expiryDate.toISOString().split('T')[0]
        };
      }
      return u;
    }));
    setSubscriptionModalOpen(false);
  };

  // Job creation
  const createJob = (jobData: Omit<Job, 'id' | 'createdAt' | 'status'>): Job => {
    const newJob: Job = {
      ...jobData,
      id: `job-${Date.now()}`,
      status: 'open',
      createdAt: new Date().toISOString()
    };

    setJobs(prev => [newJob, ...prev]);
    setIsJobWizardOpen(false);
    return newJob;
  };

  // Submit Blind Bid
  const submitOffer = (offerData: Omit<Offer, 'id' | 'createdAt' | 'status'>): Offer => {
    const newOffer: Offer = {
      ...offerData,
      id: `offer-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'pending',
      lifecycleStatus: 'nieuw'
    };

    setOffers(prev => [newOffer, ...prev]);
    return newOffer;
  };

  // Mark an individual offer as seen
  const markOfferAsSeen = (offerId: string) => {
    setOffers(prev => prev.map(o => {
      if (o.id === offerId && (o.lifecycleStatus === 'nieuw' || !o.lifecycleStatus)) {
        return {
          ...o,
          lifecycleStatus: 'gezien',
          seenAt: new Date().toISOString()
        };
      }
      return o;
    }));
  };

  // Accept offer & pay 100% into Escrow
  const acceptOfferAndFundEscrow = (jobId: string, offerId: string) => {
    const targetJob = jobs.find(j => j.id === jobId);
    const targetOffer = offers.find(o => o.id === offerId);
    if (!targetJob || !targetOffer) return;

    const totalAmount = targetOffer.amount;
    const platformFee = Math.round(totalAmount * 0.10 * 100) / 100; // 10%
    const performerPayout = Math.round((totalAmount - platformFee) * 100) / 100; // 90%

    // 1. Update Offer statuses with lifecycleStatus ('geaccepteerd' or 'afgewezen')
    setOffers(prev => prev.map(o => {
      if (o.jobId === jobId) {
        if (o.id === offerId) {
          return { ...o, status: 'accepted', lifecycleStatus: 'geaccepteerd' };
        } else {
          return { ...o, status: 'rejected', lifecycleStatus: 'afgewezen' };
        }
      }
      return o;
    }));

    // 2. Update Job
    setJobs(prev => prev.map(j => {
      if (j.id === jobId) {
        return {
          ...j,
          status: 'in_escrow',
          acceptedOfferId: offerId,
          acceptedPerformerId: targetOffer.performerId,
          acceptedAmount: totalAmount,
          escrowPaidAt: new Date().toISOString()
        };
      }
      return j;
    }));

    // 3. Create Escrow Transaction
    const newTx: EscrowTransaction = {
      id: `tx-${Date.now()}`,
      jobId,
      jobTitle: targetJob.title,
      clientId: targetJob.clientId,
      clientName: targetJob.clientName,
      performerId: targetOffer.performerId,
      performerName: targetOffer.performerName,
      totalAmount,
      platformFee,
      performerPayout,
      status: 'in_escrow',
      paidAt: new Date().toISOString()
    };
    setTransactions(prev => [newTx, ...prev]);

    // 4. Update performer's pending escrow balance
    setUsers(prev => prev.map(u => {
      if (u.id === targetOffer.performerId) {
        return {
          ...u,
          pendingEscrowBalance: u.pendingEscrowBalance + performerPayout
        };
      }
      return u;
    }));

    // 5. System message in chat
    const sysMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      jobId,
      senderId: 'system',
      senderName: 'KlusGarant Escrow Systeem',
      senderAvatar: '',
      text: `🎉 Offerte van € ${totalAmount},- geaccepteerd! Het bedrag staat veilig in escrow buffer. 10% commissie (€ ${platformFee}) wordt pas na voltooiing en goedkeuring ingehouden.`,
      createdAt: new Date().toISOString(),
      isSystemMessage: true
    };
    setMessages(prev => [...prev, sysMsg]);
  };

  // Performer marks job completed -> 72h inspection timer begins!
  const markJobAsCompleted = (jobId: string) => {
    const now = new Date();
    const expires = new Date(now.getTime() + 72 * 60 * 60 * 1000); // 72 hours later

    setJobs(prev => prev.map(j => {
      if (j.id === jobId) {
        return {
          ...j,
          status: 'completed_pending_review',
          markedCompletedAt: now.toISOString(),
          inspectionTimerExpiresAt: expires.toISOString()
        };
      }
      return j;
    }));

    const sysMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      jobId,
      senderId: 'system',
      senderName: 'KlusGarant Inspectie',
      senderAvatar: '',
      text: `⏱️ De vakman heeft de klus als voltooid gemarkeerd. De 72-uurs kwaliteitsinspectie is gestart! U heeft tot ${expires.toLocaleString('nl-BE')} om het werk goed te keuren of bezwaar te maken.`,
      createdAt: now.toISOString(),
      isSystemMessage: true
    };
    setMessages(prev => [...prev, sysMsg]);
  };

  // Client approves payout (or 72h auto-expires)
  const approveEscrowPayout = (jobId: string) => {
    const targetJob = jobs.find(j => j.id === jobId);
    if (!targetJob || !targetJob.acceptedPerformerId || !targetJob.acceptedAmount) return;

    const totalAmount = targetJob.acceptedAmount;
    const platformFee = Math.round(totalAmount * 0.10 * 100) / 100;
    const payout = Math.round((totalAmount - platformFee) * 100) / 100;

    // 1. Update Job status
    setJobs(prev => prev.map(j => {
      if (j.id === jobId) {
        return { ...j, status: 'paid_out' };
      }
      return j;
    }));

    // 2. Update Transaction
    setTransactions(prev => prev.map(t => {
      if (t.jobId === jobId) {
        return {
          ...t,
          status: 'released',
          releasedAt: new Date().toISOString()
        };
      }
      return t;
    }));

    // 3. Move from pending escrow to available wallet balance for performer
    setUsers(prev => prev.map(u => {
      if (u.id === targetJob.acceptedPerformerId) {
        return {
          ...u,
          walletBalance: u.walletBalance + payout,
          pendingEscrowBalance: Math.max(0, u.pendingEscrowBalance - payout),
          completedJobsCount: u.completedJobsCount + 1
        };
      }
      return u;
    }));

    // 4. System message
    const sysMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      jobId,
      senderId: 'system',
      senderName: 'KlusGarant Betaling',
      senderAvatar: '',
      text: `✅ Klant heeft het werk goedgekeurd! Uitbetaling van € ${payout},- is direct overgemaakt naar de vakman. 10% platformvergoeding (€ ${platformFee}) is verwerkt.`,
      createdAt: new Date().toISOString(),
      isSystemMessage: true
    };
    setMessages(prev => [...prev, sysMsg]);
  };

  // Client files a dispute within 72h
  const fileDispute = (jobId: string, reason: string, evidencePhotos: string[]) => {
    const targetJob = jobs.find(j => j.id === jobId);
    if (!targetJob || !targetJob.acceptedPerformerId || !targetJob.acceptedAmount) return;

    // 1. Freeze job status
    setJobs(prev => prev.map(j => {
      if (j.id === jobId) {
        return {
          ...j,
          status: 'disputed',
          disputeReason: reason,
          disputeEvidencePhotos: evidencePhotos
        };
      }
      return j;
    }));

    // 2. Freeze transaction
    setTransactions(prev => prev.map(t => {
      if (t.jobId === jobId) {
        return { ...t, status: 'frozen_in_dispute' };
      }
      return t;
    }));

    // 3. Create Dispute record
    const newDispute: DisputeRecord = {
      id: `disp-${Date.now()}`,
      jobId,
      jobTitle: targetJob.title,
      clientId: targetJob.clientId,
      clientName: targetJob.clientName,
      performerId: targetJob.acceptedPerformerId,
      performerName: targetJob.clientName,
      amount: targetJob.acceptedAmount,
      reason,
      evidencePhotos,
      openedAt: new Date().toISOString(),
      status: 'open',
      adminNotes: 'Nieuw geschil ontvangen. KlusGarant bemiddelingsteam is op de hoogte gesteld.'
    };
    setDisputes(prev => [newDispute, ...prev]);

    // 4. System message
    const sysMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      jobId,
      senderId: 'system',
      senderName: 'KlusGarant Bemiddeling',
      senderAvatar: '',
      text: `⚠️ Geschil gemeld door klant. De 72-uurs aftelklok is gepauzeerd en het escrow-bedrag van € ${targetJob.acceptedAmount},- is bevroren. Ons bemiddelingsteam buigt zich binnen 24u over de situatie.`,
      createdAt: new Date().toISOString(),
      isSystemMessage: true
    };
    setMessages(prev => [...prev, sysMsg]);
    setIsDisputeModalOpen(false);
  };

  // Admin resolves dispute
  const resolveDispute = (disputeId: string, resolution: 'payout' | 'refund' | 'split', adminNotes: string) => {
    const dispute = disputes.find(d => d.id === disputeId);
    if (!dispute) return;

    const targetJob = jobs.find(j => j.id === dispute.jobId);
    const totalAmount = dispute.amount;
    const fee10 = Math.round(totalAmount * 0.10 * 100) / 100;
    const fullPayout = Math.round((totalAmount - fee10) * 100) / 100;

    // Update dispute status
    setDisputes(prev => prev.map(d => {
      if (d.id === disputeId) {
        return {
          ...d,
          status: resolution === 'payout' ? 'resolved_payout' : resolution === 'refund' ? 'resolved_refund' : 'resolved_split',
          adminNotes
        };
      }
      return d;
    }));

    if (resolution === 'payout') {
      // release to performer
      setJobs(prev => prev.map(j => j.id === dispute.jobId ? { ...j, status: 'paid_out' } : j));
      setUsers(prev => prev.map(u => {
        if (u.id === dispute.performerId) {
          return {
            ...u,
            walletBalance: u.walletBalance + fullPayout,
            pendingEscrowBalance: Math.max(0, u.pendingEscrowBalance - fullPayout)
          };
        }
        return u;
      }));
    } else if (resolution === 'refund') {
      // refund to client
      setJobs(prev => prev.map(j => j.id === dispute.jobId ? { ...j, status: 'cancelled' } : j));
      setUsers(prev => prev.map(u => {
        if (u.id === dispute.performerId) {
          return {
            ...u,
            pendingEscrowBalance: Math.max(0, u.pendingEscrowBalance - fullPayout)
          };
        }
        return u;
      }));
    } else if (resolution === 'split') {
      // 50/50 split
      const half = Math.round((fullPayout / 2) * 100) / 100;
      setJobs(prev => prev.map(j => j.id === dispute.jobId ? { ...j, status: 'paid_out' } : j));
      setUsers(prev => prev.map(u => {
        if (u.id === dispute.performerId) {
          return {
            ...u,
            walletBalance: u.walletBalance + half,
            pendingEscrowBalance: Math.max(0, u.pendingEscrowBalance - fullPayout)
          };
        }
        return u;
      }));
    }
  };

  // Verify User KYC
  const verifyUserKyc = (userId: string, approve: boolean) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        return { ...u, idVerified: approve };
      }
      return u;
    }));
  };

  // Send Chat message
  const sendMessage = (jobId: string, text: string) => {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      jobId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      text,
      createdAt: new Date().toISOString()
    };
    setMessages(prev => [...prev, newMsg]);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        jobs,
        offers,
        transactions,
        disputes,
        messages,
        selectedJobId,
        selectedPerformerId,
        chatJobId,
        language,
        isMobileFrameView,
        isAuthModalOpen,
        authModalMode,
        authPreselectedRole,
        isJobWizardOpen,
        isLegalTermsOpen,
        isLegalPrivacyOpen,
        isSubscriptionModalOpen,
        isDisputeModalOpen,
        switchUser,
        setLanguage,
        setIsMobileFrameView,
        openAuthModal,
        closeAuthModal,
        openJobWizard,
        closeJobWizard,
        openJobDetail,
        closeJobDetail,
        openPerformerProfile,
        closePerformerProfile,
        openChat,
        closeChat,
        openDisputeModal,
        closeDisputeModal,
        setLegalTermsOpen,
        setLegalPrivacyOpen,
        setSubscriptionModalOpen,
        registerUser,
        purchaseSubscription,
        createJob,
        submitOffer,
        acceptOfferAndFundEscrow,
        markJobAsCompleted,
        approveEscrowPayout,
        fileDispute,
        resolveDispute,
        verifyUserKyc,
        sendMessage,
        markOfferAsSeen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
