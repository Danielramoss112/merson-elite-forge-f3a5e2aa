import { createFileRoute } from "@tanstack/react-router";

type NewsItem = {
  tag: string;
  title: string;
  date: string;
  link?: string;
};

const FALLBACK: NewsItem[] = [
  {
    tag: "TST",
    title: "Tribunal reconhece vínculo empregatício em plataformas digitais",
    date: "Atualizado hoje",
  },
  {
    tag: "STF",
    title: "Plenário decide sobre marco temporal e impacta milhares de processos",
    date: "Atualizado hoje",
  },
  {
    tag: "STJ",
    title: "Súmula amplia direito de revisão de contratos bancários",
    date: "Atualizado hoje",
  },
  {
    tag: "TJMA",
    title: "Decisão fortalece proteção de consumidores em planos de saúde",
    date: "Atualizado hoje",
  },
];

const FEEDS: { tag: string; url: string }[] = [
  { tag: "STJ", url: "https://www.stj.jus.br/sites/portalp/RssFeeds/noticias" },
];

function stripTags(s: string) {
  return s
    .replace(/<!\[CDATA\[(.*?)\]\]>/gs, "$1")
    .replace(/<[^>]+>/g, "")
    .trim();
}

function parseRss(xml: string, tag: string): NewsItem[] {
  const items: NewsItem[] = [];
  const itemRegex = /<item\b[^>]*>([\s\S]*?)<\/item>/gi;
  const titleRegex = /<title\b[^>]*>([\s\S]*?)<\/title>/i;
  const dateRegex = /<pubDate\b[^>]*>([\s\S]*?)<\/pubDate>/i;
  const linkRegex = /<link\b[^>]*>([\s\S]*?)<\/link>/i;
  let m: RegExpExecArray | null;
  while ((m = itemRegex.exec(xml)) !== null) {
    const block = m[1];
    const title = titleRegex.exec(block)?.[1];
    if (!title) continue;
    const link = linkRegex.exec(block)?.[1];
    const pub = dateRegex.exec(block)?.[1];
    let date = "Atualizado hoje";
    if (pub) {
      const d = new Date(stripTags(pub));
      if (!isNaN(d.getTime())) {
        date = d.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
      }
    }
    items.push({
      tag,
      title: stripTags(title),
      date,
      link: link ? stripTags(link) : undefined,
    });
    if (items.length >= 6) break;
  }
  return items;
}

async function fetchFeed(tag: string, url: string): Promise<NewsItem[]> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "MersonMacedoAdvocacia/1.0 (+lovable)",
        Accept: "application/rss+xml, application/xml, text/xml",
      },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return [];
    const xml = await res.text();
    return parseRss(xml, tag);
  } catch {
    return [];
  }
}

export const Route = createFileRoute("/api/news")({
  server: {
    handlers: {
      GET: async () => {
        const results = await Promise.all(FEEDS.map((f) => fetchFeed(f.tag, f.url)));
        const merged = results.flat().slice(0, 4);
        const items = merged.length >= 2 ? merged : FALLBACK;
        return new Response(JSON.stringify({ items }), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=900, s-maxage=900",
          },
        });
      },
    },
  },
});
