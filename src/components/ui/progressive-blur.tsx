import React from "react";

type ProgressiveBlurProps = {
  className?: string;
  /** MUST match the section background. Default: site dark bg #040811 */
  backgroundColor?: string;
  position?: "top" | "bottom";
  height?: string;
  blurAmount?: string;
};

/**
 * ProgressiveBlur — creates a seamless fade from content to background.
 * CRITICAL: backgroundColor MUST match the section background (#040811 for this site).
 */
const ProgressiveBlur = ({
  className = "",
  backgroundColor = "#040811",
  position = "top",
  height = "120px",
  blurAmount = "6px",
}: ProgressiveBlurProps) => {
  const isTop = position === "top";

  return (
    <div
      className={`pointer-events-none absolute left-0 w-full select-none z-10 ${className}`}
      style={{
        [isTop ? "top" : "bottom"]: 0,
        height,
        background: isTop
          ? `linear-gradient(to bottom, ${backgroundColor}, transparent)`
          : `linear-gradient(to top, ${backgroundColor}, transparent)`,
        maskImage: isTop
          ? `linear-gradient(to bottom, ${backgroundColor} 50%, transparent)`
          : `linear-gradient(to top, ${backgroundColor} 50%, transparent)`,
        WebkitBackdropFilter: `blur(${blurAmount})`,
        backdropFilter: `blur(${blurAmount})`,
        WebkitUserSelect: "none",
        userSelect: "none",
      }}
    />
  );
};

export { ProgressiveBlur };
