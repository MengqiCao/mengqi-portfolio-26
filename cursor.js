/* Hide the native pointer continuously; draw one unblended circle. */
(() => {
  const root = document.documentElement;
  const desktop = matchMedia('(hover: hover) and (pointer: fine)');
  const dot = document.createElement('span');
  dot.className = 'site-pointer';
  dot.setAttribute('aria-hidden', 'true');
  document.body.append(dot);

  function position(event) {
    if (!desktop.matches || event.pointerType !== 'mouse') return;
    dot.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    dot.style.visibility = 'visible';
    // Set once after the circle has a valid position. Never toggle on hover,
    // clicks, pointerleave, blur, or individual animation frames.
    root.setAttribute('data-circle-cursor', 'ready');
  }
  function hideDot() { dot.style.visibility = 'hidden'; }
  function configure() {
    if (!desktop.matches) {
      root.removeAttribute('data-circle-cursor');
      hideDot();
    }
  }
  document.addEventListener('pointermove', position, { capture: true, passive: true });
  document.addEventListener('pointerover', position, { capture: true, passive: true });
  root.addEventListener('pointerleave', hideDot);
  window.addEventListener('blur', hideDot);
  desktop.addEventListener('change', configure);
  configure();
})();
