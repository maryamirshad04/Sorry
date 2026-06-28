import { useState } from 'react';
import Image from 'next/image';

const FLOWERS = [
  {
    id: 'rose',
    emoji: (
      <Image src="/rose.png" alt="rose" width={50} height={50} />
    ),
    name: 'Red Rose',
    color: '#ff4d6d',
    meaning: 'Deep romantic love, passion, and devotion — everything I feel for you. 💕',
    x: 50, stemHeight: 110, angle: 0,
  },
  {
    id: 'peony',
    emoji: (
      <Image src="/peony.png" alt="peony" width={50} height={50} />
    ),
    name: 'Peony',
    color: '#ff85c2',
    meaning: 'Romance, a happy relationship, prosperity, and good fortune. Long-lasting love. 🌸',
    x: 30, stemHeight: 90, angle: -12,
  },
  {
    id: 'daisy',
    emoji: (
      <Image src="/daisy.png" alt="daisy" width={50} height={50} />
    ),
    name: 'Daisy',
    color: '#ffd700',
    meaning: 'Loyal love, innocence, and new beginnings — a fresh start for us. 🌼',
    x: 70, stemHeight: 90, angle: 12,
  },
  {
    id: 'sunflower',
    emoji: (
      <Image src="/sunflower.png" alt="sunflower" width={50} height={50} />
    ),
    name: 'Sunflower',
    color: '#ff9500',
    meaning: 'Adoration, loyalty, and unwavering devotion. You are my sunshine. 🌻',
    x: 15, stemHeight: 70, angle: -22,
  },
  {
    id: 'lotus',
    emoji: (
      <Image src="/lotus.png" alt="lotus" width={50} height={50} />
    ),
    name: 'Lotus',
    color: '#d63384',
    meaning: 'Pure love, spiritual connection, and devotion. Our bond is sacred.',
    x: 85, stemHeight: 70, angle: 22,
  },
];

export default function FlowerCoupon() {
  const [active, setActive] = useState(null);
  const [risen, setRisen] = useState({});

  const handleFlower = (flower) => {
    setActive(flower.id === active ? null : flower.id);
    setRisen(prev => ({ ...prev, [flower.id]: true }));
    setTimeout(() => {
      setRisen(prev => ({ ...prev, [flower.id]: false }));
    }, 600);
  };

  const activeFlower = FLOWERS.find(f => f.id === active);

  // Bouquet base sits at the bottom of the container
  const containerHeight = 260;
  const baseHeight = 90;   // height of the wrap cone
  const baseTop = containerHeight - baseHeight; // top of the bouquet base (px from top)

  return (
    <div style={{ padding: '20px' }}>
      <p style={{
        textAlign: 'center',
        fontFamily: "'Press Start 2P', monospace",
        fontSize: '8px',
        color: 'var(--pink-deep)',
        marginBottom: '16px',
        lineHeight: '1.8',
      }}>
        tap each flower to<br />discover its meaning
      </p>

      {/* Bouquet */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '280px',
        margin: '0 auto',
        height: `${containerHeight}px`,
      }}>

        {/* Stems — drawn from bouquet top upward */}
        {FLOWERS.map((f) => {
          // Stem base: center-x of bouquet base, just above the wrap top
          const stemBaseX = f.x; // % across container
          const stemBaseY = baseTop + 10; // px from top — slightly inside the wrap
          return (
            <div
              key={f.id + 'stem'}
              style={{
                position: 'absolute',
                top: `${stemBaseY - f.stemHeight}px`,
                left: `${stemBaseX}%`,
                width: '3px',
                height: `${f.stemHeight}px`,
                background: 'linear-gradient(to bottom, #66bb6a, #388e3c)',
                borderRadius: '2px',
                transformOrigin: 'bottom center',
                transform: `translateX(-50%) rotate(${f.angle}deg)`,
                zIndex: 2,
              }}
            />
          );
        })}

        {/* Bouquet wrap — sits on top of stems visually */}
        <div style={{
          position: 'absolute',
          top: `${baseTop}px`,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100px',
          height: `${baseHeight}px`,
          background: 'linear-gradient(160deg, #ffd7b5, #ffb347)',
          clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)',
          borderRadius: '0 0 16px 16px',
          zIndex: 3,
        }} />


        {/* Flowers — placed at the top of each stem */}
        {FLOWERS.map((flower) => {
          const stemBaseY = baseTop + 10;
          // Flower center sits at the top of the stem
          // We offset by half the flower size (25px) upward
          const flowerTopY = stemBaseY - flower.stemHeight - 25;
          // x offset from stem angle: stemHeight * sin(angle)
          const rad = (flower.angle * Math.PI) / 180;
          const xOffset = -flower.stemHeight * Math.sin(rad);

          return (
            <button
              key={flower.id}
              onClick={() => handleFlower(flower)}
              style={{
                position: 'absolute',
                top: `${flowerTopY + (risen[flower.id] ? -20 : 0)}px`,
                left: `calc(${flower.x}% + ${xOffset}px)`,
                transform: 'translateX(-50%)',
                transition: 'top 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                background: 'none',
                border: 'none',
                padding: 0,
                lineHeight: 1,
                zIndex: 5,
                filter: active === flower.id
                  ? `drop-shadow(0 0 8px ${flower.color})`
                  : 'none',
                cursor: 'pointer',
              }}
            >
              {flower.emoji}
            </button>
          );
        })}
      </div>

      {/* Meaning bubble */}
      <div style={{
        marginTop: '16px',
        minHeight: '90px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {activeFlower ? (
          <div style={{
            background: `linear-gradient(135deg, ${activeFlower.color}22, ${activeFlower.color}44)`,
            border: `2px solid ${activeFlower.color}`,
            borderRadius: '16px',
            padding: '14px 18px',
            textAlign: 'center',
            animation: 'fadeSlideIn 0.3s ease forwards',
            maxWidth: '280px',
          }}>
            <p style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '9px',
              color: activeFlower.color,
              marginBottom: '8px',
            }}>
              {activeFlower.name}
            </p>
            <p style={{ fontSize: '12px', color: 'var(--text-dark)', lineHeight: '1.6', fontWeight: 600 }}>
              {activeFlower.meaning}
            </p>
          </div>
        ) : (
          <p style={{ fontSize: '12px', color: 'var(--pink-400)', fontStyle: 'italic' }}>
            tap a flower above 
          </p>
        )}
      </div>
    </div>
  );
}