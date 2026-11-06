import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AlertTriangle, Upload, X, Camera, ShieldAlert, ArrowRight } from 'lucide-react';

export const DisputeModal: React.FC = () => {
  const { isDisputeModalOpen, closeDisputeModal, selectedJobId, jobs, fileDispute } = useApp();
  const [reason, setReason] = useState('');
  const [evidencePhotos, setEvidencePhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=80'
  ]);

  if (!isDisputeModalOpen || !selectedJobId) return null;

  const job = jobs.find(j => j.id === selectedJobId);
  if (!job) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason) {
      alert('Gelieve een duidelijke omschrijving van de gebreken in te vullen.');
      return;
    }

    fileDispute(job.id, reason, evidencePhotos);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-100 bg-red-50/70 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center text-red-700">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-stone-900 text-base">Geschil Melden (72-Uur Buffer)</h3>
              <p className="text-xs text-stone-500">Escrow wordt onmiddellijk bevroren</p>
            </div>
          </div>
          <button
            onClick={closeDisputeModal}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div className="p-3 bg-red-50 rounded-2xl border border-red-200 text-xs text-red-950 space-y-1">
            <p className="font-bold flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-red-700 shrink-0" />
              Garantieprocedure geactiveerd
            </p>
            <p className="text-[11px] text-red-900 leading-relaxed">
              Het bedrag van <strong>€ {job.acceptedAmount},-</strong> blijft veilig in depot en wordt NIET overgemaakt naar de vakman tot de gebreken zijn hersteld of onze beheerder een besluit heeft genomen.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1">
              Wat is er mis of onvolledig aan het uitgevoerde werk? *
            </label>
            <textarea
              rows={4}
              required
              placeholder="Beschrijf duidelijk de gebreken, ontbrekende onderdelen of afwijkingen ten opzichte van de geaccepteerde offerte..."
              value={reason}
              onChange={e => setReason(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-red-600/30 focus:outline-none leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1">
              Fotobewijs van de situatie ({evidencePhotos.length} toegevoegd)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {evidencePhotos.map((url, i) => (
                <div key={i} className="relative aspect-video rounded-xl overflow-hidden border border-stone-200">
                  <img src={url} alt="Evidence" className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 left-1.5 text-[9px] bg-black/70 text-white px-1.5 py-0.5 rounded font-bold">
                    Bewijsfoto #{i + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 flex justify-between items-center">
            <button
              type="button"
              onClick={closeDisputeModal}
              className="px-4 py-2 border border-stone-300 text-stone-600 text-xs font-bold rounded-xl"
            >
              Annuleren
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 bg-red-700 hover:bg-red-800 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5"
            >
              <span>Geschil Indienen & Timer Pauzeren</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
