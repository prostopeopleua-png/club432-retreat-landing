"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


// ── Data ────────────────────────────────────────────────────────────────────

const personas = [
  {
    tag: "ШУКАЧ",
    text: "Ти відчуваєш, що всередині є значно більше потенціалу, ніж проявлено зараз і хочеш глибше розкрити себе (свою Душу) та своє призначення",
  },
  {
    tag: "ПРОВІДНИК",
    text: "Психологи, коучі, наставники. Тобі потрібна глибина, щоб давати клієнтам більше. Ти шукаєш джерело власного відновлення та професійного зростання.",
  },
  {
    tag: "ТВОРЕЦЬ",
    text: "Ти будуєш бізнес та проєкти, але хочеш робити це зі стану спокою, а не стресу. Тобі потрібна ясність мислення та розуміння причинно-наслідкових зв'язків.",
  },
];

const pains = [
  {
    icon: "🌀",
    title: "Внутрішній хаос",
    text: "Ти втомився від безсистемної інформації. Шукаєш цілісну систему знань, яка розкладе все по поличках.",
  },
  {
    icon: "⚡",
    title: "Емоційні гойдалки",
    text: "Ти втомився від емоційних гойдалок, внутрішніх конфліктів, розгубленості, внутрішньої війни, тривожності і хочеш підняти свій рівень свідомості.",
  },
  {
    icon: "🔒",
    title: "Скляна стеля",
    text: "Ти відчуваєш потужний потенціал, але старі страхи та програми блокують вихід на новий рівень.",
  },
  {
    icon: "🧭",
    title: "Втрата сенсів",
    text: "Матеріальні цілі досягнуті або не тішать. Як по-старому більше не може бути, а як по-новому — не знаєш. Ти шукаєш інструменти, які допоможуть залишатись свідомим в будь-якій життєвій ситуації.",
  },
];

const features = [
  {
    icon: "🎓",
    title: "Глибинні лекції",
    text: "Щомісяця розбираємо нову фундаментальну тему з точки зору психології та духовних законів + потокові лекції із розбором питань учасників.",
  },
  {
    icon: "🎙",
    title: "Живі розбори",
    text: "Прямий контакт із Вадимом. Можливість розібрати наживо свій запит чи ситуацію та побачити вектор руху.",
  },
  {
    icon: "📚",
    title: "Бібліотека мудрості",
    text: "Доступ до бази знань за 4 роки. Сотні годин контенту, який завжди під рукою, коли тобі потрібна відповідь. Це твоя психологічна аптечка.",
  },
  {
    icon: "🌅",
    title: "Щоденні налаштування",
    text: "Практики, медитації та фокус уваги в чаті, щоб не випадати з усвідомленого стану в рутину.",
  },
  {
    icon: "🤝",
    title: "Спільнота однодумців",
    text: "Безпечне оточення, де можна бути собою, поділитися інсайтами та отримати підтримку від людей, які рухаються з тобою в одному напрямку.",
  },
];

const formatItems = [
  {
    icon: "📅",
    title: "Регулярність",
    points: ["Вівторок та Четвер о 19:00.", "8 онлайн-зустрічей з Вадимом.", "Стабільність, яка формує звичку."],
  },
  {
    icon: "⏱",
    title: "Тривалість",
    points: ["До 1,5 години концентрована глибина.", "60–70 хв лекція та відповіді на запитання від групи.", "10–15 хв медитація або практика"],
  },
  {
    icon: "▶️",
    title: "Доступність",
    points: ["Записи назавжди.", "Не встиг на ефір? Запис з'являється вже через годину.", "Дивись, коли зручно."],
  },
  {
    icon: "🔧",
    title: "Ресурси",
    points: ["Закрита Телеграм-група.", "Ефіри через додаток Zoom.", "Зручний додаток для пошуку та перегляду лекцій."],
  },
];

