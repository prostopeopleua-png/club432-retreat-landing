/* Презентація персонального ведення під конкретну людину.
   Структура сторінки спільна (VedennyaClient), а всі тексти живуть тут,
   по файлу на людину: звертання (ти/ви), герой, Дзеркало, пакети. */

export type Presentation = {
  /** Прибрати назву «Клуб 432» з хедера (лишається тільки мандала). */
  hideBrand?: boolean;
  hero: { eyebrow: string; title: [string, string]; lede: string; meta: string };
  mirror: { eyebrow: string; title: string; lede: string; questions: string[] };
  /** Що змінюється для людини: її Точка Б простими словами. Необовʼязковий. */
  goals?: { eyebrow: string; title: string; lede: string; items: { t: string; d: string }[] };
  /** Перша жива сесія перед програмою. Необовʼязковий. */
  firstStep?: { eyebrow: string; title: string; lede: string; points: string[] };
  /** Що в програмі гнучке, а що незмінне. Необовʼязковий. */
  promise?: {
    eyebrow: string;
    title: string;
    lede: string;
    flexTitle: string;
    flex: string[];
    fixedTitle: string;
    fixedText: string;
  };
  why: { eyebrow: string; title: string; lede: string };
  /** Блок довіри: де спілкуємось, що з записами. Необовʼязковий. */
  privacy?: { eyebrow: string; title: string; lede: string; points: string[] };
  stages: { n: string; t: string; d: string }[];
  diag: {
    title: string;
    baseTitle: string;
    baseText: string;
    choiceLede: string;
    methods: { icon: string; t: string; meta: string; d: string }[];
  };
  learn: { title: string; lede: string; tools: { n: string; t: string; pts: string[] }[] };
  launch: { n: string; title: string; eyebrow: string; text: string; steps: { t: string; d: string }[] };
  retreat: {
    n: string;
    title: string;
    eyebrow: string;
    text: string;
    levels: { t: string; d: string }[];
    scienceTitle: string;
    science: { t: string; d: string }[];
  };
  exit: { title: string; lede: string; items: { icon: string; t: string; d: string }[] };
  packages: {
    title: string;
    items: {
      name: string;
      price: string;
      term: string;
      badge: string;
      ring: "gold" | "violet" | "none";
      items: string[];
    }[];
  };
  finale: { title: string; text: string };
};

// Однакове для всіх: рівні затвору і що відбувається з тілом
export const RETREAT_LEVELS = [
  { t: "Світло", d: "Без світла, у повній темряві." },
  { t: "Розмова", d: "Додається тиша: без світла та розмов." },
  { t: "Тиша", d: "Без світла, розмов і слуху." },
  { t: "Голод", d: "Додається відмова від їжі." },
  { t: "Служіння", d: "Усе вище плюс духовні практики." },
];

export const RETREAT_SCIENCE = [
  { t: "Розум", d: "Вимкнення автопілота (дефолт-система мозку). Стихає потік нав'язливих думок, зʼявляється ясність." },
  { t: "Гормони", d: "Пік мелатоніну, зростання гормону росту, відновлення чутливості до інсуліну." },
  { t: "Метаболізм", d: "Автофагія, кетоновий фокус, увімкнення ферментів довголіття." },
];
