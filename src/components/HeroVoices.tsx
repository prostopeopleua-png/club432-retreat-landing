import { content as C } from "@/content";

/* Голоси учасників на першому екрані.
   Десктоп (від 1024px): дві колонки, що повільно пливуть угору з різною
   швидкістю. Безкінечність дає друга копія карток (aria-hidden), а рух
   робить лише transform: translate3d, тож браузер нічого не перемальовує.
   Телефон: одна горизонтальна стрічка зі scroll-snap, без анімації і без
   копій. Уся поведінка в CSS (globals.css, блок «Голоси в героїні»),
   JavaScript тут не потрібен. */

type HV = (typeof C.heroVoices)[number];

const TONE = ["hv-tone-0", "hv-tone-1", "hv-tone-2"];

function Card({ v, i, dup }: { v: HV; i: number; dup?: boolean }) {
  return (
    <figure className={`hv-card${dup ? " hv-dup" : ""}`} aria-hidden={dup ? "true" : undefined}>
      <div className="hv-bubble">
        <div className="flex items-center gap-3">
          <span aria-hidden className={`hv-mono ${TONE[i % TONE.length]}`}>{v.initial}</span>
          <div className="min-w-0">
            <div className={`hv-name ${TONE[i % TONE.length]}`}>{v.name}</div>
            <figcaption className="hv-ctx">{v.context}</figcaption>
          </div>
        </div>
        <blockquote className="hv-quote">«{v.quote}»</blockquote>
      </div>
    </figure>
  );
}

export default function HeroVoices() {
  const items = C.heroVoices;
  const colA = items.filter((_, i) => i % 2 === 0);
  const colB = items.filter((_, i) => i % 2 === 1);
  const cols: [HV[], number, string][] = [
    [colA, 0, "hv-slow"],
    [colB, 1, "hv-fast"],
  ];
  return (
    <div className="hv" role="region" aria-label="Що кажуть учасники клубу">
      {cols.map(([col, off, speed]) => (
        <div key={off} className="hv-col">
          <div className={`hv-track ${speed}`}>
            {col.map((v, k) => <Card key={k} v={v} i={k * 2 + off} />)}
            {col.map((v, k) => <Card key={`d${k}`} v={v} i={k * 2 + off} dup />)}
          </div>
        </div>
      ))}
    </div>
  );
}
