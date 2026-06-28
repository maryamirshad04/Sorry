import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const SEGMENTS = [
  { label: '73%', color: '#ffb3d1' },
  { label: '88%', color: '#ffd6e7' },
  { label: '95%', color: '#ff85c2' },
  { label: '91%', color: '#ffadd2' },
  { label: '100%', color: '#f759ab' },
  { label: '99%', color: '#ff85c2' },
  { label: '97%', color: '#ffd6e7' },
  { label: '84%', color: '#ffb3d1' },
];

const NUM = SEGMENTS.length;
const SLICE = (2 * Math.PI) / NUM;

export default function WheelCoupon() {
  const canvasRef = useRef(null);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [currentAngle, setCurrentAngle] = useState(0);
  const animRef = useRef(null);

  const drawWheel = (angle) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const r = cx - 8;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Shadow
    ctx.save();
    ctx.shadowColor = 'rgba(255,133,194,0.4)';
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.restore();

    // Segments
    SEGMENTS.forEach((seg, i) => {
      const start = angle + i * SLICE;
      const end = start + SLICE;

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, start, end);
      ctx.closePath();
      ctx.fillStyle = seg.color;
      ctx.fill();
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Label
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(start + SLICE / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#520339';
      ctx.font = 'bold 12px Nunito';
      ctx.fillText(seg.label, r - 12, 5);
      ctx.restore();
    });

    // Center circle
    ctx.beginPath();
    ctx.arc(cx, cy, 20, 0, 2 * Math.PI);
    ctx.fillStyle = '#f759ab';
    ctx.fill();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Heart in center
    ctx.fillStyle = 'white';
    ctx.font = '14px serif';
    ctx.textAlign = 'center';
    ctx.fillText('💗', cx, cy + 5);

    // Outer ring
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.strokeStyle = '#ff85c2';
    ctx.lineWidth = 4;
    ctx.stroke();
  };

  useEffect(() => {
    drawWheel(currentAngle);
  }, [currentAngle]);

  // Pointer at top
  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    // Target: land on "100%" segment (index 4)
    const targetSegIndex = 4; // "100%"
    // Pointer is at top (angle = -PI/2), we want segment index 4 to be at top
    // Each segment covers SLICE radians
    // Target rotation: multiple full spins + exact landing
    const fullSpins = 5 + Math.floor(Math.random() * 3);
    const targetAngle = -(targetSegIndex * SLICE + SLICE / 2) - Math.PI / 2 + Math.random() * SLICE * 0.3;
    const finalAngle = fullSpins * 2 * Math.PI + targetAngle;

    const duration = 4000;
    const start = performance.now();
    const startAngle = currentAngle;

    const easeOut = (t) => 1 - Math.pow(1 - t, 4);

    const animate = (now) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const angle = startAngle + finalAngle * easeOut(t);
      setCurrentAngle(angle);
      drawWheel(angle);

      if (t < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        setSpinning(false);
        setResult('100%');
      }
    };

    animRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => () => cancelAnimationFrame(animRef.current), []);

  return (
    <div style={{ padding: '24px 20px', textAlign: 'center' }}>
      <p style={{
        fontFamily: "'Press Start 2P', monospace",
        fontSize: '8px',
        color: 'var(--pink-deep)',
        marginBottom: '16px',
        lineHeight: '1.8',
      }}>
        spin to find how much<br/>i love you 
      </p>

      {/* Pointer */}
      <div style={{ position: 'relative', display: 'inline-block' }}>
  <div style={{
    position: 'absolute',
    top: '-6px', // Adjusted position
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 10,
    filter: 'drop-shadow(0 2px 4px rgba(255,133,194,0.6))',
  }}>
    <Image 
      src="/triangle.png" 
      alt="Triangle" 
      width={50} 
      height={50}
    />
  </div>
  <canvas
    ref={canvasRef}
    width={240}
    height={240}
    style={{
      borderRadius: '50%',
      display: 'block',
    }}
  />
</div>

      <div style={{ marginTop: '20px' }}>
        {result ? (
          <div>
            <p style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: '22px',
              color: '#f759ab',
              animation: 'pulse 0.8s ease infinite',
              marginBottom: '8px',
            }}>
              {result} 
            </p>
            <p style={{ color: 'var(--pink-deep)', fontSize: '13px', fontWeight: 700 }}>
              i love you to infinity!! 
            </p>
            <button
              className="btn-pixel"
              onClick={() => { setResult(null); setCurrentAngle(0); drawWheel(0); }}
              style={{ marginTop: '12px', fontSize: '8px' }}
            >
              spin again 
            </button>
          </div>
        ) : (
          <button
            className="btn-pixel"
            onClick={spin}
            disabled={spinning}
            style={{
              opacity: spinning ? 0.7 : 1,
              animation: spinning ? 'none' : 'pulse 2s ease infinite',
            }}
          >
            {spinning ? ' spinning...' : ' spin the wheel'}
          </button>
        )}
      </div>
    </div>
  );
}
