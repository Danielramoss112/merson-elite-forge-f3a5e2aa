import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
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
    const text = `Olá, Dr. Merson! Gostaria de agendar uma consulta.

Nome: ${form.name}
Telefone: ${form.phone}
E-mail: ${form.email}
Área de interesse: ${form.area}

Mensagem:
${form.message}`;
    window.open(buildWhatsAppLink(text), "_blank");
  };

  const blocks = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      ),
      label: "WhatsApp",
      value: SITE.whatsappDisplay,
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      label: "E-mail",
      value: SITE.email,
    },
  ];

  return (
    <section id="contato" className="relative py-24 sm:py-32 overflow-hidden bg-[#040811]">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 grid lg:grid-cols-2 gap-16 lg:gap-24">
        <div className="reveal">
          <span className="eyebrow">Contato</span>
          <h2 className="mt-8 font-serif text-4xl sm:text-5xl md:text-6xl silver-text">
            Agende sua <span className="italic">Estratégia</span>
          </h2>
          <div className="mt-8 h-[1px] w-24 bg-white/20" />
          <p className="mt-8 text-[1.1rem] text-foreground/40 leading-relaxed max-w-md font-light">
            Entre em contato para uma avaliação técnica rigorosa do seu caso. Atendimento exclusivo e direto com o Dr. Merson.
          </p>

          <div className="mt-12 space-y-8">
            {blocks.map(({ icon, label, value }) => (
              <div key={label} className="flex items-start gap-6">
                <div className="h-12 w-12 shrink-0 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center text-silver">
                  {icon}
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-foreground/30 font-medium">
                    {label}
                  </div>
                  <div className="mt-1.5 text-foreground/80 text-[1.1rem] font-light">{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="reveal reveal-delay-1 rounded-[3rem] p-8 sm:p-12 shadow-elegant space-y-6 bg-ink-soft/50 border border-white/5"
        >
          <Field label="Nome">
            <input
              required
              maxLength={100}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input-field"
              placeholder="Nome completo"
            />
          </Field>
          <div className="grid sm:grid-cols-2 gap-6">
            <Field label="Telefone">
              <input
                required
                maxLength={20}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="input-field"
                placeholder="(00) 00000-0000"
              />
            </Field>
            <Field label="Área de Interesse">
              <select
                required
                value={form.area}
                onChange={(e) => setForm({ ...form, area: e.target.value })}
                className="input-field"
              >
                <option value="">Selecione a área</option>
                {AREAS.map((a) => (
                  <option key={a.id} value={a.title}>
                    {a.title}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <Field label="Mensagem">
            <textarea
              required
              maxLength={1000}
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="input-field resize-none"
              placeholder="Descreva brevemente a situação..."
            />
          </Field>

          <button
            type="submit"
            className="w-full btn-silver inline-flex items-center justify-center gap-3 rounded-full bg-white px-10 py-5 text-sm font-semibold tracking-wide text-background shadow-silver transition-all duration-700"
          >
            Enviar Mensagem <ArrowRight size={20} />
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/30 font-medium pl-1">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
