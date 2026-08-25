"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import CosmicBackground from "@/components/CosmicBackground";
import SmoothScroll from "@/components/SmoothScroll";

/* ─────────────────────────  motion helpers  ───────────────────────── */
const reveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] },
  }),
};

function Reveal({
  children,
  i = 0,
  className,
}: {
  children: React.ReactNode;
  i?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={reveal}
      custom={i}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-70px" }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="eyebrow-line mb-7">{children}</span>;
}

function StageTag({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center justify-center gap-3">
      <span className="grad-cosmic font-display text-2xl font-semibold">Етап {n}</span>
      <span className="h-px w-10 bg-gradient-to-r from-[#FDD16F]/50 to-transparent" />
      <span className="eyebrow">{children}</span>
    </div>
  );
}

/* ─────────────────────────────  data  ─────────────────────────────── */

// Його власні питання (з першої сесії) — дзеркало
const MIRROR = [
  "Що в моєму житті я роблю зі страху, а не з любові?",
  "Де я плутаю контроль зі спокоєм?",
  "Чому результат від команди дається так важко, і чому мій стан злітає й падає разом із виконаними задачами?",
  "Яку частину себе я досі не пробачив?",
  "Що я робив би інакше, якби вже знав, як досягати бажаного легшим способом?",
  "Як тиснути мʼяко й не перетиснути, коли здається, що мене не чують, і чому я геть не бачу власної тіні?",
];

const STAGES = [
  { n: "01", t: "Діагностика", d: "Складаємо твій портрет і Карту Шляху. Профіль у додатку плюс один глибокий метод на вибір." },
  { n: "02", t: "Навчання", d: "Пʼять інструментів, що ведуть зміну щодня, а не раз на тиждень." },
  { n: "03", t: "Точка В", d: "Вимірюємо, як змінився шлях. Те саме дзеркало, що на вході, показує, скільки ти пройшов." },
];

// Етап 1 — методи діагностики на вибір
const DIAG = [
  { icon: "🕉️", t: "Ліла", meta: "по 2 години, доки гра не завершиться", d: "Показує твій духовний шлях. Для тих, кому це відгукується." },
  { icon: "🃏", t: "МАК", meta: "метафоричні карти", d: "Показує те, чого не покаже розум. Оминає контроль і логіку." },
  { icon: "🗣️", t: "Глибинне опитування", meta: "свідома розмова", d: "Мета існування, цінності, сильні й слабкі сторони, обмеження. Для тих, хто хоче відповідати сам, у ясному стані." },
];

// Етап 2 — 5 інструментів навчання
const LEARN = [
  {
    n: "01",
    t: "Щоденний пульс",
    pts: [
      "Дізнаємось контекст твого дня",
      "Даю відгуки в моменті",
      "Рекомендації без очікування сесії",
      "Підтримка, коли стан раптово впав",
      "Налаштування, щоб швидко вийти з оніміння і ясно побачити ситуацію",
    ],
  },
  {
    n: "02",
    t: "Терапія",
    pts: [
      "Вносимо ясність у те, що зараз відбувається",
      "Вчимось бачити причини, чому так сталося",
      "Підбираємо індивідуальні інструменти змін",
      "Розробляємо «Антивірус», щоб не хворіти цим знову",
      "Контроль виконання завдань до запланованих змін",
    ],
  },
  {
    n: "03",
    t: "Чайна церемонія",
    pts: [
      "Вчимось будувати власні ритуали і триматись їх",
      "Аналізуємо минулий тиждень роботи",
      "Медитуємо",
      "Цілительство в особливому стані розслаблення",
      "Святкуємо досягнення й відмічаємо непомітні самому зміни",
    ],
  },
  {
    n: "04",
    t: "Шадовінг",
    pts: [
      "Зворотний відгук на важливі переписки, погляд збоку",
      "Розбір записів важливих зустрічей",
    ],
  },
];

const RETREATS = [
  { t: "Світло", d: "Без світла, у повній темряві." },
  { t: "Розмова", d: "Додається тиша: без світла та розмов." },
  { t: "Тиша", d: "Без світла, розмов і слуху." },
  { t: "Голод", d: "Додається відмова від їжі." },
  { t: "Служіння", d: "Усе вище плюс духовні практики." },
];

const SCIENCE = [
  { t: "Розум", d: "Вимкнення автопілота (дефолт-система мозку). Стихає потік нав'язливих думок, зʼявляється ясність." },
  { t: "Гормони", d: "Пік мелатоніну, зростання гормону росту, відновлення чутливості до інсуліну." },
  { t: "Метаболізм", d: "Автофагія, кетоновий фокус, увімкнення ферментів довголіття." },
];

// Етап 3 — вимір результату
const EXIT = [
  { icon: "🕉️", t: "Ліла", d: "Бачимо, як змінився твій шлях: точки зависання, змії, стріли, де тепер зосереджена енергія." },
  { icon: "🗣️", t: "Глибинне інтервʼю", d: "Проговорюємо, що змінилося всередині від Точки А до тепер." },
];

const PACKAGES = [
  {
    name: "Повна оплата",
    price: "4 000 €",
    term: "одним платежем",
    badge: "Найвигідніше",
    ring: "gold" as const,
    items: [
      "Повна діагностика та профіль",
      "Усі пʼять інструментів навчання",
      "Затвор як особиста ініціація",
      "Три місяці ведення",
    ],
  },
  {
    name: "Частинами",
    price: "4 500 €",
    term: "3 платежі по 1 500 € / міс",
    badge: "",
    ring: "none" as const,
    items: [
      "Та сама повна програма",
      "Комфортний ритм оплати",
      "Три місяці ведення",
    ],
  },
  {
    name: "З посвятою",
    price: "7 500 €",
    term: "повний супровід затвору",
    badge: "Повний супровід",
    ring: "violet" as const,
    items: [
      "Усе з програми ведення",
      "Повністю організована церемонія затвору",
      "Підготовка місця та потрібних атрибутів",
      "Тиждень поряд: перевірка стану й підтримка",
      "Харчування під час практики",
      "Виведення із затвору, фіксація перших відкриттів",
    ],
  },
];

/* ─────────────────────────────  page  ─────────────────────────────── */
export default function VedennyaClient() {
  return (
    <SmoothScroll>
      <CosmicBackground />

      {/* NAV — мінімальний маркер, без пунктів меню (це презентація) */}
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
        <a
          href="#top"
          className="frost flex items-center gap-2.5 rounded-full py-2.5 pl-3 pr-5"
        >
          <Image
            src="/logo-mandala-white.svg"
            alt="Клуб 432"
            width={30}
            height={30}
            className="shrink-0 drop-shadow-[0_0_6px_rgba(255,255,255,0.25)]"
          />
          <span className="font-display whitespace-nowrap text-lg font-semibold tracking-wide">
            Клуб 432
          </span>
        </a>
      </header>

      <main id="top" className="relative z-10">
        {/* ══ HERO ══ */}
        <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-5 text-center">
          <div className="grid-overlay pointer-events-none absolute inset-0 -z-10" />
          <div className="rise-in">
            <span className="eyebrow-line mb-8">Персональне глибинне ведення</span>
          </div>
          <h1 className="rise-in rise-d1 font-display wordmark text-[clamp(2.8rem,9vw,6.5rem)] font-semibold leading-[1.02] tracking-tight pb-[0.12em] [filter:drop-shadow(0_2px_10px_rgba(7,8,27,0.9))]">
            Керувати можна всім.
            <br />
            Крім власного стану.
          </h1>
          <p className="rise-in rise-d2 mx-auto mt-8 max-w-2xl text-[clamp(1.05rem,1.7vw,1.35rem)] leading-relaxed text-white/85 [text-shadow:0_1px_16px_rgba(7,8,27,0.95)]">
            Коли команда виконує, ти на підйомі. Коли ні, тебе накриває. Справжня
            сила не в тому, щоб тиснути сильніше, а в тому, щоб твій стан більше не
            залежав від чужих дій.
          </p>
          <p className="rise-in rise-d3 mt-9 text-[13px] tracking-[0.15em] uppercase text-white/45 [text-shadow:0_1px_12px_rgba(7,8,27,0.95)]">
            3 місяці · індивідуально · від першої зустрічі до нового рівня
          </p>
          <div className="rise-in rise-d3 mt-14 h-9 w-[1px] bg-gradient-to-b from-[#FDD16F]/60 to-transparent" />
        </section>

        {/* ══ ДЗЕРКАЛО (його питання) ══ */}
        <section className="sect mx-auto max-w-6xl px-5">
          <Reveal>
            <Eyebrow>Дзеркало</Eyebrow>
          </Reveal>
          <Reveal i={1}>
            <h2 className="font-display h-section mx-auto max-w-3xl text-center">
              Ти вже поставив собі правильні питання
            </h2>
          </Reveal>
          <Reveal i={2}>
            <p className="lede mx-auto mt-6 mb-16 text-center">
              Це те, з чим ти прийшов. Я нічого не вигадав. Уся програма існує лише
              для одного: щоб ти сам знайшов на них відповіді. Свої, не мої.
            </p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            {MIRROR.map((q, i) => (
              <Reveal key={q} i={i % 2}>
                <div className="frost frost-hover flex h-full items-start gap-5 p-8">
                  <span className="num-badge shrink-0 leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="pt-2 text-[1.05rem] leading-relaxed text-white/85">
                    {q}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══ ЧОМУ ІНДИВІДУАЛЬНО ══ */}
        <section className="sect mx-auto max-w-4xl px-5 text-center">
          <Reveal>
            <Eyebrow>Чому саме індивідуально</Eyebrow>
          </Reveal>
          <Reveal i={1}>
            <h2 className="font-display h-section mx-auto max-w-3xl">
              Програма збирається під тебе
            </h2>
          </Reveal>
          <Reveal i={2}>
            <p className="lede mx-auto mt-7">
              Жодного шаблону. Ми починаємо з твоєї карти і будуємо шлях, що враховує
              саме твої питання, твій ритм і твою природу. Ти не заходиш у чужу
              систему. Ми проєктуємо твою.
            </p>
          </Reveal>
        </section>

        {/* ══ ТРИ ЕТАПИ (огляд) ══ */}
        <section className="sect mx-auto max-w-6xl px-5">
          <Reveal>
            <Eyebrow>Шлях</Eyebrow>
          </Reveal>
          <Reveal i={1}>
            <h2 className="font-display h-section mx-auto mb-14 max-w-3xl text-center">
              Три етапи трансформації
            </h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {STAGES.map((s, i) => (
              <Reveal key={s.n} i={i}>
                <div className="frost frost-hover flex h-full flex-col p-8">
                  <span className="num-badge leading-none">{s.n}</span>
                  <h3 className="grad-cosmic mt-3 text-2xl font-semibold">{s.t}</h3>
                  <div className="hairline my-5" />
                  <p className="text-[15px] leading-relaxed text-[var(--c432-ink)]">
                    {s.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══ ЕТАП 1 · ДІАГНОСТИКА ══ */}
        <section className="sect mx-auto max-w-6xl px-5">
          <Reveal>
            <div className="text-center">
              <StageTag n="01">Діагностика</StageTag>
            </div>
          </Reveal>
          <Reveal i={1}>
            <h2 className="font-display h-section mx-auto max-w-3xl text-center">
              Спершу карта. Потім рух.
            </h2>
          </Reveal>

          {/* база — профіль у додатку */}
          <Reveal i={2}>
            <div className="frost mx-auto mt-12 max-w-3xl p-8 md:p-10">
              <span className="eyebrow mb-3">Для кожного</span>
              <h3 className="font-display text-2xl font-semibold text-white">
                Профіль у додатку
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-[var(--c432-ink)]">
                Ти самостійно проходиш тести в додатку. Я бачу твій портрет під
                різними кутами, і в тебе, і в мене зʼявляється твій живий профіль у
                кабінеті. З нього починається все інше.
              </p>
            </div>
          </Reveal>

          <Reveal i={2}>
            <p className="lede mx-auto mt-14 mb-10 text-center">
              Плюс один глибокий метод на твій вибір. Обери свій вхід.
            </p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {DIAG.map((d, i) => (
              <Reveal key={d.t} i={i}>
                <div className="frost frost-hover flex h-full flex-col p-8">
                  <span className="text-4xl">{d.icon}</span>
                  <h3 className="grad-text mt-5 text-xl font-semibold">{d.t}</h3>
                  <span className="eyebrow mt-2">{d.meta}</span>
                  <div className="hairline my-5" />
                  <p className="text-[15px] leading-relaxed text-[var(--c432-ink)]">
                    {d.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══ ЕТАП 2 · НАВЧАННЯ ══ */}
        <section className="sect mx-auto max-w-6xl px-5">
          <Reveal>
            <div className="text-center">
              <StageTag n="02">Навчання</StageTag>
            </div>
          </Reveal>
          <Reveal i={1}>
            <h2 className="font-display h-section mx-auto max-w-3xl text-center">
              Пʼять інструментів, що ведуть зміну щодня
            </h2>
          </Reveal>
          <Reveal i={2}>
            <p className="lede mx-auto mt-6 mb-16 text-center">
              Трансформація стається не на зустрічі, а між зустрічами. Ці інструменти
              тримають тебе весь шлях.
            </p>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2">
            {LEARN.map((t, i) => (
              <Reveal key={t.n} i={i % 2}>
                <div className="frost frost-hover flex h-full flex-col p-8">
                  <div className="flex items-center gap-4">
                    <span className="num-badge leading-none">{t.n}</span>
                    <h3 className="text-xl font-semibold text-white">{t.t}</h3>
                  </div>
                  <div className="hairline my-5" />
                  <ul className="flex flex-col gap-3">
                    {t.pts.map((p) => (
                      <li
                        key={p}
                        className="flex items-start gap-3 text-[14.5px] leading-relaxed text-[var(--c432-ink)]"
                      >
                        <span className="mt-[7px] block h-1.5 w-1.5 shrink-0 rounded-full bg-[#FDD16F]" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          {/* 5-й інструмент — Затвор (виділений блок) */}
          <Reveal i={1}>
            <div className="frost mt-5 p-8 md:p-12" style={{ boxShadow: "inset 0 1px 1px rgba(216,236,248,0.14), 0 24px 40px rgba(4,5,15,0.5), 0 0 0 1px rgba(253,209,111,0.28)" }}>
              <div className="flex items-center gap-4">
                <span className="num-badge leading-none">05</span>
                <div>
                  <h3 className="font-display text-2xl font-semibold text-white">Затвор</h3>
                  <span className="eyebrow mt-1">Особиста ініціація в кінці роботи</span>
                </div>
              </div>
              <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-[var(--c432-ink)]">
                Посвята через практику. Знайомство із собою справжнім без зовнішнього
                шуму і вихід на новий рівень сприйняття. Пʼять рівнів ініціації за
                твоєю готовністю: один день підготовки, пʼять днів практики, один день
                виходу.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3 md:grid-cols-5">
                {RETREATS.map((r) => (
                  <div key={r.t} className="rounded-2xl bg-white/[0.04] p-5 text-center ring-1 ring-white/10">
                    <h4 className="grad-text text-base font-semibold">{r.t}</h4>
                    <p className="mt-2 text-[12.5px] leading-relaxed text-[var(--c432-ink)]">
                      {r.d}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-10 mb-6 text-center text-[13px] uppercase tracking-[0.2em] text-white/40">
                Що відбувається з тобою всередині
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                {SCIENCE.map((s) => (
                  <div key={s.t} className="glass rounded-2xl p-6">
                    <h4 className="text-base font-semibold text-white">{s.t}</h4>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--c432-ink)]">
                      {s.d}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ══ ЕТАП 3 · ТОЧКА В ══ */}
        <section className="sect mx-auto max-w-5xl px-5">
          <Reveal>
            <div className="text-center">
              <StageTag n="03">Точка В</StageTag>
            </div>
          </Reveal>
          <Reveal i={1}>
            <h2 className="font-display h-section mx-auto max-w-3xl text-center">
              Побачити, скільки ти пройшов
            </h2>
          </Reveal>
          <Reveal i={2}>
            <p className="lede mx-auto mt-6 mb-14 text-center">
              У кінці ми повертаємось до того самого дзеркала, що на вході. Зміна
              стає видимою і вимірюваною, а не «на відчуттях».
            </p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            {EXIT.map((e, i) => (
              <Reveal key={e.t} i={i}>
                <div className="frost frost-hover flex h-full flex-col p-8">
                  <span className="text-4xl">{e.icon}</span>
                  <h3 className="grad-text mt-5 text-xl font-semibold">{e.t}</h3>
                  <div className="hairline my-5" />
                  <p className="text-[15px] leading-relaxed text-[var(--c432-ink)]">
                    {e.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══ ПАКЕТИ ══ */}
        <section className="sect mx-auto max-w-6xl px-5">
          <Reveal>
            <Eyebrow>Формати</Eyebrow>
          </Reveal>
          <Reveal i={1}>
            <h2 className="font-display h-section mx-auto mb-16 max-w-3xl text-center">
              Обери глибину
            </h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {PACKAGES.map((p, i) => (
              <Reveal key={p.name} i={i}>
                <div
                  className={`frost frost-hover flex h-full flex-col p-8 ${
                    p.ring === "gold"
                      ? "ring-1 ring-[#FDD16F]/40"
                      : p.ring === "violet"
                        ? "ring-1 ring-[#8B7BFF]/40"
                        : ""
                  }`}
                >
                  {p.badge ? (
                    <span
                      className={`mb-3 text-[11px] font-medium uppercase tracking-[0.24em] ${
                        p.ring === "violet" ? "text-[#8B7BFF]" : "text-[#FDD16F]"
                      }`}
                    >
                      {p.badge}
                    </span>
                  ) : (
                    <span className="mb-3 h-[15px]" />
                  )}
                  <h3 className="font-display text-2xl font-semibold text-white">
                    {p.name}
                  </h3>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="grad-cosmic font-display text-4xl font-semibold">
                      {p.price}
                    </span>
                  </div>
                  <span className="mt-1 text-[13px] text-white/50">{p.term}</span>
                  <div className="hairline my-6" />
                  <ul className="flex flex-col gap-3">
                    {p.items.map((it) => (
                      <li
                        key={it}
                        className="flex items-start gap-3 text-[14.5px] leading-relaxed text-[var(--c432-ink)]"
                      >
                        <span className="mt-[7px] block h-1.5 w-1.5 shrink-0 rounded-full bg-[#FDD16F]" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══ ТИХИЙ ФІНАЛ (без кнопки) ══ */}
        <section className="sect mx-auto max-w-2xl px-5 pb-40 text-center">
          <Reveal>
            <h2 className="font-display wordmark text-[clamp(2.4rem,7vw,4.5rem)] font-semibold leading-[1.05]">
              Не поспішай.
            </h2>
          </Reveal>
          <Reveal i={1}>
            <p className="lede mx-auto mt-8">
              Побудь із цим. Коли всередині відгукнеться, ти зрозумієш сам. Я поруч.
            </p>
          </Reveal>
          <Reveal i={2}>
            <div className="mx-auto mt-12 h-px w-24 bg-gradient-to-r from-transparent via-[#FDD16F]/50 to-transparent" />
          </Reveal>
        </section>
      </main>
    </SmoothScroll>
  );
}
