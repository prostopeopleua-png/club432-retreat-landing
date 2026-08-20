# HANDOFF — club432.com (новий сайт Клубу 432)

> Передача контексту для продовження роботи в новій сесії. Оновлено 2026-08-20.

## Що це і де воно

- **Живий сайт:** https://club432.com (головна + `/metod-432`, `/oferta`, `/privacy-policy`, `/retreat-carpathians`)
- **Проєкт:** `~/work/retreat-landing/` — Next.js 16 + Tailwind 4 + Framer Motion + (R3F/Lenis для окремих сторінок)
- **Vercel:** проєкт `retreat-landing` (id `prj_YY8ivjANPpU6eY17aRSZt9xNXPri`, team `team_7sIAmRWYNgwqmLVx5caZSVAA`), залогінений CLI як `prostopeopleua-png`. Домен `club432.com` (+ www) причеплений сюди, DNS керується у Vercel (NS у реєстратора HOSTiQ → vercel-dns).
- **GitHub:** `prostopeopleua-png/club432-retreat-landing` (gh активний акаунт `prostopeopleua-png`).

## ⚠️ Деплой
Git-push у GitHub **НЕ** тригерить авто-деплой Vercel. Деплоїти вручну:
```bash
cd ~/work/retreat-landing && vercel --prod --yes
```
(зазвичай я роблю: `git add -A && git commit … && git push` + `vercel --prod --yes`).

## Що вже зроблено (стан головної)

Головна = **безшовний темний космос** (fixed `CosmicBackground` — starfield canvas + туманності + blueprint-grid) з блоками, що плавають без видимих переходів. Frosted-glass картки (AuthKit-стиль). Секції: HERO → WHO (архетипи) → FEATURES (переваги) → FORMAT → AUTHOR (Вадим) → PRICING → FAQ → FOOTER.

**Головний елемент — мандала-герой** (`RoamingMandala.tsx`): лого-квітка, що **горить** (CSS-вогонь + ембер-сяйво) і **мандрує по коловій орбіті** на скролі, завжди повертаючись «обличчям» до центру екрана, частиною виходячи за край. 3D через CSS-екструзію (6 шарів). Рух — GPU-трансформації (translate/rotate), НЕ left/top.

**Ціни:** блок «Учасник клубу», цінність ~~5 000 грн~~ → **25 € / міс (≈ 1 200 грн)**, список переваг, CTA → Telegram-бот.

**Тексти винесено в один файл:** `src/content.ts` (Вадим редагує сам; інструкція — `DEPLOY.md`). Копію переписано на «продажну» (біль→результат, голос Вадима від 1-ї особи).

## Ключові файли
- `src/content.ts` — УСІ тексти головної (редагується вручну)
- `src/app/page.tsx` — головна (бере тексти з content.ts, іконки/структура в коді)
- `src/components/RoamingMandala.tsx` — вогняна мандала-герой (мобільна легка гілка + десктоп 3D)
- `src/components/CosmicBackground.tsx` — фон-космос (на мобільному зорі статичні)
- `src/components/SmoothScroll.tsx` — Lenis (вимкнено на тач/мобільному)
- `src/app/globals.css` — дизайн-токени, `.frost`, вогняні keyframes, мобільні оверайди
- `src/app/icon.svg` — фавіконка (чорна мандала на білому)
- `public/logo-mandala.svg` (градієнт), `logo-mandala-white.svg` (нав/футер), `logo-mandala-fire.svg`, `photos/vadym.png`
- `src/app/metod-432/page.tsx` — флагман з R3F 3D-героєм (окрема сторінка)
- `src/lib/analytics.ts` — GA4/Pixel ID + хелпери `track` / `trackSubscribeClick`
- `src/components/Analytics.tsx` — завантаження GA4 + Meta Pixel; `src/components/CtaLink.tsx` — кнопка CTA з подією
- `src/lib/seo.ts`, `src/app/opengraph-image.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts` — SEO
- `ANALYTICS.md` — що і як міряється, що натиснути в Meta/GA/Vercel

## Дизайн-система (коротко)
- Космос: `--c432-bg #0D0E2D`, deep `#07081B`; акцент золото-помаранч `#FDD16F→#EF8018`; вторинний фіолет `#6D5AE6`
- Шрифти: **Fraunces** (дисплей, `.font-display`) + **Montserrat** (текст/UI)
- Картки: `.frost` (frosted glass; на мобільному backdrop-blur вимкнено — дорого)
- Стиль-орієнтир: `~/Downloads/DESIGN.md` (AuthKit frosted-cathedral)
- Скіл `ui-ux-pro-max` (у `.claude/skills/`) + Magic MCP підключені

