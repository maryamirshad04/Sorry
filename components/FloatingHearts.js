import { useEffect, useState } from 'react';

export default function FloatingHearts() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const items = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 8,
      size: 0.8 + Math.random() * 1.2,
      emoji: ['💕','🩷','💗','💝','💖','✨'][Math.floor(Math.random() * 6)]
    }));
    setHearts(items);
  }, []);

  return (
    <div className="hearts-bg">
      {hearts.map(h => (
        <div
          key={h.id}
          className="float-heart"
          style={{
            left: `${h.left}%`,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
            fontSize: `${h.size}rem`,
          }}
        >
          {h.emoji}
        </div>
      ))}
    </div>
  );
}
