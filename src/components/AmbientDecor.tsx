"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function AmbientDecor() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {ready ? (
        <>
          <motion.div
            className="absolute top-8 right-6 text-6xl opacity-70 sm:top-12 sm:right-16"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            🌙
          </motion.div>
          <motion.div
            className="absolute top-16 left-[-10px] text-5xl opacity-50 sm:left-8"
            animate={{ x: [0, 16, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          >
            ☁️
          </motion.div>
          <motion.div
            className="absolute top-28 right-[18%] text-4xl opacity-40"
            animate={{ x: [0, -14, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          >
            ☁️
          </motion.div>
          <motion.div
            className="absolute top-[38%] left-3 text-4xl opacity-70 sm:left-10"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          >
            🧸
          </motion.div>
          <motion.div
            className="absolute top-[52%] right-4 text-3xl opacity-70 sm:right-14"
            animate={{ y: [0, -14, 0], x: [0, 8, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          >
            🦋
          </motion.div>
          <motion.div
            className="absolute top-[72%] left-[12%] text-3xl opacity-60"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          >
            🦋
          </motion.div>
          <motion.span
            className="absolute top-40 left-1/2 text-xl"
            animate={{ opacity: [0.25, 1, 0.25], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 3.4, repeat: Infinity }}
          >
            ✨
          </motion.span>
          <motion.span
            className="absolute top-[30%] right-[30%] text-lg"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 3.2, repeat: Infinity, delay: 1 }}
          >
            ✨
          </motion.span>
          <motion.span
            className="absolute top-[64%] left-[28%] text-lg"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 3.6, repeat: Infinity, delay: 1.8 }}
          >
            ✨
          </motion.span>
          <motion.span
            className="absolute bottom-24 right-[18%] text-xl"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 3.1, repeat: Infinity, delay: 0.6 }}
          >
            ✨
          </motion.span>
        </>
      ) : null}
    </div>
  );
}

export function FloralCorners() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 320 420"
      className="pointer-events-none absolute inset-3 h-[calc(100%-24px)] w-[calc(100%-24px)] text-rosegold/70"
      fill="none"
    >
      <path
        d="M28 78c18-28 46-36 62-22-22 8-34 28-28 48-18-8-32-8-34-26Zm254 0c-18-28-46-36-62-22 22 8 34 28 28 48 18-8 32-8 34-26ZM28 342c18 28 46 36 62 22-22-8-34-28-28-48-18 8-32 8-34 26Zm254 0c-18 28-46 36-62 22 22-8 34-28 28-48 18 8 32 8 34 26Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="36" cy="56" r="3" fill="currentColor" />
      <circle cx="284" cy="56" r="3" fill="currentColor" />
      <circle cx="36" cy="364" r="3" fill="currentColor" />
      <circle cx="284" cy="364" r="3" fill="currentColor" />
    </svg>
  );
}

export function SectionOrnament() {
  return (
    <div className="my-5 flex items-center justify-center gap-3 text-rosegold">
      <span className="h-px w-10 bg-rosegold/40" />
      <span className="text-sm">❀</span>
      <span className="h-px w-10 bg-rosegold/40" />
    </div>
  );
}
