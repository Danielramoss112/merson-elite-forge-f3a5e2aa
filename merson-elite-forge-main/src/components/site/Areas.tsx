import { useEffect, useRef, useState, useCallback } from "react";
import { SITE } from "@/lib/site";

/* ── 8 Areas ── */
const AREAS = [
  {
    tag: "Direito Bancário",
    title: "PARE DE PAGAR JUROS ABUSIVOS",
    body: "Recupere seu fôlego financeiro. Analisamos contratos bancários para eliminar taxas ilegais e reduzir suas dívidas drasticamente. Não deixe o banco vencer.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800",
    stat: { num: "R$ 2.4M+", label: "RECUPERADOS" },
  },
  {
    tag: "Direito do Consumidor",
    title: "JUSTIÇA CONTRA ABUSOS",
    body: "Sofreu cobrança indevida ou danos morais? Protegemos seus direitos contra grandes empresas. Você não está sozinho na luta contra o descaso.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800",
    stat: { num: "98%", label: "ÊXITO" },
  },
  {
    tag: "Direito Imobiliário",
    title: "SEGURANÇA NO SEU PATRIMÔNIO",
    body: "Do contrato à escritura. Proteja seu maior investimento com assessoria especializada em regularização e transações imobiliárias seguras.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800",
    stat: { num: "340+", label: "CONTRATOS" },
  },
  {
    tag: "Direito Previdenciário",
    title: "SUA APOSENTADORIA MERECIDA",
    body: "Não aceite a negativa do INSS. Lutamos para garantir o melhor benefício para você, com agilidade e perícia técnica. O seu futuro não pode esperar.",
    image: "https://images.unsplash.com/photo-1576669801775-ffeba745bd9b?q=80&w=800",
    stat: { num: "500+", label: "BENEFÍCIOS" },
  },
  {
    tag: "Direito Trabalhista",
    title: "SEUS DIREITOS RESPEITADOS",
    body: "Garanta cada centavo do seu esforço. Especialistas em rescisões, horas extras e reconhecimento de vínculo. Se você trabalhou, você tem direitos.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2959213?q=80&w=800",
    stat: { num: "94%", label: "VITÓRIAS" },
  },
  {
    tag: "Direito Civil",
    title: "SOLUÇÕES JURÍDICAS EFICAZES",
    body: "Proteção completa para seus contratos, indenizações e conflitos. Estratégia jurídica personalizada para resolver problemas complexos com o menor desgaste.",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800",
    stat: { num: "1.2K+", label: "PROCESSOS" },
  },
  {
    tag: "Família e Sucessões",
    title: "PROTEÇÃO FAMILIAR",
    body: "Divórcio, guarda, alimentos, inventário e testamento. Acompanhamento sensível e técnico em demandas que envolvem família, patrimônio e relações sucessórias.",
    image: "https://images.unsplash.com/photo-1591115765373-520b7a2d726f?q=80&w=800",
    stat: { num: "280+", label: "FAMÍLIAS" },
  },
  {
    tag: "Direito Criminal",
    title: "DEFESA ESTRATÉGICA",
    body: "Defesa penal agressiva e técnica. Habeas corpus, crimes de trânsito e revisão criminal. Atuação ágil em medidas urgentes em todas as instâncias.",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800",
    stat: { num: "100%", label: "DEDICAÇÃO" },
  },
];

const N = AREAS.length; // 8

/*
  Rotation stops for 8 areas:
  0: top    → rx:90,  ry:0
  1: front  → rx:0,   ry:0
  2: right  → rx:0,   ry:-90
  3: back   → rx:0,   ry:-180
  4: left   → rx:0,   ry:-270
  5: bottom → rx:-90, ry:-360
  6: reuse front (swap img) → rx:0, ry:-360  (continues rotating)
  7: reuse right (swap img) → rx:0, ry:-450
*/
const STOPS = [
  { rx: 90, ry: 0 },
  { rx: 0, ry: 0 },
  { rx: 0, ry: -90 },
  { rx: 0, ry: -180 },
  { rx: 0, ry: -270 },
  { rx: -90, ry: -360 },
  { rx: 0, ry: -360 },
  { rx: 0, ry: -450 },
];

// Which cube face index (0-5) is visible at each stop
function faceIdxAtStop(stopIdx: number): number {
  if (stopIdx < 6) return stopIdx;
  // After 6, cycle through front(1), right(2), back(3), left(4)
  return 1 + ((stopIdx - 6) % 4);
}

