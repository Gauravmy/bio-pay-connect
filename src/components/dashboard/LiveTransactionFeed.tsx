
import React from 'react';
import { Check, RefreshCw } from 'lucide-react';

interface Transaction {
  merchant: string;
  amount: number;
  status: 'processing' | 'verified';
  time: string;
}

const LiveTransactionFeed: React.FC = () => {
  const transactions: Transaction[] = [
    {
      merchant: 'NeoFoods',
      amount: 33.97,
      status: 'processing',
      time: 'Just now'
    },
    {
      merchant: 'FutureHealth',
      amount: 9.29,
      status: 'verified',
      time: 'Just now'
    },
    {
      merchant: 'FutureHealth',
      amount: 63.15,
      status: 'verified',
      time: 'Just now'
    }
  ];

  return (
    <div className="space-y-4">
      {transactions.map((transaction, index) => (
        <div 
          key={index} 
          className="bg-[#080d33]/80 backdrop-blur-md border border-white/10 rounded-lg p-4 flex items-center justify-between hover:border-cyan-500/30 transition-colors duration-300 transform hover:scale-[1.02] transition-transform"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              {transaction.merchant === 'NeoFoods' ? (
                <span className="text-lg relative z-10">🍎</span>
              ) : (
                <span className="text-lg relative z-10">🏥</span>
              )}
            </div>
            <div>
              <p className="font-medium text-white group-hover:text-cyan-300 transition-colors">{transaction.merchant}</p>
              <p className="text-xs text-white/60">{transaction.time}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <p className="font-mono font-bold text-white">₹{transaction.amount.toFixed(2)}</p>
            <div className={`h-6 px-2 rounded-full flex items-center text-xs gap-1 ${
              transaction.status === 'processing' 
                ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' 
                : 'bg-green-500/20 text-green-300 border border-green-500/30'
            }`}>
              {transaction.status === 'processing' ? (
                <>
                  <RefreshCw className="h-3 w-3 animate-spin" />
                  <span>Processing</span>
                </>
              ) : (
                <>
                  <Check className="h-3 w-3" />
                  <span>Verified</span>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LiveTransactionFeed;
