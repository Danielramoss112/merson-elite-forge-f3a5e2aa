import { SITE } from "@/lib/site";

export function WhatsAppFloat() {
  return (
    <div className="fixed bottom-6 right-6 z-40 hidden md:flex items-center justify-center">
      <a
        href={SITE.whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar no WhatsApp"
        className="wa-float relative flex h-14 w-14 items-center justify-center rounded-full text-white transition-all duration-500 hover:scale-110 hover:-translate-y-1"
        style={{ 
          backgroundColor: "#25D366",
          boxShadow: "0 15px 40px -10px rgba(37, 211, 102, 0.4)"
        }}
      >
        <svg viewBox="0 0 32 32" className="h-7 w-7" fill="currentColor">
          <path d="M16 .4C7.4.4.4 7.4.4 16c0 2.8.7 5.5 2.1 7.9L0 32l8.4-2.5c2.3 1.3 4.9 1.9 7.6 1.9 8.6 0 15.6-7 15.6-15.6S24.6.4 16 .4zm0 28.4c-2.4 0-4.7-.6-6.7-1.9l-.5-.3-5 1.5 1.5-4.9-.3-.5C3.7 20.7 3 18.4 3 16 3 8.8 8.8 3 16 3s13 5.8 13 13-5.8 12.8-13 12.8zm7.4-9.6c-.4-.2-2.4-1.2-2.7-1.3-.4-.1-.6-.2-.9.2s-1 1.3-1.3 1.6c-.2.2-.5.3-.9.1-.4-.2-1.7-.6-3.2-2-1.2-1.1-2-2.4-2.2-2.8-.2-.4 0-.6.2-.8.2-.2.4-.5.6-.7.2-.2.3-.4.4-.7.1-.3 0-.5-.1-.7-.1-.2-.9-2.2-1.3-3-.3-.8-.7-.7-.9-.7h-.8c-.3 0-.7.1-1.1.5s-1.5 1.4-1.5 3.5 1.5 4.1 1.7 4.4c.2.3 3 4.6 7.3 6.4 1 .4 1.8.7 2.5.9 1 .3 2 .3 2.7.2.8-.1 2.4-1 2.8-2 .4-1 .4-1.8.3-2-.1-.2-.4-.3-.8-.5z" />
        </svg>
      </a>
    </div>
  );
}