## Мобільна продуктивність (важливі рішення)
Причини гальм, які прибрано: Lenis на тачі (вимкнено), `backdrop-blur` на мобільному (вимкнено через `@media max-width:820px` у globals.css), рух через left/top (переписано на transform), 11 blur-шарів мандали (→ 6 + CSS-вогонь; на мобільному 1 шар). Зорі перемальовуються після resize.

---

## 🗺️ РОАДМАП (узгоджено з Вадимом — робити далі)

### P1 — першими (макс. віддача)
1. ~~**Аналітика + Meta Pixel**~~ ✅ **зроблено 2026-08-20.** GA4 `G-VSKQWFFNLK` + Meta Pixel `406163265532535` (ID взяті зі старого Weblium-сайту) + Vercel Analytics/Speed Insights. Подія кліку «Стати учасником»: GA4 `subscribe_click`, Meta `Lead`, з параметром `location` (nav/hero/pricing/footer) і `value 25 EUR`. Деталі й що натиснути в кабінетах Meta/GA — **`ANALYTICS.md`**.
2. **Відгуки / соц.доказ** — секція з відгуками учасників + лічильник. *Потрібні матеріали від Вадима (3–6 відгуків).* ← **наступне**
3. ~~**SEO + OG**~~ ✅ **зроблено 2026-08-20.** Динамічна OG-картинка (`src/app/opengraph-image.tsx`, next/og + Montserrat з `src/app/_og/`), повні metadata в `layout.tsx` (metadataBase, canonical, OG/Twitter, robots), `sitemap.ts`, `robots.ts`, JSON-LD Organization + WebSite (layout) та FAQPage + Product/Offer (головна), title/description/canonical на всі сторінки.
4. **Лід-магніт / безкоштовний вхід** — «7 таємниць» або безкоштовний вебінар → збір ліда в бот → прогрів. *Потрібне рішення/матеріали Вадима.*

### P2
5. Навігація в шапці (меню + бургер на мобільному)
6. Блок «як проходить місяць у клубі» (біль→трансформація)
7. Решта сторінок продуктів: Ліла (школа+гра — є арт ігрового поля в архіві), Ретрит, 7 таємниць
8. FAQ — обробка заперечень (оплата/повернення/чи підійде)

### P3 (полірування)
- Справжнє 3D мандали на R3F (реакція на курсор)
- Тестимоніали-карусель, мікро-анімації, cookie-згода (EU), Lighthouse-аудит, контакт для підтримки

## 🔧 Відкриті хвости
- [ ] **Підтвердити лічильники з Вадимом** — GA4/Pixel ID успадковані зі старого сайту; перевірити в Meta Events Manager (Test Events) і позначити `subscribe_click` як Key event у GA4 (див. `ANALYTICS.md`)
- [ ] **Увімкнути Analytics/Speed Insights** у кабінеті Vercel для проєкту `retreat-landing`
- [ ] **Google Search Console** — додати club432.com і подати `https://club432.com/sitemap.xml`
- [ ] **Нове фото Вадима** — Вадим надсилав вкладенням у чат (не файл). Треба зберегти як `~/Downloads/PROSTO/vadym.png` → скопіювати в `public/photos/vadym.png` → деплой. (Поточне фото — старе з архіву, обрізане; вставлене в скляну картку.)
- [ ] **Форми → бот** — ліди з сайту слати в Telegram (`botService.notifyAdmins`, Вадим `547633690`)
- [ ] Винести тексти `/oferta` і `/metod-432` у `content.ts`

## Рекомендований старт нової сесії
P1.1 і P1.3 закриті. Далі — **P1.2 (відгуки/соц.доказ)** і **P1.4 (лід-магніт)**: обидва впираються в матеріали від Вадима (3–6 відгуків; рішення, що саме віддаємо безкоштовно). Поки їх немає — можна брати **P2.5 (навігація в шапці)** або **P2.8 (FAQ із запереченнями)**.

## Архів контенту (для нових сторінок)
Повна копія старого Weblium-сайту: `~/work/club432-site/` (16 стор. + 329 зображень, у т.ч. арт ігрового поля Ліли, фото). Скрипти дзеркала — у scratchpad `mirror.py`/`pass2_images.py`.