const foundations = [
  {
    title: "Позачасова Мудрість",
    text: "Універсальне вчення, що лежить в основі всіх світових традицій. Воно пояснює еволюцію свідомості, взаємозв'язок Душі та особистості і роль людини у Всесвіті.",
  },
  {
    title: "Практична та Езотерична психологія",
    text: "Ми поєднуємо науковий підхід (вивчення розуму, поведінки та емоцій) із наукою про Душу (розуміння духовних законів та внутрішнього екзистенційного досвіду).",
  },
  {
    title: "Філософія та Символізм",
    text: "Філософія допомагає нам шукати відповіді на вічні питання буття, а символізм вчить читати мову Всесвіту, де видимий світ є відображенням глибинних істин.",
  },
  {
    title: "Інтеграція джерел",
    text: "Ми не обмежуємось одним поглядом. Лекції доповнюються мудрістю з Ведів, Бхаґавад-Ґіти, Християнства та Стоїцизму, щоб знайти спільну істину, яка працює.",
  },
];

const testimonials = [
  "Духовний розвиток та розширення світогляду",
  "Вихід на новий рівень життя",
  "Подолання особистих проблем",
  "Мудрість у життєвих питаннях",
  "Пошук нових сенсів та методів розвитку",
  "Підняття свідомості до рівня Душі",
  "Баланс між матеріальним та духовним",
  "Проста Ясність, якої так не вистачало",
];

const monthlyIncludes = [
  { n: "01", title: "8 ефірів на місяць", text: "Зустрічі двічі на тиждень (вівторок та четвер) в онлайн форматі наживо." },
  { n: "02", title: "Відкритий доступ", text: "Миттєвий доступ до архіву всіх лекцій, матеріалів та книг за 4 роки існування клубу. Переглядай будь-коли." },
  { n: "03", title: "Індивідуальні розбори", text: "1 раз на місяць відкривається можливість потрапити на розбір до Вадима під час ефіру, або спостерігати за розбором іншого учасника." },
  { n: "04", title: "Завдання, практики та медитації", text: "Практика, яка поглиблює твій розвиток та напрацьовує інструменти керування власним станом." },
  { n: "05", title: "Дискусії та інтеграція", text: "Живе обговорення тем місяця в колі своїх, щоб перетворити інформацію на прожитий, усвідомлений досвід." },
  { n: "06", title: "Підтримка", text: "Миттєвий доступ до вчителя. Виникла якась складна ситуація протягом дня чи впав стан? Пиши в чат, розберемо, підтримаємо та знайдемо шлях вирішення." },
  { n: "07", title: "Оточення", text: "Особливе підтримуюче оточення, де тебе розуміють. Спільний рух, обмін досвідом та безпечний простір для твоїх усвідомлень." },
];

const faqs = [
  {
    q: "Як отримати доступ?",
    a: "Натискай кнопку «Стати учасником». Сайт перенаправить тебе в наш телеграм-бот. Він допоможе швидко зареєструватись, надішле посилання на оплату та одразу надасть посилання на вхід у закриту групу.",
  },
  {
    q: "Чи можу я скасувати підписку?",
    a: "Так, звісно. Ти можеш призупинити участь будь-коли через наш Асистент-бот. Доступ до Клубу залишиться відкритим до кінця твого оплаченого місяця. Ми поважаємо твій ритм, тому ти зможеш легко повернутися, коли знову відчуєш потребу.",
  },
  {
    q: "Які теми обговорюємо?",
    a: "Усе, що хвилює сучасну людину. Від питань «як налагодити стосунки» чи «збільшити дохід» до глибоких розмов про місію Душі, світобудову та закони Всесвіту. Наша мета — показати, як духовні знання дають реальні результати в матеріальному світі.",
  },
  {
    q: "Як проходять ефіри?",
    a: "Ми зустрічаємось у Zoom — 1–1,5 години концентрованої мудрості. Вадим розкладає складні духовні істини на прості життєві приклади. Чергуємо глибокі розбори з форматом «питання-відповідь». У кінці — спільна медитація. Якщо не вийшло — запис вже через годину.",
  },
  {
    q: "А якщо я не буду встигати?",
    a: "Ціль клубу — не завантажити тебе інформацією, а підтримати твій внутрішній стан. Іноді достатньо переглянути одну лекцію на місяць або просто поспілкуватися в чаті. Навіть проста присутність у полі однодумців вже працює на тебе.",
  },
  {
    q: "Чи підійде це новачкам?",
    a: "Так, цей простір відкритий для кожного. Знання Клубу входять у свідомість м'яко, шар за шаром. На рівні Душі новачків не існує — ти приходиш зі своїм прожитим досвідом, який тут стане усвідомленою мудрістю.",
  },
  {
    q: "Що потрібно для участі?",
    a: "Лише смартфон або комп'ютер. Технічно — два додатки: Telegram (ком'юніті та навчальні матеріали) та Zoom (живі зустрічі з Вадимом).",
  },
];

