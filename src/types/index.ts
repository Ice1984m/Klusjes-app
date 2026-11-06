export type UserRole = 'client' | 'performer' | 'admin';

export type PerformerStatus = 'particulier' | 'bijberoep' | 'hoofdberoep';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  phone?: string;
  city: string;
  postalCode: string;
  country: 'BE' | 'NL' | 'FR';
  // Specific for performers
  performerStatus?: PerformerStatus;
  vatNumber?: string; // required if bijberoep or hoofdberoep
  idVerified: boolean;
  nationalRegisterNumber?: string; // e.g., Rijksregisternummer
  bio?: string;
  selectedCategories?: string[]; // max 7
  portfolioPhotos?: string[]; // max 3
  rating: number;
  completedJobsCount: number;
  walletBalance: number; // in EUR
  pendingEscrowBalance: number; // in EUR
  // Specific for clients
  hasActiveSubscription?: boolean; // €50/year subscription to post jobs
  subscriptionExpiresAt?: string;
}

export type JobStatus = 
  | 'open'            // accepting secret bids
  | 'in_escrow'       // offer accepted, client paid 100% into escrow, performer working
  | 'completed_pending_review' // performer marked finished, 72-hour timer ticking!
  | 'paid_out'        // 72h expired or client approved, funds released (-10% fee)
  | 'disputed'        // client raised dispute within 72h, timer paused, admin arbitrating
  | 'cancelled';

export interface JobPhoto {
  id: string;
  url: string;
  caption?: string;
}

export interface Job {
  id: string;
  clientId: string;
  clientName: string;
  clientAvatar: string;
  clientRating: number;
  title: string;
  category: string;
  description: string;
  photos: string[]; // up to 10
  city: string;
  postalCode: string;
  exactAddressHidden: string; // visible only after offer accepted
  targetDate: string;
  budgetEstimate?: number;
  status: JobStatus;
  createdAt: string;
  acceptedOfferId?: string;
  acceptedPerformerId?: string;
  acceptedAmount?: number; // total in EUR
  escrowPaidAt?: string;
  markedCompletedAt?: string; // timestamp when performer finished work
  inspectionTimerExpiresAt?: string; // markedCompletedAt + 72 hours
  disputeReason?: string;
  disputeEvidencePhotos?: string[];
}

export type OfferLifecycleStatus = 'nieuw' | 'gezien' | 'geaccepteerd' | 'afgewezen';

export interface Offer {
  id: string;
  jobId: string;
  performerId: string;
  performerName: string;
  performerAvatar: string;
  performerStatus: PerformerStatus;
  performerVatNumber?: string;
  performerRating: number;
  performerCompletedJobs: number;
  isIdVerified: boolean;
  amount: number; // EUR
  durationEstimate: string;
  message: string;
  createdAt: string;
  status: 'pending' | 'accepted' | 'rejected';
  lifecycleStatus?: OfferLifecycleStatus; // 'nieuw' | 'gezien' | 'geaccepteerd' | 'afgewezen'
  seenAt?: string; // timestamp when the client viewed the offer
}

export interface EscrowTransaction {
  id: string;
  jobId: string;
  jobTitle: string;
  clientId: string;
  clientName: string;
  performerId: string;
  performerName: string;
  totalAmount: number;
  platformFee: number; // 10%
  performerPayout: number; // 90%
  status: 'in_escrow' | 'released' | 'refunded' | 'frozen_in_dispute';
  paidAt: string;
  releasedAt?: string;
}

export interface ChatMessage {
  id: string;
  jobId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  createdAt: string;
  isSystemMessage?: boolean;
}

export interface DisputeRecord {
  id: string;
  jobId: string;
  jobTitle: string;
  clientId: string;
  clientName: string;
  performerId: string;
  performerName: string;
  amount: number;
  reason: string;
  evidencePhotos: string[];
  openedAt: string;
  status: 'open' | 'resolved_refund' | 'resolved_payout' | 'resolved_split';
  adminNotes?: string;
}

export interface CategoryInfo {
  id: string;
  nameNl: string;
  nameFr: string;
  iconName: string;
  description: string;
  exampleTasks: string[];
}
