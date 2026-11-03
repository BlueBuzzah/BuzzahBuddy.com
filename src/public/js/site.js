/* Progressive enhancement only: every page reads fine without this file. */

// Display settings sheet (footer): Appearance (System / Light / Dark) + High contrast.
// Mirrors bundle.js SegmentedControl and Switch behaviour (DS import 1793120889-b415).
(function () {
  var t = window.bbTheme;
  var box = document.querySelector('.theme-controls');
  if (!t || !box) return;
  var opts = [].slice.call(box.querySelectorAll('.bb-seg__opt'));
  var sw = box.querySelector('.bb-switch');
  var root = document.documentElement;

  function check(size) {
    return '<svg class="bb-icon" width="' + size + '" height="' + size + '" viewBox="0 0 24 24" aria-hidden="true" ' +
      'focusable="false"><use href="assets/icons/check.svg#icon"/></svg>';
  }

  function render() {
    var mode = t.read().mode;
    opts.forEach(function (b) {
      var on = b.dataset.mode === mode, svg = b.querySelector('svg');
      b.classList.toggle('bb-seg__opt--on', on);
      b.setAttribute('aria-checked', String(on));
      b.tabIndex = on ? 0 : -1;
      if (on && !svg) b.insertAdjacentHTML('afterbegin', check(20));
      if (!on && svg) svg.remove();
    });
    var hc = /-hc$/.test(root.dataset.theme);
    sw.classList.toggle('bb-switch--on', hc);
    sw.setAttribute('aria-checked', String(hc));
    sw.querySelector('.bb-switch__thumb').innerHTML = hc ? check(18) : '';
  }

  function set(change) {
    var pref = t.read();
    for (var k in change) pref[k] = change[k];
    t.save(pref);
    t.apply();
    render();
  }

  opts.forEach(function (b, i) {
    b.addEventListener('click', function () { set({ mode: b.dataset.mode }); });
    b.addEventListener('keydown', function (e) {
      var d = (e.key === 'ArrowRight' || e.key === 'ArrowDown') ? 1 : (e.key === 'ArrowLeft' || e.key === 'ArrowUp') ? -1 : 0;
      if (!d) return;
      e.preventDefault();
      var next = opts[(i + d + opts.length) % opts.length];
      set({ mode: next.dataset.mode });
      next.focus();
    });
  });
  sw.addEventListener('click', function () { set({ hc: !/-hc$/.test(root.dataset.theme) }); });

  // Follow OS changes live while the override is System (or High contrast is unset).
  ['(prefers-color-scheme: dark)', '(prefers-contrast: more)'].forEach(function (q) {
    var m = matchMedia(q), update = function () { t.apply(); render(); };
    if (m.addEventListener) m.addEventListener('change', update); else m.addListener(update);
  });

  // The footer opener only appears when the sheet can open; showModal gives focus trap, Escape and focus return.
  var dialog = box.closest('dialog'), opener = document.querySelector('[data-open-settings]');
  if (dialog && opener && dialog.showModal) {
    opener.addEventListener('click', function () { dialog.showModal(); });
    opener.closest('.js-only').hidden = false;
  }
  render();
})();
