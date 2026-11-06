import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, FileText, Lock, AlertTriangle, CheckCircle2, X } from 'lucide-react';

export const LegalModals: React.FC = () => {
  const { isLegalTermsOpen, isLegalPrivacyOpen, setLegalTermsOpen, setLegalPrivacyOpen } = useApp();

  return (
    <>
      {/* GEBRUIKSVOORWAARDEN MODAL */}
      {isLegalTermsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-stone-200">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-stone-100 bg-stone-50">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-lg">Algemene Gebruiksvoorwaarden</h3>
                  <p className="text-xs text-stone-500">KlusGarant Platform • Versie 2026.3</p>
                </div>
              </div>
              <button
                onClick={() => setLegalTermsOpen(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto space-y-5 text-sm text-stone-700 leading-relaxed">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex gap-3 text-emerald-950">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-xs uppercase tracking-wider text-emerald-800">Wettelijke Transparantie</p>
                  <p className="text-xs text-emerald-900 mt-0.5">
                    Dit document regelt de rechten en plichten tussen opdrachtgevers, uitvoerders en KlusGarant conform het Belgische Wetboek van Economisch Recht en de Europese platformrichtlijnen (DAC7).
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-stone-900 text-base mb-1.5 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-stone-200 text-stone-700 text-xs flex items-center justify-center font-bold">1</span>
                  De 72-Uurs Escrow Garantie & Betalingsverloop
                </h4>
                <p className="text-stone-600 text-xs">
                  Alle betalingen voor geaccepteerde klussen worden vooraf via onze gecertificeerde betaalpartner (Stripe) in een beveiligd depot (escrow) gereserveerd. Nadat de vakman of vakvrouw in de mobiele app meldt dat de klus is voltooid, start automatisch een inspectietermijn van <strong>72 uur</strong>.
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-xs text-stone-600">
                  <li><strong>Optie A:</strong> De opdrachtgever inspecteert het werk en keurt dit direct goed in de app. Het bedrag wordt meteen vrijgegeven.</li>
                  <li><strong>Optie B:</strong> Indien de opdrachtgever binnen de termijn van 72 uur niet reageert, wordt de betaling na exact 72 uur automatisch overgemaakt aan de uitvoerder.</li>
                  <li><strong>Optie C:</strong> Bij gegronde gebreken meldt de opdrachtgever binnen 72 uur een geschil met fotobewijs. De klok wordt onmiddellijk bevroren tot tussenkomst van het KlusGarant arbitrage-team.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-stone-900 text-base mb-1.5 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-stone-200 text-stone-700 text-xs flex items-center justify-center font-bold">2</span>
                  Platformcommissie (10%) & Klant-Abonnement (€ 50/jaar)
                </h4>
                <p className="text-stone-600 text-xs">
                  Uitvoerders registreren gratis. Bij iedere succesvol voltooide en goedgekeurde klus houdt KlusGarant een vaste platformprovisie van <strong>10%</strong> in op het aangenomen offertebedrag ter dekking van betalingsverwerking, verzekering en platformonderhoud. 90% wordt direct uitbetaald aan de vakman.
                </p>
                <p className="text-stone-600 text-xs mt-1.5">
                  Opdrachtgevers (klanten) betalen een jaarlijks abonnement van <strong>€ 50,- inclusief BTW</strong> voor onbeperkte plaatsing van zoekertjes, toegang tot gescreende vakmensen en escrow-garantie. Zodra een eerste zoekertje is gepubliceerd, vervalt het herroepingsrecht.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-stone-900 text-base mb-1.5 flex items-center gap-2 text-amber-900">
                  <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 text-xs flex items-center justify-center font-bold">3</span>
                  Anti-omzeilingsbeding (Verbod op zwartwerk buiten de app)
                </h4>
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950">
                  <p>
                    Het is gebruikers ten strengste verboden om contactgegevens (telefoonnummers, IBAN-nummers, privégroepen) uit te wisselen met als doel de klus buiten het platform om contant of rechtstreeks af te rekenen.
                  </p>
                  <p className="mt-1 font-semibold text-amber-900">
                    Overtreding leidt tot onmiddellijke schorsing van het account, verlies van escrow-garanties en een forfaitaire contractuele schadevergoeding van € 500,- per geconstateerde overtreding.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-stone-900 text-base mb-1.5 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-stone-200 text-stone-700 text-xs flex items-center justify-center font-bold">4</span>
                  Aansprakelijkheid & Statuten
                </h4>
                <p className="text-stone-600 text-xs">
                  KlusGarant treedt op als neutrale marktplaats en bemiddelende tussenpersoon. Uitvoerders werken onder eigen verantwoordelijkheid als erkende particulier (Belgische deeleconomiewet), zelfstandige in bijberoep of zelfstandige in hoofdberoep en zijn zelf verantwoordelijk voor hun burgerlijke aansprakelijkheid en fiscale verplichtingen.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-stone-100 bg-stone-50 flex justify-end">
              <button
                onClick={() => setLegalTermsOpen(false)}
                className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-semibold rounded-xl shadow transition"
              >
                Ik begrijp en accepteer de voorwaarden
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PRIVACYBELEID MODAL (AVG / GDPR) */}
      {isLegalPrivacyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-stone-200">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-stone-100 bg-stone-50">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center text-blue-800">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-lg">Privacybeleid & Gegevensbescherming (AVG/GDPR)</h3>
                  <p className="text-xs text-stone-500">Conform de Europese Algemene Verordening Gegevensbescherming</p>
                </div>
              </div>
              <button
                onClick={() => setLegalPrivacyOpen(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto space-y-5 text-sm text-stone-700 leading-relaxed">
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 flex gap-3 text-blue-950">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-xs text-blue-900 leading-relaxed">
                  Uw privacy en persoonsgegevens worden beschermd volgens de strengste Europese normen. Wij verkopen nooit persoonsgegevens aan derden en hanteren strikte doelbinding.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-stone-900 text-sm mb-1">
                  1. Doelbinding van Identiteitskaart en Rijksregisternummer
                </h4>
                <p className="text-stone-600 text-xs">
                  Het opvragen van uw identiteitskaart, volledige naam, domicilie en Rijksregisternummer dient uitsluitend voor:
                </p>
                <ul className="list-disc pl-5 mt-1.5 space-y-1 text-xs text-stone-600">
                  <li><strong>Identiteitsverificatie & veiligheid:</strong> Om veilige interacties te garanderen en identiteitsfraude uit te sluiten via gecertificeerde KYC-partners (zoals Itsme / Veriff).</li>
                  <li><strong>Fiscale rapportage deeleconomie (Belgische wetgeving):</strong> Voor particulieren die bijverdienen via het gunstregime van de deeleconomie is KlusGarant wettelijk verplicht de jaarlijkse inkomsten te rapporteren aan de FOD Financiën (fiche 281.45 / DAC7 richtlijn).</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-stone-900 text-sm mb-1">
                  2. Afscherming van Adresgegevens & Blind Bidding
                </h4>
                <p className="text-stone-600 text-xs">
                  Om uw privacy en woningveiligheid te waarborgen, wordt bij openbare zoekertjes uitsluitend de postcode en gemeente getoond. Het exacte huisnummer en straatnaam worden pas zichtbaar voor de uitvoerder nadat de offerte definitief is aanvaard en de betaling in escrow is geplaatst.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-stone-900 text-sm mb-1">
                  3. Verwerkers & Beveiligde Betalingen
                </h4>
                <p className="text-stone-600 text-xs">
                  Financiële transacties worden veilig verwerkt via <strong>Stripe Connect</strong> (PCI-DSS Level 1 gecertificeerd). KlusGarant slaat geen creditcardnummers of gevoelige bankgegevens op eigen servers op.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-stone-900 text-sm mb-1">
                  4. Uw Rechten (Inzage, Correctie & Verwijdering)
                </h4>
                <p className="text-stone-600 text-xs">
                  U heeft te allen tijde het recht op inzage in uw dossier, correctie van onjuiste gegevens en het indienen van een verzoek tot gegevenswissing, met uitzondering van gegevens die om wettelijke bewaarplichten (boekhouding en fiscale fiches) behouden dienen te blijven.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-stone-100 bg-stone-50 flex justify-end">
              <button
                onClick={() => setLegalPrivacyOpen(false)}
                className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold rounded-xl shadow transition"
              >
                Sluiten
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
