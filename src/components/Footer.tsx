import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Lock, CheckCircle2, FileText, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setLegalTermsOpen, setLegalPrivacyOpen, setSubscriptionModalOpen } = useApp();

  return (
    <footer className="mt-16 bg-white border-t border-stone-200">
      
      {/* Trust Badges Bar */}
      <div className="bg-stone-50 border-b border-stone-200 py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="flex flex-col items-center p-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mb-1.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h5 className="font-bold text-xs text-stone-900">72-Uurs Escrow Garantie</h5>
            <p className="text-[11px] text-stone-500">Pas uitbetalen na kwaliteitscontrole</p>
          </div>

          <div className="flex flex-col items-center p-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mb-1.5">
              <Lock className="w-4 h-4" />
            </div>
            <h5 className="font-bold text-xs text-stone-900">Stripe Connect Beveiligd</h5>
            <p className="text-[11px] text-stone-500">PCI-DSS Level 1 betalingen</p>
          </div>

          <div className="flex flex-col items-center p-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mb-1.5">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h5 className="font-bold text-xs text-stone-900">Blind-Bidding Systeem</h5>
            <p className="text-[11px] text-stone-500">Geen oneerlijke prijsdumping</p>
          </div>

          <div className="flex flex-col items-center p-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mb-1.5">
              <FileText className="w-4 h-4" />
            </div>
            <h5 className="font-bold text-xs text-stone-900">AVG / GDPR & Deeleconomie</h5>
            <p className="text-[11px] text-stone-500">100% wettelijk conform België</p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand column */}
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-black text-sm">
              KG
            </div>
            <span className="text-lg font-black text-stone-900">KlusGarant</span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Hét betrouwbare twee-zijdige dienstenplatform voor particulieren, zelfstandigen in bijberoep en hoofdberoep in Vlaanderen en Brussel.
          </p>
          <div className="text-[11px] text-stone-400">
            © 2026 KlusGarant BV • Ondernemingsnummer: BE 0987.654.321
          </div>
        </div>

        {/* Column 2: Voor Opdrachtgevers */}
        <div className="space-y-2 text-xs">
          <h5 className="font-bold uppercase tracking-wider text-stone-900">Voor Opdrachtgevers</h5>
          <ul className="space-y-1.5 text-stone-600">
            <li>
              <button onClick={() => setSubscriptionModalOpen(true)} className="hover:text-emerald-800 text-left">
                Jaarabonnement (€ 50/jaar)
              </button>
            </li>
            <li>Hoe werkt de 72-uurs escrow?</li>
            <li>Geverifieerde vakmensen in de buurt</li>
            <li>Geschillenbeslechting & Garantie</li>
          </ul>
        </div>

        {/* Column 3: Voor Vakmensen */}
        <div className="space-y-2 text-xs">
          <h5 className="font-bold uppercase tracking-wider text-stone-900">Voor Vakmensen</h5>
          <ul className="space-y-1.5 text-stone-600">
            <li>100% Gratis registreren</li>
            <li>Particulier bijverdienen (Deeleconomie)</li>
            <li>Zelfstandige in bijberoep met BTW</li>
            <li>10% commissie per aangenomen klus</li>
            <li>Stripe Connect uitbetalingen</li>
          </ul>
        </div>

        {/* Column 4: Juridisch & Privacy (SRS requirement) */}
        <div className="space-y-2 text-xs">
          <h5 className="font-bold uppercase tracking-wider text-stone-900">Juridisch & Privacy</h5>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setLegalTermsOpen(true)}
                className="text-emerald-800 hover:text-emerald-950 font-semibold underline underline-offset-2 text-left"
              >
                Algemene Gebruiksvoorwaarden
              </button>
            </li>
            <li>
              <button
                onClick={() => setLegalPrivacyOpen(true)}
                className="text-emerald-800 hover:text-emerald-950 font-semibold underline underline-offset-2 text-left"
              >
                Privacybeleid (AVG / GDPR)
              </button>
            </li>
            <li className="text-stone-500 text-[11px]">
              Anti-omzeilingsbeleid (zwartwerkverbod)
            </li>
            <li className="text-stone-500 text-[11px]">
              Fiscale fiche 281.45 (Deeleconomie FOD Financiën)
            </li>
          </ul>
        </div>

      </div>

    </footer>
  );
};
