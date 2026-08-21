import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const MEMBER_IMAGES = [
  { name: 'RM', src: '/images/bts/member_rm.jpg' },
  { name: 'Jin', src: '/images/bts/member_jin.jpg' },
  { name: 'SUGA', src: '/images/bts/member_suga.jpg' },
  { name: 'j-hope', src: '/images/bts/member_jhope.jpg' },
  { name: 'Jimin', src: '/images/bts/member_jimin.jpg' },
  { name: 'V', src: '/images/bts/member_v.jpg' },
  { name: 'Jung Kook', src: '/images/bts/member_jungkook.jpg' }
];

const WatermarkCanvas = () => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const loadedImages = MEMBER_IMAGES.map((m) => {
      const img = new Image();
      img.src = m.src;
      return { name: m.name, img };
    });

    const count = Math.min(Math.floor(width / 140), 10);
    const items = Array.from({ length: count }, (_, i) => ({
      x: (i + 0.5) * (width / count) + (Math.random() * 40 - 20),
      y: height + Math.random() * height,
      speed: Math.random() * 0.4 + 0.3, // Smooth drifting upward speed
      imgObj: loadedImages[i % loadedImages.length],
      size: Math.random() * 60 + 110,
      rotation: (Math.random() - 0.5) * 0.2
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isLight = theme === 'light';
      // Increased opacity to ~0.14 for Dark mode and ~0.12 for Light mode (clearly visible member watermarks)
      ctx.globalAlpha = isLight ? 0.12 : 0.14;

      items.forEach((item) => {
        item.y -= item.speed;
        if (item.y < -160) {
          item.y = height + 160;
          item.x = Math.random() * width;
        }

        if (item.imgObj.img.complete && item.imgObj.img.naturalWidth > 0) {
          ctx.save();
          ctx.translate(item.x, item.y);
          ctx.rotate(item.rotation);

          // Draw dark purple border glow ring
          ctx.beginPath();
          ctx.arc(0, 0, item.size / 2 + 3, 0, Math.PI * 2);
          ctx.fillStyle = isLight ? 'rgba(124, 58, 237, 0.15)' : 'rgba(192, 132, 252, 0.2)';
          ctx.fill();

          // Render member image watermark
          ctx.beginPath();
          ctx.arc(0, 0, item.size / 2, 0, Math.PI * 2);
          ctx.clip();
          ctx.drawImage(item.imgObj.img, -item.size / 2, -item.size / 2, item.size, item.size);
          ctx.restore();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 1 }}
    />
  );
};

export default WatermarkCanvas;
