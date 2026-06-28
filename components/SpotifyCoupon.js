import { useState, useRef, useEffect } from 'react';

export default function SpotifyCoupon() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  const progress = duration ? (currentTime / duration) * 100 : 0;

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onTimeUpdate = () => setCurrentTime(el.currentTime);
    const onLoaded = () => setDuration(el.duration);
    const onEnded = () => setIsPlaying(false);
    el.addEventListener('timeupdate', onTimeUpdate);
    el.addEventListener('loadedmetadata', onLoaded);
    el.addEventListener('ended', onEnded);
    return () => {
      el.removeEventListener('timeupdate', onTimeUpdate);
      el.removeEventListener('loadedmetadata', onLoaded);
      el.removeEventListener('ended', onEnded);
    };
  }, []);

  const fmt = (s) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const remaining = duration ? duration - currentTime : 0;

  return (
    <div style={{ padding: '24px 28px' }}>
      <audio ref={audioRef} src="/song.mp3" preload="metadata" />

      <div style={{
        background: 'linear-gradient(145deg, #fce4ec, #f8bbd0)',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: 'inset 0 2px 8px rgba(255,133,194,0.2)',
      }}>
        {/* Album art */}
        <div style={{
          width: '100%',
          aspectRatio: '1',
          maxWidth: '200px',
          margin: '0 auto 16px',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '3px solid var(--pink-300)',
          boxShadow: '0 4px 16px rgba(255,133,194,0.3)',
        }}>
          <img
            src="/coupon.jpg"
            alt="us"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Song title */}
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <p style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '9px',
            color: 'var(--pink-dark)',
            marginBottom: '4px',
          }}>
            our song
          </p>
          <p style={{ fontSize: '12px', color: 'var(--pink-500)' }}>us, always !!!</p>
        </div>

        {/* Progress bar */}
        <div style={{ marginBottom: '8px' }}>
          <div
            className="progress-bar"
            onClick={(e) => {
              if (!audioRef.current || !duration) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const x = (e.clientX - rect.left) / rect.width;
              audioRef.current.currentTime = x * duration;
            }}
            style={{ cursor: 'pointer' }}
          >
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
            <span style={{ fontSize: '11px', color: 'var(--pink-deep)' }}>{fmt(currentTime)}</span>
            <span style={{ fontSize: '11px', color: 'var(--pink-deep)' }}>-{fmt(remaining)}</span>
          </div>
        </div>

        {/* Controls */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
        }}>
          <button
            style={{ background: 'none', fontSize: '20px', color: 'var(--pink-deep)' }}
            onClick={() => { if (audioRef.current) audioRef.current.currentTime = 0; }}
          >⏮</button>

          <button
            onClick={togglePlay}
            style={{
              width: '48px', height: '48px',
              borderRadius: '50%',
              background: 'var(--pink-400)',
              border: '3px solid var(--pink-deep)',
              fontSize: '20px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '2px 2px 0 var(--pink-deep)',
              color: 'white',
            }}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>

          <button
            style={{ background: 'none', fontSize: '20px', color: 'var(--pink-deep)' }}
            onClick={() => { if (audioRef.current) audioRef.current.currentTime = duration; }}
          >⏭</button>
        </div>
      </div>
    </div>
  );
}
