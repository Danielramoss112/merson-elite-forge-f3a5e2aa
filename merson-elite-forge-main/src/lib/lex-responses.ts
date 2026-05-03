export type LexResponse = { text: string; cta: boolean };

export function getLexResponse(input: string): LexResponse {
  const msg = input.toLowerCase();

  // ===== Saudações e cordialidade =====
  if (/^(oi|ol[aá]|hey|hello|bom dia|boa tarde|boa noite|e a[ií])/.test(msg))
    return { text: "Olá! Seja bem-vindo(a) ao escritório Merson Macedo Advocacia & Consultoria. Sou o LEX, assistente jurídico inteligente. Como posso te ajudar hoje? Você pode me contar sua dúvida ou escolher uma área de atuação.", cta: false };

  if (/obrigad|valeu|agrade|gratid/.test(msg))
    return { text: "Por nada! Estou aqui para esclarecer suas dúvidas iniciais. Se quiser uma análise aprofundada do seu caso, o Dr. Merson está disponível para uma consulta estratégica. Posso conectar vocês agora?", cta: true };

  if (/tchau|at[eé] (mais|logo|breve)|fui|adeus/.test(msg))
    return { text: "Até logo! Lembre-se: o Dr. Merson está sempre disponível pelo WhatsApp para casos urgentes. Volte sempre que precisar!", cta: true };

  // ===== Áreas do direito principais =====
  if (/banco|juros|financiamento|empr[eé]stimo|cart[aã]o|d[ií]vida|indevido|cobrado|cdc bancário|revisional/.test(msg))
    return { text: "No Direito Bancário posso te ajudar com revisão de contratos com juros abusivos, devolução de valores cobrados indevidamente, defesa em execuções bancárias e negociação de dívidas. Muitos contratos têm cláusulas ilegais! O Dr. Merson pode analisar o seu gratuitamente. Quer agendar uma consulta?", cta: true };

  if (/produto|servi[cç]o|loja|empresa|cancelar|plano|sa[uú]de|seguro|enganado|consumidor|spc|serasa|negativ/.test(msg))
    return { text: "No Direito do Consumidor você tem direitos garantidos pelo CDC: cancelamento de contratos, danos morais, negativação indevida no SPC/Serasa e revisão de planos de saúde. O fornecedor tem obrigação de cumprir o que prometeu! Quer conversar com o Dr. Merson?", cta: true };

  if (/im[oó]vel|casa|apartamento|terreno|aluguel|compra|venda|construtora|despejo|escritura|usucapi[aã]o|condom[ií]nio/.test(msg))
    return { text: "No Direito Imobiliário atuo em compra e venda, regularização de imóveis, usucapião, despejo, conflitos com construtoras e questões condominiais. Toda transação precisa de análise jurídica! Posso conectar você com o Dr. Merson.", cta: true };

  if (/inss|aposentadoria|benef[ií]cio|aux[ií]lio|doen[cç]a|invalidez|pens[aã]o|morte|bpc|loas|negado|indeferido|previden/.test(msg))
    return { text: "No Direito Previdenciário luto pelos seus benefícios no INSS: aposentadoria, auxílio-doença, invalidez, pensão por morte e BPC/LOAS. Muitos benefícios negados podem ser revertidos! Quer que o Dr. Merson avalie seu caso?", cta: true };

  if (/contrato civil|dano|preju[ií]zo|cobrar|vizinho|acidente|indeniza[cç][aã]o|responsabilidade civil/.test(msg))
    return { text: "No Direito Civil resolvo conflitos do dia a dia: contratos, indenizações por danos morais e materiais, cobranças e rescisões. Se alguém te causou prejuízo, você tem direito à reparação! O Dr. Merson pode avaliar seu caso.", cta: true };

  if (/div[oó]rcio|separa[cç][aã]o|filhos|guarda|alimentos|fam[ií]lia|uni[aã]o est[aá]vel|adot|paternidade/.test(msg))
    return { text: "Na área de Família cuido de divórcio, guarda compartilhada, pensão alimentícia, união estável, reconhecimento de paternidade e adoção. Cada família merece solução personalizada e humanizada. Posso agendar com o Dr. Merson?", cta: true };

  if (/heran[cç]a|invent[aá]rio|testamento|sucess|partilha|esp[oó]lio|herdeiro/.test(msg))
    return { text: "Em Sucessões cuido de inventário judicial e extrajudicial, partilha de bens, testamentos e planejamento sucessório. Resolvemos heranças com agilidade e evitamos conflitos familiares. Quer falar com o Dr. Merson?", cta: true };

  if (/preso|crime|policial|delegacia|inqu[eé]rito|habeas|criminal|acusado|flagrante|audi[eê]ncia de cust[oó]dia/.test(msg))
    return { text: "No Direito Criminal ofereço defesa em inquéritos e ações penais, habeas corpus, audiência de custódia, crimes de trânsito e financeiros. O tempo é crucial — fale com o Dr. Merson agora pelo WhatsApp!", cta: true };

  // ===== Novas áreas =====
  if (/trabalh|clt|demiss[aã]o|hora extra|fgts|verbas|rescis[aã]o|justa causa|ass[eé]dio/.test(msg))
    return { text: "No Direito Trabalhista atuo em rescisões, verbas rescisórias, horas extras, FGTS, assédio moral e reconhecimento de vínculo. Tem até 2 anos após a saída para reclamar seus direitos! Quer conversar com o Dr. Merson?", cta: true };

  if (/imposto|tribut|receita|fisco|icms|iss|irpf|irpj|execu[cç][aã]o fiscal/.test(msg))
    return { text: "No Direito Tributário trabalho com defesa em execuções fiscais, recuperação de tributos pagos indevidamente, parcelamentos e planejamento tributário. Empresas e pessoas físicas pagam mais imposto do que deveriam! Posso agendar?", cta: true };

  if (/empresa|s[oó]cio|cnpj|abrir empresa|contrato social|empresarial|societ[aá]rio|falência|recupera[cç][aã]o judicial/.test(msg))
    return { text: "No Direito Empresarial atendo abertura de empresas, contratos societários, dissolução, recuperação judicial e consultoria preventiva. Sua empresa precisa de blindagem jurídica! Quer falar com o Dr. Merson?", cta: true };

  if (/tr[aâ]nsito|multa|cnh|suspens[aã]o|detran|carteira|habilita[cç][aã]o/.test(msg))
    return { text: "Em questões de trânsito atuo em defesa de multas, recursos no DETRAN, suspensão e cassação de CNH. Muitas autuações são nulas! O Dr. Merson pode avaliar sua situação rapidamente.", cta: true };

  if (/contrato|cl[aá]usula|assinar|nulo|rescindir/.test(msg))
    return { text: "Análise e elaboração de contratos é fundamental para sua segurança. Reviso cláusulas abusivas, elaboro contratos personalizados e atuo em rescisões. Nunca assine sem ler! Quer que o Dr. Merson analise o seu?", cta: true };

  if (/dano moral|moral|honra|imagem|difama|cal[uú]nia|inj[uú]ria/.test(msg))
    return { text: "Em danos morais atuo em casos de ofensa à honra, difamação, calúnia, injúria, exposição indevida em redes sociais e abusos. Você merece reparação! Posso conectar você com o Dr. Merson.", cta: true };

  if (/recurso|apela[cç][aã]o|stj|stf|2[ªa] inst[aâ]ncia|tribunal/.test(msg))
    return { text: "Atuamos em recursos em todas as instâncias: TJ, TRF, STJ e STF. Com experiência de 4 anos como Assessor de Juiz, o Dr. Merson conhece exatamente como construir teses recursais sólidas. Quer conversar?", cta: true };

  if (/media[cç][aã]o|conciliação|acordo|extrajudicial/.test(msg))
    return { text: "Acreditamos em soluções extrajudiciais quando possível: mediação, conciliação e acordos diretos economizam tempo e dinheiro. Mas quando preciso, levamos à Justiça com firmeza. Quer agendar?", cta: true };

  if (/administrativo|servidor p[uú]blico|concurso|licita[cç][aã]o|processo administrativo/.test(msg))
    return { text: "No Direito Administrativo atendo servidores públicos, candidatos de concurso, processos administrativos disciplinares (PAD) e licitações. Quer falar com o Dr. Merson?", cta: true };

  // ===== Operacionais do escritório =====
  if (/honor[aá]rios|pre[cç]o|custo|valor|quanto|pagar|cobr[ao]/.test(msg))
    return { text: "Os honorários são combinados conforme a complexidade do caso. Trabalhamos com pagamento à vista, parcelado e honorários de êxito — em muitos casos você só paga após resultado positivo! Quer um orçamento personalizado?", cta: true };

  if (/prazo|tempo|demora|quanto tempo|quando termina/.test(msg))
    return { text: "Processos extrajudiciais podem ser resolvidos em semanas. Ações judiciais levam em média 6 meses a 3 anos, dependendo da complexidade e instância. O Dr. Merson sempre apresenta estimativa realista na primeira consulta.", cta: true };

  if (/urgente|urg[eê]ncia|emerg[eê]ncia|imediato|agora|hoje/.test(msg))
    return { text: "Sim, atendemos casos urgentes! Habeas corpus, liminares, medidas cautelares e tutelas de urgência com agilidade. Entre em contato agora pelo WhatsApp!", cta: true };

  if (/onde|endere[cç]o|localiza|escrit[oó]rio|cidade|maranh[aã]o|goi[aá]s|s[aã]o lu[ií]s|goi[aâ]nia/.test(msg))
    return { text: "O escritório atende presencialmente no Maranhão e Goiás (OAB/MA 15.972 e OAB/GO 69.793-A) e remotamente em todo o Brasil via videoconferência. Posso agendar sua consulta?", cta: true };

  if (/hor[aá]rio|funciona|atende|aberto|finais? de semana|s[aá]bado|domingo/.test(msg))
    return { text: "Atendemos de segunda a sexta, das 8h às 18h, com agendamento prévio. Casos urgentes (habeas corpus, liminares) também aos sábados. Pelo WhatsApp respondemos rapidamente!", cta: true };

  if (/agendar|marcar|consulta|reuni[aã]o|hor[aá]rio dispon|primeira consulta/.test(msg))
    return { text: "Agendamento é simples! A primeira consulta é estratégica e focada no seu caso. Clique no botão do WhatsApp e em poucos minutos você terá um horário marcado com o Dr. Merson.", cta: true };

  if (/documento|papel|preciso levar|trazer|certid[aã]o|rg|cpf/.test(msg))
    return { text: "Para a primeira consulta, leve documentos pessoais (RG, CPF) e qualquer documentação relacionada ao seu caso (contratos, decisões, comprovantes). Não se preocupe se faltar algo — orientamos no agendamento!", cta: true };

  if (/sigilo|confidencial|segredo|privacidade/.test(msg))
    return { text: "Sigilo absoluto! Toda consulta está protegida pelo sigilo profissional do advogado (art. 7º, II do EOAB). Suas informações jamais serão compartilhadas. Pode falar com total tranquilidade.", cta: true };

  if (/online|remoto|v[ií]deo|videoconfer|whatsapp|presencial/.test(msg))
    return { text: "Atendemos presencialmente e online (videoconferência, WhatsApp). Para clientes fora do MA e GO, todo o atendimento pode ser 100% remoto, com a mesma qualidade. Quer agendar?", cta: true };

  if (/ganhei|vou ganhar|chance|possibilidade|tese|jurisprud[eê]ncia/.test(msg))
    return { text: "Cada caso é único! Após análise dos documentos e fatos, o Dr. Merson apresenta uma avaliação realista das chances de êxito, baseada em jurisprudência atualizada (TJMA, STJ, STF). Quer essa análise?", cta: true };

  if (/dr|doutor|merson|advogado|quem [eé]|sobre|experi[eê]ncia/.test(msg))
    return { text: "O Dr. Merson Borges Tavares de Macedo foi Assessor de Juiz no TJMA por quase 4 anos, é OAB/MA 15.972 e OAB/GO 69.793-A. Atua com Direito Bancário, Previdenciário, Civil, Família, Criminal e mais. Quer conversar com ele?", cta: true };

  if (/falar com|contato|telefone|whats|n[uú]mero/.test(msg))
    return { text: "O Dr. Merson está disponível agora pelo WhatsApp! É a forma mais rápida de obter resposta personalizada para o seu caso.", cta: true };

  // Fallback inteligente
  return { text: "Para te dar a orientação mais precisa, o ideal é o Dr. Merson avaliar seu caso pessoalmente. A primeira consulta é estratégica e totalmente focada na sua situação. Quer agendar agora pelo WhatsApp?", cta: true };
}

export const QUICK_CHIPS = [
  "Direito Bancário",
  "Direito do Consumidor",
  "Direito Previdenciário",
  "Família & Sucessões",
  "Trabalhista",
  "Tributário",
  "Direito Criminal",
  "Falar com Dr. Merson",
];
