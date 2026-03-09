import { useEffect, useRef } from 'react';

interface Dot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulsePhase: number;
  pulseSpeed: number;
}

interface Connection {
  a: number;
  b: number;
  opacity: number;
  maxOpacity: number;
  fadeIn: boolean;
  life: number;
  maxLife: number;
}

export function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let dots: Dot[] = [];
    let connections: Connection[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const DOT_COUNT = Math.floor((window.innerWidth * window.innerHeight) / 20000);
    const MAX_CONNECTIONS = Math.floor(DOT_COUNT * 0.65);
    const CONNECTION_DIST = 150;

    for (let i = 0; i < DOT_COUNT; i++) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.8 + 1.2,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.018 + Math.random() * 0.018,
      });
    }

    let frame = 0;

    const spawnConnection = () => {
      if (connections.length >= MAX_CONNECTIONS) return;
      const ai = Math.floor(Math.random() * dots.length);
      const a = dots[ai];
      const candidates: number[] = [];

      for (let bi = 0; bi < dots.length; bi++) {
        if (bi === ai) continue;
        const b = dots[bi];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        if (Math.sqrt(dx * dx + dy * dy) < CONNECTION_DIST) candidates.push(bi);
      }

      if (candidates.length === 0) return;
      const bi = candidates[Math.floor(Math.random() * candidates.length)];
      const exists = connections.some(
        (c) => (c.a === ai && c.b === bi) || (c.a === bi && c.b === ai)
      );
      if (exists) return;

      const maxLife = 140 + Math.random() * 200;
      connections.push({
        a: ai, b: bi,
        opacity: 0,
        maxOpacity: 0.18 + Math.random() * 0.22,
        fadeIn: true,
        life: 0,
        maxLife,
      });
    };

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dots.forEach((dot) => {
        dot.x += dot.vx;
        dot.y += dot.vy;
        dot.pulsePhase += dot.pulseSpeed;
        if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1;
        if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1;
      });

      if (frame % 16 === 0) spawnConnection();

      connections = connections.filter((conn) => {
        conn.life++;
        const halfway = conn.maxLife * 0.4;

        if (conn.fadeIn) {
          conn.opacity = Math.min(conn.maxOpacity, conn.opacity + conn.maxOpacity / 28);
          if (conn.opacity >= conn.maxOpacity) conn.fadeIn = false;
        } else if (conn.life > halfway) {
          conn.opacity = Math.max(0, conn.opacity - conn.maxOpacity / 55);
        }

        if (conn.life > conn.maxLife && conn.opacity <= 0) return false;

        const a = dots[conn.a];
        const b = dots[conn.b];
        if (!a || !b) return false;

        const dx = a.x - b.x;
        const dy = a.y - b.y;
        if (Math.sqrt(dx * dx + dy * dy) > CONNECTION_DIST * 1.5) return false;

        // Blue line — visible on light background
        const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        grad.addColorStop(0,   `rgba(37, 99, 235, ${conn.opacity})`);
        grad.addColorStop(0.5, `rgba(59, 130, 246, ${conn.opacity * 1.15})`);
        grad.addColorStop(1,   `rgba(37, 99, 235, ${conn.opacity})`);

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.shadowBlur = 3;
        ctx.shadowColor = `rgba(59, 130, 246, ${conn.opacity * 0.5})`;
        ctx.stroke();
        ctx.shadowBlur = 0;

        return true;
      });

      // Dots — deep blue, soft pulse
      dots.forEach((dot) => {
        const pulse = 0.5 + 0.5 * Math.sin(dot.pulsePhase);
        const alpha = 0.25 + pulse * 0.45;
        const r = dot.radius + pulse * 0.6;

        const glow = ctx.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, r * 5);
        glow.addColorStop(0, `rgba(37, 99, 235, ${alpha * 0.2})`);
        glow.addColorStop(1, 'rgba(37, 99, 235, 0)');
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, r * 5, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(29, 78, 216, ${alpha})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}