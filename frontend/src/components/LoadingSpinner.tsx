import { motion } from 'framer-motion';

export default function LoadingSpinner({ text = 'Running simulations...' }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        className="w-12 h-12 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full"
      />
      <p className="text-slate-400 text-sm">{text}</p>
      <p className="text-slate-600 text-xs">Processing 10,000 Monte Carlo simulations</p>
    </div>
  );
}