const BOT_URL = "https://t.me/prosto_mindful_bot";
const INSTAGRAM_URL = "https://www.instagram.com/vadym_shpylchuk";
const TELEGRAM_URL = "https://t.me/c/3171347545/145";
const YOUTUBE_URL = "https://youtube.com/@prosto.mindful";

// ── Shared animation helpers ────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 as const },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

// ── Section components ───────────────────────────────────────────────────────

function ClubHero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-6 overflow-hidden text-center"
      style={{ background: "#07081B" }}
    >
      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 50% 40%, rgba(239,128,24,0.12) 0%, transparent 60%)",
      }} />

      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.p
          className="eyebrow mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Духовність · Психологія · Реальне життя
        </motion.p>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
          style={{ lineHeight: 1.1 }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="grad-text">Клуб 432.</span>
          <br />
          Спільнота свідомого життя
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg mb-10"
          style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.22 }}
        >
          Цілісна система духовних знань та практик<br className="hidden sm:block" />
          для внутрішньої опори й свідомих змін.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
        >
          <a href={BOT_URL} target="_blank" rel="noopener noreferrer" className="btn-cta">
            Стати учасником
          </a>
        </motion.div>
      </div>

      {/* Fade to next */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: 120, background: "linear-gradient(to bottom, transparent, #0D0E2D)", zIndex: 4 }} />
    </section>
  );
}

function WhoSection() {
  return (
    <section className="relative py-20 md:py-28 px-5 sm:px-6 overflow-hidden" style={{ background: "#0D0E2D" }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 50% 0%, rgba(253,209,111,0.04) 0%, transparent 55%)",
      }} />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.p className="eyebrow text-center mb-4" {...fadeUp(0)}>Для кого</motion.p>
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12"
          style={{ lineHeight: 1.1 }}
          {...fadeUp(0.08)}
        >
          Хто тут знаходить <span className="grad-text">свою силу?</span>
        </motion.h2>

        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
          {personas.map(({ tag, text }, i) => (
            <motion.div
              key={i}
              {...fadeUp(0.1 + i * 0.08)}
              className="rounded-2xl p-5 sm:p-6"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(253,209,111,0.12)",
              }}
            >
              <p className="eyebrow mb-3" style={{ color: "#EF8018" }}>{tag}</p>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>{text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: 120, background: "linear-gradient(to bottom, transparent, #15173A)", zIndex: 4 }} />
    </section>
  );
}

function WhySection() {
  return (
    <section className="relative py-20 md:py-28 px-5 sm:px-6 overflow-hidden" style={{ background: "#15173A" }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 50% 0%, rgba(239,128,24,0.06) 0%, transparent 55%)",
      }} />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.p className="eyebrow text-center mb-4" {...fadeUp(0)}>Чому ти тут?</motion.p>
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12"
          style={{ lineHeight: 1.1 }}
          {...fadeUp(0.08)}
        >
          Тобі близьке <span className="grad-text">хоча б одне?</span>
        </motion.h2>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
          {pains.map(({ icon, title, text }, i) => (
            <motion.div
              key={i}
              {...fadeUp(0.1 + i * 0.06)}
              className="flex gap-4 rounded-2xl p-5"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <span className="text-2xl flex-shrink-0 mt-0.5">{icon}</span>
              <div>
                <h3 className="font-semibold mb-1.5" style={{ color: "#FDD16F" }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: 120, background: "linear-gradient(to bottom, transparent, #0D0E2D)", zIndex: 4 }} />
    </section>
  );
}

