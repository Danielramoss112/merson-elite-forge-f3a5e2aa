import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "Como funciona a primeira consulta?",
    a: "A primeira consulta é uma análise estratégica do seu caso. Entramos em contato via WhatsApp para agendar um horário, presencial ou online, onde o Dr. Merson ouvirá sua situação e apresentará as melhores alternativas jurídicas disponíveis.",
  },
  {
    q: "Atendem clientes de outros estados?",
    a: "Sim. Com inscrições ativas na OAB/GO e OAB/MA, atendemos clientes de todo o Brasil de forma presencial ou totalmente remota, com a mesma qualidade e comprometimento.",
  },
  {
    q: "Quais são as formas de pagamento dos honorários?",
    a: "Os honorários são combinados individualmente conforme a complexidade do caso. Trabalhamos com pagamento à vista, parcelado e, em alguns casos, com honorários de êxito (somente após resultado positivo).",
  },
  {
    q: "Quanto tempo leva um processo judicial?",
    a: "O prazo varia conforme a área e a complexidade do caso. Processos extrajudiciais podem ser resolvidos em semanas; ações judiciais levam em média de 6 meses a 3 anos. Sempre informamos uma estimativa realista logo na primeira consulta.",
  },
  {
    q: "Meus dados e informações ficam protegidos?",
    a: "Absolutamente. O sigilo profissional é um dever ético e legal do advogado, garantido pelo Estatuto da OAB. Todas as informações compartilhadas são tratadas com total confidencialidade.",
  },
  {
    q: "Vocês atuam em causas urgentes?",
    a: "Sim. Temos estrutura para atender casos urgentes como habeas corpus, liminares e medidas cautelares com agilidade e eficiência. Entre em contato imediatamente pelo WhatsApp.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center reveal">
          <span className="eyebrow">Dúvidas Frequentes</span>
          <h2 className="mt-6 font-serif text-4xl md:text-5xl">
            Perguntas <span className="italic gold-text">Frequentes</span>
          </h2>
          <div className="ornament" aria-hidden>
            <span className="ornament-diamond" />
          </div>
        </div>

        <div className="mt-12 space-y-3">
          {faqs.map((f, idx) => {
            const isOpen = open === idx;
            return (
              <div
                key={idx}
                className={`reveal rounded-2xl border bg-card overflow-hidden transition-all duration-500 ${
                  isOpen ? "border-gold/50 shadow-gold" : "border-border hover:border-gold/25"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : idx)}
                  className="w-full flex items-center gap-4 p-5 md:p-6 text-left group"
                  aria-expanded={isOpen}
                >
                  <HelpCircle
                    className={`text-gold shrink-0 transition-transform duration-500 ${
                      isOpen ? "scale-110" : "group-hover:scale-105"
                    }`}
                    size={20}
                  />
                  <span className="flex-1 font-medium text-foreground/95 font-body-serif text-[1.08rem]">
                    {f.q}
                  </span>
                  <span
                    className={`text-gold shrink-0 transition-transform duration-500 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </span>
                </button>
                {isOpen && (
                  <div className="faq-answer px-6 pb-6 pl-[3.5rem] text-foreground/70 leading-relaxed font-body-serif text-[1.02rem]">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
