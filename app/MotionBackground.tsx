"use client"; // Indica que se renderiza en el cliente

import { motion, AnimatePresence } from "framer-motion";

export default function MotionBackground() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-red-300 via-white to-blue-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1 } }}
        exit={{ opacity: 0, transition: { duration: 1 } }}
      />
    </AnimatePresence>
  );
}