function SystemSection() {
  return (
    <section className="relative py-20 md:py-28 px-5 sm:px-6 overflow-hidden" style={{ background: "#0D0E2D" }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 50% 0%, rgba(253,209,111,0.04) 0%, transparent 55%)",
      }} />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.p className="eyebrow text-center mb-4" {...fadeUp(0)}>Клуб 432</motion.p>
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4"
          style={{ lineHeight: 1.1 }}
          {...fadeUp(0.08)}
        >
          Система, яка <span className="grad-text">працює</span>
        </motion.h2>
        <motion.p
          className="text-center text-sm mb-12"
          style={{ color: "rgba(255,255,255,0.35)" }}
          {...fadeUp(0.14)}
        >
          Середовище, де поєднуються знання, практика та живе спілкування.
        </motion.p>

        <div className="flex flex-col gap-3">
          {features.map(({ icon, title, text }, i) => (
            <motion.div
              key={i}
              {...fadeUp(0.08 + i * 0.06)}
              className="flex gap-4 rounded-2xl px-5 py-4 card-glow"
              style={{
                background: "#15173A",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <span className="text-2xl flex-shrink-0 mt-0.5">{icon}</span>
              <div>
                <h3 className="font-semibold mb-1" style={{ color: "#fff" }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: 120, background: "linear-gradient(to bottom, transparent, #15173A)", zIndex: 4 }} />
    </section>
  );
}

function FormatSection() {
  return (
    <section className="relative py-20 md:py-28 px-5 sm:px-6 overflow-hidden" style={{ background: "#15173A" }}>
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.p className="eyebrow text-center mb-4" {...fadeUp(0)}>Формат</motion.p>
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12"
          style={{ lineHeight: 1.1 }}
          {...fadeUp(0.08)}
        >
          Твій комфортний ритм <span className="grad-text">розвитку</span>
        </motion.h2>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {formatItems.map(({ icon, title, points }, i) => (
            <motion.div
              key={i}
              {...fadeUp(0.08 + i * 0.06)}
              className="rounded-2xl p-5 sm:p-6"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(253,209,111,0.1)",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xl">{icon}</span>
                <h3 className="font-semibold" style={{ color: "#FDD16F" }}>{title}</h3>
              </div>
              <ul className="flex flex-col gap-1.5">
                {points.map((pt, j) => (
                  <li key={j} className="flex gap-2 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                    <span style={{ color: "#EF8018", flexShrink: 0 }}>●</span>
                    {pt}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: 120, background: "linear-gradient(to bottom, transparent, #0D0E2D)", zIndex: 4 }} />
    </section>
  );
}

function FoundationSection() {
  return (
    <section className="relative py-20 md:py-28 px-5 sm:px-6 overflow-hidden" style={{ background: "#0D0E2D" }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 50% 0%, rgba(253,209,111,0.04) 0%, transparent 55%)",
      }} />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.p className="eyebrow text-center mb-4" {...fadeUp(0)}>Фундамент</motion.p>
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4"
          style={{ lineHeight: 1.1 }}
          {...fadeUp(0.08)}
        >
          Фундамент <span className="grad-text">знань</span>
        </motion.h2>
        <motion.p
          className="text-center text-sm mb-12 max-w-2xl mx-auto"
          style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}
          {...fadeUp(0.14)}
        >
          Ми не сповідуємо жодну релігію. Ми об'єднуємо науку та духовну мудрість для цілісного розуміння людини.
          Людина — це єдність трьох рівнів: Матеріального (тіло), Психічного (емоції та думки) і Духовного (душа та дух).
        </motion.p>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {foundations.map(({ title, text }, i) => (
            <motion.div
              key={i}
              {...fadeUp(0.1 + i * 0.07)}
              className="rounded-2xl p-5 sm:p-6 card-glow"
              style={{
                background: "#15173A",
                border: "1px solid rgba(253,209,111,0.1)",
              }}
            >
              <h3 className="font-semibold mb-2" style={{ color: "#FDD16F" }}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: 120, background: "linear-gradient(to bottom, transparent, #15173A)", zIndex: 4 }} />
    </section>
  );
}

function AuthorSection() {
  const [imgErr, setImgErr] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  return (
    <section className="relative py-20 md:py-28 px-5 sm:px-6 overflow-hidden" style={{ background: "#15173A" }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 30% 50%, rgba(239,128,24,0.06) 0%, transparent 55%)",
      }} />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.p className="eyebrow text-center mb-4" {...fadeUp(0)}>Автор та ведучий клубу</motion.p>
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-center mb-12"
          style={{ lineHeight: 1.1 }}
          {...fadeUp(0.08)}
        >
          Шпильчук <span className="grad-text">Вадим</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Photo */}
          <motion.div
            {...fadeUp(0.1)}
            className="rounded-3xl overflow-hidden mx-auto w-full max-w-xs md:max-w-none"
            style={{
              aspectRatio: "3/4",
              background: "linear-gradient(135deg, #1E2048 0%, #0D0E2D 100%)",
              border: "1px solid rgba(253,209,111,0.2)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.4)",
            }}
          >
            {!imgErr ? (
              <img
                ref={imgRef}
                src="/photos/vadym.jpg"
                alt="Шпильчук Вадим"
                className="w-full h-full object-cover"
                onError={() => setImgErr(true)}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                <span className="text-5xl">🧘</span>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Вадим Шпильчук</p>
              </div>
            )}
          </motion.div>

          {/* Text */}
          <motion.div {...fadeUp(0.16)}>
            <p className="text-base sm:text-lg mb-6 leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
              Навчаю розуміти себе, як духовну істоту, а світ, як єдиний механізм, в якому все пов'язано між собою.
            </p>

            <div className="flex flex-col gap-4">
              {[
                { label: "Досвід", value: "4+ роки роботи з людьми. Тисячі годин практики та наставництва." },
                { label: "Підхід", value: "Педагог, духовний учитель та наставник. Поєднання глибинної психології та духовних законів з інтеграцією в сучасне життя." },
                { label: "Особистий приклад", value: "Підприємець, практик, сім'янин, дослідник свідомості." },
                { label: "Місія", value: "Поширення духовності в повсякденному житті, щоб допомогти тобі вийти на новий рівень свідомості." },
              ].map(({ label, value }, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-xs font-semibold flex-shrink-0 mt-1 tracking-wider uppercase" style={{ color: "#EF8018", minWidth: 80 }}>{label}</span>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: 120, background: "linear-gradient(to bottom, transparent, #0D0E2D)", zIndex: 4 }} />
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="relative py-20 md:py-28 px-5 sm:px-6 overflow-hidden" style={{ background: "#0D0E2D" }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 50% 0%, rgba(253,209,111,0.04) 0%, transparent 55%)",
      }} />

      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.p className="eyebrow text-center mb-4" {...fadeUp(0)}>Відгуки</motion.p>
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4"
          style={{ lineHeight: 1.1 }}
          {...fadeUp(0.08)}
        >
          Історія <span className="grad-text">трансформації</span>
        </motion.h2>
        <motion.p
          className="text-center text-sm mb-12"
          style={{ color: "rgba(255,255,255,0.35)" }}
          {...fadeUp(0.14)}
        >
          Ми попросили учасників клубу описати однією фразою про що для них став Клуб 432
        </motion.p>

        <div className="flex flex-col gap-2.5">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              {...fadeUp(0.08 + i * 0.05)}
              className="flex items-center gap-4 px-5 py-4 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: "rgba(239,128,24,0.15)", color: "#EF8018" }}>
                {i + 1}
              </span>
              <p className="text-sm sm:text-base" style={{ color: "rgba(255,255,255,0.75)" }}>{t}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: 120, background: "linear-gradient(to bottom, transparent, #15173A)", zIndex: 4 }} />
    </section>
  );
}

