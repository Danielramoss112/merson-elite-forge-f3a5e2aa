"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface TypewriterEffectProps {
  text: string;
  className?: string;
  speed?: number;
}

export const TypewriterEffect = ({
  text,
  className,
  speed = 0.02,
}: TypewriterEffectProps) => {
  const wordsArray = text.split("");
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <motion.span
      ref={containerRef}
      className={cn(
        "inline",
        className
      )}
    >
      {wordsArray.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{
            duration: 0.01,
            delay: index * speed,
          }}
        >
          {char}
        </motion.span>
      ))}
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: [0, 1, 0] } : {}}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "linear",
        }}
        className="inline-block w-[2px] h-[1em] bg-silver ml-1 translate-y-[20%]"
      />
    </motion.span>
  );
};
