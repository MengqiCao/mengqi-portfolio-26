/* Small pointer with a short trailing motion; no external dependency. */
(() => {
  const enabled = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
  const root = document.documentElement;
  let cleanup = () => {};
  function configure() {
    cleanup();
    if (!enabled.matches) return;
    const dots = Array.from({ length: 3 }, (_, i) => {
      const dot = document.createElement('span');
      dot.className = `portfolio-cursor portfolio-cursor--${i ? 'trail' : 'lead'}`;
      dot.setAttribute('aria-hidden', 'true');
      document.body.append(dot);
      return { node: dot, x: 0, y: 0 };
    });
    let x = 0, y = 0, frame = 0, visible = false;
    function draw() {
      frame = 0;
      let settling = false;
      dots.forEach((dot, i) => {
        const target = i ? dots[i - 1] : { x, y };
        dot.x += (target.x - dot.x) * (i ? 0.32 : 1);
        dot.y += (target.y - dot.y) * (i ? 0.32 : 1);
        dot.node.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0)`;
        const distance = Math.hypot(x - dot.x, y - dot.y);
        dot.node.style.opacity = visible ? (i ? Math.min(distance / 14, 1) * (i === 1 ? 0.28 : 0.12) : 1) : 0;
        if (distance > 0.15) settling = true;
      });
      if (settling && visible) frame = requestAnimationFrame(draw);
    }
    function hide() {
      visible = false;
      cancelAnimationFrame(frame);
      frame = 0;
      root.classList.remove('has-custom-cursor', 'cursor-over-action');
      dots.forEach(dot => { dot.node.style.opacity = 0; });
    }
    function move(event) {
      if (event.pointerType !== 'mouse') { hide(); return; }
      x = event.clientX; y = event.clientY;
      if (!visible) dots.forEach(dot => { dot.x = x; dot.y = y; });
      visible = true;
      root.classList.add('has-custom-cursor');
      root.classList.toggle('cursor-over-action', !!event.target.closest('a, button, [role="button"], input, textarea, select, summary'));
      if (!frame) frame = requestAnimationFrame(draw);
    }
    document.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', hide);
    window.addEventListener('blur', hide);
    cleanup = () => {
      hide();
      document.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', hide);
      window.removeEventListener('blur', hide);
      dots.forEach(dot => dot.node.remove());
    };
  }
  enabled.addEventListener('change', configure);
  configure();
})();