function MonthlySection() {
  return (
    <section className="relative py-20 md:py-28 px-5 sm:px-6 overflow-hidden" style={{ background: "#15173A" }}>
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.p className="eyebrow text-center mb-4" {...fadeUp(0)}>Що входить</motion.p>
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4"
          style={{ lineHeight: 1.1 }}
          {...fadeUp(0.08)}
        >
          Твій місяць у <span className="grad-text">Клубі 432</span>
        </motion.h2>
        <motion.p
          className="text-center text-sm mb-12"
          style={{ color: "rgba(255,255,255,0.35)" }}
          {...fadeUp(0.14)}
        >
          Повний арсенал інструментів для твого зростання в одному місці
        </motion.p>

        <div className="flex flex-col gap-3">
          {monthlyIncludes.map(({ n, title, text }, i) => (
            <motion.div
              key={i}
              {...fadeUp(0.06 + i * 0.05)}
              className="flex gap-4 sm:gap-5 rounded-2xl px-5 py-4"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <span className="flex-shrink-0 text-sm font-bold mt-0.5 w-8" style={{ color: "#EF8018" }}>{n}.</span>
              <div>
                <h3 className="font-semibold mb-1" style={{ color: "#fff" }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bonuses */}
        <motion.div
          {...fadeUp(0.4)}
          className="mt-6 rounded-2xl p-5 sm:p-6"
          style={{
            background: "rgba(253,209,111,0.04)",
            border: "1px solid rgba(253,209,111,0.18)",
          }}
        >
          <p className="eyebrow mb-3" style={{ color: "#EF8018" }}>Бонус</p>
          <p className="text-sm mb-3" style={{ color: "rgba(255,255,255,0.7)" }}>
            Учасникам клубу відкриваються знижки на всі інші продукти:
          </p>
          <div className="flex flex-wrap gap-2">
            {["Індивідуальне заняття", "Місяць ведення", "Курс 7 таємниць", "Навчання на провідника Ліли", "Ліла гра індивідуальна", "Групова Ліла"].map((b, i) => (
              <span key={i} className="text-xs px-3 py-1.5 rounded-full" style={{
                background: "rgba(239,128,24,0.1)",
                border: "1px solid rgba(239,128,24,0.2)",
                color: "rgba(255,255,255,0.65)",
              }}>{b}</span>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: 120, background: "linear-gradient(to bottom, transparent, #0D0E2D)", zIndex: 4 }} />
    </section>
  );
}

function PricingSection() {
  return (
    <section className="relative py-20 md:py-28 px-5 sm:px-6 overflow-hidden" style={{ background: "#0D0E2D" }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 50% 30%, rgba(239,128,24,0.08) 0%, transparent 55%)",
      }} />

      <div className="relative z-10 max-w-lg mx-auto text-center">
        <motion.p className="eyebrow mb-4" {...fadeUp(0)}>Вартість</motion.p>
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
          style={{ lineHeight: 1.1 }}
          {...fadeUp(0.08)}
        >
          Стати учасником <span className="grad-text">Клубу 432</span>
        </motion.h2>
        <motion.p className="text-sm mb-10" style={{ color: "rgba(255,255,255,0.35)" }} {...fadeUp(0.14)}>
          Набір відкрито! Твій місяць участі починається з моменту оплати
        </motion.p>

        <motion.div
          {...fadeUp(0.2)}
          className="rounded-3xl p-7 sm:p-8 text-left"
          style={{
            background: "#15173A",
            border: "1px solid rgba(253,209,111,0.2)",
            boxShadow: "0 0 60px rgba(253,209,111,0.06)",
          }}
        >
          <p className="eyebrow mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>Учасник клубу</p>
          <div className="flex items-end gap-3 mb-2">
            <span className="text-4xl sm:text-5xl font-bold" style={{ color: "#FDD16F" }}>1 200</span>
            <span className="text-lg mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>грн / міс</span>
          </div>
          <p className="text-xs mb-6 line-through" style={{ color: "rgba(255,255,255,0.25)" }}>Цінність: 5 000 грн</p>

          <div className="flex flex-col gap-2.5 mb-7">
            {[
              "Доступ до всіх живих ефірів (8/міс)",
              "Участь у розборах з Вадимом",
              "Бонус: Доступ до Бази Знань за 4 роки",
              "Закритий чат та оточення",
              "Щоденні практики",
              "Автоматична щомісячна підписка для зручності",
            ].map((f, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="flex-shrink-0 mt-0.5" style={{ color: "#EF8018" }}>✓</span>
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>{f}</span>
              </div>
            ))}
          </div>

          <a href={BOT_URL} target="_blank" rel="noopener noreferrer" className="btn-cta w-full text-center block">
            Стати учасником
          </a>
          <p className="text-center text-xs mt-3" style={{ color: "rgba(255,255,255,0.25)" }}>
            * Можна скасувати в будь-який момент *
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: 120, background: "linear-gradient(to bottom, transparent, #15173A)", zIndex: 4 }} />
    </section>
  );
}

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="relative py-20 md:py-28 px-5 sm:px-6 overflow-hidden" style={{ background: "#15173A" }}>
      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.p className="eyebrow text-center mb-4" {...fadeUp(0)}>FAQ</motion.p>
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-center mb-12"
          style={{ lineHeight: 1.1 }}
          {...fadeUp(0.08)}
        >
          Часті <span className="grad-text">запитання</span>
        </motion.h2>

        <div className="flex flex-col gap-2.5">
          {faqs.map(({ q, a }, i) => (
            <motion.div
              key={i}
              {...fadeUp(0.06 + i * 0.04)}
              className="rounded-2xl overflow-hidden cursor-pointer"
              style={{
                background: open === i ? "#1E2048" : "#0D0E2D",
                border: open === i ? "1px solid rgba(253,209,111,0.3)" : "1px solid rgba(255,255,255,0.07)",
                transition: "background 0.3s, border-color 0.3s",
              }}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div className="px-5 py-4 flex items-center justify-between gap-4">
                <span className="font-semibold text-sm sm:text-base" style={{ color: open === i ? "#FDD16F" : "#fff", transition: "color 0.3s" }}>
                  {q}
                </span>
                <span
                  className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm"
                  style={{
                    background: open === i ? "rgba(239,128,24,0.2)" : "rgba(255,255,255,0.06)",
                    color: open === i ? "#EF8018" : "rgba(255,255,255,0.35)",
                    transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                    transition: "transform 0.3s, background 0.3s, color 0.3s",
                  }}
                >
                  +
                </span>
              </div>
              <AnimatePresence>
                {open === i && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden px-5 pb-5 text-sm leading-relaxed"
                    style={{
                      color: "rgba(255,255,255,0.65)",
                      borderTop: "1px solid rgba(253,209,111,0.1)",
                      paddingTop: 14,
                    }}
                  >
                    {a}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: 120, background: "linear-gradient(to bottom, transparent, #0D0E2D)", zIndex: 4 }} />
    </section>
  );
}

