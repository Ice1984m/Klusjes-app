import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/initialData';
import { 
  X, MapPin, Calendar, EyeOff, Eye, ShieldCheck, Lock, Clock, 
  AlertTriangle, CheckCircle, MessageSquare, UserCheck, 
  Send, Sparkles, ChevronLeft, ChevronRight, Check, AlertCircle, Building2 
} from 'lucide-react';

export const JobDetailModal: React.FC = () => {
  const { 
    selectedJobId, 
    closeJobDetail, 
    jobs, 
    offers, 
    currentUser, 
    submitOffer, 
    acceptOfferAndFundEscrow,
    markJobAsCompleted,
    approveEscrowPayout,
    openDisputeModal,
    openChat,
    openPerformerProfile,
    openAuthModal
  } = useApp();

  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  // Bid submission state for performers
  const [bidAmount, setBidAmount] = useState<number | ''>('');
  const [bidDuration, setBidDuration] = useState('1 dag');
  const [bidMessage, setBidMessage] = useState('');
  const [isSubmittingBid, setIsSubmittingBid] = useState(false);
  const [isPayingEscrow, setIsPayingEscrow] = useState(false);
  const [selectedOfferForEscrow, setSelectedOfferForEscrow] = useState<string | null>(null);

  if (!selectedJobId) return null;

  const job = jobs.find(j => j.id === selectedJobId);
  if (!job) return null;

  const jobOffers = offers.filter(o => o.jobId === job.id);
  const categoryInfo = CATEGORIES.find(c => c.id === job.category);

  // Permissions & Roles
  const isOwner = currentUser.id === job.clientId;
  const isAdmin = currentUser.role === 'admin';
  const isPerformer = currentUser.role === 'performer';
  
  // Can viewer see the details of all offers? ONLY job owner & admin!
  const canSeeAllOffers = isOwner || isAdmin;

  // Has the current performer already submitted a bid?
  const myOffer = offers.find(o => o.jobId === job.id && o.performerId === currentUser.id);

  // Is current performer the accepted performer?
  const isAcceptedPerformer = job.acceptedPerformerId === currentUser.id;

  const handleBidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bidAmount || !bidMessage) {
      alert('Vul een geldig offertebedrag en toelichting in.');
      return;
    }

    setIsSubmittingBid(true);
    setTimeout(() => {
      submitOffer({
        jobId: job.id,
        performerId: currentUser.id,
        performerName: currentUser.name,
        performerAvatar: currentUser.avatar,
        performerStatus: currentUser.performerStatus || 'particulier',
        performerVatNumber: currentUser.vatNumber,
        performerRating: currentUser.rating,
        performerCompletedJobs: currentUser.completedJobsCount,
        isIdVerified: currentUser.idVerified,
        amount: Number(bidAmount),
        durationEstimate: bidDuration,
        message: bidMessage
      });
      setIsSubmittingBid(false);
      setBidAmount('');
      setBidMessage('');
    }, 600);
  };

  const handlePayEscrow = (offerId: string) => {
    setSelectedOfferForEscrow(offerId);
    setIsPayingEscrow(true);

    setTimeout(() => {
      acceptOfferAndFundEscrow(job.id, offerId);
      setIsPayingEscrow(false);
      setSelectedOfferForEscrow(null);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-stone-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-stone-50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
              {categoryInfo?.nameNl || job.category}
            </span>
            <span className="text-xs text-stone-500">• {job.postalCode} {job.city}</span>
          </div>

          <button
            onClick={closeJobDetail}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scroll Content */}
        <div className="p-6 overflow-y-auto space-y-6">

          {/* 72-HOUR ESCROW TIMER / STATUS BANNER */}
          {job.status === 'completed_pending_review' && (
            <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-amber-200 text-amber-900 rounded-xl animate-pulse">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm sm:text-base">72-Uurs Kwaliteitsinspectie Actief</h4>
                    <p className="text-xs text-amber-800">
                      De vakman heeft het werk voltooid. Resterende inspectietijd: <strong>68 uur 14 min</strong>.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 bg-amber-200/70 rounded-full">
                  € {job.acceptedAmount},- in Escrow
                </span>
              </div>

              {isOwner && (
                <div className="pt-2 border-t border-amber-200/60 flex flex-wrap gap-2.5 justify-end">
                  <button
                    onClick={() => openDisputeModal(job.id)}
                    className="px-4 py-2 border border-red-300 bg-white hover:bg-red-50 text-red-700 font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow-xs"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    <span>Niet tevreden? Geschil melden</span>
                  </button>

                  <button
                    onClick={() => approveEscrowPayout(job.id)}
                    className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Werk Goedkeuren & Uitbetalen</span>
                  </button>
                </div>
              )}

              {isAcceptedPerformer && (
                <p className="text-xs text-amber-900 bg-white/70 p-2.5 rounded-xl border border-amber-200">
                  U heeft de klus voltooid gemeld. Zodra de klant goedkeurt of wanneer de 72 uur zonder tegenbericht verstrijken, wordt 90% direct op uw Stripe Connect saldo gestort.
                </p>
              )}
            </div>
          )}

          {/* ACTIVE IN-ESCROW BANNER */}
          {job.status === 'in_escrow' && (
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-blue-200 text-blue-900 rounded-xl">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm">Geld Staat Veilig in Escrow Depot</h4>
                  <p className="text-xs text-blue-800">
                    Bedrag: <strong>€ {job.acceptedAmount},-</strong> • Uitvoerder is bezig met het werk.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openChat(job.id)}
                  className="px-3 py-2 bg-white border border-blue-200 text-blue-900 text-xs font-bold rounded-xl hover:bg-blue-100/50 flex items-center gap-1.5"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat Openen</span>
                </button>

                {isAcceptedPerformer && (
                  <button
                    onClick={() => markJobAsCompleted(job.id)}
                    className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow transition"
                  >
                    Meld Klus als Voltooid
                  </button>
                )}
              </div>
            </div>
          )}

          {/* DISPUTED BANNER */}
          {job.status === 'disputed' && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-300 text-red-950 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <span>Geschil in Behandeling bij KlusGarant Bemiddeling</span>
              </div>
              <p className="text-xs text-red-800">
                Reden van de klant: <em>"{job.disputeReason || 'Gebreken gemeld'}"</em>
              </p>
              <div className="text-[11px] text-stone-600 bg-white p-2.5 rounded-xl border border-red-200 flex items-center justify-between">
                <span>Escrow bedrag van € {job.acceptedAmount},- is bevroren tot uitspraak van de beheerder.</span>
                <button
                  onClick={() => openChat(job.id)}
                  className="px-2.5 py-1 bg-red-100 hover:bg-red-200 text-red-900 text-xs font-bold rounded-lg"
                >
                  Overleg in Chat
                </button>
              </div>
            </div>
          )}

          {/* Photo Gallery (Up to 10 photos carousel / thumbs) */}
          {job.photos && job.photos.length > 0 && (
            <div className="space-y-2">
              <div className="relative aspect-video rounded-3xl overflow-hidden bg-stone-900 shadow-inner">
                <img 
                  src={job.photos[activePhotoIndex]} 
                  alt={`Klus foto ${activePhotoIndex + 1}`} 
                  className="w-full h-full object-contain"
                />

                {job.photos.length > 1 && (
                  <>
                    <button
                      onClick={() => setActivePhotoIndex((activePhotoIndex - 1 + job.photos.length) % job.photos.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setActivePhotoIndex((activePhotoIndex + 1) % job.photos.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                <span className="absolute bottom-3 right-3 text-xs font-bold text-white bg-black/70 px-2.5 py-1 rounded-full">
                  {activePhotoIndex + 1} / {job.photos.length} foto's
                </span>
              </div>

              {/* Thumbnails */}
              {job.photos.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {job.photos.map((url, i) => (
                    <button
                      key={i}
                      onClick={() => setActivePhotoIndex(i)}
                      className={`w-16 h-12 rounded-xl overflow-hidden shrink-0 border-2 transition ${
                        activePhotoIndex === i ? 'border-emerald-700 scale-105' : 'border-stone-200 opacity-60'
                      }`}
                    >
                      <img src={url} alt={`Thumb ${i}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Job Info & Description */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 leading-tight">
              {job.title}
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-xs text-stone-600">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-700" />
                <span>
                  {/* Exact address rule */}
                  {job.status === 'in_escrow' || job.status === 'completed_pending_review' || isOwner || isAdmin
                    ? job.exactAddressHidden
                    : `${job.postalCode} ${job.city} (Exact adres zichtbaar na toewijzing)`}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-stone-400" />
                <span>Gewenst: <strong>{job.targetDate}</strong></span>
              </div>

              {job.budgetEstimate && (
                <div className="text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                  Richtbudget: € {job.budgetEstimate},-
                </div>
              )}
            </div>

            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80 text-stone-700 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
              {job.description}
            </div>

            {/* Poster profile badge */}
            <div className="flex items-center justify-between p-3 bg-white border border-stone-200 rounded-2xl">
              <div className="flex items-center gap-3">
                <img src={job.clientAvatar} alt={job.clientName} className="w-9 h-9 rounded-full object-cover border border-stone-200" />
                <div>
                  <div className="text-xs font-bold text-stone-900">{job.clientName}</div>
                  <div className="text-[11px] text-stone-500">Opdrachtgever ★ {job.clientRating} • Antwerpen</div>
                </div>
              </div>

              {/* Chat action if offer accepted */}
              {(job.status === 'in_escrow' || job.status === 'completed_pending_review') && (
                <button
                  onClick={() => openChat(job.id)}
                  className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs rounded-xl transition flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Stuur Bericht</span>
                </button>
              )}
            </div>
          </div>

          <hr className="border-stone-200" />

          {/* ========================================================
              BLIND BIDDING SECTION
             ======================================================== */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-stone-100 flex items-center justify-center text-stone-700">
                  <EyeOff className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-stone-900 text-base">
                    Offertesysteem (Blind Bidding)
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    Biedingen zijn afgeschermd tussen uitvoerders om eerlijke tarieven te beschermen.
                  </p>
                </div>
              </div>

              <span className="text-xs font-bold text-stone-800 bg-stone-100 px-3 py-1 rounded-full">
                {jobOffers.length} {jobOffers.length === 1 ? 'offerte' : 'offertes'} binnengekomen
              </span>
            </div>

            {/* CASE 1: VIEWER IS CLIENT OR ADMIN (Full transparency on all offers) */}
            {canSeeAllOffers && (
              <div className="space-y-3">
                <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-950 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>
                    Als aanbieder van de klus ziet u alle binnengekomen offertes. Prijzen zijn voor andere vakmensen verborgen.
                  </span>
                </div>

                {jobOffers.length === 0 ? (
                  <div className="text-center py-8 text-stone-400 text-xs">
                    Nog geen offertes ontvangen. Zodra een vakman reageert, verschijnt het voorstel hier.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {jobOffers.map(offer => {
                      const platformFee10 = Math.round(offer.amount * 0.10);
                      const performerNet = offer.amount - platformFee10;
                      const isAccepted = job.acceptedOfferId === offer.id;

                      return (
                        <div 
                          key={offer.id} 
                          className={`p-4 rounded-2xl border transition-all ${
                            isAccepted
                              ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-600'
                              : 'border-stone-200 bg-white hover:border-stone-300'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            {/* Performer info */}
                            <div className="flex items-center gap-3">
                              <img 
                                src={offer.performerAvatar} 
                                alt={offer.performerName} 
                                className="w-11 h-11 rounded-full object-cover border border-stone-200 shrink-0"
                              />
                              <div>
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <button
                                    onClick={() => openPerformerProfile(offer.performerId)}
                                    className="font-bold text-stone-900 text-sm hover:underline"
                                  >
                                    {offer.performerName}
                                  </button>
                                  {offer.isIdVerified && (
                                    <span className="inline-flex items-center gap-0.5 text-[10px] font-bold bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
                                      <ShieldCheck className="w-3 h-3" /> eID/Itsme
                                    </span>
                                  )}
                                  {offer.performerVatNumber ? (
                                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                                      BTW: {offer.performerVatNumber}
                                    </span>
                                  ) : (
                                    <span className="text-[10px] font-semibold bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded">
                                      Particulier (Deeleconomie)
                                    </span>
                                  )}
                                </div>
                                <div className="text-[11px] text-stone-500 mt-0.5">
                                  ★ {offer.performerRating} • {offer.performerCompletedJobs} klussen geklaard
                                </div>
                              </div>
                            </div>

                            {/* Price & Dynamic Status */}
                            <div className="flex flex-col items-end gap-1">
                              {offer.lifecycleStatus === 'nieuw' && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-900 border border-blue-300">
                                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                                  Nieuw
                                </span>
                              )}
                              {offer.lifecycleStatus === 'gezien' && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                                  <Eye className="w-3 h-3 text-amber-700" />
                                  Gezien
                                </span>
                              )}
                              {offer.lifecycleStatus === 'geaccepteerd' && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-950 border border-emerald-400">
                                  <Check className="w-3 h-3 text-emerald-700" />
                                  Geaccepteerd
                                </span>
                              )}

                              <div className="text-xl font-black text-emerald-900">
                                € {offer.amount},-
                              </div>
                              <div className="text-[10px] text-stone-400">
                                (10% platformfee: €{platformFee10} • Netto vakman: €{performerNet})
                              </div>
                            </div>
                          </div>

                          {/* Proposal message */}
                          <p className="mt-3 text-xs text-stone-700 bg-stone-50 p-3 rounded-xl border border-stone-200/60 leading-relaxed">
                            "{offer.message}"
                          </p>
                          <div className="mt-1 text-[11px] text-stone-500 flex items-center justify-between">
                            <span>Geschatte duur: <strong>{offer.durationEstimate}</strong></span>
                            <span>Aangeboden op: {new Date(offer.createdAt).toLocaleDateString('nl-BE')}</span>
                          </div>

                          {/* Accept Offer Action */}
                          {job.status === 'open' && isOwner && (
                            <div className="mt-3 pt-3 border-t border-stone-100 flex justify-end">
                              <button
                                onClick={() => handlePayEscrow(offer.id)}
                                disabled={isPayingEscrow}
                                className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-1.5 disabled:opacity-60"
                              >
                                {isPayingEscrow && selectedOfferForEscrow === offer.id ? (
                                  <span className="flex items-center gap-2">
                                    <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                    Stripe Escrow Reserveren...
                                  </span>
                                ) : (
                                  <>
                                    <Lock className="w-3.5 h-3.5" />
                                    <span>Accepteren & € {offer.amount},- in Escrow Plaatsen</span>
                                  </>
                                )}
                              </button>
                            </div>
                          )}

                          {isAccepted && (
                            <div className="mt-3 p-2 bg-emerald-100 text-emerald-950 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5">
                              <CheckCircle className="w-4 h-4 text-emerald-700" />
                              <span>Geaccepteerde Offerte • Actief in Escrow</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* CASE 2: VIEWER IS A CRAFTSMAN / PERFORMER */}
            {!canSeeAllOffers && (
              <div className="space-y-4">
                
                {/* Blind notification card */}
                <div className="p-4 rounded-2xl bg-stone-100 border border-stone-200 text-xs text-stone-700 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-stone-900">
                    <EyeOff className="w-4 h-4 text-stone-500" />
                    <span>Geheime Biedingen Beveiligd</span>
                  </div>
                  <p className="leading-relaxed">
                    Er zijn momenteel <strong>{jobOffers.length} offertes</strong> ingediend voor deze klus. Om eerlijke concurrentie te garanderen en prijsdumping te voorkomen, worden bedragen van collega-vakmensen niet getoond.
                  </p>
                </div>

                {/* Has this performer already bid? */}
                {myOffer ? (
                  <div className="p-4 rounded-2xl bg-white border-2 border-emerald-600/40 text-xs text-stone-900 space-y-3 shadow-xs">
                    <div className="flex items-center justify-between font-bold">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1.5 text-stone-900 font-extrabold text-sm">
                          <Check className="w-4 h-4 text-emerald-700" />
                          Jouw Ingediende Offerte
                        </span>

                        {/* DYNAMIC STATUS BADGE */}
                        {myOffer.lifecycleStatus === 'nieuw' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-900 border border-blue-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                            Nieuw
                          </span>
                        )}
                        {myOffer.lifecycleStatus === 'gezien' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                            <Eye className="w-3 h-3 text-amber-700" />
                            Gezien door klant
                          </span>
                        )}
                        {myOffer.lifecycleStatus === 'geaccepteerd' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-950 border border-emerald-400">
                            <Check className="w-3 h-3 text-emerald-700" />
                            Geaccepteerd in Escrow
                          </span>
                        )}
                      </div>

                      <span className="text-xl font-black text-emerald-900">
                        € {myOffer.amount},-
                      </span>
                    </div>

                    {/* Dynamic Status Explanation Banner */}
                    {myOffer.lifecycleStatus === 'nieuw' && (
                      <p className="text-[11px] text-blue-800 bg-blue-50 p-2.5 rounded-xl border border-blue-200">
                        🔵 <strong>Status: Nieuw</strong> — De klant heeft uw offerte nog niet geopend. Zodra de klant uw offerte bekijkt, verandert dit automatisch in 'Gezien'.
                      </p>
                    )}
                    {myOffer.lifecycleStatus === 'gezien' && (
                      <p className="text-[11px] text-amber-900 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                        👁️ <strong>Status: Gezien</strong> — De klant heeft uw offerte geopend en bekeken.
                      </p>
                    )}
                    {myOffer.lifecycleStatus === 'geaccepteerd' && (
                      <p className="text-[11px] text-emerald-950 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 font-medium">
                        🟢 <strong>Status: Geaccepteerd</strong> — Gefeliciteerd! Uw bod is gekozen en het bedrag van € {myOffer.amount},- staat veilig in Escrow depot.
                      </p>
                    )}

                    <p className="text-stone-700 bg-stone-50 p-3 rounded-xl border border-stone-200/80 italic leading-relaxed">
                      "{myOffer.message}"
                    </p>

                    <div className="text-[11px] text-stone-500 flex justify-between pt-1">
                      <span>Geschatte duur: <strong>{myOffer.durationEstimate}</strong></span>
                      <span>Verzonden op: {new Date(myOffer.createdAt).toLocaleDateString('nl-BE')}</span>
                    </div>
                  </div>
                ) : (
                  /* Form to submit a blind quote */
                  job.status === 'open' && (
                    <form onSubmit={handleBidSubmit} className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-3">
                      <h4 className="font-extrabold text-stone-900 text-sm flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-emerald-700" />
                        <span>Doe een Gesloten Bod (Offerte)</span>
                      </h4>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-stone-700 mb-1">
                            Jouw Prijs (€ all-in) *
                          </label>
                          <input
                            type="number"
                            required
                            min={10}
                            placeholder="bv. 185"
                            value={bidAmount}
                            onChange={e => setBidAmount(e.target.value ? Number(e.target.value) : '')}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm font-bold text-stone-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                          />
                          {bidAmount ? (
                            <span className="text-[10px] text-stone-500 mt-1 block">
                              10% platformprovisie: € {(Number(bidAmount) * 0.10).toFixed(2)} • Netto uitbetaling: € {(Number(bidAmount) * 0.90).toFixed(2)}
                            </span>
                          ) : null}
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-stone-700 mb-1">
                            Geschatte Duur
                          </label>
                          <input
                            type="text"
                            placeholder="bv. 1 werkdag"
                            value={bidDuration}
                            onChange={e => setBidDuration(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">
                          Toelichting & Beschikbaarheid *
                        </label>
                        <textarea
                          rows={3}
                          required
                          placeholder="Beschrijf wanneer u kunt langskomen, welke gereedschappen/ervaring u meeneemt en eventuele voorwaarden..."
                          value={bidMessage}
                          onChange={e => setBidMessage(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
                          <Lock className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Alleen zichtbaar voor {job.clientName}</span>
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmittingBid}
                          className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5 disabled:opacity-50"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>{isSubmittingBid ? 'Offerte verzenden...' : 'Verstuur Geheime Offerte'}</span>
                        </button>
                      </div>
                    </form>
                  )
                )}

              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
