import Link from 'next/link'
import { Starfield } from './Starfield'

export function Hero() {
  return (
    <section
      className="relative flex min-h-svh items-center overflow-hidden bg-bg-primary pt-[72px]"
      aria-labelledby="hero-heading"
    >
      <Starfield />

      {/* Nebula overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: `
            radial-gradient(ellipse at 18% 50%, rgba(180,120,20,0.13) 0%, transparent 55%),
            radial-gradient(ellipse at 82% 25%, rgba(201,149,42,0.08) 0%, transparent 45%),
            radial-gradient(ellipse at 50% 85%, rgba(232,201,106,0.05) 0%, transparent 35%)
          `,
        }}
        aria-hidden="true"
      />

      {/* Two-column layout */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-10 py-16">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* ── Left: text ── */}
          <div className="animate-fade-up">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-gold-main/35 bg-gold-main/8 px-5 py-1.5 font-heading text-[0.6rem] tracking-[0.25em] text-gold-light uppercase backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-main shadow-[0_0_8px_rgba(201,149,42,0.9)] animate-blink" />
              CONSCIÊNCIA ARCTURIANA
            </div>

            <h1
              id="hero-heading"
              className="mb-5 font-heading text-4xl font-black leading-[1.15] text-white sm:text-5xl md:text-6xl"
              style={{ textShadow: '0 0 40px rgba(201,149,42,0.15)' }}
            >
              Expandindo a Consciência<br />
              <span className="bg-grad-gold bg-clip-text text-transparent">
                Além das Estrelas
              </span>
            </h1>

            <p className="mb-9 max-w-lg text-base text-gold-pale/60 leading-8 sm:text-lg">
              O Projeto Patriarca é um portal de conhecimento cósmico que une espiritualidade,
              ciência e a sabedoria dos Arcturianos para guiar a humanidade em sua jornada de evolução.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/sobre"
                className="rounded-xl bg-grad-gold px-7 py-3 font-heading text-[0.78rem] font-semibold tracking-widest text-bg-primary uppercase shadow-[0_4px_20px_rgba(201,149,42,0.3)] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(201,149,42,0.5)] transition-all"
              >
                Saiba Mais
              </Link>
              <Link
                href="/conteudos"
                className="rounded-xl border border-gold-main/45 px-7 py-3 font-heading text-[0.78rem] font-semibold tracking-widest text-gold-light uppercase backdrop-blur-sm hover:bg-gold-main/10 hover:border-gold-main hover:shadow-[0_0_18px_rgba(201,149,42,0.3)] transition-all"
              >
                Explorar Conteúdos
              </Link>
            </div>
          </div>

          {/* ── Right: Ufological visual ── */}
          <div
            className="hidden md:flex items-center justify-center animate-fade-up [animation-delay:0.3s]"
            aria-hidden="true"
          >
            <div className="relative w-72 h-72 lg:w-80 lg:h-80">
              <div className="absolute inset-0 rounded-full border border-gold-main/10 animate-ring-rotate" />
              <div className="absolute inset-[12%] rounded-full border border-gold-light/[0.06] animate-ring-reverse" />

              <svg
                viewBox="0 0 320 320"
                className="absolute inset-0 w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Nave arcturiana e sistema estelar"
              >
                <defs>
                  <radialGradient id="ufo-disc" cx="50%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#c9952a" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#2a1a00" stopOpacity="1" />
                  </radialGradient>
                  <radialGradient id="ufo-dome" cx="45%" cy="25%" r="70%">
                    <stop offset="0%" stopColor="#f5e4b0" stopOpacity="0.8" />
                    <stop offset="55%" stopColor="#8a6010" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#0d0a06" stopOpacity="1" />
                  </radialGradient>
                  <radialGradient id="ufo-planet" cx="38%" cy="32%" r="70%">
                    <stop offset="0%" stopColor="#1e1435" stopOpacity="1" />
                    <stop offset="60%" stopColor="#120b22" stopOpacity="1" />
                    <stop offset="100%" stopColor="#050305" stopOpacity="1" />
                  </radialGradient>
                  <linearGradient id="ufo-beam" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c9952a" stopOpacity="0.42" />
                    <stop offset="100%" stopColor="#c9952a" stopOpacity="0" />
                  </linearGradient>
                  <radialGradient id="ufo-arcturus" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#fffbe8" stopOpacity="1" />
                    <stop offset="35%" stopColor="#e8c96a" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#c9952a" stopOpacity="0" />
                  </radialGradient>
                  <filter id="ufo-glow-lg">
                    <feGaussianBlur stdDeviation="5" result="b" />
                    <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <filter id="ufo-glow-sm">
                    <feGaussianBlur stdDeviation="2.5" result="b" />
                    <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>

                {/* Background star field */}
                {([ [18,22,0.5],[48,10,0.4],[90,18,0.45],[25,70,0.35],[298,18,0.55],
                    [308,75,0.4],[22,195,0.45],[12,248,0.35],[45,295,0.5],[125,305,0.4],
                    [292,308,0.45],[72,312,0.35],[200,310,0.4],[285,250,0.35],[50,155,0.4],
                    [305,150,0.45],[170,12,0.35],[245,15,0.4],[300,200,0.35],[15,130,0.45],
                    [145,15,0.3],[230,30,0.4],[15,310,0.3],[310,240,0.4],[100,300,0.35],
                ] as [number,number,number][]).map(([cx,cy,o],i) => (
                  <circle key={i} cx={cx} cy={cy} r={0.75} fill={`rgba(245,228,176,${o})`} />
                ))}

                {/* Shooting star 1 */}
                <line x1="28" y1="25" x2="90" y2="58"
                  stroke="rgba(245,228,176,0.9)" strokeWidth="1.6" strokeLinecap="round"
                  strokeDasharray="70 70" strokeDashoffset="70">
                  <animate attributeName="strokeDashoffset" values="70;-70;-70" keyTimes="0;0.144;1" dur="4.5s" begin="0s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.01;0.13;0.16;1" dur="4.5s" begin="0s" repeatCount="indefinite" />
                </line>

                {/* Shooting star 2 */}
                <line x1="198" y1="50" x2="263" y2="83"
                  stroke="rgba(232,201,106,0.85)" strokeWidth="1.3" strokeLinecap="round"
                  strokeDasharray="74 74" strokeDashoffset="74">
                  <animate attributeName="strokeDashoffset" values="74;-74;-74" keyTimes="0;0.144;1" dur="5s" begin="1.8s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.01;0.13;0.15;1" dur="5s" begin="1.8s" repeatCount="indefinite" />
                </line>

                {/* Shooting star 3 */}
                <line x1="48" y1="158" x2="105" y2="190"
                  stroke="rgba(245,228,176,0.75)" strokeWidth="1.1" strokeLinecap="round"
                  strokeDasharray="65 65" strokeDashoffset="65">
                  <animate attributeName="strokeDashoffset" values="65;-65;-65" keyTimes="0;0.13;1" dur="6s" begin="3.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.01;0.12;0.14;1" dur="6s" begin="3.4s" repeatCount="indefinite" />
                </line>

                {/* Shooting star 4 */}
                <line x1="90" y1="268" x2="148" y2="298"
                  stroke="rgba(232,201,106,0.7)" strokeWidth="1" strokeLinecap="round"
                  strokeDasharray="65 65" strokeDashoffset="65">
                  <animate attributeName="strokeDashoffset" values="65;-65;-65" keyTimes="0;0.13;1" dur="5.5s" begin="2.6s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.01;0.12;0.14;1" dur="5.5s" begin="2.6s" repeatCount="indefinite" />
                </line>

                {/* UFO — floating group */}
                <g>
                  <animateTransform attributeName="transform" type="translate"
                    values="0,0; 0,-10; 0,0" dur="4s" calcMode="spline"
                    keyTimes="0;0.5;1" keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
                    repeatCount="indefinite" />

                  {/* Tractor beam */}
                  <polygon points="132,107 188,107 208,215 112,215" fill="url(#ufo-beam)">
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="2.2s" repeatCount="indefinite" />
                  </polygon>

                  {/* Underside glow */}
                  <ellipse cx="160" cy="101" rx="62" ry="9" fill="rgba(201,149,42,0.18)" filter="url(#ufo-glow-lg)" />

                  {/* Disc body */}
                  <ellipse cx="160" cy="97" rx="58" ry="14" fill="url(#ufo-disc)" />
                  <ellipse cx="160" cy="97" rx="58" ry="14" stroke="rgba(201,149,42,0.5)" strokeWidth="0.8" />

                  {/* Dome */}
                  <ellipse cx="160" cy="80" rx="27" ry="20" fill="url(#ufo-dome)" />
                  <ellipse cx="160" cy="80" rx="27" ry="20" stroke="rgba(232,201,106,0.28)" strokeWidth="0.8" />

                  {/* 6 blinking edge lights */}
                  {([ [122,104,0],[136,109,0.18],[150,112,0.36],[170,112,0.54],[184,109,0.72],[197,104,0.9],
                  ] as [number,number,number][]).map(([cx,cy,delay],i) => (
                    <circle key={i} cx={cx} cy={cy} r="2.5" fill="rgba(232,201,106,0.9)" filter="url(#ufo-glow-sm)">
                      <animate attributeName="opacity" values="1;0.15;1" dur="1.5s" begin={`${delay}s`} repeatCount="indefinite" />
                    </circle>
                  ))}

                  {/* Dome centre light */}
                  <circle cx="160" cy="77" r="5" fill="rgba(245,228,176,0.12)" />
                  <circle cx="160" cy="77" r="2.5" fill="rgba(245,228,176,0.75)" filter="url(#ufo-glow-sm)">
                    <animate attributeName="opacity" values="0.75;1;0.75" dur="3s" repeatCount="indefinite" />
                  </circle>

                  {/* Signal waves expanding outward */}
                  {([ [0,22,7],[0.7,18,5.5],[1.4,14,4.5] ] as [number,number,number][]).map(([delay,rx0,ry0],i) => (
                    <ellipse key={i} cx="160" cy="126" rx={rx0} ry={ry0}
                      stroke="rgba(201,149,42,0.55)" strokeWidth="0.8" fill="none">
                      <animate attributeName="rx" values={`${rx0};${rx0+40};${rx0+40}`} keyTimes="0;0.4;1" dur="2.8s" begin={`${delay}s`} repeatCount="indefinite" />
                      <animate attributeName="ry" values={`${ry0};${ry0+12};${ry0+12}`} keyTimes="0;0.4;1" dur="2.8s" begin={`${delay}s`} repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.55;0;0" keyTimes="0;0.4;1" dur="2.8s" begin={`${delay}s`} repeatCount="indefinite" />
                    </ellipse>
                  ))}
                </g>

                {/* Arcturus — brightest star upper right */}
                <g>
                  <circle cx="268" cy="52" r="20" fill="url(#ufo-arcturus)" />
                  <circle cx="268" cy="52" r="3.8" fill="#fffbe8" filter="url(#ufo-glow-sm)">
                    <animate attributeName="r" values="3.8;5.2;3.8" dur="4s" repeatCount="indefinite" />
                  </circle>
                  <line x1="268" y1="37" x2="268" y2="67" stroke="rgba(245,228,176,0.38)" strokeWidth="0.8">
                    <animate attributeName="opacity" values="0.38;0.85;0.38" dur="4s" repeatCount="indefinite" />
                  </line>
                  <line x1="253" y1="52" x2="283" y2="52" stroke="rgba(245,228,176,0.38)" strokeWidth="0.8">
                    <animate attributeName="opacity" values="0.38;0.85;0.38" dur="4s" repeatCount="indefinite" />
                  </line>
                  <line x1="258" y1="42" x2="278" y2="62" stroke="rgba(245,228,176,0.18)" strokeWidth="0.7">
                    <animate attributeName="opacity" values="0.18;0.55;0.18" dur="4s" repeatCount="indefinite" />
                  </line>
                  <line x1="278" y1="42" x2="258" y2="62" stroke="rgba(245,228,176,0.18)" strokeWidth="0.7">
                    <animate attributeName="opacity" values="0.18;0.55;0.18" dur="4s" repeatCount="indefinite" />
                  </line>
                  <text x="256" y="73" fontFamily="var(--font-cinzel,serif)" fontSize="7.5"
                    fill="rgba(232,201,106,0.5)" letterSpacing="1">ARCTURUS</text>
                </g>

                {/* Planet system — whole system orbits point (185, 205) */}
                {/* Planet system — fixed position lower-right */}
                <g transform="translate(248, 258)">

                  {/* Moon orbit trail (dashed ring) — drawn FIRST so planet renders on top */}
                  <circle cx="0" cy="0" r="42"
                    stroke="rgba(201,149,42,0.22)" strokeWidth="1"
                    strokeDasharray="4 4" fill="none" />

                  {/* Ring BACK arc (behind planet) */}
                  <path d="M -46,7 A 46,10 0 0 0 46,7"
                    stroke="rgba(138,96,16,0.3)" strokeWidth="1.5" fill="none" />

                  {/* Planet body */}
                  <circle cx="0" cy="0" r="27" fill="url(#ufo-planet)" />
                  <circle cx="0" cy="0" r="27" stroke="rgba(138,96,16,0.25)" strokeWidth="1" fill="none" />

                  {/* Ring FRONT arc (in front of planet) */}
                  <path d="M -46,7 A 46,10 0 0 1 46,7"
                    stroke="rgba(201,149,42,0.6)" strokeWidth="2" fill="none" />

                  {/* Atmosphere glow */}
                  <circle cx="0" cy="0" r="30" stroke="rgba(138,96,16,0.1)" strokeWidth="5"
                    filter="url(#ufo-glow-sm)" fill="none" />

                  {/* Moon — orbits exactly on the dashed ring (r=42) */}
                  <g>
                    <animateTransform attributeName="transform" type="rotate"
                      from="0 0 0" to="360 0 0" dur="8s" repeatCount="indefinite" />
                    {/* glow halo */}
                    <circle cx="0" cy="-42" r="7" fill="rgba(180,140,40,0.15)" filter="url(#ufo-glow-sm)" />
                    {/* moon body */}
                    <circle cx="0" cy="-42" r="4.2" fill="rgba(180,140,40,0.65)" />
                    {/* moon highlight */}
                    <circle cx="0" cy="-42" r="2" fill="rgba(245,228,176,0.95)" filter="url(#ufo-glow-sm)" />
                  </g>
                </g>

                {/* Label */}
                <text x="160" y="313" textAnchor="middle"
                  fontFamily="var(--font-cinzel,serif)" fontSize="8.5"
                  fill="rgba(201,149,42,0.38)" letterSpacing="4">
                  SISTEMA ARCTURIANO
                </text>
              </svg>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-fade-up [animation-delay:0.6s]" aria-hidden="true">
        <span className="font-heading text-[0.52rem] tracking-[0.3em] text-gold-pale/40 uppercase">Role para baixo</span>
        <div className="h-12 w-px bg-gradient-to-b from-gold-main to-transparent animate-blink" />
      </div>
    </section>
  )
}
