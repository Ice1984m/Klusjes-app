import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/initialData';
import { 
  X, Image as ImageIcon, Upload, Plus, Trash2, MapPin, 
  Calendar, CheckCircle, ShieldAlert, Sparkles, ArrowRight 
} from 'lucide-react';

const SAMPLE_PHOTOS = [
  'https://images.unsplash.com/photo-1558904541-efa8c4a08931?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80'
];

export const JobWizardModal: React.FC = () => {
  const { 
    isJobWizardOpen, 
    closeJobWizard, 
    currentUser, 
    createJob, 
    setSubscriptionModalOpen 
  } = useApp();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Job Details
  const [category, setCategory] = useState<string>('tuin');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState(currentUser.city || 'Antwerpen');
  const [postalCode, setPostalCode] = useState(currentUser.postalCode || '2000');
  const [streetAddress, setStreetAddress] = useState('Kloosterstraat 42');
  const [targetDate, setTargetDate] = useState('Binnen 14 dagen');
  const [budgetEstimate, setBudgetEstimate] = useState<number | undefined>(undefined);
  
  // Up to 10 photos!
  const [photos, setPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1558904541-efa8c4a08931?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&auto=format&fit=crop&q=80'
  ]);

  if (!isJobWizardOpen) return null;

  // Check subscription requirement
  if (!currentUser.hasActiveSubscription && currentUser.role === 'client') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fadeIn">
        <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 text-center space-y-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shadow-xs">
            <ShieldAlert className="w-7 h-7" />
          </div>

          <h3 className="text-xl font-black text-stone-900">Actief Jaarabonnement Vereist</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Om een zoekertje te plaatsen en gesloten offertes van gescreende vakmensen te ontvangen, betaalt een opdrachtgever eenmalig <strong>€ 50,- per jaar</strong>.
          </p>

          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-left text-xs text-emerald-950 space-y-1">
            <p className="font-bold flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-700" />
              Onbeperkt klussen plaatsen gedurende 365 dagen
            </p>
            <p className="font-bold flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-700" />
              100% Escrow & 72-Uurs Kwaliteitsgarantie
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                closeJobWizard();
                setSubscriptionModalOpen(true);
              }}
              className="w-full py-3 px-4 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm rounded-xl shadow transition"
            >
              Activeer Jaarabonnement (€ 50 / jaar)
            </button>
            <button
              onClick={closeJobWizard}
              className="text-xs text-stone-500 hover:text-stone-800 font-semibold py-1.5"
            >
              Annuleren
            </button>
          </div>
        </div>
      </div>
    );
  }

  const addSamplePhoto = (url: string) => {
    if (photos.length >= 10) {
      alert('U kunt maximaal 10 foto’s toevoegen per zoekertje.');
      return;
    }
    setPhotos([...photos, url]);
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      alert('Vul een titel en omschrijving in.');
      return;
    }

    createJob({
      clientId: currentUser.id,
      clientName: currentUser.name,
      clientAvatar: currentUser.avatar,
      clientRating: currentUser.rating,
      title,
      category,
      description,
      photos,
      city,
      postalCode,
      exactAddressHidden: `${streetAddress}, ${postalCode} ${city}`,
      targetDate,
      budgetEstimate: budgetEstimate ? Number(budgetEstimate) : undefined
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-stone-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-stone-50">
          <div>
            <h3 className="font-extrabold text-stone-900 text-lg">Nieuwe Klus Plaatsen</h3>
            <p className="text-xs text-stone-500">Ontvang geheime blind-bids van betrouwbare vakmensen</p>
          </div>
          <button
            onClick={closeJobWizard}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Progress Steps */}
        <div className="px-6 py-3 bg-stone-100/60 border-b border-stone-200/60 flex items-center justify-between text-xs">
          <div className={`flex items-center gap-2 font-bold ${step >= 1 ? 'text-emerald-800' : 'text-stone-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step >= 1 ? 'bg-emerald-800 text-white' : 'bg-stone-300 text-stone-600'}`}>1</span>
            <span>Categorie & Beschrijving</span>
          </div>
          <div className="h-0.5 flex-1 mx-3 bg-stone-200" />
          <div className={`flex items-center gap-2 font-bold ${step >= 2 ? 'text-emerald-800' : 'text-stone-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step >= 2 ? 'bg-emerald-800 text-white' : 'bg-stone-300 text-stone-600'}`}>2</span>
            <span>Foto's ({photos.length}/10)</span>
          </div>
          <div className="h-0.5 flex-1 mx-3 bg-stone-200" />
          <div className={`flex items-center gap-2 font-bold ${step >= 3 ? 'text-emerald-800' : 'text-stone-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step >= 3 ? 'bg-emerald-800 text-white' : 'bg-stone-300 text-stone-600'}`}>3</span>
            <span>Locatie & Publicatie</span>
          </div>
        </div>

        {/* Wizard Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
                  Selecteer Categorie *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {CATEGORIES.map(cat => {
                    const isSelected = category === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setCategory(cat.id)}
                        className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1.5 ${
                          isSelected
                            ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-bold shadow-xs'
                            : 'border-stone-200 hover:border-stone-300 text-stone-700 bg-white'
                        }`}
                      >
                        <span className="text-xs leading-tight line-clamp-1">{cat.nameNl}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  Korte, duidelijke titel van het werk *
                </label>
                <input
                  type="text"
                  required
                  placeholder="bv. Hagen snoeien (30m) & snoeiafval meenemen"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:ring-2 focus:ring-emerald-600/30 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  Gedetailleerde taakomschrijving *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Beschrijf de huidige staat, geschatte afmetingen, gewenste materialen en eventuele bijzonderheden..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-600/30 focus:outline-none leading-relaxed"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  disabled={!title || !description}
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5 disabled:opacity-50"
                >
                  <span>Volgende: Foto's toevoegen</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">Foto's van de situatie (Max. 10)</h4>
                  <p className="text-xs text-stone-500">
                    Goede foto's zorgen voor snellere en nauwkeurigere offertes.
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                  {photos.length} / 10 foto's
                </span>
              </div>

              {/* Photo grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {photos.map((url, i) => (
                  <div key={i} className="relative aspect-video rounded-xl overflow-hidden border border-stone-200 group shadow-xs">
                    <img src={url} alt={`Klus foto ${i + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removePhoto(i)}
                      className="absolute top-1.5 right-1.5 p-1 bg-red-600/90 text-white rounded-md opacity-80 group-hover:opacity-100 transition"
                      title="Verwijder foto"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <span className="absolute bottom-1 left-1.5 text-[10px] text-white font-bold bg-black/60 px-1 rounded">
                      #{i + 1}
                    </span>
                  </div>
                ))}
              </div>

              {/* Quick sample photo selector (SRS friendly) */}
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200">
                <div className="text-xs font-bold text-stone-700 mb-2 flex items-center justify-between">
                  <span>Klik op voorbeeld-foto's om toe te voegen:</span>
                  <span className="text-[10px] text-stone-400">JPG, PNG, HEIC gecomprimeerd</span>
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {SAMPLE_PHOTOS.map((sampleUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => addSamplePhoto(sampleUrl)}
                      className="w-16 h-12 rounded-lg overflow-hidden border border-stone-300 shrink-0 hover:scale-105 transition hover:border-emerald-600"
                    >
                      <img src={sampleUrl} alt="sample" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 border border-stone-300 text-stone-700 text-xs font-bold rounded-xl"
                >
                  Terug
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5"
                >
                  <span>Volgende: Locatie & Planning</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Postcode *
                  </label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={e => setPostalCode(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Gemeente / Stad *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm"
                  />
                </div>
              </div>

              {/* Exact address notice */}
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 space-y-1.5">
                <label className="block text-xs font-bold text-stone-800">
                  Exacte straat & huisnummer (Beveiligd) *
                </label>
                <input
                  type="text"
                  required
                  value={streetAddress}
                  onChange={e => setStreetAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm bg-white"
                />
                <p className="text-[11px] text-stone-500">
                  🔒 <strong>Privacygarantie:</strong> Uw straat en huisnummer worden pas gedeeld met de vakman nadat u diens offerte accepteert en de betaling in escrow staat.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Gewenste uitvoertermijn
                  </label>
                  <select
                    value={targetDate}
                    onChange={e => setTargetDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white"
                  >
                    <option value="Zo snel mogelijk (Met spoed)">Zo snel mogelijk (Met spoed)</option>
                    <option value="Binnen 7 dagen">Binnen 7 dagen</option>
                    <option value="Binnen 14 dagen">Binnen 14 dagen</option>
                    <option value="In overleg komende maand">In overleg komende maand</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Richtbudget (€ optioneel)
                  </label>
                  <input
                    type="number"
                    placeholder="bv. 200"
                    value={budgetEstimate || ''}
                    onChange={e => setBudgetEstimate(e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs"
                  />
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <p>
                  <strong>Blind-Bidding Actief:</strong> Vakmensen zien elkaars prijzen niet. U ontvangt uitsluitend eerlijke, ongecensureerde voorstellen direct in uw inbox.
                </p>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 border border-stone-300 text-stone-700 text-xs font-bold rounded-xl"
                >
                  Terug
                </button>

                <button
                  type="submit"
                  className="px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm rounded-xl shadow transition"
                >
                  Plaats Zoekertje Nu
                </button>
              </div>

            </form>
          )}

        </div>
      </div>
    </div>
  );
};
