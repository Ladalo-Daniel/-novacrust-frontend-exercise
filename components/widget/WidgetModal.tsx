"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Widget } from "./Widget";

interface WidgetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WidgetModal({ isOpen, onClose }: WidgetModalProps) {
  // Prevent scroll when modal is open
  if (typeof window !== "undefined") {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ 
                type: "spring", 
                damping: 25, 
                stiffness: 300,
                duration: 0.3 
              }}
              className="relative pointer-events-auto  md:w-full max-w-md  "
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute  -top-12 -right-16 z-10 w-9 h-9 bg-white cursor-pointer rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>

              {/* Widget */}
              <Widget />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
