"use client";

import { motion } from "framer-motion";
import { CryptoSelector } from "./CryptoSelector";
import { FiatSelector } from "./FiatSelector";
import { WalletSelector } from "./WalletSelector";
import { PrimaryButton } from "./PrimaryButton";
import { Cryptocurrency, FiatCurrency, Wallet } from "@/lib/types";
import { ChevronDown } from "lucide-react";

interface CryptoToCashScreenProps {
  payAmount: string;
  onPayAmountChange: (value: string) => void;
  payCurrency: Cryptocurrency | null;
  onPayCurrencyChange: (crypto: Cryptocurrency) => void;
  receiveAmount: string;
  receiveCurrency: FiatCurrency | null;
  onReceiveCurrencyChange: (fiat: FiatCurrency) => void;
  payFrom: Wallet | null;
  onPayFromChange: (wallet: Wallet) => void;
  onPayToClick: () => void;
  onConvert: () => void;
  payToLabel?: string;
}

export function CryptoToCashScreen({
  payAmount,
  onPayAmountChange,
  payCurrency,
  onPayCurrencyChange,
  receiveAmount,
  receiveCurrency,
  onReceiveCurrencyChange,
  payFrom,
  onPayFromChange,
  onPayToClick,
  onConvert,
  payToLabel = "Select an option",
}: CryptoToCashScreenProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 "
    >
      {/* You Pay Section */}
      <motion.div
        variants={itemVariants}
        className="p-4 bg-white border border-nova-border rounded-[30px] h-28"
      >
        <label className="block text-[16px] text-nova-text-muted mb-2">You pay</label>
        <div className="flex items-center justify-between">
          <input
            type="text"
            value={payAmount}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9.]/g, "");
              onPayAmountChange(value);
            }}
            placeholder="0.00"
            className="text-2xl font-semibold bg-transparent focus:outline-none w-full"
          />
          <CryptoSelector value={payCurrency} onChange={onPayCurrencyChange} />
        </div>
      </motion.div>

      {/* You Receive Section */}
      <motion.div
        variants={itemVariants}
        className="p-4 bg-white border border-nova-border rounded-[30px] h-28"
      >
        <label className="block text-[16px] text-nova-text-muted mb-2">You receive</label>
        <div className="flex items-center justify-between">
          <input
            type="text"
            value={receiveAmount}
            readOnly
            placeholder="0.00"
            className="text-2xl font-semibold bg-transparent focus:outline-none w-full "
          />
          <FiatSelector value={receiveCurrency} onChange={onReceiveCurrencyChange} />
        </div>
      </motion.div>

      {/* Pay From Section */}
      <motion.div variants={itemVariants}>
        <WalletSelector
          value={payFrom}
          onChange={onPayFromChange}
          label="Pay from"
        />
      </motion.div>

      {/* Pay To Section */}
      <motion.div variants={itemVariants} className="space-y-2">
        <label className="block text-base font-medium text-nova-text">Pay to</label>
        <button
          type="button"
          onClick={onPayToClick}
          className="w-full flex items-center justify-between px-4 py-4 bg-white border border-nova-border rounded-[30px] cursor-pointer hover:border-nova-primary/30 transition-colors"
        >
          <span className={`text-sm font-semibold ${payToLabel === "Select an option" ? "text-nova-text" : "font-medium"}`}>
            {payToLabel}
          </span>
          <ChevronDown className="w-5 h-5 text-nova-text-muted" />
        </button>
      </motion.div>

      {/* Convert Button */}
      <motion.div variants={itemVariants} className="pt-4">
        <PrimaryButton onClick={onConvert} disabled={!payFrom}>Convert now</PrimaryButton>
      </motion.div>
    </motion.div>
  );
}