const FACE_NAMES = ["top", "front", "right", "back", "left", "bottom"];

/* ── WhatsApp SVG ── */
function WaIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* ── Easing ── */
const easeIO = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

/* ── Component ── */
export function Areas() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const faceEls = useRef<(HTMLDivElement | null)[]>([]);
  const faceImgIdx = useRef<number[]>([-1, -1, -1, -1, -1, -1]);
  const [activeStop, setActiveStop] = useState(0);
  const [inView, setInView] = useState(false);

  // Set image on a cube face
  const setFaceImage = useCallback((faceIdx: number, areaIdx: number) => {
    if (faceImgIdx.current[faceIdx] === areaIdx) return;
    faceImgIdx.current[faceIdx] = areaIdx;
    const el = faceEls.current[faceIdx];
    if (!el) return;
    const area = AREAS[areaIdx];
    const img = el.querySelector("img") as HTMLImageElement | null;
    if (img) {
      img.src = area.image;
      img.alt = area.tag;
    }
  }, []);

  // Initialize first 6 faces
  useEffect(() => {
    for (let i = 0; i < 6 && i < N; i++) {
      setFaceImage(i, i);
    }
  }, [setFaceImage]);

  // Scroll handler
  useEffect(() => {
    const wrap = wrapRef.current;
    const cube = cubeRef.current;
    if (!wrap || !cube) return;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const rect = wrap.getBoundingClientRect();
        const wrapTop = rect.top;
        const wrapH = rect.height;
        const vh = window.innerHeight;

        // Are we inside the cube section?
        const visible = wrapTop < vh && wrapTop + wrapH > 0;
        setInView(visible);

        if (!visible) return;

        // Progress 0→1 through the entire scroll container
        const totalTravel = wrapH - vh;
        const traveled = -wrapTop;
        const raw = totalTravel > 0 ? traveled / totalTravel : 0;
        const progress = Math.max(0, Math.min(1, raw));

        // Compute rotation
        const t = progress * (N - 1);
        const i = Math.min(Math.floor(t), N - 2);
        const f = easeIO(t - i);
        const a = STOPS[i];
        const b = STOPS[i + 1];
        const rx = a.rx + (b.rx - a.rx) * f;
        const ry = a.ry + (b.ry - a.ry) * f;
        cube.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;

        // Active stop
        const stop = Math.min(N - 1, Math.round(progress * (N - 1)));
        setActiveStop(stop);

        // Swap images for stops >= 6
        for (let si = 0; si < N; si++) {
          const fi = faceIdxAtStop(si);
          // Only swap if this stop is near the current view
          if (Math.abs(si - stop) <= 2) {
            setFaceImage(fi, si);
          }
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [setFaceImage]);

  const area = AREAS[activeStop];

  return (
    <div id="areas" ref={wrapRef} className="cube-wrap">
      {/* Sticky scene */}
      <div className="cube-scene">
        <div className="cube-perspective">
          <div ref={cubeRef} className="cube-box" style={{ transform: "rotateX(90deg) rotateY(0deg)" }}>
            {FACE_NAMES.map((name, i) => (
              <div
                key={name}
                ref={(el) => { faceEls.current[i] = el; }}
                className={`cube-face cube-face--${name}`}
              >
                <img src={AREAS[Math.min(i, N - 1)].image} alt={AREAS[Math.min(i, N - 1)].tag} loading="lazy" />
                <div className="cube-face__dim" />
                <span className="cube-face__ghost">{String(i + 1).padStart(2, "0")}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Text cards — only the active one is shown */}
        {AREAS.map((a, i) => (
          <div
            key={a.tag}
            className={`cube-card ${i % 2 === 0 ? "" : "cube-card--right"} ${activeStop === i && inView ? "cube-card--visible" : ""}`}
          >
            <div className="cube-card__accent" />
            <span className="cube-card__tag">{a.tag}</span>
            <h2 className="cube-card__title">{a.title}</h2>
            <p className="cube-card__body">{a.body}</p>
            <div className="cube-card__stats">
              <span className="cube-card__stat-num">{a.stat.num}</span>
              <span className="cube-card__stat-lbl">{a.stat.label}</span>
            </div>
            <a
              href={SITE.whatsappUrl + "&text=" + encodeURIComponent(`Olá, gostaria de uma consultoria sobre ${a.tag}.`)}
              target="_blank"
              rel="noreferrer"
              className="cube-cta"
            >
              <WaIcon /> QUERO UMA CONSULTA ESPECIALIZADA
            </a>
          </div>
        ))}

        {/* Caption — ABSOLUTE inside scene, visible only when in scroll range */}
        {inView && (
          <div className="cube-caption">
            <div className="cube-caption__num">{String(activeStop + 1).padStart(2, "0")}</div>
            <div className="cube-caption__name">{area.tag.toUpperCase()}</div>
          </div>
        )}

        {/* HUD top-right */}
        {inView && (
          <div className="cube-hud">
            <div className="cube-hud__pct">{String(activeStop + 1).padStart(2, "0")}/{String(N).padStart(2, "0")}</div>
            <div className="cube-hud__bar"><div className="cube-hud__fill" style={{ width: `${((activeStop + 1) / N) * 100}%` }} /></div>
            <div className="cube-hud__label">{area.tag}</div>
          </div>
        )}

        {/* Nav dots — ABSOLUTE */}
        {inView && (
          <div className="cube-dots">
            {AREAS.map((_, i) => (
              <span key={i} className={`cube-dot${i === activeStop ? " cube-dot--on" : ""}`} />
            ))}
          </div>
        )}
      </div>

      {/* Spacer sections for scroll height */}
      {AREAS.map((_, i) => (
        <div key={i} className="cube-spacer" />
      ))}

      <style>{CSS}</style>
    </div>
  );
}

/* ────────────────────────────────────────────── */
/*  Scoped CSS                                     */
/* ────────────────────────────────────────────── */
const BLUE = "#007BFF";

const CSS = `
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400&display=swap");

/* ── Container ── */
.cube-wrap {
  position: relative;
  background: #0d0a08;
}

/* Each spacer = one "stop" worth of scroll */
.cube-spacer {
  height: 100vh;
  pointer-events: none;
}

/* ── Sticky Scene ── */
.cube-scene {
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  z-index: 1;
}

.cube-perspective {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1100px;
  pointer-events: none;
}

/* ── Cube ── */
.cube-box {
  --s: min(72vw, 72vh, 540px);
  width: var(--s);
  height: var(--s);
  position: relative;
  transform-style: preserve-3d;
  will-change: transform;
}

.cube-face {
  position: absolute;
  inset: 0;
  overflow: hidden;
  backface-visibility: hidden;
  background:
    repeating-linear-gradient(0deg, rgba(255,255,255,0.015) 0, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 48px),
    repeating-linear-gradient(90deg, rgba(255,255,255,0.015) 0, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 48px),
    #0d0a08;
}

.cube-face img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.55;
  filter: brightness(0.6) contrast(1.15) saturate(0.9);
  transition: src 0.4s;
}

.cube-face__dim {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(13,10,8,0.2) 0%, rgba(13,10,8,0.75) 100%);
  z-index: 1;
}

.cube-face__ghost {
  position: absolute;
  bottom: 1.5rem;
  left: 1.75rem;
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(2rem, 8vw, 5rem);
  letter-spacing: 0.04em;
  color: rgba(255,255,255,0.04);
  z-index: 2;
  user-select: none;
}

.cube-face--top    { transform: rotateX(-90deg) translateZ(calc(var(--s)/2)); }
.cube-face--front  { transform: translateZ(calc(var(--s)/2)); }
.cube-face--right  { transform: rotateY(90deg)  translateZ(calc(var(--s)/2)); }
.cube-face--back   { transform: rotateY(180deg) translateZ(calc(var(--s)/2)); }
.cube-face--left   { transform: rotateY(-90deg) translateZ(calc(var(--s)/2)); }
.cube-face--bottom { transform: rotateX(90deg)  translateZ(calc(var(--s)/2)); }

/* ── Text Cards ── */
.cube-card {
  position: absolute;
  top: 50%;
  left: 5rem;
  transform: translateY(-50%);
  max-width: 24rem;
  padding: 2.5rem 2rem;
  background: rgba(13, 10, 8, 0.88);
  border-left: 1px solid ${BLUE}33;
  backdrop-filter: blur(14px) saturate(130%);
  -webkit-backdrop-filter: blur(14px) saturate(130%);
  z-index: 5;
  pointer-events: auto;

  opacity: 0;
  translate: 0 1rem;
  visibility: hidden;
  transition: opacity 0.5s ease, translate 0.5s ease, visibility 0s 0.5s;
}

.cube-card--visible {
  opacity: 1;
  translate: 0 0;
  visibility: visible;
  transition: opacity 0.5s ease, translate 0.5s ease, visibility 0s 0s;
}

.cube-card--right {
  left: auto;
  right: 5rem;
  border-left: none;
  border-right: 1px solid ${BLUE}33;
  text-align: right;
}

.cube-card--right .cube-card__accent {
  transform-origin: right;
  margin-left: auto;
}

.cube-card--right .cube-cta {
  margin-left: auto;
}

.cube-card--right .cube-card__stats {
  align-items: flex-end;
}

.cube-card__accent {
  width: 3rem;
  height: 1px;
  background: ${BLUE};
  margin-bottom: 1.2rem;
  transform-origin: left;
}

.cube-card__tag {
  display: block;
  font-family: 'DM Mono', monospace;
  font-size: 0.62rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: ${BLUE};
  margin-bottom: 1rem;
}

.cube-card__title {
  font-family: 'Bebas Neue', sans-serif;
  font-weight: 400;
  font-size: clamp(2rem, 4.5vw, 3.8rem);
  letter-spacing: 0.03em;
  line-height: 0.95;
  color: #ffffff;
}

.cube-card__body {
  font-family: 'DM Mono', monospace;
  font-size: 0.76rem;
  line-height: 1.85;
  color: #8a7b6e;
  margin-top: 1.2rem;
}

.cube-card__stats {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  margin-top: 1.8rem;
}

.cube-card__stat-num {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2.4rem;
  color: ${BLUE};
  line-height: 1;
}

.cube-card__stat-lbl {
  font-family: 'DM Mono', monospace;
  font-size: 0.55rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #8a7b6e;
}

/* ── CTA ── */
.cube-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.7rem 1.4rem;
  border: 1px solid ${BLUE};
  color: ${BLUE};
  font-family: 'DM Mono', monospace;
  font-size: 0.56rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  margin-top: 1.6rem;
  transition: background 0.3s, color 0.3s, transform 0.3s, box-shadow 0.3s;
}

.cube-cta:hover {
  background: ${BLUE};
  color: #0d0a08;
  transform: translateY(-2px);
  box-shadow: 0 6px 24px ${BLUE}44;
}

.cube-cta svg { width: 14px; height: 14px; }

/* ── Caption (ABSOLUTE) ── */
.cube-caption {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  pointer-events: none;
  user-select: none;
  z-index: 4;
}

.cube-caption__num {
  font-family: 'DM Mono', monospace;
  font-size: 0.58rem;
  letter-spacing: 0.28em;
  color: ${BLUE};
  text-transform: uppercase;
}

.cube-caption__name {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(1.6rem, 4.5vw, 3.2rem);
  letter-spacing: 0.08em;
  color: #8a7b6e;
  opacity: 0.4;
  line-height: 1;
}

/* ── HUD ── */
.cube-hud {
  position: absolute;
  top: 2rem;
  right: 2rem;
  text-align: right;
  font-family: 'DM Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  color: #8a7b6e;
  text-transform: uppercase;
  z-index: 4;
}

.cube-hud__bar {
  width: 7.5rem;
  height: 1px;
  background: #8a7b6e;
  margin-top: 0.5rem;
  margin-left: auto;
  position: relative;
  overflow: hidden;
}

.cube-hud__fill {
  position: absolute;
  top: 0; bottom: 0; left: 0;
  background: ${BLUE};
  transition: width 0.3s ease;
}

.cube-hud__label {
  font-size: 0.58rem;
  color: ${BLUE};
  margin-top: 0.4rem;
}

/* ── Dots ── */
.cube-dots {
  position: absolute;
  left: 2.25rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  z-index: 4;
}

.cube-dot {
  display: block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #8a7b6e;
  transition: background 0.3s, transform 0.3s;
}

.cube-dot--on {
  background: ${BLUE};
  transform: scale(2);
}

/* ── Responsive ── */
@media (max-width: 56.25em) {
  .cube-card,
  .cube-card--right {
    left: 1.5rem;
    right: 1.5rem;
    max-width: 100%;
    padding: 1.5rem 1.25rem;
    top: auto;
    bottom: 3rem;
    transform: none;
    text-align: left;
    border-left: 1px solid ${BLUE}33;
    border-right: none;
  }

  .cube-card--right .cube-card__accent {
    transform-origin: left;
    margin-left: 0;
  }

  .cube-card--right .cube-cta { margin-left: 0; }
  .cube-card--right .cube-card__stats { align-items: flex-start; }

  .cube-dots { display: none; }
  .cube-hud { top: 1rem; right: 1rem; }
  .cube-caption { bottom: 1rem; }
}
`;
