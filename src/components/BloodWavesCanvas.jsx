import React, { useEffect, useRef } from 'react';

export const BloodWavesCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // 1. Ambient Floating Blood Particles (No rain drops - clean ambient background)
    const particlesCount = 35;
    const particles = [];
    for (let i = 0; i < particlesCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 3.5 + 1.2,
        vy: -(Math.random() * 0.5 + 0.2),
        vx: (Math.random() - 0.5) * 0.2,
        alpha: Math.random() * 0.3 + 0.1,
        pulse: Math.random() * Math.PI * 2
      });
    }

    // 2. Fluid Waves Liquid Level near Bottom
    let fillProgress = 0;
    let waveStep = 0;
    let animationFrameId;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      waveStep += 0.012;

      fillProgress = (height * 0.86) + Math.sin(waveStep * 0.4) * 10;

      // Layered subtle ambient waves at bottom
      const waveLayers = [
        { color: 'rgba(230, 57, 70, 0.12)', freq: 0.003, amp: 20, offset: 0 },
        { color: 'rgba(197, 34, 31, 0.09)', freq: 0.005, amp: 15, offset: 2 },
        { color: 'rgba(153, 13, 28, 0.06)', freq: 0.002, amp: 24, offset: 4 }
      ];

      waveLayers.forEach(layer => {
        ctx.beginPath();
        ctx.moveTo(0, height);

        for (let x = 0; x <= width; x += 15) {
          const y = fillProgress + Math.sin(x * layer.freq + waveStep + layer.offset) * layer.amp;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.fillStyle = layer.color;
        ctx.fill();
      });

      // Ambient floating particles
      particles.forEach(p => {
        p.y += p.vy;
        p.x += p.vx + Math.sin(waveStep + p.pulse) * 0.2;
        p.pulse += 0.02;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * (1 + Math.sin(p.pulse) * 0.2), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230, 57, 70, ${p.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(230, 57, 70, 0.3)';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} id="blood-waves-canvas" />;
};
