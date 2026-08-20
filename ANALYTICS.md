# Аналітика club432.com

## Що стоїть на сайті

| Що | ID | Де налаштовано |
|----|----|----------------|
| Google Analytics 4 | `G-VSKQWFFNLK` | `src/lib/analytics.ts` (можна перебити змінною `NEXT_PUBLIC_GA_ID`) |
| Meta Pixel | `406163265532535` | `src/lib/analytics.ts` (`NEXT_PUBLIC_FB_PIXEL_ID`) |
| Vercel Analytics + Speed Insights | — | `src/app/layout.tsx` (вмикається в кабінеті Vercel) |

> ID взяті зі старого сайту на Weblium (вони були вшиті в `<head>` як власний код).
> Якщо це не ті лічильники — заміни значення в `.env.local` (шаблон — `.env.example`)
> або одразу в `src/lib/analytics.ts`.

Скрипти вантажаться `strategy="afterInteractive"` — не гальмують перший екран.

## Які події шлються

| Дія | GA4 | Meta Pixel |
|-----|-----|-----------|
| Перегляд сторінки | `page_view` (авто) | `PageView` (авто) |
| Клік «Стати учасником» | `subscribe_click` | `Lead` |

У кожної події є параметр `location` — звідки клікнули: `nav`, `hero`, `pricing`, `footer`.
Плюс `value: 25`, `currency: "EUR"` — щоб Meta рахувала вартість ліда.

## Що зробити в кабінетах (руками, один раз)

**Meta Events Manager**
1. Events Manager → пиксель `406163265532535` → Test Events → відкрити club432.com і клікнути «Стати учасником» → має прилетіти `PageView` і `Lead`.
2. У рекламній кампанії обрати ціль конверсії `Lead`.

**Google Analytics 4**
1. Admin → Events → переконатись, що зʼявився `subscribe_click` (перші дані — за 24 год).
2. Позначити `subscribe_click` як **Key event** (конверсію).

**Vercel**
1. Проєкт `retreat-landing` → вкладка Analytics → Enable (і Speed Insights).

## Як додати нову подію в коді

```ts
import { track, trackStandard } from "@/lib/analytics";

track("watch_video", { location: "hero" });          // своя подія
trackStandard("Contact", "contact_click", { ... });   // стандартна подія Meta + GA4
```

## Відоме обмеження
Банера згоди на cookie (GDPR) поки немає — у роадмапі P3. Для української аудиторії
це не блокер, але при таргеті на ЄС його треба буде додати.
