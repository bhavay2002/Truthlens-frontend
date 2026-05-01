import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, X } from 'lucide-react';

export default function Toast({ message, onClose, duration = 5000 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [message, onClose, duration]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 60, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-5 right-5 z-50 flex items-center gap-3 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-xl max-w-sm"
        >
          <WifiOff className="w-4 h-4 text-red-400 shrink-0" />
          <span className="text-sm flex-1">{message}</span>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors ml-1"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
