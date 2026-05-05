"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

export const Circle = ({
  className,
  children,
  idx,
  style,
  ...rest
}: {
  className?: string;
  children?: React.ReactNode;
  idx?: number;
  style?: React.CSSProperties;
  [key: string]: unknown;
}) => {
  return (
    <motion.div
      {...rest}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: (idx ?? 0) * 0.1, duration: 0.3 }}
      className={cn(
        "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full",
        className
      )}
    />
  );
};

export const Radar = ({ className }: { className?: string }) => {
  const circles = new Array(8).fill(1);
  return (
    <div
      className={cn(
        "relative flex h-20 w-20 items-center justify-center rounded-full",
        className
      )}
    >
      <style>{`
        @keyframes radar-spin {
          from { transform: rotate(20deg); }
          to   { transform: rotate(380deg); }
        }
        .animate-radar-spin {
          animation: radar-spin 10s linear infinite;
        }
      `}</style>

      {/* Rotating sweep line */}
      <div
        style={{ transformOrigin: "right center" }}
        className="animate-radar-spin absolute right-1/2 top-1/2 z-40 flex h-[5px] w-[400px] items-end justify-center overflow-hidden bg-transparent"
      >
        <div className="relative z-40 h-[1px] w-full bg-gradient-to-r from-transparent via-sky-500/60 to-transparent" />
      </div>

      {/* Concentric circles — dark blue only */}
      {circles.map((_, idx) => (
        <Circle
          style={{
            height: `${(idx + 1) * 5}rem`,
            width: `${(idx + 1) * 5}rem`,
            border: `1px solid rgba(30, 58, 138, ${0.8 - idx * 0.1})`,
          }}
          key={`circle-${idx}`}
          idx={idx}
        />
      ))}
    </div>
  );
};

export const IconContainer = ({
  icon,
  text,
  subtext,
  delay,
  num,
}: {
  icon?: React.ReactNode;
  text?: string;
  subtext?: string;
  delay?: number;
  num?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay ?? 0 }}
      className="relative z-50 flex flex-col items-center justify-center space-y-3 text-center max-w-[180px] mx-auto"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#1e3a8a]/40 bg-[#06101f] shadow-inner text-sky-400">
        {icon || (
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path d="M9 12h6M9 16h6M9 8h6M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" />
          </svg>
        )}
      </div>
      {num && (
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#1e3a8a]/80 font-mono font-medium">
          {num}
        </span>
      )}
      <div className="space-y-1">
        <div className="text-sm font-serif text-foreground/80 leading-tight">{text}</div>
        {subtext && (
          <div className="text-xs font-light text-foreground/35 leading-relaxed">{subtext}</div>
        )}
      </div>
    </motion.div>
  );
};
