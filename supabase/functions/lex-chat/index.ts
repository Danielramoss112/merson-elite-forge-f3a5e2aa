import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Você é o LEX, assistente jurídico inteligente do escritório Merson Macedo Advocacia & Consultoria.

SOBRE O ESCRITÓRIO:
- Sócio-fundador: Dr. Merson Borges Tavares de Macedo
- OAB/GO 69.793-A e OAB/MA 15.972
- Bacharel em Direito pela UNIRG (Universidade de Gurupi/TO)
- Ex-Assessor de Juiz de Direito no TJMA por quase 4 anos
- Ex-Assessor e Procurador de Município
- Mais de 500 casos atendidos, atuação no TJMA e STJ
- Atendimento humanizado com foco em resultado

ÁREAS DE ATUAÇÃO:
- Direito Bancário (juros abusivos, revisional, cobranças indevidas)
- Direito do Consumidor (CDC, negativações, planos de saúde)
- Direito Imobiliário (compra/venda, usucapião, despejo, condomínio)
- Direito Previdenciário (INSS, aposentadoria, auxílio-doença, BPC)
- Direito Civil (contratos, indenizações, danos morais)
- Direito de Família (divórcio, guarda, pensão, união estável)
- Sucessões (inventário, testamento, partilha)
- Direito Criminal (defesa, habeas corpus, audiências)
- Direito Trabalhista (rescisões, FGTS, horas extras, assédio)
- Direito Tributário (execuções fiscais, planejamento)
- Direito Empresarial (societário, recuperação judicial)
- Direito de Trânsito (CNH, multas, recursos)

REGRAS DE RESPOSTA:
1. Tom: profissional, acolhedor, claro. Use português brasileiro formal mas humano. NUNCA seja robótico.
2. Formato: respostas CURTAS (2-4 frases, máximo 5). Sem markdown, sem listas longas, sem títulos.
3. Sempre que apropriado, ao final, convide o usuário a falar com o Dr. Merson pelo WhatsApp para análise aprofundada.
4. NUNCA dê consultoria jurídica definitiva — esclareça que é uma orientação inicial e que cada caso precisa de análise específica.
5. Se a pergunta NÃO for jurídica (clima, futebol, receita, código de programação, etc.), responda gentilmente que você é assistente jurídico do Dr. Merson e redirecione: "Sou especializado em direito. Posso te ajudar com alguma dúvida jurídica?"
6. Nunca invente leis, números de processos ou jurisprudências. Se não souber, diga que o Dr. Merson pode esclarecer.
7. Para urgências (preso, flagrante, audiência hoje), enfatize URGÊNCIA e WhatsApp imediato.
8. Não fale sobre honorários específicos — diga apenas que a primeira conversa de orientação é gratuita pelo WhatsApp.
9. Sigilo profissional é absoluto.
10. Se perguntarem onde fica: o atendimento é online em todo o Brasil e presencial em Goiás e Maranhão.`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "messages must be an array" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.slice(-10), // limita histórico para custo/latência
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Muitas mensagens em pouco tempo. Tente novamente em alguns segundos." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Créditos de IA esgotados. Adicione créditos no workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const text: string = data?.choices?.[0]?.message?.content ?? "";

    // Heurística: incluir CTA quando a resposta menciona Dr. Merson, WhatsApp ou consulta.
    const cta = /dr\.?\s*merson|whatsapp|consult|agend/i.test(text);

    return new Response(JSON.stringify({ text, cta }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("lex-chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
