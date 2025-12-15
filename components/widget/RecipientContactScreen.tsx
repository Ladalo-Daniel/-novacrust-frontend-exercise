"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { FormInput } from "./FormInput";
import { PhoneInput } from "./PhoneInput";
import { PrimaryButton } from "./PrimaryButton";
import { CountryCode } from "@/lib/types";

interface RecipientContactScreenProps {
  email: string;
  onEmailChange: (value: string) => void;
  phone: string;
  onPhoneChange: (value: string) => void;
  countryCode: CountryCode;
  onCountryCodeChange: (code: CountryCode) => void;
  onBack: () => void;
  onNext: () => void;
  isLoading?: boolean;
}

export function RecipientContactScreen({
  email,
  onEmailChange,
  phone,
  onPhoneChange,
  countryCode,
  onCountryCodeChange,
  onBack,
  onNext,
  isLoading = false,
}: RecipientContactScreenProps) {
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

  const isValidEmail = email.includes("@") && email.includes(".");
  const isValidPhone = phone.replace(/\D/g, "").length >= 10;

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
          className="p-2 -ml-2 hover:bg-nova-gray rounded-full transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 text-nova-text-muted" />
        </button>
        <h2 className="flex-1 text-center text-[20px] font-medium pr-7 text-nova-text">
          Recipient contact details
        </h2>
      </div>

      {/* Form Fields */}
      <div className="space-y-8">
        <FormInput
          label="Recipient email"
          placeholder="Enter recipient email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          type="email"
        />

        <PhoneInput
          value={phone}
          onChange={onPhoneChange}
          countryCode={countryCode}
          onCountryCodeChange={onCountryCodeChange}
        />
      </div>

      {/* Next Button */}
      <div className="pt-36">
        <PrimaryButton
          onClick={onNext}
          disabled={!isValidEmail || !isValidPhone}
          isLoading={isLoading}
        >
          Next
        </PrimaryButton>
      </div>
    </motion.div>
  );
}
