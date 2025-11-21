import React from 'react';
import { TierInfo } from '../types';
import { Info, CheckCircle2, Zap } from 'lucide-react';

const tiers: TierInfo[] = [
  {
    name: "Gemini 2.5 Flash (Free)",
    rpm: 15,
    rpd: 1500,
    tpm: 1000000,
    desc: "Great for testing and light apps."
  },
  {
    name: "Gemini 2.5 Flash (Paid)",
    rpm: 2000,
    rpd: Infinity,
    tpm: 4000000,
    desc: "For production scale applications."
  }
];

const LimitInfo: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Info className="text-blue-500 w-5 h-5" />
        <h3 className="text-lg font-semibold text-slate-800">Official Rate Limits</h3>
      </div>
      
      <div className="space-y-4">
        {tiers.map((tier, idx) => (
          <div key={idx} className="border border-slate-100 rounded-xl p-4 hover:border-blue-200 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-slate-700 flex items-center gap-2">
                {idx === 1 ? <Zap className="w-4 h-4 text-amber-500 fill-amber-500" /> : <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                {tier.name}
              </h4>
              {tier.rpd === Infinity ? (
                <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2 py-1 rounded-full">Pay-as-you-go</span>
              ) : (
                <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">Free Tier</span>
              )}
            </div>
            <p className="text-sm text-slate-500 mb-3">{tier.desc}</p>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-slate-50 rounded-lg p-2">
                <div className="text-xs text-slate-400 uppercase">RPM</div>
                <div className="font-mono font-semibold text-slate-700">{tier.rpm}</div>
              </div>
              <div className="bg-slate-50 rounded-lg p-2">
                <div className="text-xs text-slate-400 uppercase">RPD</div>
                <div className="font-mono font-semibold text-slate-700">{tier.rpd === Infinity ? 'Unlimited' : tier.rpd}</div>
              </div>
              <div className="bg-slate-50 rounded-lg p-2">
                <div className="text-xs text-slate-400 uppercase">TPM</div>
                <div className="font-mono font-semibold text-slate-700">{(tier.tpm / 1000000).toFixed(1)}M</div>
              </div>
            </div>
          </div>
        ))}
        <div className="text-xs text-slate-400 italic mt-2">
          * Limits are subject to change by Google. This data is for display purposes.
        </div>
      </div>
    </div>
  );
};

export default LimitInfo;