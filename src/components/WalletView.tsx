import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Wallet, ArrowUpRight, Clock, ShieldCheck, CheckCircle2, 
  Building2, Lock, ArrowDownRight, Sparkles 
} from 'lucide-react';

export const WalletView: React.FC = () => {
  const { currentUser, transactions } = useApp();
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  // Filter transactions for this user
  const userTx = transactions.filter(t => 
    currentUser.role === 'performer' ? t.performerId === currentUser.id : t.clientId === currentUser.id
  );

  const handleWithdraw = () => {
    if (currentUser.walletBalance <= 0) {
      alert('Er is geen beschikbaar saldo om over te boeken.');
      return;
    }
    setIsWithdrawing(true);
    setTimeout(() => {
      setIsWithdrawing(false);
      setWithdrawSuccess(true);
      setTimeout(() => setWithdrawSuccess(false), 4000);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Wallet Header Card */}
      <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 bg-emerald-500/20 text-emerald-300 rounded-lg">
                <Wallet className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                Stripe Connect Wallet
              </span>
            </div>
            <h2 className="text-3xl font-black tracking-tight">Financieel Overzicht</h2>
            <p className="text-xs text-emerald-200/80 mt-0.5">
              Veilige uitbetalingen en escrow-buffer beheer
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1.5 bg-white/10 rounded-xl backdrop-blur-md flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>10% Platformfee Verrekend</span>
            </span>
          </div>
        </div>

        {/* Balance cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 relative z-10">
          
          {/* Available balance */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15">
            <span className="text-xs font-semibold text-emerald-200 uppercase tracking-wider block mb-1">
              Beschikbaar Saldo (Direct Uitbetaalbaar)
            </span>
            <div className="text-3xl sm:text-4xl font-black">
              € {currentUser.walletBalance.toFixed(2)}
            </div>
            <p className="text-[11px] text-emerald-200/70 mt-1">
              Goedgekeurde klussen na 72-uurs kwaliteitsinspectie.
            </p>

            <button
              onClick={handleWithdraw}
              disabled={isWithdrawing || currentUser.walletBalance <= 0}
              className="mt-4 w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs rounded-xl transition shadow flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              {isWithdrawing ? (
                <span>Overmaken naar IBAN...</span>
              ) : (
                <>
                  <ArrowUpRight className="w-4 h-4" />
                  <span>Uitbetalen naar Bankrekening (BE 76 0012 ...)</span>
                </>
              )}
            </button>
          </div>

          {/* Pending Escrow */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10">
            <span className="text-xs font-semibold text-stone-300 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Gereserveerd in Escrow Buffer</span>
            </span>
            <div className="text-3xl sm:text-4xl font-black text-amber-300">
              € {currentUser.pendingEscrowBalance.toFixed(2)}
            </div>
            <p className="text-[11px] text-stone-300/80 mt-1">
              Staat 100% veilig gereserveerd. Wordt vrijgegeven na voltooiing & 72u inspectie.
            </p>

            <div className="mt-4 p-2.5 rounded-xl bg-black/20 text-[11px] text-stone-300 flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Beschermd tegen wanbetaling door KlusGarant Escrow</span>
            </div>
          </div>

        </div>

        {withdrawSuccess && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-400 text-emerald-100 text-xs font-bold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Uitbetalingsverzoek van € {currentUser.walletBalance.toFixed(2)} succesvol ingediend bij Stripe! Staat binnen 24u op uw rekening.</span>
          </div>
        )}
      </div>

      {/* 10% Fee Explanation Banner (SRS Requirement) */}
      <div className="p-4 rounded-2xl bg-stone-100 border border-stone-200 text-xs text-stone-700 space-y-1.5">
        <h4 className="font-bold text-stone-900 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-emerald-700" />
          Hoe werkt de 10% platformcommissie?
        </h4>
        <p className="leading-relaxed">
          Bij KlusGarant betaalt de vakman <strong>geen maandelijks abonnementsgeld</strong> en is bieden altijd gratis. Alleen wanneer een klus definitief wordt binnengehaald, voltooid en goedgekeurd, houdt het platform automatisch <strong>10% commissie</strong> in. De overige <strong>90%</strong> is zuivere inkomst voor de vakman.
        </p>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="p-5 border-b border-stone-100 flex items-center justify-between">
          <h3 className="font-extrabold text-stone-900 text-base">Transactie- & Escrowhistorie</h3>
          <span className="text-xs font-semibold text-stone-500">{userTx.length} transacties</span>
        </div>

        {userTx.length === 0 ? (
          <div className="p-8 text-center text-stone-400 text-xs">
            Nog geen transacties geregistreerd.
          </div>
        ) : (
          <div className="divide-y divide-stone-100">
            {userTx.map(tx => (
              <div key={tx.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-stone-50/50 transition">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    tx.status === 'released' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : tx.status === 'frozen_in_dispute'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {tx.status === 'released' ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : tx.status === 'frozen_in_dispute' ? (
                      <Lock className="w-5 h-5" />
                    ) : (
                      <Clock className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">{tx.jobTitle}</h4>
                    <p className="text-xs text-stone-500">
                      Opdrachtgever: {tx.clientName} • Uitvoerder: {tx.performerName}
                    </p>
                    <div className="text-[11px] text-stone-400 mt-0.5">
                      {new Date(tx.paidAt).toLocaleDateString('nl-BE')} • ID: {tx.id}
                    </div>
                  </div>
                </div>

                {/* Numbers breakdown */}
                <div className="text-right sm:text-right">
                  <div className="text-base font-black text-stone-900">
                    Totaal: € {tx.totalAmount},-
                  </div>
                  <div className="text-xs text-stone-500">
                    10% fee: <span className="text-stone-700 font-medium">€ {tx.platformFee}</span> • Netto: <span className="font-bold text-emerald-800">€ {tx.performerPayout}</span>
                  </div>
                  <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    tx.status === 'released'
                      ? 'bg-emerald-100 text-emerald-800'
                      : tx.status === 'frozen_in_dispute'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {tx.status === 'released' && 'Uitbetaald aan vakman'}
                    {tx.status === 'in_escrow' && 'In Escrow (72u Inspectie)'}
                    {tx.status === 'frozen_in_dispute' && 'Bevroren wegens geschil'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
