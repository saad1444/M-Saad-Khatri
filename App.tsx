import React, { useState, useCallback } from 'react';
import { Message, UsageStats } from './types';
import { sendMessageToGemini } from './services/geminiService';
import QuotaChart from './components/QuotaChart';
import ChatInterface from './components/ChatInterface';
import LimitInfo from './components/LimitInfo';
import { Activity, BarChart3 } from 'lucide-react';

const INITIAL_DAILY_LIMIT = 1500; // Gemini 2.5 Flash Free Tier Daily Limit

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<UsageStats>({
    dailyLimit: INITIAL_DAILY_LIMIT,
    used: 0,
    remaining: INITIAL_DAILY_LIMIT,
  });

  const handleSendMessage = useCallback(async (text: string) => {
    if (stats.remaining <= 0) {
      const errorMsg: Message = {
        role: 'model',
        text: "You have reached your simulated daily limit! Please upgrade or wait for the reset.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMsg]);
      return;
    }

    // Add user message
    const userMsg: Message = { role: 'user', text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    // Update stats (Optimistic update)
    setStats(prev => ({
      ...prev,
      used: prev.used + 1,
      remaining: prev.remaining - 1
    }));

    // Call Gemini
    const responseText = await sendMessageToGemini(text);
    
    const modelMsg: Message = { role: 'model', text: responseText, timestamp: new Date() };
    setMessages(prev => [...prev, modelMsg]);
    setIsLoading(false);
  }, [stats.remaining]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <Activity size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 leading-tight">Gemini Quota Tracker</h1>
              <p className="text-xs text-slate-500">Monitor your daily AI interactions</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-sm font-medium text-slate-600 bg-slate-100 px-4 py-2 rounded-full">
             <BarChart3 size={18} />
             <span>Requests Today: <span className="text-blue-600 font-bold">{stats.used}</span> / {stats.dailyLimit}</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Dashboard & Info (4 cols) */}
          <div className="lg:col-span-4 space-y-6 order-2 lg:order-1">
            <QuotaChart stats={stats} />
            <LimitInfo />
            
            <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-200">
              <h3 className="font-bold text-lg mb-2">Did you know?</h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                The Gemini 2.5 Flash model is extremely efficient. The free tier allows up to 15 requests per minute, making it perfect for chatbots and interactive apps like this one.
              </p>
            </div>
          </div>

          {/* Right Column: Chat Interface (8 cols) */}
          <div className="lg:col-span-8 order-1 lg:order-2">
             <ChatInterface 
                messages={messages} 
                onSendMessage={handleSendMessage}
                isLoading={isLoading}
             />
             <p className="text-center text-xs text-slate-400 mt-4">
                Powered by Gemini 2.5 Flash • Simulated usage tracking
             </p>
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;