import { useState, useEffect } from "react";

const COOKIE_KEY = "merson-cookies-accepted";

export function CookiesBanner() {
  const [visible, setVisible] = useState(false);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    // Show only if not yet accepted
    const hasLocal = localStorage.getItem(COOKIE_KEY);
    const hasCookie = document.cookie.split('; ').find(row => row.startsWith(COOKIE_KEY + '='));
    
    if (!hasLocal && !hasCookie) {
      // Small delay so it doesn't flash on load
      const t = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "true");
    
    // Set a real cookie valid for 1 year
    const oneYear = 60 * 60 * 24 * 365;
    document.cookie = `${COOKIE_KEY}=true; max-age=${oneYear}; path=/`;

    setHiding(true);
    setTimeout(() => setVisible(false), 500);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="cookies-banner"
      style={{
        opacity: hiding ? 0 : 1,
        transform: hiding ? "translateX(-50%) translateY(20px)" : "translateX(-50%) translateY(0)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
        zIndex: 99999,
      }}
    >
      <div className="cookies-banner__inner">
        {/* Icon */}
        <div className="cookies-banner__icon" aria-hidden>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
            <path d="M12 8V12M12 16H12.01" strokeLinecap="round" />
          </svg>
        </div>

        {/* Text */}
        <p className="cookies-banner__text">
          Utilizamos cookies para entregar uma experiência estratégica e segura. Ao continuar, você concorda com nossa{" "}
          <a href="#" className="cookies-banner__link">
            política de privacidade
          </a>
          .
        </p>

        {/* CTA */}
        <button
          onClick={accept}
          id="cookies-accept-btn"
          className="cookies-banner__btn"
          aria-label="Aceitar cookies"
        >
          Aceitar
        </button>
      </div>

      <style>{`
        .cookies-banner {
          position: fixed;
          bottom: 1.5rem;
          left: 50%;
          transform: translateX(-50%) translateY(0);
          z-index: 9999;
          width: calc(100% - 2.5rem);
          max-width: 680px;
        }
        .cookies-banner__inner {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.25rem;
          background: rgba(4, 8, 17, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 1.5rem;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }
        .cookies-banner__icon {
          flex-shrink: 0;
          color: #64748b;
        }
        .cookies-banner__text {
          flex: 1;
          font-family: 'Inter', sans-serif;
          font-size: 0.8125rem;
          font-weight: 300;
          color: rgba(255, 255, 255, 0.45);
          line-height: 1.5;
          margin: 0;
        }
        .cookies-banner__link {
          color: rgba(148, 163, 184, 0.7);
          text-decoration: underline;
          text-underline-offset: 2px;
          transition: color 0.2s;
        }
        .cookies-banner__link:hover {
          color: rgba(148, 163, 184, 1);
        }
        .cookies-banner__btn {
          flex-shrink: 0;
          background: rgba(255, 255, 255, 0.9);
          color: #040811;
          border: none;
          border-radius: 100px;
          padding: 0.5rem 1.25rem;
          font-family: 'Inter', sans-serif;
          font-size: 0.8125rem;
          font-weight: 600;
          cursor: pointer;
          letter-spacing: 0.02em;
          transition: background 0.3s ease, transform 0.2s ease;
          white-space: nowrap;
        }
        .cookies-banner__btn:hover {
          background: #fff;
          transform: scale(1.03);
        }
        @media (max-width: 1024px) {
          .cookies-banner {
            bottom: 5.5rem; /* Elevate to clear MobileStickyBar */
          }
        }
        @media (max-width: 768px) {
          .cookies-banner {
            width: calc(100% - 1.5rem);
            bottom: 6.5rem;
          }
          .cookies-banner__inner {
            flex-direction: column;
            align-items: flex-start;
            padding: 1.25rem;
            gap: 0.75rem;
          }
          .cookies-banner__btn {
            width: 100%;
            text-align: center;
            padding: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}
