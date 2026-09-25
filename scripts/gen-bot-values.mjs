// Генерує bot/src/data/values432.js із src/values.ts + src/rays.ts.
// Запуск: node scripts/gen-bot-values.mjs
// Робити ЩОРАЗУ після зміни складу цінностей або Променів, інакше бот
// розшифрує діп-лінки старим списком і покаже не ті слова.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { resolve } from 'node:path';

// Шлях задано явно, а не відносно цього файлу: retreat-landing лежить у
// ~/432, а бот у ~/work, тож ../../bot вело б у неіснуючу теку.
// Перевизначити: node scripts/gen-bot-values.mjs <шлях до values432.js>

const vs = readFileSync(new URL('../src/values.ts', import.meta.url), 'utf8');
const rs = readFileSync(new URL('../src/rays.ts', import.meta.url), 'utf8');

const version = Number(/VALUES_VERSION = (\d+)/.exec(vs)[1]);

const values = [...vs.matchAll(
  /\{ v: "([^"]+)", theme: "(\w+)"(?:, res: \[([\d, ]+)\])?(?:, need: \[([\d, ]+)\])? \}/g,
)].map((m) => [
  m[1], m[2],
  (m[3] || '').split(',').filter(Boolean).map(Number),
  (m[4] || '').split(',').filter(Boolean).map(Number),
]);
if (values.length < 50) throw new Error(`розібрано лише ${values.length} цінностей — розбір зламався`);

// Теми віддаємо ЦІЛКОМ (name, about, questions, lessons), бо додаток показує той
// самий зміст, що й сайт. Регуляркою вкладену структуру не візьмеш надійно, тому
// вирізаємо літерал об'єкта і обчислюємо його як дані: там лише рядки і масиви.
const themesStart = vs.indexOf('export const themes');
if (themesStart < 0) throw new Error('не знайдено export const themes');
const braceStart = vs.indexOf('= {', themesStart) + 2;
const braceEnd = vs.indexOf('\n};', braceStart);
if (braceEnd < 0) throw new Error('не знайдено кінець об\'єкта themes');
// eslint-disable-next-line no-new-func
const themes = new Function(`return (${vs.slice(braceStart, braceEnd + 2)})`)();
const themeKeys = Object.keys(themes);
if (themeKeys.length !== 6) throw new Error(`розібрано ${themeKeys.length} тем замість 6`);
for (const [key, t] of Object.entries(themes)) {
  if (!t.name || !t.about || !Array.isArray(t.questions) || !Array.isArray(t.lessons)) {
    throw new Error(`тема ${key} неповна`);
  }
}

// Для бота беремо лише те, що показуємо в повідомленні.
const rays = {};
for (const m of rs.matchAll(
  /^  (\d): \{\n    id: \d,\n    title:\s*\n?\s*"([^"]+)",\n    subtitle: "([^"]+)",\n    essence:\n\s*"([^"]+)"/gm,
)) {
  rays[m[1]] = { title: m[2], subtitle: m[3], essence: m[4] };
}
for (const m of rs.matchAll(/^  (\d): \{[\s\S]*?\n    explore:\n\s*"([^"]+)",\n  \},/gm)) {
  if (rays[m[1]]) rays[m[1]].explore = m[2];
}
if (Object.keys(rays).length !== 7) throw new Error(`розібрано ${Object.keys(rays).length} Променів замість 7`);

const j = (x) => JSON.stringify(x);
const out = `// ⚠️ ЗГЕНЕРОВАНО з retreat-landing/src/values.ts і src/rays.ts — руками не правити.
// Перегенерувати: cd retreat-landing && node scripts/gen-bot-values.mjs
const VERSION = ${version};

// [назва, тема, Промені «відгуку», Промені «потреби»]
const VALUES = [
${values.map((v) => `  [${j(v[0])}, ${j(v[1])}, ${j(v[2])}, ${j(v[3])}],`).join('\n')}
];

// Теми з повним змістом: name, about, questions (справжні питання з чату),
// lessons ([{title, video}] — video це YouTube ID). Той самий зміст показує сайт.
const THEMES = ${j(themes)};

const RAYS = {
${Object.entries(rays).map(([id, r]) => `  ${id}: ${j(r)},`).join('\n')}
};

/** Менше за це число влучань Промінь не оголошуємо. */
const MIN_HITS = 2;

/** Рахує «відгук» і «потребу». Нормовано на базову частоту, бо слова
 *  розподілені по Променях нерівно: інакше вигравав би найчастіший. */
const readRays = (picked) => {
  const tally = (idx) => {
    const base = new Map();
    VALUES.forEach((v) => v[idx].forEach((r) => base.set(r, (base.get(r) || 0) + 1)));
    const hit = new Map();
    picked.forEach((v) => v[idx].forEach((r) => hit.set(r, [ ...(hit.get(r) || []), v[0] ])));
    return [ ...hit.entries() ]
      .map(([ ray, vals ]) => {
        const expected = ((base.get(ray) || 0) / VALUES.length) * picked.length;
        return { ray, hits: vals.length, lift: expected > 0 ? vals.length / expected : 0, values: vals };
      })
      .sort((a, b) => b.lift - a.lift || b.hits - a.hits || a.ray - b.ray);
  };
  const res = tally(2);
  const need = tally(3);
  const top = (l) => l.find((x) => x.hits >= MIN_HITS) || null;
  const resonance = top(res);
  const needTop = top(need);
  return {
    resonance,
    need: needTop,
    aligned: Boolean(resonance && needTop && resonance.ray === needTop.ray),
  };
};

/** Розшифровує payload із діп-лінка: vals-<version>-<base64url 10 байтів>. */
const decodeValuesPayload = (payload) => {
  const m = /^vals-(\\d+)-([A-Za-z0-9_-]+)$/.exec(String(payload || ''));
  if (!m) return null;
  const version = Number(m[1]);
  if (version !== VERSION) return null;
  let bytes;
  try {
    bytes = Buffer.from(m[2].replace(/-/g, '+').replace(/_/g, '/'), 'base64');
  } catch {
    return null;
  }
  const indices = [ ...bytes ].filter((i) => i >= 0 && i < VALUES.length);
  if (indices.length === 0) return null;

  const picked = indices.map((i) => VALUES[i]);
  const names = picked.map((v) => v[0]);
  const tally = {};
  picked.forEach((v) => { tally[v[1]] = (tally[v[1]] || 0) + 1; });
  const theme = Object.entries(tally).sort((a, b) => b[1] - a[1])[0][0];

  return {
    version,
    indices,
    names,
    theme,
    themeName: THEMES[theme]?.name || theme,
    rays: readRays(picked),
  };
};

module.exports = { VERSION, VALUES, THEMES, RAYS, readRays, decodeValuesPayload };
`;

const target = resolve(process.argv[2] || `${homedir()}/work/bot/src/data/values432.js`);
if (!existsSync(target)) throw new Error(`не знайдено ціль: ${target}`);
writeFileSync(target, out, 'utf8');
console.log(`${target} оновлено: версія ${version}, ${values.length} цінностей, ${Object.keys(rays).length} Променів`);
