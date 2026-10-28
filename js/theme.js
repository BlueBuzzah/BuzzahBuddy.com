/* Sets data-theme on <html> before first paint: the OS setting (dark when it can't be determined), unless
   the person chose an override in Display settings. Load as a blocking script before the stylesheets. */
(function () {
  var KEY = 'bb-theme';
  var DEFAULT = { mode: 'system', hc: null };
  var memo = null; // the last choice, for when storage is blocked

  // hc: null follows prefers-contrast; true/false is the person's override
  function resolve(pref, prefersDark, prefersMore) {
    var dark = pref.mode === 'system' ? prefersDark : pref.mode === 'dark';
    var hc = pref.hc === null ? prefersMore : pref.hc;
    return (dark ? 'dark' : 'light') + (hc ? '-hc' : '');
  }

  function copy(p) { return { mode: p.mode, hc: p.hc }; }

  function read() {
    var raw;
    try { raw = localStorage.getItem(KEY); } catch (e) { return copy(memo || DEFAULT); } // storage blocked
    try {
      var p = JSON.parse(raw);
      if (p && /^(system|light|dark)$/.test(p.mode) && (p.hc === null || typeof p.hc === 'boolean')) return copy(p);
    } catch (e) { /* bad JSON */ }
    return copy(memo || DEFAULT); // nothing stored (or the save failed): this page view's choice, else the OS
  }

  function save(pref) {
    memo = copy(pref);
    try { localStorage.setItem(KEY, JSON.stringify(pref)); } catch (e) { /* the choice lasts this page view only */ }
  }

  function apply() {
    // dark unless the OS says light: an unknown preference defaults to dark
    document.documentElement.dataset.theme = resolve(read(),
      !matchMedia('(prefers-color-scheme: light)').matches, matchMedia('(prefers-contrast: more)').matches);
  }

  window.bbTheme = { read: read, save: save, apply: apply };
  apply();
})();
