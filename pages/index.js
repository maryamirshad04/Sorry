import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import FloatingHearts from '../components/FloatingHearts';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();
  const [answer, setAnswer] = useState(null); // null | 'yes' | 'no'
  const [noCount, setNoCount] = useState(0);
  const [noPos, setNoPos] = useState({ top: null, left: null });
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const noMessages = [
    "unacceptable!!",
    "excuse me?? try again",
    "wrong answer honey",
    "PLAY AGAIN!!!",
    "my cat said no to ur no",
    "the audacity...",
    "nope not allowed",
  ];

  const handleNo = () => {
    setNoCount(c => c + 1);
    setAnswer('no');
    // Move button randomly after click
    const top = 10 + Math.random() * 70;
    const left = 10 + Math.random() * 70;
    setNoPos({ top: `${top}%`, left: `${left}%` });
  };

  const handleYes = () => {
    setAnswer('yes');
    setTimeout(() => router.push('/coupons'), 1200);
  };

  const catSrc = answer === 'yes'
    ? '/cat-happy.png'
    : answer === 'no'
    ? '/cat-sad.png'
    : '/cat-happy.png';

  return (
    <>
      <Head>
        <title>i'm sorry 🩷</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <FloatingHearts />

      <main style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'none' : 'translateY(20px)',
          transition: 'all 0.6s ease',
          width: '100%',
          maxWidth: '480px',
        }}>
          {/* Pixel window */}
          <div className="pixel-window" style={{ animation: 'fadeSlideIn 0.5s ease forwards' }}>
            {/* Title bar */}
            <div className="pixel-titlebar">
              <div className="titlebar-dot" />
              <div className="titlebar-dot" />
              <div className="titlebar-dot" />
              <span style={{ marginLeft: 'auto' }}>sorry.exe</span>
            </div>

            {/* Content */}
            <div style={{ padding: '32px 28px', textAlign: 'center', background: 'var(--cream)' }}>
              {/* Cat gif */}
              <div style={{ marginBottom: '20px' }}>
                <img
                  src={catSrc}
                  alt="cute cat"
                  style={{
                    width: '140px',
                    height: '140px',
                    objectFit: 'contain',
                    imageRendering: 'pixelated',
                    animation: answer === 'yes' ? 'bounce 0.5s ease infinite' : answer === 'no' ? 'shake 0.5s ease infinite' : 'bounce 2s ease-in-out infinite',
                    borderRadius: '12px',
                  }}
                  onError={(e) => {
                    // Fallback to emoji if gif not found
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div style={{
                  display: 'none',
                  fontSize: '80px',
                  lineHeight: 1,
                  animation: answer === 'yes' ? 'bounce 0.5s ease infinite' : answer === 'no' ? 'shake 0.5s ease infinite' : 'bounce 2s ease-in-out infinite',
                }}>
                  {answer === 'no' ? (
  <Image src="/cat-sad.png" alt="Sad" width={36} height={36} />
) : (
  <Image src="/cat-happy.png" alt="Happy" width={36} height={36} />
)}
                </div>
              </div>

              {/* Message */}
              <div style={{ marginBottom: '24px' }}>
                {answer === 'yes' ? (
                  <div>
                    <p style={{
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: '12px',
                      color: 'var(--pink-deep)',
                      marginBottom: '8px',
                      animation: 'pulse 1s ease infinite',
                    }}>yayyyy!! </p>
                    <p style={{ color: 'var(--pink-500)', fontSize: '14px' }}>
                      opening your gift... 
                    </p>
                    <div style={{ marginTop: '12px' }}>
                      <div className="progress-bar" style={{ width: '80%', margin: '0 auto' }}>
                        <div className="progress-fill" style={{ width: '100%' }} />
                      </div>
                    </div>
                  </div>
                ) : answer === 'no' ? (
                  <div>
                    <p style={{
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: '10px',
                      color: 'var(--pink-deep)',
                      marginBottom: '8px',
                      lineHeight: '1.8',
                    }}>
                      {noMessages[Math.min(noCount - 1, noMessages.length - 1)]}
                    </p>
                  </div>
                ) : (
                  <div>
                    <p style={{
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: '11px',
                      color: 'var(--pink-dark)',
                      marginBottom: '8px',
                      lineHeight: '1.8',
                    }}>
                      i'm sorry
                    </p>
                    <p style={{ color: 'var(--pink-500)', fontSize: '14px', fontWeight: 700 }}>
                      do you accept my apology?
                    </p>
                  </div>
                )}
              </div>

              {/* Buttons */}
              {answer !== 'yes' && (
                <div style={{
                  display: 'flex',
                  gap: '16px',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  position: 'relative',
                  minHeight: '60px',
                }}>
                  <button
                    className="btn-pixel btn-yes"
                    onClick={handleYes}
                    style={{
                      fontSize: noCount > 2 ? `${Math.min(10 + noCount * 3, 22)}px` : '10px',
                      padding: noCount > 2 ? '14px 36px' : '12px 28px',
                    }}
                  >
                    yes
                  </button>
                  <button
                    className="btn-pixel btn-no"
                    onClick={handleNo}
                    style={noPos.top ? {
                      position: 'fixed',
                      top: noPos.top,
                      left: noPos.left,
                      zIndex: 999,
                      fontSize: `${Math.max(10 - noCount, 6)}px`,
                    } : {}}
                  >
                    no
                  </button>
                </div>
              )}

              <div style={{ 
  marginTop: '20px', 
  fontSize: '18px', 
  opacity: 0.5,
  display: 'flex',
  gap: '8px',
  justifyContent: 'center',
  alignItems: 'center'
}}>
  <Image src="/bear.png" alt="Bear" width={50} height={50} />
  <Image src="/bear.png" alt="Bear" width={50} height={50} />
  <Image src="/bear.png" alt="Bear" width={50} height={50} />
</div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
