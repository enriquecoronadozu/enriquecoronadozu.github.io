/* ============================================================
   I18N ENGINE — include on every page AFTER js/translations.js:

     <script src="js/translations.js"></script>
     <script src="js/i18n.js"></script>
     (use ../js/... from pages inside subfolders like news/)

   HOW IT WORKS
   - The chosen language is saved in localStorage ("site-lang"),
     so it persists across pages and visits until changed.
   - Every element with data-i18n="key" gets its content replaced
     from TRANSLATIONS (HTML allowed). Text already in the HTML is
     just the English fallback for no-JS situations.
   - The selector is rendered into every element with
     class="lang-switcher" (put one in the desktop nav and one in
     the mobile menu).
   - For JS-rendered content, use:
       I18N.t('key')            -> translated UI string
       I18N.pick(obj, 'title')  -> obj.title_ja / obj.title_es /
                                   obj.title, based on the language
     and re-render on the "langchange" event:
       document.addEventListener('langchange', rerender);
   ============================================================ */

(function () {
  const LANGS = [['en', 'EN'], ['ja', '日本語'], ['es', 'ES']];
  const STORAGE_KEY = 'site-lang';

  let lang = localStorage.getItem(STORAGE_KEY);
  if (!TRANSLATIONS[lang]) lang = 'en';

  function t(key) {
    return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key])
      ?? TRANSLATIONS.en[key]
      ?? key;
  }

  function pick(obj, field) {
    return obj[field + '_' + lang] || obj[field];
  }

  function apply() {
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      el.innerHTML = t(el.dataset.i18n);
    });

    document.querySelectorAll('.lang-switcher [data-lang]').forEach(btn => {
      const active = btn.dataset.lang === lang;
      btn.className = 'px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors ' +
        (active ? 'bg-ink text-white' : 'text-faint hover:text-ink');
      btn.setAttribute('aria-pressed', String(active));
    });

    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  }

  function set(newLang) {
    if (!TRANSLATIONS[newLang]) return;
    lang = newLang;
    localStorage.setItem(STORAGE_KEY, lang);
    apply();
  }

  function mount() {
    document.querySelectorAll('.lang-switcher').forEach(host => {
      host.innerHTML =
        '<div class="inline-flex items-center gap-0.5 bg-white rounded-full p-1 shadow-sm" role="group" aria-label="Language">'
        + LANGS.map(([code, label]) =>
            `<button type="button" data-lang="${code}">${label}</button>`).join('')
        + '</div>';
      host.addEventListener('click', e => {
        const btn = e.target.closest('[data-lang]');
        if (btn) set(btn.dataset.lang);
      });
    });
  }

  window.I18N = { t, pick, set, get lang() { return lang; } };

  // Scripts are included at the end of <body>, so the DOM is ready.
  mount();
  apply();
})();
