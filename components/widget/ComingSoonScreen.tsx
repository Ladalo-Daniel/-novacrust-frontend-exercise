"use client";

import { motion } from "framer-motion";
import { FormInput } from "./FormInput";
import { PrimaryButton } from "./PrimaryButton";
import { useState } from "react";

interface ComingSoonScreenProps {
  featureName: string;
  onSubmit: (email: string) => void;
}

export function ComingSoonScreen({ featureName, onSubmit }: ComingSoonScreenProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email.includes("@") && email.includes(".")) {
      onSubmit(email);
      setSubmitted(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center py-8 px-4"
    >
      {/* Coming Soon Title */}
      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="text-2xl font-bold text-nova-primary mb-4"
      >
        Coming Soon!
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center text-nova-text-muted mb-8"
      >
        {featureName} is almost here.
        <br />
        Enter your email and we&apos;ll let you know the moment it&apos;s live.
      </motion.p>

      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full text-center py-8"
        >
          <div className="w-16 h-16 bg-nova-success-light rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-nova-success text-2xl">✓</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">You&apos;re on the list!</h3>
          <p className="text-sm text-nova-text-muted">
            We&apos;ll notify you when {featureName} launches.
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full space-y-4"
        >
          <FormInput
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />

          <PrimaryButton
            onClick={handleSubmit}
            disabled={!email.includes("@") || !email.includes(".")}
            className=" mt-12"
          >
            Update me
          </PrimaryButton>
        </motion.div>
      )}
    </motion.div>
  );
}
