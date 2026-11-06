import React from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/initialData';
import { 
  X, ShieldCheck, Star, Award, CheckCircle2, 
  MapPin, Building2, Briefcase, Sparkles, Image as ImageIcon 
} from 'lucide-react';

export const PerformerProfileModal: React.FC = () => {
  const { selectedPerformerId, closePerformerProfile, users } = useApp();

  if (!selectedPerformerId) return null;

  const performer = users.find(u => u.id === selectedPerformerId);
  if (!performer) return null;

  const performerCategories = CATEGORIES.filter(c => 
    performer.selectedCategories?.includes(c.id)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-stone-200">
        
        {/* Banner with close */}
        <div className="bg-gradient-to-r from-emerald-900 to-teal-800 h-28 relative">
          <button
            onClick={closePerformerProfile}
            className="absolute top-3 right-3 p-1.5 text-white/80 hover:text-white bg-black/30 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Card Overlay */}
        <div className="px-6 -mt-12 relative flex items-end justify-between">
          <div className="relative">
            <img 
              src={performer.avatar} 
              alt={performer.name} 
              className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-md bg-stone-100"
            />
            {performer.idVerified && (
              <span className="absolute -bottom-1 -right-1 p-1 bg-emerald-600 text-white rounded-full shadow-xs" title="eID / Itsme geverifieerd">
                <ShieldCheck className="w-4 h-4" />
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-200 px-3 py-1.5 rounded-xl shadow-xs">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="font-extrabold text-sm text-stone-900">{performer.rating}</span>
            <span className="text-xs text-stone-500">({performer.completedJobsCount} klussen)</span>
          </div>
        </div>

        {/* Details Scroll */}
        <div className="p-6 overflow-y-auto space-y-5">
          
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xl font-black text-stone-900">{performer.name}</h3>
              {performer.idVerified && (
                <span className="text-[11px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> ID Geverifieerd
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-stone-500 mt-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              <span>{performer.postalCode} {performer.city}, België</span>
            </div>
          </div>

          {/* Status & BTW Card */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-stone-500 uppercase tracking-wider">Statuut</span>
              <span className="font-bold text-emerald-900">
                {performer.performerStatus === 'bijberoep' && 'Zelfstandige in bijberoep'}
                {performer.performerStatus === 'hoofdberoep' && 'Zelfstandige in hoofdberoep'}
                {performer.performerStatus === 'particulier' && 'Particulier (Erkende Deeleconomie)'}
              </span>
            </div>

            {performer.vatNumber && (
              <div className="flex items-center justify-between text-xs pt-2 border-t border-stone-200">
                <span className="text-stone-500 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-stone-400" /> BTW-nummer (Facturatie)
                </span>
                <span className="font-mono font-bold text-stone-900 bg-white px-2 py-0.5 rounded border border-stone-200">
                  {performer.vatNumber}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between text-xs pt-2 border-t border-stone-200 text-stone-600">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Betaling via KlusGarant Escrow
              </span>
              <span className="text-emerald-700 font-bold">100% Beschermd</span>
            </div>
          </div>

          {/* Bio */}
          {performer.bio && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                Over mij & Werkervaring
              </h4>
              <p className="text-xs text-stone-700 leading-relaxed bg-white p-3.5 rounded-2xl border border-stone-200">
                {performer.bio}
              </p>
            </div>
          )}

          {/* Categories (max 7) */}
          {performerCategories.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Specialisaties ({performerCategories.length} / 7)
                </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {performerCategories.map(cat => (
                  <span 
                    key={cat.id} 
                    className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200"
                  >
                    {cat.nameNl}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Portfolio Showcase (Max 3 foto's - SRS requirement) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                <span>Portfolio: Opmerkelijke Werkjes ({performer.portfolioPhotos?.length || 0}/3)</span>
              </h4>
            </div>

            {performer.portfolioPhotos && performer.portfolioPhotos.length > 0 ? (
              <div className="grid grid-cols-3 gap-2">
                {performer.portfolioPhotos.map((url, i) => (
                  <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border border-stone-200 group shadow-xs">
                    <img src={url} alt={`Portfolio ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition" />
                    <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded font-bold">
                      Werk #{i + 1}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-stone-400 italic">Geen portfoliofoto's toegevoegd.</p>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
