import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Send, X, ShieldAlert, Lock, CheckCircle2 } from 'lucide-react';

export const ChatModal: React.FC = () => {
  const { chatJobId, closeChat, jobs, messages, currentUser, sendMessage } = useApp();
  const [inputText, setInputText] = useState('');

  if (!chatJobId) return null;

  const job = jobs.find(j => j.id === chatJobId);
  if (!job) return null;

  const jobMessages = messages.filter(m => m.jobId === chatJobId);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    sendMessage(chatJobId, inputText.trim());
    setInputText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full h-[600px] max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-stone-200">
        
        {/* Header */}
        <div className="p-4 border-b border-stone-100 bg-stone-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-black text-sm">
              KG
            </div>
            <div>
              <h3 className="font-extrabold text-stone-900 text-sm line-clamp-1">{job.title}</h3>
              <p className="text-[11px] text-stone-500">
                Veilige KlusGarant Berichtenbox • Status: {job.status}
              </p>
            </div>
          </div>

          <button
            onClick={closeChat}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Anti-Circumvention Warning Banner (SRS Requirement) */}
        <div className="p-2.5 bg-amber-50 border-b border-amber-200/80 text-[11px] text-amber-950 flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <span>
            <strong>Veiligheidsherinnering:</strong> Wissel geen bankrekeningnummers of contant geld uit buiten het platform. Uw betaling en garantie zijn uitsluitend beschermd via het KlusGarant escrow-systeem.
          </span>
        </div>

        {/* Message List */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-stone-50/50">
          {jobMessages.length === 0 ? (
            <div className="text-center py-10 text-stone-400 text-xs">
              Nog geen berichten. Stel een vraag over de klus of stem de planning af!
            </div>
          ) : (
            jobMessages.map(msg => {
              const isMe = msg.senderId === currentUser.id;
              const isSys = msg.isSystemMessage;

              if (isSys) {
                return (
                  <div key={msg.id} className="p-3 my-2 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs font-medium text-center">
                    {msg.text}
                  </div>
                );
              }

              return (
                <div key={msg.id} className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}>
                  {!isMe && (
                    <img src={msg.senderAvatar} alt={msg.senderName} className="w-7 h-7 rounded-full object-cover shrink-0" />
                  )}
                  <div className={`max-w-[75%] p-3 rounded-2xl text-xs leading-relaxed ${
                    isMe 
                      ? 'bg-emerald-800 text-white rounded-br-none' 
                      : 'bg-white text-stone-800 border border-stone-200 rounded-bl-none shadow-xs'
                  }`}>
                    {!isMe && (
                      <span className="text-[10px] font-bold text-stone-500 block mb-0.5">
                        {msg.senderName}
                      </span>
                    )}
                    <p>{msg.text}</p>
                    <span className={`text-[9px] mt-1 block text-right ${isMe ? 'text-emerald-200' : 'text-stone-400'}`}>
                      {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 border-t border-stone-200 bg-white flex items-center gap-2">
          <input
            type="text"
            placeholder="Typ een bericht over de klus..."
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-none"
          />
          <button
            type="submit"
            className="p-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white transition shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
