import { useState, type FormEvent } from "react";
import { Phone, Mail, MapPin, Scale, ArrowRight } from "lucide-react";
import { AREAS, SITE, buildWhatsAppLink } from "@/lib/site";

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    area: "",
    message: "",
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = `Olá, Dr. Merson! Gostaria de uma consulta.

Nome: ${form.name}
Telefone: ${form.phone}
E-mail: ${form.email}
Área de interesse: ${form.area}

Mensagem:
${form.message}`;
    window.open(buildWhatsAppLink(text), "_blank");
  };

  const blocks = [
    { icon: Phone, label: "WhatsApp", value: SITE.whatsappDisplay },
    { icon: Mail, label: "E-mail", value: SITE.email },
    { icon: MapPin, label: "Endereço", value: SITE.address },
    { icon: Scale, label: "OAB", value: "OAB/MA 15.972 · OAB/GO 69.793-A" },
  ];

  return (
    <section
      id="contato"
      className="relative py-28 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0a1426 0%, #0f1a2e 60%, #1a365d 100%)",
      }}
    >
      {/* subtle noise */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
      <div className="deco-circle" style={{ width: 460, height: 460, bottom: -180, right: -180 }} />

      <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16">
        <div className="reveal">
          <span className="eyebrow">Contato</span>
          <h2 className="mt-6 font-serif text-4xl md:text-5xl">
            Agende sua <span className="italic gold-text">Consulta</span>
          </h2>
          <div className="mt-5 h-[2px] w-20 gradient-gold rounded-full" />
          <p className="mt-5 text-foreground/70 max-w-md">
            Entre em contato para uma avaliação estratégica do seu caso.
          </p>

          <div className="mt-10 space-y-5">
            {blocks.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="h-12 w-12 shrink-0 rounded-xl border border-gold/40 bg-gold/10 flex items-center justify-center text-gold">
                  <Icon size={20} />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-foreground/55">
                    {label}
                  </div>
                  <div className="mt-1 text-foreground/90">{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="reveal rounded-3xl p-8 md:p-10 shadow-elegant space-y-5"
          style={{ background: "#1a1a1a", border: "1px solid #a8b8d0" }}
        >
          <Field label="Nome">
            <input
              required
              maxLength={100}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input-field"
            />
          </Field>
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Telefone">
              <input
                required
                maxLength={20}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="input-field"
              />
            </Field>
            <Field label="E-mail">
              <input
                type="email"
                required
                maxLength={120}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input-field"
              />
            </Field>
          </div>
          <Field label="Área de Interesse">
            <select
              required
              value={form.area}
              onChange={(e) => setForm({ ...form, area: e.target.value })}
              className="input-field"
            >
              <option value="">Selecione uma área</option>
              {AREAS.map((a) => (
                <option key={a.id} value={a.title}>
                  {a.title}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Mensagem">
            <textarea
              required
              maxLength={1000}
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="input-field resize-none"
            />
          </Field>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-primary-foreground transition-all hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #a8b8d0, #cdd6e3)",
              boxShadow: "0 10px 30px -10px rgba(168,184,208,0.55)",
            }}
          >
            Enviar Mensagem <ArrowRight size={16} />
          </button>
          <p className="text-center text-sm text-foreground/60">
            Ou fale diretamente via{" "}
            <a
              href={SITE.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="text-gold hover:underline"
            >
              WhatsApp
            </a>
          </p>
        </form>
      </div>

      <style>{`
        .input-field {
          width: 100%;
          background: #111;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 0.75rem;
          padding: 0.75rem 1rem;
          color: var(--foreground);
          font-size: 0.95rem;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .input-field:focus {
          outline: none;
          border-color: #a8b8d0;
          box-shadow: 0 0 0 3px rgba(168,184,208,0.15);
        }
        .input-field option { background: #111; }
      `}</style>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.2em] text-foreground/60">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
