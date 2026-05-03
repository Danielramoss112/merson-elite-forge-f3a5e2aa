import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Como funciona o agendamento da consultoria?",
    a: "O agendamento é feito diretamente via WhatsApp ou formulário de contato. Após o primeiro contato, realizamos uma triagem inicial para entender a complexidade do seu caso e agendar uma reunião estratégica presencial ou por videoconferência.",
  },
  {
    q: "O Dr. Merson atende em quais regiões?",
    a: "Nossa sede física localiza-se em Cidade Ocidental/GO, mas atendemos clientes em todo o território nacional, com foco especial nos tribunais do Maranhão (TJMA) e tribunais superiores em Brasília.",
  },
  {
    q: "Quanto custa uma consulta inicial?",
    a: "Os honorários são calculados com base na complexidade da demanda e seguem rigorosamente a tabela da OAB. Entre em contato para uma avaliação personalizada do seu cenário jurídico.",
  },
  {
    q: "Como recebo atualizações sobre o meu processo?",
    a: "Prezamos pela transparência absoluta. Nossos clientes recebem relatórios periódicos e possuem canal direto com a equipe para sanar dúvidas sobre o andamento processual a qualquer momento.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-[#040811]">
      <div className="relative mx-auto max-w-4xl px-5 sm:px-6">
        <div className="text-center reveal">
          <span className="eyebrow">Dúvidas Frequentes</span>
          <h2 className="mt-8 font-serif text-4xl sm:text-5xl md:text-6xl">
            Transparência e <span className="italic silver-text">Clareza</span>
          </h2>
          <div className="ornament" aria-hidden>
            <span className="ornament-diamond" />
          </div>
        </div>

        <div className="mt-16 sm:mt-24 space-y-4">
          {faqs.map((f, i) => (
            <div
              key={i}
              className="reveal"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className={`flex w-full items-center justify-between gap-6 rounded-[2rem] border p-8 text-left transition-all duration-1000 ${
                  open === i
                    ? "border-white/20 bg-white/5"
                    : "border-white/5 bg-transparent hover:border-white/10"
                }`}
              >
                <span className="font-serif text-xl sm:text-2xl text-foreground/80">
                  {f.q}
                </span>
                <span className={`shrink-0 text-silver transition-transform duration-1000 ${open === i ? "rotate-180" : ""}`}>
                  {open === i ? <Minus size={24} /> : <Plus size={24} />}
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-[1500ms] ease-in-out ${
                  open === i ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-10 text-[1.1rem] leading-relaxed text-foreground/40 font-light">
                  {f.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
