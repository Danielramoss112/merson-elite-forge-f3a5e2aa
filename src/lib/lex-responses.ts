export type LexResponse = { text: string; cta: boolean };

export function getLexResponse(input: string): LexResponse {
  const msg = input.toLowerCase();
  if (/banco|juros|financiamento|empr[eé]stimo|cart[aã]o|d[ií]vida|indevido|cobrado/.test(msg))
    return { text: "No Direito Bancário posso te ajudar com revisão de contratos com juros abusivos, devolução de valores cobrados indevidamente, defesa em execuções bancárias e negociação de dívidas. Muitos contratos têm cláusulas ilegais! O Dr. Merson pode analisar o seu gratuitamente. Quer agendar uma consulta?", cta: true };
  if (/produto|servi[cç]o|loja|empresa|cancelar|plano|sa[uú]de|seguro|enganado|consumidor/.test(msg))
    return { text: "No Direito do Consumidor você tem direitos garantidos pelo CDC: cancelamento de contratos, danos morais, negativação indevida no SPC/Serasa e revisão de planos de saúde. O fornecedor tem obrigação de cumprir o que prometeu! Quer conversar com o Dr. Merson?", cta: true };
  if (/im[oó]vel|casa|apartamento|terreno|aluguel|compra|venda|construtora|despejo|escritura/.test(msg))
    return { text: "No Direito Imobiliário atuo em compra e venda, regularização de imóveis, usucapião, despejo e conflitos com construtoras. Toda transação precisa de análise jurídica! Posso conectar você com o Dr. Merson.", cta: true };
  if (/inss|aposentadoria|benef[ií]cio|aux[ií]lio|doen[cç]a|invalidez|pens[aã]o|morte|bpc|loas|negado|indeferido/.test(msg))
    return { text: "No Direito Previdenciário luto pelos seus benefícios no INSS: aposentadoria, auxílio-doença, invalidez, pensão por morte e BPC/LOAS. Muitos benefícios negados podem ser revertidos! Quer que o Dr. Merson avalie seu caso?", cta: true };
  if (/contrato|dano|preju[ií]zo|cobrar|vizinho|acidente|indeniza[cç][aã]o|responsabilidade/.test(msg))
    return { text: "No Direito Civil resolvo conflitos do dia a dia: contratos, indenizações por danos morais e materiais, cobranças e rescisões. Se alguém te causou prejuízo, você tem direito à reparação! O Dr. Merson pode avaliar seu caso.", cta: true };
  if (/div[oó]rcio|separa[cç][aã]o|filhos|guarda|pens[aã]o|alimentos|heran[cç]a|invent[aá]rio|testamento|uni[aã]o|fam[ií]lia/.test(msg))
    return { text: "Na área de Família e Sucessões cuido de divórcio, guarda e pensão alimentícia, inventário e partilha de herança e testamentos. Cada família merece solução personalizada. Posso agendar com o Dr. Merson?", cta: true };
  if (/preso|crime|policial|delegacia|inqu[eé]rito|habeas|criminal|acusado/.test(msg))
    return { text: "No Direito Criminal ofereço defesa em inquéritos e ações penais, habeas corpus, crimes de trânsito e financeiros. O tempo é crucial — fale com o Dr. Merson agora pelo WhatsApp!", cta: true };
  if (/honor[aá]rios|pre[cç]o|custo|valor|quanto|pagar/.test(msg))
    return { text: "Os honorários são combinados conforme a complexidade do caso. Trabalhamos com pagamento à vista, parcelado e honorários de êxito — você só paga após resultado positivo!", cta: true };
  if (/prazo|tempo|demora|quanto tempo/.test(msg))
    return { text: "Processos extrajudiciais podem ser resolvidos em semanas. Ações judiciais levam em média 6 meses a 3 anos. O Dr. Merson sempre apresenta estimativa realista na primeira consulta.", cta: true };
  if (/urgente|urg[eê]ncia|emerg[eê]ncia|imediato/.test(msg))
    return { text: "Sim, atendemos casos urgentes! Habeas corpus, liminares e medidas cautelares com agilidade. Entre em contato agora pelo WhatsApp!", cta: true };
  if (/consulta|agendar|whatsapp|falar|contato|doutor|merson|advogado/.test(msg))
    return { text: "O Dr. Merson está disponível para te atender agora!", cta: true };
  return { text: "Para te dar a orientação mais precisa, o ideal é o Dr. Merson avaliar seu caso pessoalmente. A primeira consulta é estratégica e totalmente focada na sua situação. Quer agendar agora pelo WhatsApp?", cta: true };
}

export const QUICK_CHIPS = [
  "Direito Bancário",
  "Direito do Consumidor",
  "Direito Imobiliário",
  "Direito Previdenciário",
  "Direito Civil",
  "Família & Sucessões",
  "Direito Criminal",
  "Falar com Dr. Merson",
];
