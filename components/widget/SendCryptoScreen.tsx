"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Copy, Info, Check } from "lucide-react";
import { PrimaryButton } from "./PrimaryButton";
import { useState } from "react";

interface SendCryptoScreenProps {
  walletAddress: string;
  amount: string;
  cryptoSymbol: string;
  network: string;
  walletType: string;
  onBack: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function SendCryptoScreen({
  walletAddress,
  amount,
  cryptoSymbol,
  network,
  walletType,
  onBack,
  onConfirm,
  isLoading = false,
}: SendCryptoScreenProps) {
  const [copied, setCopied] = useState<"address" | "amount" | null>(null);

  const containerVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      x: -50,
      transition: { duration: 0.2 },
    },
  };

  const handleCopy = async (text: string, type: "address" | "amount") => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6 my-6 mx-0"
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 -ml-2 hover:bg-nova-gray cursor-pointer rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-nova-text-muted" />
        </button>
        <h2 className="flex-1 text-center text-[20px] font-medium pr-7 text-nova-text">
          Send {cryptoSymbol} to the address below
        </h2>
      </div>

      {/* Wallet Address */}
      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-flex bg-[#E6FBF2] items-center gap-2 px-5 py-2 border border-[#CCF6E5] rounded-full"
        >
          <span className="font-mono  text-base font-medium text-nova-text">{walletAddress}</span>
          <button
            onClick={() => handleCopy(walletAddress, "address")}
            className="p-1 hover:bg-nova-gray rounded transition-colors"
          >
            {copied === "address" ? (
              <Check className="w-4 h-4 text-nova-success" />
            ) : (
              <Copy className="w-4 h-4 text-nova-text-muted" />
            )}
          </button>
        </motion.div>
      </div>

      {/* Transaction Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-[#F7F7F7]  rounded-[10px] overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 py-4 ">
          <span className="text-sm text-[#4F4F4F]">Amount to send</span>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-nova-primary">
              {amount} {cryptoSymbol}
            </span>
            <button
              onClick={() => handleCopy(`${amount} ${cryptoSymbol}`, "amount")}
              className="p-1 hover:bg-nova-gray rounded transition-colors"
            >
              {copied === "amount" ? (
                <Check className="w-4 h-4 text-nova-success" />
              ) : (
                <Copy className="w-4 h-4 text-nova-text-muted" />
              )}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between px-5 py-4 ">
          <span className="text-sm text-[#4F4F4F]">Network</span>
          <span className="font-medium text-nova-text">{network}</span>
        </div>
        <div className="flex items-center justify-between px-5 py-4">
          <span className="text-sm text-[#4F4F4F]">Wallet</span>
          <span className="font-medium text-nova-text">{walletType}</span>
        </div>
      </motion.div>

      {/* Warning */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-start gap-3 px-4 py-3"
      >
        <div className="w-8 h-8  flex items-center justify-center shrink-0 mt-0.5">
          <Info className="w-6 h-6 text-nova-text" />
        </div>
        <p className="text-sm text-[#4F4F4F] leading-relaxe">
          Only send ({cryptoSymbol}) to this address. Ensure the sender is on the ({network}) network otherwise you might lose your deposit
        </p>
      </motion.div>

      {/* Confirm Button */}
      <div className="pt-6">
        <PrimaryButton onClick={onConfirm} isLoading={isLoading}>
          I have sent it
        </PrimaryButton>
      </div>
    </motion.div>
  );
}
