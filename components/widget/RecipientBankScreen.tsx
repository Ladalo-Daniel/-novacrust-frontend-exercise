"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { BankSelector } from "./BankSelector";
import { FormInput } from "./FormInput";
import { PrimaryButton } from "./PrimaryButton";
import { Bank } from "@/lib/types";

interface RecipientBankScreenProps {
  bank: Bank | null;
  onBankChange: (bank: Bank) => void;
  accountNumber: string;
  onAccountNumberChange: (value: string) => void;
  accountName: string;
  onBack: () => void;
  onNext: () => void;
  isLoading?: boolean;
}

export function RecipientBankScreen({
  bank,
  onBankChange,
  accountNumber,
  onAccountNumberChange,
  accountName,
  onBack,
  onNext,
  isLoading = false,
}: RecipientBankScreenProps) {
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
          className="p-2 -ml-2 text-nova-text-muted hover:bg-nova-gray rounded-full transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="flex-1 text-center text-[20px] font-medium pr-7 text-nova-text">
          Recipient details
        </h2>
      </div>

      {/* Form Fields */}
      <div className="space-y-8">
        <BankSelector value={bank} onChange={onBankChange} />

        <FormInput
          label="Account number"
          placeholder="Enter your account number"
          value={accountNumber}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "").slice(0, 10);
            onAccountNumberChange(value);
          }}
          type="text"
          inputMode="numeric"
        />

        {accountName && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <label className="block text-[16px] font-medium text-nova-text">
              Account name
            </label>
            <div className="px-4 py-4 bg-[#F2F2F2]  rounded-[30px]">
              <span className="text-[16px] font-medium text-nova-text">
                {accountName}
              </span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Next Button */}
      <div className="pt-36  w-full">
        <PrimaryButton
          onClick={onNext}
          disabled={!bank || accountNumber.length < 10 || !accountName}
          isLoading={isLoading}
        >
          Next
        </PrimaryButton>
      </div>
    </motion.div>
  );
}
