"use client";

import { TransactionType } from "@/lib/types";
import { motion } from "framer-motion";

interface TabSwitchProps {
  activeTab: TransactionType;
  onTabChange: (tab: TransactionType) => void;
}

const tabs: { id: TransactionType; label: string }[] = [
  { id: "crypto-to-cash", label: "Crypto to cash" },
  { id: "cash-to-crypto", label: "Cash to crypto" },
  { id: "crypto-to-fiat-loan", label: "Crypto to fiat loan" },
];

export function TabSwitch({ activeTab, onTabChange }: TabSwitchProps) {
  return (
    <div className="relative flex items-center gap-1 p-1 bg-nova-gray rounded-full">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`relative z-10 px-4 py-2 text-sm max-sm:text-[12px] font-medium rounded-full h-8.75 cursor-pointer hover:opacity-80 transition-colors duration-200 whitespace-nowrap ${
            activeTab === tab.id
              ? "text-white"
              : "text-nova-text-muted hover:text-nova-text"
          }`}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-nova-primary rounded-full"
              initial={false}
              transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
            />
          )}
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
