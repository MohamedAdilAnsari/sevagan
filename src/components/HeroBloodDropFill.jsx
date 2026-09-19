import React, { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';

export const HeroBloodDropFill = () => {
  const { theme } = useApp();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const width = (canvas.width = 600);
    const height = (canvas.height = 448);

    let progress = 0.0; // Starts EMPTY (0%) on initial page load
    const targetProgress = 1.0; // Fills to 100% FULL ONCE
    let isFinishedFilling = false;
    let waveTime = 0;
    let frameId;

    const isLightMode = theme === 'light';

    // Load clean transparent hands & blood symbol image
    const bgImg = new Image();
    bgImg.src = '/blood-donation.png';

    // Adjusted coordinates to fit precisely from the very bottom curve (Y=365) to top tip (Y=95)
    const dropTopY = 95;
    const dropBottomY = 365;
    const dropHeight = dropBottomY - dropTopY; // 270px

    function drawTeardropPath(context) {
      context.beginPath();
      context.moveTo(300, 95);
      context.bezierCurveTo(345, 155, 390, 215, 390, 275);
      context.arc(300, 275, 90, 0, Math.PI);
      context.bezierCurveTo(210, 215, 255, 155, 300, 95);
      context.closePath();
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      waveTime += 0.035;

      // Fill smoothly over ~7 seconds on page load
      if (!isFinishedFilling) {
        progress += 0.002;
        if (progress >= targetProgress) {
          progress = 1.0;
          isFinishedFilling = true;
        }
      }

      // 1. Draw base hands & blood drop image
      if (bgImg.complete && bgImg.naturalWidth !== 0) {
        ctx.drawImage(bgImg, 0, 0, width, height);
      }

      const liquidY = dropBottomY - (dropHeight * progress);

      // 2. Rising Red Blood Liquid Fill (Rising smoothly from bottom Y=365 up to top Y=95 without any dark shadow overlay)
      if (progress > 0.01) {
        ctx.save();
        drawTeardropPath(ctx);
        ctx.clip();

        // Fill rising liquid area from liquidY down to dropBottomY
        ctx.beginPath();
        ctx.rect(0, liquidY, width, height - liquidY);
        const liquidGradient = ctx.createLinearGradient(0, liquidY, 0, dropBottomY);
        liquidGradient.addColorStop(0, 'rgba(255, 59, 78, 0.82)');
        liquidGradient.addColorStop(1, 'rgba(197, 34, 31, 0.92)');
        ctx.fillStyle = liquidGradient;
        ctx.fill();

        // Glowing Surface Wave Line at rising liquid edge
        ctx.beginPath();
        for (let x = 195; x <= 405; x += 4) {
          const waveY = liquidY + Math.sin((x * 0.05) + waveTime) * 3;
          if (x === 195) ctx.moveTo(x, waveY);
          else ctx.lineTo(x, waveY);
        }
        ctx.strokeStyle = '#FF3B4E';
        ctx.lineWidth = 2.5;
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#FF4D5E';
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.restore();
      }

      // 3. Falling Blood Stream pouring into drop while initial filling
      if (!isFinishedFilling && progress < 0.96) {
        const dripY = ((waveTime * 140) % Math.max(15, liquidY - 30)) + 20;

        ctx.save();
        ctx.beginPath();
        ctx.arc(300, dripY, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#FF3B4E';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#FF4D5E';
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(300, 15);
        ctx.lineTo(300, Math.min(dripY + 12, liquidY));
        ctx.strokeStyle = 'rgba(255, 59, 78, 0.7)';
        ctx.lineWidth = 2.5;
        ctx.stroke();
        ctx.restore();
      }

      frameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [theme]);

  return (
    <div className="hero-blood-drop-fill-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', maxWidth: '540px', background: 'transparent' }}>
      <canvas 
        ref={canvasRef} 
        className="hero-main-canvas" 
        style={{ 
          width: '100%', 
          height: 'auto', 
          background: 'transparent',
          filter: theme === 'light' ? 'none' : 'drop-shadow(0 20px 50px rgba(230, 57, 70, 0.45))'
        }} 
      />
    </div>
  );
};
