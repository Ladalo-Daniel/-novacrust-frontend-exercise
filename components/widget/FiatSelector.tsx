"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FiatCurrency } from "@/lib/types";
import { fiatCurrencies } from "@/lib/data";
import Image from "next/image";

interface FiatSelectorProps {
  value: FiatCurrency | null;
  onChange: (fiat: FiatCurrency) => void;
}

export function FiatSelector({ value, onChange }: FiatSelectorProps) {
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

  const handleSelect = (fiat: FiatCurrency) => {
    onChange(fiat);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 h-9 min-w-25 cursor-pointer px-3 py-2 bg-nova-gray-light border border-nova-border rounded-full hover:bg-nova-gray transition-colors"
      >
        {value ? (
          <>
        
            <Image src={value.flag} alt={value.symbol} width={16} height={14} className="rounded-sm" />
            <span className="font-medium text-sm">{value.symbol}</span>
          </>
        ) : (
          <span className="text-sm text-nova-text-muted">Select</span>
        )}
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
            className="absolute right-0 top-full mt-2 w-48 bg-white rounded-[30px] shadow-lg border border-nova-border overflow-hidden z-50"
          >
            <div className="max-h-48 overflow-y-auto p-2 space-y-2 my-3">
              {fiatCurrencies.map((fiat) => (
                <button
                  key={fiat.id}
                  onClick={() => handleSelect(fiat)}
                  className={`w-full flex rounded-[10px] items-center gap-3 cursor-pointer px-3 py-2 text-left hover:bg-nova-gray transition-colors ${
                    value?.id === fiat.id ? "bg-nova-gray" : ""
                  }`}
                >
                  {/* <span className="text-xl">{fiat.flag}</span> */}
                 <Image src={fiat.flag} alt={fiat.symbol} width={20} height={14} className="rounded-sm" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{fiat.symbol}</span>
                    <span className="text-xs text-nova-text-muted">{fiat.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
