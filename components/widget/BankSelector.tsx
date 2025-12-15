"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import { Bank } from "@/lib/types";
import { banks } from "@/lib/data";

interface BankSelectorProps {
  value: Bank | null;
  onChange: (bank: Bank) => void;
  label?: string;
}

export function BankSelector({ value, onChange, label = "Bank" }: BankSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredBanks = banks.filter((bank) =>
    bank.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (bank: Bank) => {
    onChange(bank);
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <div className="space-y-2" ref={containerRef}>
      <label className="block text-sm font-medium text-nova-text">{label}</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-4 bg-white border border-nova-border rounded-[30px] hover:border-nova-primary/30 transition-colors cursor-pointer"
        >
          {value ? (
            <span className="font-medium text-[16px]">{value.name}</span>
          ) : (
            <span className="text-[16px] text-nova-text-muted">Select an option</span>
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
              className="absolute left-0 right-0 top-full mt-2 bg-white rounded-4xl shadow-sm border border-nova-border overflow-hidden z-50"
            >
              <div className="p-5 ">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-nova-text-muted" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-3 py-4 text-sm bg-white rounded-[30px] border-none focus:outline-none focus:ring-1 focus:ring-nova-primary/20"
                    autoFocus
                  />
                </div>
              </div>
              <div className="max-h-48 overflow-y-auto px-3 space-y-2">
                {filteredBanks.map((bank) => (
                  <button
                    key={bank.id}
                    onClick={() => handleSelect(bank)}
                    className={`w-full flex items-center cursor-pointer rounded-2xl gap-3 px-4 py-4 text-left hover:bg-nova-gray transition-colors ${
                      value?.id === bank.id ? " bg-nova-gray-light" : ""
                    }`}
                  >
                    <span className="text-sm font-medium">{bank.name}</span>
                  </button>
                ))}
                {filteredBanks.length === 0 && (
                  <div className="px-4 py-3 text-sm text-nova-text-muted text-center">
                    No banks found
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
