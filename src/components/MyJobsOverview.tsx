import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/initialData';
import { OfferLifecycleStatus } from '../types';
import { 
  Eye, CheckCircle2, Clock, Sparkles, XCircle, 
  MapPin, Calendar, Lock, MessageSquare, ChevronRight, 
  Filter, Plus, ShieldCheck, ArrowRight, AlertTriangle 
} from 'lucide-react';

export const MyJobsOverview: React.FC = () => {
  const { 
    currentUser, 
    jobs, 
    offers, 
    openJobDetail, 
    openChat, 
    openJobWizard 
  } = useApp();

  const isClient = currentUser.role === 'client';
  const [filterLifecycle, setFilterLifecycle] = useState<'all' | 'nieuw' | 'gezien' | 'geaccepteerd'>('all');

  // Performer's submitted offers
  const myOffers = offers.filter(o => o.performerId === currentUser.id);

  // Filtered offers by lifecycle status
  const filteredOffers = myOffers.filter(o => {
    if (filterLifecycle === 'all') return true;
    return o.lifecycleStatus === filterLifecycle;
  });

  // Client's posted jobs
  const myPostedJobs = jobs.filter(j => j.clientId === currentUser.id);

  // Status counters for performer
  const countNieuw = myOffers.filter(o => o.lifecycleStatus === 'nieuw').length;
  const countGezien = myOffers.filter(o => o.lifecycleStatus === 'gezien').length;
  const countGeaccepteerd = myOffers.filter(o => o.lifecycleStatus === 'geaccepteerd').length;

  // Helper to render dynamic status badge
  const renderStatusBadge = (status: OfferLifecycleStatus = 'nieuw', seenAt?: string) => {
    switch (status) {
      case 'nieuw':
        return (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-300 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
            <Sparkles className="w-3.5 h-3.5 text-blue-700" />
            <span>Nieuw</span>
          </div>
        );
      case 'gezien':
        return (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 shadow-xs">
            <Eye className="w-3.5 h-3.5 text-amber-700" />
            <span>Gezien door klant</span>
          </div>
        );
      case 'geaccepteerd':
        return (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-950 border border-emerald-400 shadow-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>Geaccepteerd in Escrow</span>
          </div>
        );
      case 'afgewezen':
        return (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-stone-100 text-stone-600 border border-stone-200">
            <XCircle className="w-3.5 h-3.5 text-stone-400" />
            <span>Niet geselecteerd</span>
          </div>
        );
      default:
        return null;
    }
  };

  // Helper for explanation text below the badge
  const renderStatusExplanation = (status: OfferLifecycleStatus = 'nieuw', seenAt?: string) => {
    switch (status) {
      case 'nieuw':
        return (
          <p className="text-[11px] text-blue-800 bg-blue-50/80 p-2 rounded-xl border border-blue-200/70 flex items-center gap-1.5">
            <span className="font-bold">Status Nieuw:</span> De klant heeft uw offerte nog niet geopend. U ziet direct wanneer de klant deze bekijkt.
          </p>
        );
      case 'gezien':
        return (
          <p className="text-[11px] text-amber-900 bg-amber-50/80 p-2 rounded-xl border border-amber-200/70 flex items-center gap-1.5">
            <span className="font-bold">Status Gezien:</span> Klant heeft uw voorstel geopend en bekeken
            {seenAt && ` (${new Date(seenAt).toLocaleDateString('nl-BE')} om ${new Date(seenAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`}. De klant vergelijkt momenteel de kandidaten.
          </p>
        );
      case 'geaccepteerd':
        return (
          <p className="text-[11px] text-emerald-950 bg-emerald-50/80 p-2 rounded-xl border border-emerald-200/70 flex items-center gap-1.5">
            <span className="font-bold">Status Geaccepteerd:</span> Gefeliciteerd! Uw bod is gekozen en het geld is 100% veilig in Escrow geplaatst.
          </p>
        );
      case 'afgewezen':
        return (
          <p className="text-[11px] text-stone-500 bg-stone-50 p-2 rounded-xl border border-stone-200">
            De opdrachtgever heeft voor deze klus een andere offerte geaccepteerd.
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Title & Role Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
            {isClient ? 'Mijn Geplaatste Klussen' : 'Mijn Klussen & Biedingen'}
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            {isClient
              ? 'Volg binnengekomen geheime offertes, inspecteer voorstellen en beheer de 72-uurs escrow.'
              : 'Volg realtime de status van uw ingediende offertes: Nieuw, Gezien of Geaccepteerd.'}
          </p>
        </div>

        {isClient && (
          <button
            onClick={openJobWizard}
            className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-2 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Nieuwe Klus Plaatsen</span>
          </button>
        )}
      </div>

      {/* =========================================================================
          VAKMAN / UITVOERDER PERSPECTIEF (Offerte Voortgang Tracker)
         ========================================================================= */}
      {!isClient && (
        <div className="space-y-5">
          
          {/* Status KPI Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={() => setFilterLifecycle('all')}
              className={`p-4 rounded-2xl border text-left transition ${
                filterLifecycle === 'all'
                  ? 'border-emerald-700 bg-emerald-50/60 ring-2 ring-emerald-700'
                  : 'border-stone-200 bg-white hover:border-stone-300'
              }`}
            >
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                Totaal Biedingen
              </span>
              <span className="text-2xl font-black text-stone-900 mt-1 block">
                {myOffers.length}
              </span>
              <span className="text-[10px] text-stone-400">Alle actieve voorstellen</span>
            </button>

            <button
              onClick={() => setFilterLifecycle('nieuw')}
              className={`p-4 rounded-2xl border text-left transition ${
                filterLifecycle === 'nieuw'
                  ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-600'
                  : 'border-stone-200 bg-white hover:border-stone-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-900 uppercase tracking-wider block">
                  Nieuw
                </span>
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              </div>
              <span className="text-2xl font-black text-blue-900 mt-1 block">
                {countNieuw}
              </span>
              <span className="text-[10px] text-blue-700">Nog niet geopend door klant</span>
            </button>

            <button
              onClick={() => setFilterLifecycle('gezien')}
              className={`p-4 rounded-2xl border text-left transition ${
                filterLifecycle === 'gezien'
                  ? 'border-amber-500 bg-amber-50/70 ring-2 ring-amber-500'
                  : 'border-stone-200 bg-white hover:border-stone-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
                  Gezien
                </span>
                <Eye className="w-3.5 h-3.5 text-amber-700" />
              </div>
              <span className="text-2xl font-black text-amber-900 mt-1 block">
                {countGezien}
              </span>
              <span className="text-[10px] text-amber-800">Bekeken door klant</span>
            </button>

            <button
              onClick={() => setFilterLifecycle('geaccepteerd')}
              className={`p-4 rounded-2xl border text-left transition ${
                filterLifecycle === 'geaccepteerd'
                  ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-600'
                  : 'border-stone-200 bg-white hover:border-stone-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider block">
                  Geaccepteerd
                </span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              </div>
              <span className="text-2xl font-black text-emerald-900 mt-1 block">
                {countGeaccepteerd}
              </span>
              <span className="text-[10px] text-emerald-800">In Escrow gereserveerd</span>
            </button>
          </div>

          {/* Offers List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-stone-900 text-base">
                Ingediende Offertes ({filteredOffers.length})
              </h3>
              {filterLifecycle !== 'all' && (
                <button
                  onClick={() => setFilterLifecycle('all')}
                  className="text-xs text-emerald-800 font-bold hover:underline"
                >
                  Toon alles
                </button>
              )}
            </div>

            {filteredOffers.length === 0 ? (
              <div className="bg-white rounded-3xl border border-stone-200 p-10 text-center space-y-2">
                <Clock className="w-8 h-8 mx-auto text-stone-300" />
                <p className="text-stone-600 text-sm font-semibold">
                  Geen offertes met status "{filterLifecycle}".
                </p>
                <p className="text-xs text-stone-400">
                  Bekijk het aanbod bij 'Klussen Ontdekken' om nieuwe biedingen te plaatsen.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOffers.map(offer => {
                  const job = jobs.find(j => j.id === offer.jobId);
                  if (!job) return null;

                  const fee10 = Math.round(offer.amount * 0.10);
                  const net90 = offer.amount - fee10;
                  const categoryInfo = CATEGORIES.find(c => c.id === job.category);

                  return (
                    <div
                      key={offer.id}
                      className="bg-white rounded-3xl border border-stone-200 hover:border-stone-300 p-5 sm:p-6 shadow-xs space-y-4 transition"
                    >
                      {/* Top row: Job Title + Dynamic Status Badge */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 text-stone-700">
                              {categoryInfo?.nameNl || job.category}
                            </span>
                            <span className="text-xs text-stone-400 flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-emerald-700" />
                              {job.postalCode} {job.city}
                            </span>
                          </div>

                          <h4 
                            onClick={() => openJobDetail(job.id)}
                            className="font-extrabold text-stone-900 text-lg hover:text-emerald-800 cursor-pointer transition-colors"
                          >
                            {job.title}
                          </h4>
                        </div>

                        {/* DYNAMIC STATUS BADGE */}
                        <div className="shrink-0">
                          {renderStatusBadge(offer.lifecycleStatus, offer.seenAt)}
                        </div>
                      </div>

                      {/* Explanation banner */}
                      {renderStatusExplanation(offer.lifecycleStatus, offer.seenAt)}

                      {/* Offer Breakdown Card */}
                      <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div>
                          <span className="text-stone-500 block mb-0.5">Jouw Ingediende Offertebedrag:</span>
                          <div className="text-xl font-black text-stone-900">
                            € {offer.amount},-
                          </div>
                          <span className="text-[11px] text-stone-500">
                            10% platformfee: <strong className="text-stone-700">€ {fee10},-</strong> • Jouw netto uitbetaling: <strong className="text-emerald-800 font-extrabold">€ {net90},-</strong>
                          </span>
                        </div>

                        <div className="sm:text-right space-y-0.5 text-stone-600">
                          <div>Geschatte duur: <strong>{offer.durationEstimate}</strong></div>
                          <div className="text-stone-400 text-[11px]">
                            Verzonden op: {new Date(offer.createdAt).toLocaleDateString('nl-BE')}
                          </div>
                        </div>
                      </div>

                      {/* Proposal text quote */}
                      <div className="text-xs text-stone-700 bg-white p-3 rounded-xl border border-stone-200 italic">
                        "{offer.message}"
                      </div>

                      {/* Actions */}
                      <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                        <div className="text-[11px] text-stone-500 flex items-center gap-1">
                          <Lock className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Blind-Bidding: Bedrag is afgeschermd voor andere vakmensen</span>
                        </div>

                        <div className="flex items-center gap-2">
                          {(offer.lifecycleStatus === 'geaccepteerd' || job.status === 'in_escrow') && (
                            <button
                              onClick={() => openChat(job.id)}
                              className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-xs rounded-xl transition flex items-center gap-1.5"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>Chat met Klant</span>
                            </button>
                          )}

                          <button
                            onClick={() => openJobDetail(job.id)}
                            className="px-4 py-2 bg-stone-900 hover:bg-black text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5"
                          >
                            <span>Bekijk Klus Details</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>

        </div>
      )}

      {/* =========================================================================
          OPDRACHTGEVER / KLANT PERSPECTIEF
         ========================================================================= */}
      {isClient && (
        <div className="space-y-4">
          {myPostedJobs.length === 0 ? (
            <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-3">
              <p className="text-stone-600 text-sm">
                U heeft momenteel geen actieve zoekertjes geplaatst.
              </p>
              <button
                onClick={openJobWizard}
                className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow transition"
              >
                Plaats nu uw eerste klus
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {myPostedJobs.map(job => {
                const jobOffers = offers.filter(o => o.jobId === job.id);
                const newOffersCount = jobOffers.filter(o => o.lifecycleStatus === 'nieuw').length;

                return (
                  <div
                    key={job.id}
                    className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 shadow-xs space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            {job.category}
                          </span>
                          <span className="text-xs text-stone-500">
                            {job.postalCode} {job.city}
                          </span>
                        </div>
                        <h4 
                          onClick={() => openJobDetail(job.id)}
                          className="font-extrabold text-stone-900 text-lg hover:text-emerald-800 cursor-pointer"
                        >
                          {job.title}
                        </h4>
                      </div>

                      {/* New offers badge */}
                      <div className="flex items-center gap-2">
                        {newOffersCount > 0 && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold bg-blue-100 text-blue-900 border border-blue-300 animate-bounce">
                            <Sparkles className="w-3.5 h-3.5 text-blue-700" />
                            {newOffersCount} Nieuwe Offerte{newOffersCount > 1 ? 's' : ''}!
                          </span>
                        )}

                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-stone-100 text-stone-700">
                          {jobOffers.length} {jobOffers.length === 1 ? 'offerte' : 'offertes'} totaal
                        </span>
                      </div>
                    </div>

                    {/* Offers quick list with dynamic status labels */}
                    {jobOffers.length > 0 && (
                      <div className="space-y-2 pt-2 border-t border-stone-100">
                        <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                          Binnengekomen Offertes:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {jobOffers.map(o => (
                            <div
                              key={o.id}
                              onClick={() => openJobDetail(job.id)}
                              className="p-3 rounded-2xl bg-stone-50 border border-stone-200 hover:border-emerald-700 cursor-pointer transition flex items-center justify-between"
                            >
                              <div className="flex items-center gap-2.5">
                                <img src={o.performerAvatar} alt={o.performerName} className="w-8 h-8 rounded-full object-cover" />
                                <div>
                                  <div className="font-bold text-stone-900 text-xs">{o.performerName}</div>
                                  <div className="text-[10px] text-stone-500">★ {o.performerRating} • € {o.amount},-</div>
                                </div>
                              </div>

                              <div>
                                {renderStatusBadge(o.lifecycleStatus, o.seenAt)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Footer row */}
                    <div className="pt-2 flex items-center justify-between">
                      <div className="text-xs text-stone-500">
                        Status: <strong className="text-stone-800">{job.status}</strong>
                      </div>

                      <button
                        onClick={() => openJobDetail(job.id)}
                        className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5"
                      >
                        <span>Bekijk & Beoordeel Offertes</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
