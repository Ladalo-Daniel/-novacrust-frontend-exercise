"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Wallet } from "@/lib/types";
import { wallets } from "@/lib/data";
import Image from "next/image";

interface WalletSelectorProps {
  value: Wallet | null;
  onChange: (wallet: Wallet) => void;
  label?: string;
}

// Wallet icons mapping
const walletIcons: Record<string, string> = {
  metamask: "/wallets/metamask.svg",
  rainbow: "/wallets/rainbow.svg",
  walletconnect: "/wallets/walletconnect.svg",
  other: "/wallets/other.svg",
};

export function WalletSelector({ value, onChange, label = "Pay from" }: WalletSelectorProps) {
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

  const handleSelect = (wallet: Wallet) => {
    onChange(wallet);
    setIsOpen(false);
  };

  return (
    <div className="space-y-2" ref={containerRef}>
      <label className="block text-base font-medium text-nova-text">{label}</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-4 cursor-pointer bg-white border border-nova-border rounded-[30px] hover:border-nova-primary/30 transition-colors"
        >
          {value ? (
            <div className="flex items-center gap-3">
              <span className="text-xl">{value.icon}</span>
              <span className="font-medium text-sm">{value.name}</span>
            </div>
          ) : (
            <span className="text-sm font-semibold text-nova-text">Select an option</span>
          )}
          <ChevronDown
            className={`w-5 h-5 text-nova-text-muted transition-transform duration-200 ${
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
              className="absolute left-0 right-0 top-full mt-2 bg-white rounded-4xl shadow-lg border border-nova-border overflow-hidden z-50"
            >
              <div className="max-h-64 overflow-y-auto p-3">
                {wallets.map((wallet) => (
                  <button
                    key={wallet.id}
                    onClick={() => handleSelect(wallet)}
                    className={`w-full flex items-center  cursor-pointer rounded-2xl gap-3 px-4 py-4 text-left hover:bg-nova-gray transition-colors ${
                      value?.id === wallet.id ? "bg-nova-gray" : ""
                    }`}
                  >
                    <span className="text-xl">{wallet.icon}</span>
                    <span className="text-sm font-medium text-nova-text" >{wallet.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
