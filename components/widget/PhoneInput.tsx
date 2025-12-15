"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { CountryCode } from "@/lib/types";
import { countryCodes } from "@/lib/data";
import Image from "next/image";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  countryCode: CountryCode;
  onCountryCodeChange: (code: CountryCode) => void;
  label?: string;
  placeholder?: string;
}

export function PhoneInput({
  value,
  onChange,
  countryCode,
  onCountryCodeChange,
  label = "Recipient phone number",
  placeholder = "000 - 000 - 00000",
}: PhoneInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (code: CountryCode) => {
    onCountryCodeChange(code);
    setIsOpen(false);
  };

  const formatPhoneNumber = (input: string) => {
    // Remove non-numeric characters
    const cleaned = input.replace(/\D/g, "");
    
    // Format as XXX - XXX - XXXXX
    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 6) {
      return `${cleaned.slice(0, 3)} - ${cleaned.slice(3)}`;
    } else {
      return `${cleaned.slice(0, 3)} - ${cleaned.slice(3, 6)} - ${cleaned.slice(6, 11)}`;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    onChange(formatted);
  };

  return (
    <div className="space-y-4">
      <label className="block text-base font-medium text-nova-text">{label}</label>
      <div className="relative flex border border-nova-border rounded-[30px] overflow-hidden focus-within:ring-1 focus-within:ring-nova-primary/10 focus-within:border-nova-primary/20 transition-all">
        <div className="relative" ref={containerRef}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1.5 px-3 py-3 bg-nova-gray-light border-r border-nova-border hover:bg-nova-gray transition-colors"
          >
            <span className="text-sm">{countryCode.dial}</span>
            {/* <span className="text-lg">{countryCode.flag}</span> */}
            <Image src={`/naija-flag.svg`} alt={countryCode.name} width={20} height={12} />
            <ChevronDown
              className={`w-4 h-4 text-nova-text-muted transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-nova-border overflow-hidden z-50"
              >
                <div className="max-h-48 overflow-y-auto">
                  {countryCodes.map((code) => (
                    <button
                      key={code.code}
                      onClick={() => handleSelect(code)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-nova-gray transition-colors ${
                        countryCode.code === code.code ? "bg-nova-gray" : ""
                      }`}
                    >
                      <span className="text-lg">{code.flag}</span>
                      <span className="text-sm font-medium">{code.dial}</span>
                      <span className="text-xs text-nova-text-muted">{code.name}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <input
          type="tel"
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="flex-1 px-3 py-3 text-sm focus:outline-none bg-transparent"
          maxLength={17}
        />
      </div>
    </div>
  );
}