function ContactSection() {
  return (
    <section className="relative py-20 md:py-24 px-5 sm:px-6 overflow-hidden" style={{ background: "#0D0E2D" }}>
      <div className="relative z-10 max-w-xl mx-auto text-center">
        <motion.h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          {...fadeUp(0)}
        >
          Досі залишилися <span className="grad-text">питання?</span>
        </motion.h2>
        <motion.p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.4)" }} {...fadeUp(0.08)}>
          Пиши мені в Telegram і я відповім тобі найближчим часом
        </motion.p>
        <motion.div {...fadeUp(0.14)}>
          <a href="https://t.me/vadym_shpylchuk" target="_blank" rel="noopener noreferrer" className="btn-cta">
            Написати мені
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer
      className="px-5 sm:px-6 py-10"
      style={{ background: "#07081B", borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Left */}
          <div className="text-center sm:text-left">
            <p className="font-bold text-sm mb-1" style={{ color: "#FDD16F" }}>Клуб 432</p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>+380982627024</p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>prosto.mindful@gmail.com</p>
          </div>

          {/* Social */}
          <div className="flex gap-4 items-center">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm transition-opacity hover:opacity-80"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
              📷
            </a>
            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm transition-opacity hover:opacity-80"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
              ✈️
            </a>
            <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm transition-opacity hover:opacity-80"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
              ▶️
            </a>
          </div>

          {/* Right */}
          <div className="text-center sm:text-right text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
            <a href="/oferta" className="hover:text-white transition-colors block mb-1">Договір публічної оферти</a>
            <a href="/privacy-policy" className="hover:text-white transition-colors block mb-1">Політика конфіденційності</a>
            <p className="mt-2">© 2026 Клуб 432. Всі права захищено.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main>
      <ClubHero />
      <WhoSection />
      <WhySection />
      <SystemSection />
      <FormatSection />
      <FoundationSection />
      <AuthorSection />
      <TestimonialsSection />
      <MonthlySection />
      <PricingSection />
      <FAQSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
