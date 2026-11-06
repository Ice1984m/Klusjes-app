import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/initialData';
import { UserRole, PerformerStatus } from '../types';
import { 
  Eye, EyeOff, ShieldCheck, Check, Sparkles, Building2, User as UserIcon, 
  Upload, Camera, Globe, X, AlertCircle, ArrowRight, CheckCircle2 
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    authModalMode, 
    authPreselectedRole, 
    closeAuthModal, 
    registerUser,
    setLegalTermsOpen,
    setLegalPrivacyOpen,
    language,
    setLanguage
  } = useApp();

  const [mode, setMode] = useState<'login' | 'register'>(authModalMode);
  const [role, setRole] = useState<UserRole>(authPreselectedRole);
  const [showPassword, setShowPassword] = useState(false);

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Antwerpen');
  const [postalCode, setPostalCode] = useState('2000');
  const [country, setCountry] = useState<'BE' | 'NL' | 'FR'>('BE');
  
  // Business / BTW
  const [isBusiness, setIsBusiness] = useState(false);
  const [vatNumber, setVatNumber] = useState('');
  const [performerStatus, setPerformerStatus] = useState<PerformerStatus>('particulier');

  // Performer specific
  const [nationalRegisterNumber, setNationalRegisterNumber] = useState('');
  const [bio, setBio] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['tuin', 'algemeen']);
  const [portfolioPhotos, setPortfolioPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=80'
  ]);
  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80');

  // Checkboxes
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(true);

  if (!isAuthModalOpen) return null;

  const toggleCategory = (catId: string) => {
    if (selectedCategories.includes(catId)) {
      setSelectedCategories(selectedCategories.filter(c => c !== catId));
    } else {
      if (selectedCategories.length >= 7) {
        alert('U kunt maximaal 7 categorieën selecteren.');
        return;
      }
      setSelectedCategories([...selectedCategories, catId]);
    }
  };

  const handleSocialLogin = (provider: 'google' | 'apple' | 'facebook') => {
    // Realistic simulated OAuth login
    const providerEmail = provider === 'google' ? 'gebruiker.google@gmail.com' : 'gebruiker.apple@privaterelay.appleid.com';
    registerUser({
      name: provider === 'google' ? 'Thomas Verhaeghe' : 'Julie De Smet',
      email: providerEmail,
      role: role,
      performerStatus: isBusiness ? 'bijberoep' : 'particulier',
      vatNumber: isBusiness ? 'BE 0987.654.321' : undefined,
      idVerified: true,
      city: 'Brussel',
      postalCode: '1000',
      country: 'BE',
      selectedCategories: selectedCategories,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80'
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      alert('Gelieve alle verplichte velden in te vullen.');
      return;
    }

    if (role === 'performer' && isBusiness && !vatNumber) {
      alert('Een geldig BTW-nummer is verplicht voor zelfstandigen.');
      return;
    }

    registerUser({
      name,
      email,
      phone,
      role,
      performerStatus: role === 'performer' ? (isBusiness ? performerStatus : 'particulier') : undefined,
      vatNumber: isBusiness ? vatNumber : undefined,
      nationalRegisterNumber: nationalRegisterNumber || '90.01.01-123.45',
      idVerified: true,
      city,
      postalCode,
      country,
      bio,
      selectedCategories: role === 'performer' ? selectedCategories : undefined,
      portfolioPhotos: role === 'performer' ? portfolioPhotos : undefined,
      avatar
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-stone-200">
        
        {/* Top bar with Language switch & Close */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-stone-100 bg-stone-50">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-emerald-900 tracking-tight text-lg">KlusGarant</span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Veilig Escrow
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Language toggle with flags */}
            <div className="flex items-center bg-white border border-stone-200 rounded-full p-0.5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setLanguage('nl')}
                className={`px-2.5 py-1 rounded-full transition flex items-center gap-1 ${
                  language === 'nl' ? 'bg-emerald-800 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span>🇧🇪</span> NL
              </button>
              <button
                type="button"
                onClick={() => setLanguage('fr')}
                className={`px-2.5 py-1 rounded-full transition flex items-center gap-1 ${
                  language === 'fr' ? 'bg-emerald-800 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span>🇫🇷</span> FR
              </button>
            </div>

            <button
              onClick={closeAuthModal}
              className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Role Choice Switcher (Screenshot 1: "Ik zoek hulp" vs "Ik zoek werk") */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
              Wat is jouw hoofddoel?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('client')}
                className={`p-3.5 rounded-2xl border-2 text-left transition relative flex flex-col gap-1.5 ${
                  role === 'client' 
                    ? 'border-emerald-700 bg-emerald-50/70 text-emerald-950 shadow-xs' 
                    : 'border-stone-200 hover:border-stone-300 text-stone-700 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">Ik zoek hulp</span>
                  {role === 'client' && <CheckCircle2 className="w-4 h-4 text-emerald-700" />}
                </div>
                <p className="text-[11px] text-stone-500 leading-tight">
                  Klus plaatsen, offertes ontvangen & veilig betalen via escrow.
                </p>
                <span className="inline-block mt-1 text-[10px] font-bold text-emerald-700 bg-white border border-emerald-200 px-2 py-0.5 rounded-full w-fit">
                  € 50 / jaar abonnement
                </span>
              </button>

              <button
                type="button"
                onClick={() => setRole('performer')}
                className={`p-3.5 rounded-2xl border-2 text-left transition relative flex flex-col gap-1.5 ${
                  role === 'performer' 
                    ? 'border-emerald-700 bg-emerald-50/70 text-emerald-950 shadow-xs' 
                    : 'border-stone-200 hover:border-stone-300 text-stone-700 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">Ik zoek werk</span>
                  {role === 'performer' && <CheckCircle2 className="w-4 h-4 text-emerald-700" />}
                </div>
                <p className="text-[11px] text-stone-500 leading-tight">
                  Bieden op klussen als particulier, bijberoep of zelfstandige.
                </p>
                <span className="inline-block mt-1 text-[10px] font-bold text-teal-700 bg-white border border-teal-200 px-2 py-0.5 rounded-full w-fit">
                  100% Gratis registreren
                </span>
              </button>
            </div>
          </div>

          {/* Social Logins (Screenshot 2: Google, Apple, Facebook) */}
          <div className="space-y-2.5">
            <button
              type="button"
              onClick={() => handleSocialLogin('google')}
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-stone-300 hover:border-stone-400 bg-white hover:bg-stone-50 text-stone-800 text-sm font-semibold rounded-xl transition shadow-xs"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.665-5.17 3.665-9.12z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.13C3.26 21.41 7.33 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.24C.45 8.15 0 9.97 0 12s.45 3.85 1.24 5.42l4.04-3.13z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.59 1.24 6.58l4.04 3.13c.95-2.83 3.6-4.96 6.72-4.96z"/>
              </svg>
              <span>Aanmelden via Google <span className="text-xs text-stone-400 font-normal">(Gmail & Werkaccounts)</span></span>
            </button>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleSocialLogin('apple')}
                className="flex items-center justify-center gap-2 py-2 px-3 border border-stone-300 hover:border-stone-400 bg-white hover:bg-stone-50 text-stone-800 text-xs font-semibold rounded-xl transition"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 170 170">
                  <path fill="currentColor" d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.08-7.7-7.98-12-14.71-6.19-9.68-11.04-20.8-14.54-33.36-3.51-12.56-5.26-24.16-5.26-34.8 0-14.68 3.63-26.83 10.89-36.46 7.26-9.63 16.54-14.52 27.84-14.67 4.13 0 8.97 1.15 14.52 3.46 5.56 2.3 9.4 3.46 11.53 3.46 1.93 0 5.86-1.22 11.78-3.66 5.92-2.43 10.74-3.52 14.47-3.26 12.04.81 21.6 5.25 28.69 13.33-10.45 6.33-15.6 15.02-15.46 26.06.13 8.84 3.43 16.29 9.9 22.35 6.47 6.06 14.17 9.58 23.1 10.56-2.58 7.74-5.83 15.19-9.76 22.35zM119.22 33.11c0-7.23 2.66-14.15 7.97-20.76 5.31-6.61 11.9-10.79 19.78-12.35 1.04 6.78-.17 13.56-3.63 20.35-3.46 6.78-8.24 11.45-14.34 13.99-.9 0-1.84-.1-2.82-.29-.65-6.28-1.97-10.02-6.96-10.94z"/>
                </svg>
                <span>Via Apple</span>
              </button>

              <button
                type="button"
                onClick={() => handleSocialLogin('facebook')}
                className="flex items-center justify-center gap-2 py-2 px-3 border border-stone-300 hover:border-stone-400 bg-white hover:bg-stone-50 text-stone-800 text-xs font-semibold rounded-xl transition"
              >
                <svg className="w-3.5 h-3.5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Via Facebook</span>
              </button>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <hr className="w-full border-stone-200" />
            <span className="absolute bg-white px-3 text-xs text-stone-400 uppercase tracking-wider">
              Of met e-mailadres
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Naam & Land */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Volledige naam (volgens ID) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="bv. Thomas Janssens"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-700 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Land
                </label>
                <select
                  value={country}
                  onChange={e => setCountry(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/30 text-sm font-medium"
                >
                  <option value="BE">🇧🇪 België</option>
                  <option value="NL">🇳🇱 Nederland</option>
                  <option value="FR">🇫🇷 Frankrijk</option>
                </select>
              </div>
            </div>

            {/* Email (Accepts any email: Gmail, hotmail, business) */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                E-mailadres * <span className="text-stone-400 font-normal">(privé of zakelijk)</span>
              </label>
              <input
                type="email"
                required
                placeholder="naam@domein.be of naam@gmail.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-700 text-sm"
              />
            </div>

            {/* Password with Eye icon toggle (Screenshot 1 & 3 requirement) */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Wachtwoord *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Minimaal 8 tekens"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 pr-11 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-700 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Postcode & Gemeente */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Postcode
                </label>
                <input
                  type="text"
                  placeholder="bv. 2000"
                  value={postalCode}
                  onChange={e => setPostalCode(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Gemeente
                </label>
                <input
                  type="text"
                  placeholder="bv. Antwerpen"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-sm"
                />
              </div>
            </div>

            {/* ID / Rijksregisternummer verification field (Required by SRS) */}
            <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
              <div className="flex items-center gap-2 text-stone-800 text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Identiteitscontrole (Rijksregisternummer / eID)</span>
              </div>
              <p className="text-[11px] text-stone-500">
                Verplicht voor veilige interacties en fiscale compliance (deeleconomie & FOD Financiën).
              </p>
              <input
                type="text"
                placeholder="bv. 89.04.12-234.56"
                value={nationalRegisterNumber}
                onChange={e => setNationalRegisterNumber(e.target.value)}
                className="w-full px-3 py-2 bg-white rounded-xl border border-stone-300 text-xs font-mono"
              />
            </div>

            {/* BEDRIJFS-CHECKBOX (Screenshot 1 & SRS requirement) */}
            <div className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200/80">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isBusiness}
                  onChange={e => {
                    setIsBusiness(e.target.checked);
                    if (e.target.checked && performerStatus === 'particulier') {
                      setPerformerStatus('bijberoep');
                    }
                  }}
                  className="mt-0.5 w-4 h-4 text-emerald-700 rounded border-stone-300 focus:ring-emerald-600"
                />
                <div>
                  <span className="text-xs font-bold text-stone-900 block">
                    Ik wil me inschrijven als bedrijf / zelfstandige
                  </span>
                  <span className="text-[11px] text-stone-500 leading-tight block mt-0.5">
                    Werk samen met dienstverleners die een BTW-nummer hebben en officiële facturen kunnen uitreiken.
                  </span>
                </div>
              </label>

              {/* Dynamic BTW Input if checked */}
              {isBusiness && (
                <div className="mt-3 pt-3 border-t border-amber-200/60 space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Geldig BTW-nummer * <span className="text-emerald-700 text-[10px]">(VIES gevalideerd)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="bv. BE 0123.456.789"
                      value={vatNumber}
                      onChange={e => setVatNumber(e.target.value)}
                      className="w-full px-3 py-2 bg-white rounded-xl border border-amber-300 focus:ring-2 focus:ring-emerald-600 text-xs font-mono font-semibold"
                    />
                  </div>

                  {role === 'performer' && (
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Zelfstandigenstatuut
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setPerformerStatus('bijberoep')}
                          className={`py-2 px-3 text-xs rounded-xl border font-semibold transition ${
                            performerStatus === 'bijberoep'
                              ? 'bg-emerald-800 text-white border-emerald-800'
                              : 'bg-white text-stone-700 border-stone-300'
                          }`}
                        >
                          Zelfstandige in bijberoep
                        </button>
                        <button
                          type="button"
                          onClick={() => setPerformerStatus('hoofdberoep')}
                          className={`py-2 px-3 text-xs rounded-xl border font-semibold transition ${
                            performerStatus === 'hoofdberoep'
                              ? 'bg-emerald-800 text-white border-emerald-800'
                              : 'bg-white text-stone-700 border-stone-300'
                          }`}
                        >
                          Zelfstandige in hoofdberoep
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* PERFOMER SPECIAL: Up to 7 categories & 3 portfolio photos */}
            {role === 'performer' && (
              <div className="space-y-4 pt-2 border-t border-stone-200">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                      Jouw Vakgebieden (Max. 7)
                    </label>
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      {selectedCategories.length}/7 geselecteerd
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {CATEGORIES.map(cat => {
                      const isSelected = selectedCategories.includes(cat.id);
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => toggleCategory(cat.id)}
                          className={`p-2.5 rounded-xl border text-left text-xs transition flex items-center justify-between ${
                            isSelected 
                              ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-bold'
                              : 'border-stone-200 hover:border-stone-300 text-stone-600'
                          }`}
                        >
                          <span className="truncate">{cat.nameNl}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 ml-1" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Portfolio Showcase (Max 3 foto's - SRS requirement) */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-stone-900">
                      Portfolio: 3 Opmerkelijke Werkjes (Reclame)
                    </label>
                    <span className="text-[11px] text-stone-500">Max 3 foto's</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {portfolioPhotos.map((photo, idx) => (
                      <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-stone-200 group">
                        <img src={photo} alt={`Portfolio ${idx + 1}`} className="w-full h-full object-cover" />
                        <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded font-medium">
                          Foto {idx + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Korte Bio */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Korte Bio / Ervaring
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Vertel potentiële klanten over jouw specialiteiten en werkwijze..."
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* OPTIONELE MARKETING-CHECKBOX (GDPR / AVG - Screenshot 1 & SRS requirement) */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={marketingConsent}
                  onChange={e => setMarketingConsent(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-emerald-700 rounded border-stone-300 focus:ring-emerald-600"
                />
                <span className="text-xs text-stone-600 leading-tight">
                  Ik ontvang graag handige info en promo’s. Beloofd, we spammen niet.
                </span>
              </label>
            </div>

            {/* JURIDISCHE VERPLICHTE FOOTER (Screenshot 3 & SRS requirement) */}
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-center text-xs text-stone-600 leading-relaxed">
              Door je in te schrijven op de mobiele applicatie, accepteer je de{' '}
              <button
                type="button"
                onClick={() => setLegalTermsOpen(true)}
                className="font-bold text-emerald-800 hover:text-emerald-950 underline underline-offset-2 transition"
              >
                Gebruiksvoorwaarden
              </button>{' '}
              en het{' '}
              <button
                type="button"
                onClick={() => setLegalPrivacyOpen(true)}
                className="font-bold text-emerald-800 hover:text-emerald-950 underline underline-offset-2 transition"
              >
                Privacybeleid
              </button>.
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
            >
              <span>Account aanmaken & direct starten</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};
