/**
 * Dependency-free canvas decoration. Give the canvas a CSS width and height,
 * call createTopographicField(canvas), and call destroy() when removing it.
 */
export function createTopographicField(canvas, variant) {
  const context = canvas.getContext("2d");
  if (!context) return { destroy() {} };

  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const frameInterval = 1000 / 30;
  const pointer = { x: 0, y: 0, targetX: 0, targetY: 0, strength: 0, targetStrength: 0 };
  let width = 0;
  let height = 0;
  let points = [];
  let frame = 0;
  let lastFrame = 0;
  let sceneTime = 0;
  let inView = false;
  let destroyed = false;
  let dotColor = "#e9e7dc";

  function readColors() {
    const styles = getComputedStyle(document.documentElement);
    dotColor = styles.getPropertyValue("--ink").trim() || dotColor;
  }

  function draw() {
    if (!width || !height) return;
    context.clearRect(0, 0, width, height);
    // Batch dots by brightness: eight fills, rather than thousands per frame.
    const layers = Array.from({ length: 8 }, () => new Path2D());
    const amplitude = Math.min(height * 0.19, width * 0.15);
    const reach = Math.min(100, width * 0.2);

    for (const point of points) {
      const { u, v, fade } = point;
      const state = fieldState(variant, u, v, sceneTime, width, height, amplitude);
      let { x, y, brightness } = state;

      if (pointer.strength > 0.001) {
        const dx = x - pointer.x;
        const dy = y - pointer.y;
        const distanceSquared = dx * dx + dy * dy;
        if (distanceSquared < reach * reach) {
          const influence = (1 - distanceSquared / (reach * reach)) ** 3 * pointer.strength;
          x += dx * influence * 0.045;
          y += dy * influence * 0.045 - influence * 3;
        }
      }

      brightness *= fade;
      if (brightness < 0.045) continue;
      const layer = Math.min(7, Math.floor(brightness * 8));
      const radius = 0.55 + brightness * 0.55;
      layers[layer].moveTo(x + radius, y);
      layers[layer].arc(x, y, radius, 0, Math.PI * 2);
    }

    context.fillStyle = dotColor;
    layers.forEach((path, index) => {
      context.globalAlpha = (index + 1) / 10;
      context.fill(path);
    });
    context.globalAlpha = 1;
  }

  function fieldState(kind, u, v, time, canvasWidth, canvasHeight, scale) {
    if (kind === "home") {
      const warpedU = u + Math.sin(v * 3.1 + time * 0.045) * 0.15;
      const elevation = Math.sin(warpedU * 3 + v * 2.4 - time * 0.11) * 0.52
        + Math.sin(warpedU * 6.8 - v * 4.2 + time * 0.08) * 0.16
        + Math.cos(v * 5.4 + warpedU * 1.2 - time * 0.06) * 0.18;
      const contour = (0.5 + 0.5 * Math.cos(elevation * 7 - v * 0.5)) ** 5;
      return {
        x: canvasWidth * (0.5 + u * 0.5 + v * 0.1),
        y: canvasHeight * (0.54 + v * 0.44) - elevation * scale * 1.7,
        brightness: 0.16 + (elevation + 1) * 0.16 + contour * 0.32,
      };
    }
    if (kind === "work") {
      const bend = Math.sin(v * 7 + time * 0.24) * Math.cos(u * 2.8 - time * 0.15);
      const compression = Math.exp(-((u + 0.2) ** 2 + (v - 0.1) ** 2) * 5);
      return {
        x: canvasWidth * (0.53 + u * 0.48 + bend * 0.07 - compression * u * 0.2),
        y: canvasHeight * (0.5 + v * 0.45 + bend * 0.08),
        brightness: 0.18 + compression * 0.62 + (0.5 + 0.5 * Math.cos((u + bend) * 12)) ** 9 * 0.25,
      };
    }
    if (kind === "about") {
      const drift = Math.sin(u * 2.4 + time * 0.18) * 0.12 + Math.cos(v * 5 - time * 0.12) * 0.04;
      const current = Math.exp(-((u - 0.18) ** 2 + (v + 0.18) ** 2) * 3.6);
      return {
        x: canvasWidth * (0.52 + u * 0.45 + drift),
        y: canvasHeight * (0.52 + v * 0.4 - drift * 0.55),
        brightness: 0.07 + current * 0.45 + (0.5 + 0.5 * Math.sin(u * 5 - v * 3 + time * 0.18)) ** 12 * 0.22,
      };
    }
    if (kind === "blog") {
      const rhythm = (0.5 + 0.5 * Math.sin(u * 9 + v * 2 - time * 0.22)) ** 6;
      const line = (0.5 + 0.5 * Math.cos(v * 22 + Math.sin(u * 2 + time * 0.14))) ** 22;
      return {
        x: canvasWidth * (0.55 + u * 0.47),
        y: canvasHeight * (0.5 + v * 0.45 + Math.sin(u * 3 + time * 0.14) * 0.025),
        brightness: 0.045 + line * (0.16 + rhythm * 0.58),
      };
    }
    if (kind === "space") {
      const interference = Math.sin(u * 10 + time * 0.2) + Math.sin(v * 12 - time * 0.16) + Math.sin((u + v) * 8 + time * 0.12);
      return {
        x: canvasWidth * (0.53 + u * 0.49 + Math.sin(v * 5 + time * 0.18) * 0.025),
        y: canvasHeight * (0.5 + v * 0.45 + Math.cos(u * 5 - time * 0.16) * 0.035),
        brightness: 0.05 + (0.5 + 0.5 * Math.cos(interference * 2.6)) ** 7 * 0.65,
      };
    }
    const firstU = -0.34 + Math.sin(time * 0.19) * 0.08;
    const firstV = -0.1 + Math.cos(time * 0.15) * 0.05;
    const secondU = 0.28 + Math.cos(time * 0.17) * 0.07;
    const secondV = 0.14 + Math.sin(time * 0.21) * 0.06;
    const firstCluster = Math.exp(-((u - firstU) ** 2 + (v - firstV) ** 2) * 10);
    const secondCluster = Math.exp(-((u - secondU) ** 2 + (v - secondV) ** 2) * 11);
    const pull = (firstCluster - secondCluster) * 0.1;
    const current = Math.sin(u * 4 + v * 3 + time * 0.16) * 0.018;
    return {
      x: canvasWidth * (0.52 + u * 0.48 - pull + current),
      y: canvasHeight * (0.51 + v * 0.44 + pull * 0.4 - current * 0.6),
      brightness: 0.08 + Math.max(firstCluster, secondCluster) * 0.72,
    };
  }

  function tick(now) {
    frame = requestAnimationFrame(tick);
    if (!lastFrame) lastFrame = now;
    const elapsed = now - lastFrame;
    if (elapsed < frameInterval) return;
    const delta = Math.min(elapsed / 1000, 0.1);
    lastFrame = now - (elapsed % frameInterval);
    sceneTime += delta;
    const smoothing = 1 - Math.exp(-delta * 5);
    pointer.x += (pointer.targetX - pointer.x) * smoothing;
    pointer.y += (pointer.targetY - pointer.y) * smoothing;
    pointer.strength += (pointer.targetStrength - pointer.strength) * smoothing;
    draw();
  }

  function updatePlayback() {
    cancelAnimationFrame(frame);
    frame = 0;
    lastFrame = 0;
    if (motion.matches) {
      pointer.strength = 0;
      pointer.targetStrength = 0;
      draw();
    }
    if (!destroyed && inView && !document.hidden && !motion.matches) {
      frame = requestAnimationFrame(tick);
    }
  }

  function resize() {
    const bounds = canvas.getBoundingClientRect();
    width = bounds.width;
    height = bounds.height;
    if (!width || !height) return;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(canvas.width / width, 0, 0, canvas.height / height, 0, 0);
    readColors();
    const columns = Math.max(36, Math.min(120, Math.round(width / (width < 600 ? 8 : 6))));
    const rows = Math.max(24, Math.min(64, Math.round(height / (width < 600 ? 9 : 7))));
    points = [];
    for (let row = 0; row < rows; row++) {
      const v = (row / (rows - 1)) * 2 - 1;
      for (let column = 0; column < columns; column++) {
        const u = (column / (columns - 1)) * 2 - 1;
        const fade = Math.pow(Math.max(0, (1 - u * u) * (1 - v * v)), 0.65);
        points.push({ u, v, fade });
      }
    }
    draw();
  }

  function move(event) {
    if (event.pointerType === "touch" || motion.matches) return;
    const bounds = canvas.getBoundingClientRect();
    pointer.targetX = event.clientX - bounds.left;
    pointer.targetY = event.clientY - bounds.top;
    if (!pointer.targetStrength) {
      pointer.x = pointer.targetX;
      pointer.y = pointer.targetY;
    }
    pointer.targetStrength = 1;
  }

  function leave() {
    pointer.targetStrength = 0;
  }

  const sizeObserver = new ResizeObserver(resize);
  const themeObserver = new MutationObserver(() => {
    readColors();
    draw();
  });
  const visibilityObserver = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    updatePlayback();
  });
  sizeObserver.observe(canvas);
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  visibilityObserver.observe(canvas);
  canvas.addEventListener("pointermove", move, { passive: true });
  canvas.addEventListener("pointerleave", leave);
  document.addEventListener("visibilitychange", updatePlayback);
  motion.addEventListener("change", updatePlayback);
  window.addEventListener("resize", resize);
  resize();

  return {
    destroy() {
      destroyed = true;
      cancelAnimationFrame(frame);
      sizeObserver.disconnect();
      themeObserver.disconnect();
      visibilityObserver.disconnect();
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", updatePlayback);
      motion.removeEventListener("change", updatePlayback);
      window.removeEventListener("resize", resize);
    },
  };
}
