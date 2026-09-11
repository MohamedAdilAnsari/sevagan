import React, { useEffect, useRef } from 'react';

export const HeroBloodDropFill = () => {
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

    // Load blood-donation.png (Transparent background hands & blood drop)
    const bgImg = new Image();
    bgImg.src = '/blood-donation.png';

    // Reduced width & height coordinates fitting precisely inside the inner blood teardrop
    const dropTopY = 95;
    const dropBottomY = 336;
    const dropHeight = dropBottomY - dropTopY; // 241px

    function drawTeardropPath(context) {
      context.beginPath();
      context.moveTo(300, 95);
      context.bezierCurveTo(342, 150, 376, 205, 376, 260);
      context.arc(300, 260, 76, 0, Math.PI);
      context.bezierCurveTo(224, 205, 258, 150, 300, 95);
      context.closePath();
    }

    const render = () => {
      // 1. Clear canvas -> 100% transparent background (No black box!)
      ctx.clearRect(0, 0, width, height);
      waveTime += 0.035;

      // 2. Fill ONCE on Page Load: Fills smoothly over ~3.5s then STAYS FIXED AT 100% FULL!
      if (!isFinishedFilling) {
        progress += 0.0045;
        if (progress >= targetProgress) {
          progress = 1.0;
          isFinishedFilling = true; // STAYS FULL PERMANENTLY!
        }
      }

      // 3. Draw base transparent hands image
      if (bgImg.complete && bgImg.naturalWidth !== 0) {
        ctx.drawImage(bgImg, 0, 0, width, height);
      }

      const liquidY = dropBottomY - (dropHeight * progress);

      // 4. Dark Translucent Mask over Unfilled Top Portion of Teardrop (Tight inner fit)
      if (progress < 0.99) {
        ctx.save();
        drawTeardropPath(ctx);
        ctx.clip();

        // Fill region ABOVE liquidY with dark translucent mask to simulate empty drop
        ctx.beginPath();
        ctx.rect(0, 0, width, liquidY);
        ctx.fillStyle = 'rgba(10, 12, 18, 0.85)';
        ctx.fill();

        // Glowing Surface Wave Line at rising liquid edge
        ctx.beginPath();
        for (let x = 220; x <= 380; x += 4) {
          const waveY = liquidY + Math.sin((x * 0.05) + waveTime) * 3;
          if (x === 220) ctx.moveTo(x, waveY);
          else ctx.lineTo(x, waveY);
        }
        ctx.strokeStyle = '#FF5A67';
        ctx.lineWidth = 2.5;
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#FF4D5E';
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.restore();
      }

      // 5. Falling Blood Stream pouring into drop ONLY while initial filling
      if (!isFinishedFilling && progress < 0.96) {
        const dripY = ((waveTime * 140) % Math.max(15, liquidY - 30)) + 20;

        ctx.save();
        ctx.beginPath();
        ctx.arc(300, dripY, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#FF4D5E';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#FF4D5E';
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(300, 15);
        ctx.lineTo(300, Math.min(dripY + 12, liquidY));
        ctx.strokeStyle = 'rgba(255, 77, 94, 0.6)';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
      }

      frameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="hero-blood-drop-fill-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', maxWidth: '540px', background: 'transparent' }}>
      <canvas 
        ref={canvasRef} 
        className="hero-main-canvas" 
        style={{ width: '100%', height: 'auto', background: 'transparent', filter: 'drop-shadow(0 20px 50px rgba(230, 57, 70, 0.45))' }} 
      />
    </div>
  );
};
