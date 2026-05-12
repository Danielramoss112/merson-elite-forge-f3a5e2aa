"use client";

import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface GradientButtonProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const GradientButton = ({
  children,
  className = "",
  onClick,
  disabled = false,
  ...props
}: GradientButtonProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      className={cn(
        "gradient-btn",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
      onClick={disabled ? undefined : onClick}
      onKeyDown={handleKeyDown}
      aria-disabled={disabled}
      {...props}
    >
      <span className="gradient-btn__label">{children}</span>
    </div>
  );
};

export default GradientButton;
