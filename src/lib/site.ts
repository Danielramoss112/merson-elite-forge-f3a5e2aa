export const SITE = {
  name: "Merson Macedo Advocacia & Consultoria Estratégica",
  shortName: "Merson Macedo",
  oab: "OAB/MA 15.972 | OAB/GO 69.793-A",
  whatsappNumber: "5561994353905",
  whatsappDisplay: "(61) 99435-3905",
  whatsappUrl: "https://api.whatsapp.com/send?phone=5561994353905",
  email: "adv.mersontavares@gmail.com",
  address: "SQ 12 Quadra 12 Proj 03 - Loja 28 Sala C, Cidade Ocidental/GO",
};

export const AREAS = [
  {
    id: "bancario",
    title: "Direito Bancário",
    short: "Revisão de contratos, juros abusivos e proteção contra abusos das instituições financeiras.",
    full: "Revisão de contratos, juros abusivos, repetição de indébito, negativação indevida e superendividamento. Atuamos contra cláusulas abusivas e na recuperação de valores pagos a maior em contratos bancários, financiamentos e empréstimos.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1600",
  },
  {
    id: "consumidor",
    title: "Direito do Consumidor",
    short: "Defesa dos seus direitos contra práticas abusivas no mercado de consumo.",
    full: "Cancelamento de contratos, danos morais, práticas abusivas, revisão de plano de saúde e ações contra empresas que descumprem o Código de Defesa do Consumidor.",
    image: "https://images.unsplash.com/photo-1556742400-b5b7c5121f8a?q=80&w=1600",
  },
  {
    id: "imobiliario",
    title: "Direito Imobiliário",
    short: "Segurança jurídica em todas as etapas do seu patrimônio imobiliário.",
    full: "Compra e venda, regularização, usucapião, despejo e adjudicação compulsória. Assessoria completa em transações, regularização fundiária e disputas imobiliárias.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1600",
  },
  {
    id: "previdenciario",
    title: "Direito Previdenciário",
    short: "Garantimos seus direitos junto ao INSS com técnica e dedicação.",
    full: "Aposentadoria, auxílio-doença, invalidez, pensão por morte, BPC/LOAS. Atuação estratégica para reverter negativas e obter benefícios previdenciários a que você tem direito.",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1600",
  },
  {
    id: "civil",
    title: "Direito Civil",
    short: "Soluções jurídicas para conflitos do dia a dia com excelência técnica.",
    full: "Contratos, responsabilidade civil, cobranças, ações possessórias e indenizações. Atendimento personalizado para cada caso, com foco em resultados.",
    image: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?q=80&w=1600",
  },
  {
    id: "familia",
    title: "Família & Sucessões",
    short: "Atendimento humanizado em momentos sensíveis da sua vida familiar.",
    full: "Divórcio, guarda, alimentos, inventário, testamento e adoção. Acompanhamento sensível e técnico em demandas que envolvem família, patrimônio e relações sucessórias.",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1600",
  },
  {
    id: "criminal",
    title: "Direito Criminal",
    short: "Defesa penal estratégica com atuação em todas as instâncias.",
    full: "Defesa penal, habeas corpus, crimes de trânsito e revisão criminal. Atuação ágil e técnica em medidas urgentes e processos criminais em todas as instâncias.",
    image: "https://images.unsplash.com/photo-1589216532372-1c2a367900d9?q=80&w=1600",
  },
];

export function buildWhatsAppLink(message?: string) {
  const base = `https://api.whatsapp.com/send?phone=${SITE.whatsappNumber}`;
  return message ? `${base}&text=${encodeURIComponent(message)}` : base;
}
