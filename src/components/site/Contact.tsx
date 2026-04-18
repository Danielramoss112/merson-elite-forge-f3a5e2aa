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
    <section id="contato" className="relative py-28 overflow-hidden bg-ink-soft/30">
      <div className="deco-circle" style={{ width: 460, height: 460, bottom: -180, right: -180 }} />

      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16">
        <div className="reveal">
          <span className="inline-block rounded-full border border-gold/40 bg-gold/5 px-4 py-1.5 text-[10px] tracking-[0.22em] uppercase text-gold">
            Contato
          </span>
          <h2 className="mt-5 font-serif text-4xl md:text-5xl">
            Agende sua <span className="italic gold-text">Consulta</span>
          </h2>
          <div className="mt-4 h-[2px] w-20 gradient-gold rounded-full" />
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
          className="reveal rounded-3xl border border-border bg-card p-8 md:p-10 shadow-elegant space-y-5"
        >
          <Field label="Nome">
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input-field"
            />
          </Field>
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Telefone">
              <input
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="input-field"
              />
            </Field>
            <Field label="E-mail">
              <input
                type="email"
                required
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
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="input-field resize-none"
            />
          </Field>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 rounded-full gradient-gold px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-gold hover:opacity-90 transition-all"
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
          background: oklch(0.10 0.012 260);
          border: 1px solid var(--border);
          border-radius: 0.75rem;
          padding: 0.75rem 1rem;
          color: var(--foreground);
          font-size: 0.95rem;
          transition: border-color 0.2s;
        }
        .input-field:focus {
          outline: none;
          border-color: var(--gold);
        }
        .input-field option { background: oklch(0.14 0.012 260); }
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
