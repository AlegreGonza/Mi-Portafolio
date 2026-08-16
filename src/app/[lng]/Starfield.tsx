'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  twinklePhase: number;
  twinkleSpeed: number;
  clusterId: number | null;
  glow: boolean;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  life: number;
  maxLife: number;
}

interface Nebula {
  x: number;
  y: number;
  radius: number;
  color: string;
}

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let stars: Star[] = [];
    let links: { a: number; b: number }[] = [];
    let nebulas: Nebula[] = [];
    let shootingStars: ShootingStar[] = [];
    let nextShootingStarIn = 3 + Math.random() * 4;

    const setCanvasSize = () => {
      const { innerWidth, innerHeight } = window;
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const createScene = () => {
      const { innerWidth, innerHeight } = window;
      stars = [];
      links = [];
      nebulas = [];

      // Nebulosas: manchas de color muy suaves, tipo nubes de gas
      const nebulaColors = [
        'rgba(88, 60, 130, 0.10)',   // violeta
        'rgba(30, 70, 120, 0.10)',   // azul
        'rgba(120, 50, 90, 0.08)',   // magenta oscuro
        'rgba(40, 100, 110, 0.08)',  // teal
      ];
      const nebulaCount = 4 + Math.floor(Math.random() * 2);
      for (let i = 0; i < nebulaCount; i++) {
        nebulas.push({
          x: Math.random() * innerWidth,
          y: Math.random() * innerHeight,
          radius: 250 + Math.random() * 350,
          color: nebulaColors[i % nebulaColors.length],
        });
      }

      // Estrellas de fondo: bastante más densidad
      const bgCount = Math.floor((innerWidth * innerHeight) / 2800);
      for (let i = 0; i < bgCount; i++) {
        const isGlow = Math.random() > 0.96; // pocas estrellas destacadas con glow
        stars.push({
          x: Math.random() * innerWidth,
          y: Math.random() * innerHeight,
          size: isGlow ? 1.8 + Math.random() * 1.4 : 0.4 + Math.random() * 1.1,
          baseAlpha: isGlow ? 0.7 + Math.random() * 0.3 : 0.2 + Math.random() * 0.5,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.3 + Math.random() * 1.2,
          clusterId: null,
          glow: isGlow,
        });
      }

      // Clusters de constelación
      const clusterCount = Math.max(4, Math.floor((innerWidth * innerHeight) / 160000));
      let starIndex = stars.length;

      for (let c = 0; c < clusterCount; c++) {
        const centerX = Math.random() * innerWidth;
        const centerY = Math.random() * innerHeight;
        const spread = 90 + Math.random() * 70;
        const starsInCluster = 4 + Math.floor(Math.random() * 5);
        const clusterStartIndex = starIndex;

        for (let i = 0; i < starsInCluster; i++) {
          const angle = Math.random() * Math.PI * 2;
          const dist = Math.random() * spread;
          stars.push({
            x: centerX + Math.cos(angle) * dist,
            y: centerY + Math.sin(angle) * dist,
            size: 0.9 + Math.random() * 1.3,
            baseAlpha: 0.5 + Math.random() * 0.4,
            twinklePhase: Math.random() * Math.PI * 2,
            twinkleSpeed: 0.3 + Math.random() * 0.8,
            clusterId: c,
            glow: false,
          });
          starIndex++;
        }

        for (let i = clusterStartIndex; i < starIndex; i++) {
          for (let j = i + 1; j < starIndex; j++) {
            const dx = stars[i].x - stars[j].x;
            const dy = stars[i].y - stars[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < spread * 0.9 && Math.random() > 0.35) {
              links.push({ a: i, b: j });
            }
          }
        }
      }
    };

    setCanvasSize();
    createScene();

    const spawnShootingStar = () => {
      const { innerWidth, innerHeight } = window;
      const fromLeft = Math.random() > 0.5;
      shootingStars.push({
        x: fromLeft ? Math.random() * innerWidth * 0.3 : innerWidth * 0.7 + Math.random() * innerWidth * 0.3,
        y: Math.random() * innerHeight * 0.4,
        length: 80 + Math.random() * 60,
        speed: 600 + Math.random() * 400,
        angle: fromLeft ? Math.PI / 5 : Math.PI - Math.PI / 5,
        life: 0,
        maxLife: 0.7 + Math.random() * 0.3,
      });
    };

    const render = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;
      const { innerWidth, innerHeight } = window;

      // Fondo negro
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, innerWidth, innerHeight);

      // Nebulosas (radial gradients suaves)
      nebulas.forEach((n) => {
        const gradient = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius);
        gradient.addColorStop(0, n.color);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(n.x - n.radius, n.y - n.radius, n.radius * 2, n.radius * 2);
      });

      // Líneas de constelación
      ctx.lineWidth = 0.6;
      links.forEach(({ a, b }) => {
        const starA = stars[a];
        const starB = stars[b];
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.15)';
        ctx.beginPath();
        ctx.moveTo(starA.x, starA.y);
        ctx.lineTo(starB.x, starB.y);
        ctx.stroke();
      });

      // Estrellas
      stars.forEach((star) => {
        star.twinklePhase += star.twinkleSpeed * delta;
        const twinkle = (Math.sin(star.twinklePhase) + 1) / 2;
        const alpha = star.baseAlpha * (0.55 + twinkle * 0.45);

        if (star.glow) {
          const glowGradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.size * 6
          );
          glowGradient.addColorStop(0, `rgba(200, 220, 255, ${alpha * 0.5})`);
          glowGradient.addColorStop(1, 'rgba(200, 220, 255, 0)');
          ctx.fillStyle = glowGradient;
          ctx.fillRect(star.x - star.size * 6, star.y - star.size * 6, star.size * 12, star.size * 12);
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.clusterId !== null ? '#a8e6d9' : '#ffffff';
        ctx.globalAlpha = alpha;
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // Estrellas fugaces
      nextShootingStarIn -= delta;
      if (nextShootingStarIn <= 0) {
        spawnShootingStar();
        nextShootingStarIn = 4 + Math.random() * 6;
      }

      shootingStars = shootingStars.filter((s) => s.life < s.maxLife);
      shootingStars.forEach((s) => {
        s.life += delta;
        const progress = s.life / s.maxLife;
        const dx = Math.cos(s.angle) * s.speed * s.life;
        const dy = Math.sin(s.angle) * s.speed * s.life;
        const headX = s.x + dx;
        const headY = s.y + dy;
        const tailX = headX - Math.cos(s.angle) * s.length;
        const tailY = headY - Math.sin(s.angle) * s.length;

        const fade = progress < 0.15 ? progress / 0.15 : 1 - (progress - 0.15) / 0.85;
        const gradient = ctx.createLinearGradient(tailX, tailY, headX, headY);
        gradient.addColorStop(0, 'rgba(255,255,255,0)');
        gradient.addColorStop(1, `rgba(255,255,255,${Math.max(fade, 0) * 0.9})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(headX, headY);
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setCanvasSize();
        createScene();
      }, 150);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[-1]"
    />
  );
}