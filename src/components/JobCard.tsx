import React from 'react';
import { Job } from '../types';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/initialData';
import { 
  MapPin, Calendar, Clock, EyeOff, ShieldCheck, 
  Lock, AlertTriangle, CheckCircle, ChevronRight, Image as ImageIcon 
} from 'lucide-react';

interface JobCardProps {
  job: Job;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const { openJobDetail, offers, currentUser } = useApp();

  const jobOffers = offers.filter(o => o.jobId === job.id);
  const categoryInfo = CATEGORIES.find(c => c.id === job.category);

  // Status badge styling
  const renderStatusBadge = () => {
    switch (job.status) {
      case 'open':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            Open voor offertes
          </span>
        );
      case 'in_escrow':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800">
            <Lock className="w-3 h-3 text-blue-600" />
            In Escrow (€ {job.acceptedAmount})
          </span>
        );
      case 'completed_pending_review':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
            <Clock className="w-3 h-3 text-amber-700 animate-spin" />
            72-uurs Inspectie Bezig
          </span>
        );
      case 'disputed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-100 text-red-800 border border-red-300">
            <AlertTriangle className="w-3 h-3 text-red-600" />
            Geschil In Bemiddeling
          </span>
        );
      case 'paid_out':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-stone-100 text-stone-700">
            <CheckCircle className="w-3 h-3 text-emerald-600" />
            Voltooid & Uitbetaald
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      onClick={() => openJobDetail(job.id)}
      className="bg-white rounded-3xl border border-stone-200/90 hover:border-emerald-700/60 transition-all duration-200 shadow-xs hover:shadow-lg cursor-pointer overflow-hidden flex flex-col group"
    >
      {/* Photo carousel / header image */}
      <div className="relative aspect-[16/9] bg-stone-100 overflow-hidden">
        {job.photos && job.photos.length > 0 ? (
          <img 
            src={job.photos[0]} 
            alt={job.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-stone-400 bg-stone-100">
            <ImageIcon className="w-8 h-8" />
          </div>
        )}

        {/* Category & Status Overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 backdrop-blur-md text-stone-800 shadow-xs">
            {categoryInfo?.nameNl || job.category}
          </span>
          {renderStatusBadge()}
        </div>

        {/* Photos counter pill (up to 10 photos) */}
        {job.photos && job.photos.length > 1 && (
          <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/70 text-white backdrop-blur-xs flex items-center gap-1">
            <ImageIcon className="w-3 h-3" />
            {job.photos.length} foto's
          </span>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="font-extrabold text-stone-900 text-base leading-snug line-clamp-2 group-hover:text-emerald-800 transition-colors">
            {job.title}
          </h3>
          <p className="text-stone-600 text-xs mt-1.5 line-clamp-2 leading-relaxed">
            {job.description}
          </p>
        </div>

        {/* Location & Target Date */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-1 text-stone-600 font-medium">
            <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span>{job.postalCode} {job.city}</span>
          </div>

          <div className="flex items-center gap-1 text-stone-500">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <span>{job.targetDate}</span>
          </div>
        </div>

        {/* Blind Bidding & Action Row */}
        <div className="pt-1 flex items-center justify-between">
          {/* Blind Bidding Pill */}
          <div className="flex items-center gap-1.5 text-xs">
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 font-semibold">
              <EyeOff className="w-3.5 h-3.5 text-stone-500" />
              <span>
                {jobOffers.length === 0 ? 'Nog geen biedingen' : `${jobOffers.length} offerte${jobOffers.length > 1 ? 's' : ''}`}
              </span>
            </div>
            
            {/* Blind indicator */}
            <span className="text-[10px] text-stone-400 hidden sm:inline">
              (Geheime biedingen)
            </span>
          </div>

          <div className="flex items-center gap-1 text-xs font-bold text-emerald-800 group-hover:translate-x-0.5 transition-transform">
            <span>Details</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

      </div>
    </div>
  );
};
