"use client";

import { useState } from "react";
import { WidgetModal } from "@/components/widget";
import Image from "next/image";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-white to-slate-50 flex items-center justify-center p-4 md:p-8">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-linear-to-br from-nova-primary/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-linear-to-tl from-nova-success/5 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Demo Page Content */}
      <div className="relative z-10 text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {/* <div className="w-12 h-12 bg-nova-primary rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">N</span>
          </div>
          <span className="font-bold text-2xl tracking-tight">NOVACRUST</span> */}

           <Image src="/nova-logo.svg" alt="Novacrust Logo" width={170} height={170} />
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-nova-text mb-4">
          Crypto Checkout Widget
        </h1>
        <p className="text-lg text-nova-text-muted mb-8 max-w-md mx-auto">
          A modern, embeddable crypto payment solution for any website.
          Convert crypto to cash seamlessly.
        </p>

        {/* Open Widget Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-8 py-4 bg-nova-primary cursor-pointer text-white font-semibold rounded-full hover:bg-nova-primary-dark transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-100"
        >
          <span>Open Checkout Widget</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </button>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-nova-border">
            <div className="w-10 h-10 bg-nova-success-light rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-nova-success text-xl">⚡</span>
            </div>
            <h3 className="font-semibold mb-2">Fast Conversion</h3>
            <p className="text-sm text-nova-text-muted">
              Convert crypto to fiat in seconds with competitive rates.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-nova-border">
            <div className="w-10 h-10 bg-nova-success-light rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-nova-success text-xl">🔒</span>
            </div>
            <h3 className="font-semibold mb-2">Secure</h3>
            <p className="text-sm text-nova-text-muted">
              Bank-grade security for all your transactions.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-nova-border">
            <div className="w-10 h-10 bg-nova-success-light rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-nova-success text-xl">🌍</span>
            </div>
            <h3 className="font-semibold mb-2">Global</h3>
            <p className="text-sm text-nova-text-muted">
              Support for multiple currencies and payment methods.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12">
          <p className="text-xs text-nova-text-muted">
            Powered by{" "}
            <span className="font-semibold text-nova-primary">Novacrust</span>
          </p>
        </div>
      </div>

      {/* Widget Modal */}
      <WidgetModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
