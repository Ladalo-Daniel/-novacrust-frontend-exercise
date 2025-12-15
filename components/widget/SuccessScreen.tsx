"use client";

import { motion } from "framer-motion";
import { Copy, Check, CheckCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface SuccessScreenProps {
  transactionId: string;
  onGoHome: () => void;
}

export function SuccessScreen({ transactionId, onGoHome }: SuccessScreenProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(transactionId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center py-8 px-4"
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-2 mb-14"
      >
        

        <Image src="/nova-logo.svg" alt="Novacrust Logo" width={170} height={170} />
      </motion.div>

      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.2 
        }}
        className="w-16 h-16 bg-[#219653] rounded-full flex items-center justify-center mb-9"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Check className="w-8 h-8 text-white stroke-3" />
        </motion.div>
      </motion.div>

      {/* Success Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center mb-8"
      >
        <h2 className="text-[24px] text-black font-semibold mb-2">
          Your transaction is processing.
        </h2>
        <p className="text-[#4F4F4F] text-[20px]">
          The recipient will receive it shortly.
        </p>
      </motion.div>

      {/* Transaction ID */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full bg-nova-gray-light  rounded-[10px] overflow-hidden mb-8"
      >
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-sm text-nova-text-muted">Transaction ID</span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-base font-semibold text-nova-text">
              {transactionId}
            </span>
            <button
              onClick={handleCopy}
              className="p-1 hover:bg-white rounded transition-colors"
            >
              {copied ? (
                <Check className="w-4 h-4 text-nova-success" />
              ) : (
                <Copy className="w-4 h-4 text-nova-text-muted" />
              )}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Go Home Link */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={onGoHome}
        className="text-[#013941] text-[16px] font-bold hover:underline cursor-pointer"
      >
        Go back to home
      </motion.button>
    </motion.div>
  );
}
