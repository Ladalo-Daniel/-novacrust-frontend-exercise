"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import { Cryptocurrency } from "@/lib/types";
import { cryptocurrencies } from "@/lib/data";
import Image from "next/image";

interface CryptoSelectorProps {
  value: Cryptocurrency | null;
  onChange: (crypto: Cryptocurrency) => void;
  label?: string;
}

export function CryptoSelector({ value, onChange, label }: CryptoSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredCryptos = cryptocurrencies.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crypto.network.toLowerCase().includes(searchQuery.toLowerCase())
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

  const handleSelect = (crypto: Cryptocurrency) => {
    onChange(crypto);
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center h-9 min-w-25 gap-2 cursor-pointer px-3 py-2 bg-nova-gray-light border border-nova-border rounded-full hover:bg-nova-gray transition-colors"
      >
        {value ? (
          <>
            {/* <span className="text-lg">{value.icon}</span> */}
            <Image src={value.icon!} alt={value.symbol} width={16} height={14} className="rounded-sm" />
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
            className="absolute right-0 top-full mt-2 w-56 bg-white rounded-4xl shadow-sm border border-nova-border overflow-hidden z-50"
          >
            <div className="p-4 ">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-nova-text-muted" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-3 text-sm bg-nova-gray rounded-[30px] border-none focus:outline-none focus:ring-1 focus:ring-nova-primary/20"
                  autoFocus
                />
              </div>
            </div>
            <div className="max-h-48 overflow-y-auto px-2 space-y-1 mb-4">
              {filteredCryptos.map((crypto) => (
                <button
                  key={crypto.id}
                  onClick={() => handleSelect(crypto)}
                  className={`w-full flex items-center gap-3 cursor-pointer rounded-[10px] px-3 py-2.5 text-left hover:bg-nova-gray transition-colors ${
                    value?.id === crypto.id ? "bg-nova-gray" : ""
                  }`}
                >
                  <span
                    className=" flex items-center justify-center rounded-full text-white text-sm"
                  
                  >
                    {/* {crypto.icon} */}
                    <Image src={crypto.icon!} alt={crypto.symbol} width={18} height={18} />
                  </span>
                  <span className="text-sm font-medium text-nova-text">{crypto.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
