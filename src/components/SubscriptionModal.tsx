import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Check, Sparkles, CreditCard, Lock, X, AlertCircle } from 'lucide-react';

export const SubscriptionModal: React.FC = () => {
  const { isSubscriptionModalOpen, setSubscriptionModalOpen, currentUser, purchaseSubscription } = useApp();
  const [paymentMethod, setPaymentMethod] = useState<'bancontact' | 'card' | 'ideal'>('bancontact');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isSubscriptionModalOpen) return null;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      purchaseSubscription(currentUser.id);
      setIsProcessing(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-br from-emerald-900 to-emerald-800 text-white p-6 relative">
          <button
            onClick={() => setSubscriptionModalOpen(false)}
            className="absolute top-4 right-4 p-1.5 text-emerald-200 hover:text-white rounded-full bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 bg-amber-400/20 text-amber-300 rounded-lg">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
              KlusGarant Opdrachtgever Pas
            </span>
          </div>

          <h3 className="text-2xl font-black tracking-tight">Jaarabonnement Klussen</h3>
          <p className="text-xs text-emerald-100 mt-1">
            Plaats 1 heel jaar onbeperkt klussen met gegarandeerde 72-uurs escrow bescherming.
          </p>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-black">€ 50,-</span>
            <span className="text-xs text-emerald-200">/ jaar (inclusief BTW)</span>
          </div>
        </div>

        {/* Perks */}
        <div className="p-6 space-y-4">
          <div className="space-y-2.5 text-xs text-stone-700">
            <div className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 font-bold" />
              </div>
              <div>
                <strong className="text-stone-900">Onbeperkt klussen plaatsen:</strong> Tuin, schilderwerk, elektriciteit, sanitair en meer.
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 font-bold" />
              </div>
              <div>
                <strong className="text-stone-900">Geheime Blind-Bidding offertes:</strong> Vakmensen concurreren eerlijk op kwaliteit en prijs zonder onderlinge prijsafspraken.
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 font-bold" />
              </div>
              <div>
                <strong className="text-stone-900">100% Escrow & 72-Uurs Garantie:</strong> Uw geld staat veilig vast; vakman krijgt pas uitbetaald na uw definitieve goedkeuring.
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 font-bold" />
              </div>
              <div>
                <strong className="text-stone-900">Geverifieerde ID & BTW-profielen:</strong> Samenwerken met echte, gecontroleerde particulieren en aannemers.
              </div>
            </div>
          </div>

          {/* Stripe Payment selection */}
          <div className="pt-3 border-t border-stone-200">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
              Selecteer Betaalmethode (Stripe)
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('bancontact')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold text-center transition ${
                  paymentMethod === 'bancontact'
                    ? 'border-emerald-700 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-700'
                    : 'border-stone-200 hover:border-stone-300 text-stone-700'
                }`}
              >
                🇧🇪 Bancontact
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold text-center transition ${
                  paymentMethod === 'card'
                    ? 'border-emerald-700 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-700'
                    : 'border-stone-200 hover:border-stone-300 text-stone-700'
                }`}
              >
                💳 Visa / Master
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('ideal')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold text-center transition ${
                  paymentMethod === 'ideal'
                    ? 'border-emerald-700 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-700'
                    : 'border-stone-200 hover:border-stone-300 text-stone-700'
                }`}
              >
                🇳🇱 iDEAL
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-stone-50 rounded-xl border border-stone-200 text-stone-500 text-[11px]">
            <Lock className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>Beveiligde SSL 256-bit Stripe Checkout transactie. Direct actief.</span>
          </div>

          {/* Action button */}
          <button
            onClick={handlePay}
            disabled={isProcessing}
            className="w-full py-3.5 px-4 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm rounded-2xl shadow-md transition flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Stripe Verwerking...
              </span>
            ) : (
              <span>Betaal € 50,- via Stripe & Activeer Direct</span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
