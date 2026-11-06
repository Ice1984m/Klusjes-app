import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, AlertTriangle, Scale, CheckCircle2, 
  XCircle, Eye, Users, FileText, ArrowRight, DollarSign, Lock, Building2 
} from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const { 
    jobs, 
    offers, 
    disputes, 
    transactions, 
    users, 
    resolveDispute, 
    verifyUserKyc, 
    openJobDetail,
    openChat
  } = useApp();

  const [activeTab, setActiveTab] = useState<'disputes' | 'offers' | 'kyc'>('disputes');
  const [selectedDisputeId, setSelectedDisputeId] = useState<string | null>(null);
  const [arbitrationNotes, setArbitrationNotes] = useState('');

  // Financial calculations
  const totalVolume = transactions.reduce((acc, t) => acc + t.totalAmount, 0);
  const totalPlatformFees = transactions.reduce((acc, t) => acc + t.platformFee, 0);
  const inEscrowBalance = transactions
    .filter(t => t.status === 'in_escrow' || t.status === 'frozen_in_dispute')
    .reduce((acc, t) => acc + t.totalAmount, 0);

  const openDisputesList = disputes.filter(d => d.status === 'open');

  const handleResolve = (disputeId: string, resolution: 'payout' | 'refund' | 'split') => {
    resolveDispute(disputeId, resolution, arbitrationNotes || 'Arbitrage afgerond door KlusGarant beheerder.');
    setArbitrationNotes('');
    setSelectedDisputeId(null);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Admin Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              KlusGarant Beheerdersportaal
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mt-1">
            Platform Toezicht & Arbitrage
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 bg-emerald-100 text-emerald-900 rounded-full flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            Live Escrow Systeem Actief
          </span>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1">
            Totaal Escrow Volume
          </span>
          <div className="text-2xl sm:text-3xl font-black text-stone-900">
            € {totalVolume.toLocaleString('nl-BE')}
          </div>
          <p className="text-[11px] text-stone-400 mt-0.5">Alle aangenomen opdrachten</p>
        </div>

        <div className="bg-emerald-900 text-white p-5 rounded-2xl shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-200 block mb-1">
            Platformcommissie (10%)
          </span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400">
            € {totalPlatformFees.toLocaleString('nl-BE')}
          </div>
          <p className="text-[11px] text-emerald-200/70 mt-0.5">Rechtstreeks ingehouden opbrengst</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1 flex items-center gap-1">
            <Lock className="w-3.5 h-3.5 text-blue-600" />
            <span>Vast in Depot</span>
          </span>
          <div className="text-2xl sm:text-3xl font-black text-blue-900">
            € {inEscrowBalance.toLocaleString('nl-BE')}
          </div>
          <p className="text-[11px] text-stone-400 mt-0.5">Onder 72u inspectie of in uitvoering</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
            <span>Open Geschillen</span>
          </span>
          <div className="text-2xl sm:text-3xl font-black text-red-700">
            {openDisputesList.length}
          </div>
          <p className="text-[11px] text-stone-400 mt-0.5">Vereisen beheerderstussenkomst</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-200 space-x-6 text-sm font-bold">
        <button
          onClick={() => setActiveTab('disputes')}
          className={`pb-3 relative transition flex items-center gap-2 ${
            activeTab === 'disputes' ? 'text-emerald-800' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>Geschillenbeheer ({openDisputesList.length})</span>
          {activeTab === 'disputes' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-800 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('offers')}
          className={`pb-3 relative transition flex items-center gap-2 ${
            activeTab === 'offers' ? 'text-emerald-800' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>Alle Blind-Bids Controleren ({offers.length})</span>
          {activeTab === 'offers' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-800 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('kyc')}
          className={`pb-3 relative transition flex items-center gap-2 ${
            activeTab === 'kyc' ? 'text-emerald-800' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>ID- & BTW-Verificaties ({users.length})</span>
          {activeTab === 'kyc' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-800 rounded-full" />
          )}
        </button>
      </div>

      {/* TAB 1: DISPUTES MANAGEMENT */}
      {activeTab === 'disputes' && (
        <div className="space-y-4">
          {disputes.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl border border-stone-200 text-center text-xs text-stone-400">
              Geen geschillen geregistreerd. Alle opdrachten verlopen vlekkeloos!
            </div>
          ) : (
            disputes.map(dispute => {
              const isOpen = dispute.status === 'open';

              return (
                <div key={dispute.id} className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-red-100 text-red-800 flex items-center justify-center shrink-0">
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-stone-900 text-base">{dispute.jobTitle}</h4>
                        <p className="text-xs text-stone-500">
                          Klant: <strong>{dispute.clientName}</strong> • Vakman: <strong>{dispute.performerName}</strong>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-xs text-stone-400 block">Geblokkeerd Escrow</span>
                        <span className="text-lg font-black text-red-700">€ {dispute.amount},-</span>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        isOpen ? 'bg-red-100 text-red-800' : 'bg-stone-100 text-stone-700'
                      }`}>
                        {isOpen ? 'Open Bezwaar' : `Opgelost: ${dispute.status}`}
                      </span>
                    </div>
                  </div>

                  {/* Grievance text & photos */}
                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-800 space-y-2">
                    <span className="font-bold uppercase tracking-wider text-stone-500 block">
                      Toelichting van de klant:
                    </span>
                    <p className="leading-relaxed whitespace-pre-line italic">
                      "{dispute.reason}"
                    </p>

                    {dispute.evidencePhotos && dispute.evidencePhotos.length > 0 && (
                      <div className="pt-2">
                        <span className="font-bold text-stone-600 block mb-1">Fotobewijs:</span>
                        <div className="flex gap-2">
                          {dispute.evidencePhotos.map((url, i) => (
                            <img key={i} src={url} alt="Evidence" className="w-20 h-16 rounded-xl object-cover border border-stone-300" />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Arbitration Action Buttons */}
                  {isOpen ? (
                    <div className="pt-2 border-t border-stone-100 space-y-3">
                      <textarea
                        rows={2}
                        placeholder="Voeg admin-beoordeling of schikkingsnotities toe..."
                        value={selectedDisputeId === dispute.id ? arbitrationNotes : ''}
                        onChange={e => {
                          setSelectedDisputeId(dispute.id);
                          setArbitrationNotes(e.target.value);
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                      />

                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <button
                          onClick={() => openChat(dispute.jobId)}
                          className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs rounded-xl transition"
                        >
                          Bekijk Chatgeschiedenis
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleResolve(dispute.id, 'refund')}
                            className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-900 font-bold text-xs rounded-xl transition"
                          >
                            100% Terugbetalen aan Klant
                          </button>

                          <button
                            onClick={() => handleResolve(dispute.id, 'split')}
                            className="px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs rounded-xl transition"
                          >
                            50/50 Schikking Toepassen
                          </button>

                          <button
                            onClick={() => handleResolve(dispute.id, 'payout')}
                            className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow transition"
                          >
                            Vrijgeven aan Vakman (90%)
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-stone-100 rounded-xl text-xs text-stone-600">
                      <strong>Admin besluit:</strong> {dispute.adminNotes}
                    </div>
                  )}

                </div>
              );
            })
          )}
        </div>
      )}

      {/* TAB 2: ALL BLIND-BIDS TRANSPARENCY (SRS Requirement: Admin sees all bids) */}
      {activeTab === 'offers' && (
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="p-5 border-b border-stone-100 flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-stone-900 text-base">Alle Ingediende Offertes</h3>
              <p className="text-xs text-stone-500">Volledige transparantie voor commissieberekening en eerlijke concurrentie</p>
            </div>
            <span className="text-xs font-bold px-3 py-1 bg-stone-100 text-stone-700 rounded-full">
              {offers.length} offertes
            </span>
          </div>

          <div className="divide-y divide-stone-100">
            {offers.map(offer => {
              const targetJob = jobs.find(j => j.id === offer.jobId);
              const fee10 = (offer.amount * 0.10).toFixed(2);
              const net90 = (offer.amount * 0.90).toFixed(2);

              return (
                <div key={offer.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-stone-50/50 transition">
                  <div className="flex items-start gap-3">
                    <img src={offer.performerAvatar} alt={offer.performerName} className="w-10 h-10 rounded-full object-cover border border-stone-200 shrink-0" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-900 text-sm">{offer.performerName}</span>
                        {offer.performerVatNumber ? (
                          <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                            BTW: {offer.performerVatNumber}
                          </span>
                        ) : (
                          <span className="text-[10px] font-semibold bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded">
                            Particulier
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-600 mt-0.5">
                        Klus: <strong>{targetJob?.title || offer.jobId}</strong>
                      </p>
                      <p className="text-xs text-stone-500 italic mt-1 line-clamp-1">
                        "{offer.message}"
                      </p>
                    </div>
                  </div>

                  <div className="text-right sm:text-right shrink-0">
                    <div className="text-lg font-black text-stone-900">
                      € {offer.amount},-
                    </div>
                    <div className="text-[11px] text-stone-500">
                      10% commissie: <strong className="text-emerald-800">€ {fee10}</strong> • Netto: € {net90}
                    </div>
                    <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      offer.status === 'accepted' ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-600'
                    }`}>
                      {offer.status === 'accepted' ? 'Geaccepteerd' : 'In Beraad'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: KYC & ID VERIFICATIONS */}
      {activeTab === 'kyc' && (
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="p-5 border-b border-stone-100">
            <h3 className="font-extrabold text-stone-900 text-base">Identiteits- & Statuutcontrole</h3>
            <p className="text-xs text-stone-500">Rijksregisternummers, eID checks en VIES BTW validatie</p>
          </div>

          <div className="divide-y divide-stone-100">
            {users.map(u => (
              <div key={u.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={u.avatar} alt={u.name} className="w-11 h-11 rounded-full object-cover border border-stone-200 shrink-0" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-900 text-sm">{u.name}</span>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
                        {u.role}
                      </span>
                    </div>
                    <div className="text-xs text-stone-500 mt-0.5">
                      {u.email} • {u.city}
                    </div>
                    {u.nationalRegisterNumber && (
                      <div className="text-[11px] text-stone-400 font-mono mt-0.5">
                        Rijksregister: {u.nationalRegisterNumber}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs font-bold block text-stone-700">
                      {u.idVerified ? (
                        <span className="text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> eID Geverifieerd
                        </span>
                      ) : (
                        <span className="text-amber-700 flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" /> Verificatie Nodig
                        </span>
                      )}
                    </span>
                    {u.vatNumber && (
                      <span className="text-[11px] font-mono text-stone-500">
                        BTW: {u.vatNumber}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => verifyUserKyc(u.id, !u.idVerified)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition ${
                      u.idVerified
                        ? 'border-stone-300 text-stone-600 hover:bg-stone-100'
                        : 'border-emerald-700 bg-emerald-800 text-white hover:bg-emerald-900'
                    }`}
                  >
                    {u.idVerified ? 'Herroepen' : 'Goedkeuren'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
