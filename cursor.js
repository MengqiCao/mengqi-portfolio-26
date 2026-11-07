/* Keep native suppression stable; animate only non-interactive visual dots. */
(() => {
  const root = document.documentElement;
  const desktop = matchMedia('(hover: hover) and (pointer: fine)');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const dot = document.createElement('span');
  dot.className = 'site-pointer';
  dot.setAttribute('aria-hidden', 'true');
  document.body.append(dot);
  const trail = Array.from({ length: 3 }, (_, index) => {
    const node = document.createElement('span');
    node.className = `site-pointer site-pointer--trail site-pointer--trail-${index}`;
    node.setAttribute('aria-hidden', 'true');
    document.body.append(node);
    return { node, x: 0, y: 0, opacity: 0 };
  });
  let x = 0, y = 0, visible = false, frame = 0, previousTime = 0;

  function animateTrail(time) {
    frame = 0;
    if (!visible || reducedMotion.matches) return;
    const dt = previousTime ? Math.min(32, time - previousTime) : 16.67;
    previousTime = time;
    const ease = 1 - Math.exp(-dt / 35);
    let moving = false;
    trail.forEach((item, index) => {
      const target = index ? trail[index - 1] : { x, y };
      item.x += (target.x - item.x) * ease;
      item.y += (target.y - item.y) * ease;
      const distance = Math.hypot(x - item.x, y - item.y);
      const opacity = Math.min(distance / 18, 1) * (0.2 - index * 0.055);
      item.opacity += (opacity - item.opacity) * ease;
      item.node.style.transform = `translate3d(${item.x}px, ${item.y}px, 0)`;
      item.node.style.opacity = item.opacity;
      if (distance > 0.1 || item.opacity > 0.003) moving = true;
    });
    if (moving) frame = requestAnimationFrame(animateTrail);
    else {
      trail.forEach(item => { item.node.style.opacity = 0; });
      previousTime = 0;
    }
  }
  function updateHover(target) {
    dot.classList.toggle('is-hovering', !!target?.closest?.('a, button, [role="button"], input, textarea, select, summary, .photo-card.is-top'));
  }
  function position(event) {
    if (!desktop.matches || event.pointerType !== 'mouse') return;
    x = event.clientX; y = event.clientY;
    if (!visible) {
      trail.forEach(item => {
        item.x = x; item.y = y; item.opacity = 0;
        item.node.style.opacity = 0;
      });
    }
    visible = true;
    dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    dot.style.visibility = 'visible';
    updateHover(event.target);
    // This attribute never changes for hover, movement, clicks or focus changes.
    root.setAttribute('data-circle-cursor', 'ready');
    if (!reducedMotion.matches) {
      trail.forEach(item => { item.node.style.visibility = 'visible'; });
      if (!frame) frame = requestAnimationFrame(animateTrail);
    }
  }
  function hideDot() {
    visible = false;
    dot.style.visibility = 'hidden';
    cancelAnimationFrame(frame);
    frame = 0; previousTime = 0;
    trail.forEach(item => { item.node.style.visibility = 'hidden'; item.node.style.opacity = 0; });
  }
  function configure() {
    if (!desktop.matches) {
      root.removeAttribute('data-circle-cursor');
      hideDot();
    }
    if (reducedMotion.matches) {
      cancelAnimationFrame(frame);
      frame = 0; previousTime = 0;
      trail.forEach(item => { item.node.style.visibility = 'hidden'; item.node.style.opacity = 0; });
    }
  }
  document.addEventListener('pointermove', position, { capture: true, passive: true });
  document.addEventListener('pointerover', position, { capture: true, passive: true });
  document.addEventListener('scroll', () => {
    if (visible) updateHover(document.elementFromPoint(x, y));
  }, { capture: true, passive: true });
  root.addEventListener('pointerleave', hideDot);
  window.addEventListener('blur', hideDot);
  desktop.addEventListener('change', configure);
  reducedMotion.addEventListener('change', configure);
  configure();
})();
