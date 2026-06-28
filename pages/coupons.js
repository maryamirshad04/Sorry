import { useState, useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import FloatingHearts from '../components/FloatingHearts';
import Image from 'next/image';

const SpotifyCoupon = dynamic(() => import('../components/SpotifyCoupon'), { ssr: false });
const WheelCoupon = dynamic(() => import('../components/WheelCoupon'), { ssr: false });
const FlowerCoupon = dynamic(() => import('../components/FlowerCoupon'), { ssr: false });
const FeedbackCoupon = dynamic(() => import('../components/FeedbackCoupon'), { ssr: false });

const COUPONS = [
  { id: 'photo',
    emoji: (
      <Image 
        src="/camera.png" 
        alt="Camera" 
        width={70} 
        height={50}
      />
    ),
    title: 'Our Memory',
    subtitle: 'love coupon #1',
    color: '#ffb3d1',
    borderColor: '#ff85c2',
    description: 'Our photo + play our song',
    Component: SpotifyCoupon,
  },
  {
    id: 'wheel',
    emoji: (
      <Image 
        src="/herat.png" 
        alt="heart" 
        width={65} 
        height={50}
      />
    ),
    title: 'How Much I Love You',
    subtitle: 'love coupon #2',
    color: '#ffd6e7',
    borderColor: '#ffadd2',
    description: 'Spin the wheel to find out',
    Component: WheelCoupon,
  },
  {
    id: 'flowers',
    emoji: (
      <Image 
        src="/flowers.png" 
        alt="flowers" 
        width={60} 
        height={55}
      />
    ),
    title: 'A Bouquet For You',
    subtitle: 'love coupon #3',
    color: '#b5ead7',
    borderColor: '#81c9a8',
    description: 'Each flower has a message',
    Component: FlowerCoupon,
  },
  {
    id: 'feedback',
    emoji: (
      <Image 
        src="/Untitled.png" 
        alt="Mail" 
        width={50} 
        height={50}
      />
    ),
    title: 'How Was My Gift?',
    subtitle: 'love coupon #4',
    color: '#d7b5f0',
    borderColor: '#b57bee',
    description: 'Tell me what you think',
    Component: FeedbackCoupon,
  },
];

export default function Coupons() {
  const [openCoupon, setOpenCoupon] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeCoupon = COUPONS.find(c => c.id === openCoupon);

  return (
    <>
      <Head>
        <title>I am sorry!!!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <FloatingHearts />

      <main style={{
        minHeight: '100vh',
        padding: '24px 16px 60px',
        position: 'relative',
        zIndex: 1,
        maxWidth: '600px',
        margin: '0 auto',
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '32px',
          opacity: mounted ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}>
          <div style={{ marginBottom: '8px', animation: 'bounce 2s ease-in-out infinite' }}>
            <Image 
            src="/gift.png" 
            alt="Gift" 
            width={260} 
            height={150}
            priority
            />
            </div>
          <h1 style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '13px',
            color: 'var(--pink-dark)',
            marginBottom: '8px',
            lineHeight: '1.8',
          }}>
            your love coupons
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--pink-500)', fontWeight: 600 }}>
            tap each one to open 
          </p>
        </div>

        {/* Coupons list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {COUPONS.map((coupon, idx) => (
            <div
              key={coupon.id}
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'none' : 'translateY(20px)',
                transition: `all 0.5s ease ${idx * 0.1}s`,
              }}
            >
              {/* Coupon ticket */}
              <div
                className="coupon"
                style={{ borderColor: coupon.borderColor }}
              >
                {/* Left stub */}
                <div style={{
                  display: 'flex',
                  alignItems: 'stretch',
                }}>
                  {/* Sidebar */}
                  <div style={{
                    background: `linear-gradient(180deg, ${coupon.color}, ${coupon.borderColor})`,
                    width: '44px',
                    minHeight: '100px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    writingMode: 'vertical-rl',
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: '7px',
                    color: 'white',
                    textShadow: '1px 1px 0 rgba(0,0,0,0.2)',
                    flexShrink: 0,
                    padding: '12px 4px',
                    letterSpacing: '0.05em',
                    position: 'relative',
                  }}>
                    {/* Stars */}
                    <span style={{ position: 'absolute', top: '8px', fontSize: '8px' }}>✦</span>
                    {coupon.subtitle}
                    <span style={{ position: 'absolute', bottom: '8px', fontSize: '8px' }}>✦</span>
                  </div>

                  {/* Divider dots */}
                  <div style={{
                    width: '2px',
                    background: `repeating-linear-gradient(to bottom, ${coupon.borderColor} 0px, ${coupon.borderColor} 5px, transparent 5px, transparent 10px)`,
                    flexShrink: 0,
                  }} />

                  {/* Main content */}
                  <div style={{
                    flex: 1,
                    padding: '16px 20px',
                    background: `linear-gradient(145deg, white, ${coupon.color}22)`,
                    position: 'relative',
                    overflow: 'hidden',
                  }}>
                    {/* Heart pattern bg */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      opacity: 0.06,
                      fontSize: '20px',
                      lineHeight: '24px',
                      letterSpacing: '4px',
                      overflow: 'hidden',
                      userSelect: 'none',
                    }}>
                      {'💗 '.repeat(60)}
                    </div>

                    <div style={{ position: 'relative' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <span style={{ fontSize: '28px' }}>{coupon.emoji}</span>
                        <div>
                          <p style={{
                            fontFamily: "'Press Start 2P', monospace",
                            fontSize: '9px',
                            color: 'var(--pink-dark)',
                            marginBottom: '3px',
                          }}>
                            {coupon.title}
                          </p>
                          <p style={{ fontSize: '11px', color: 'var(--pink-500)' }}>{coupon.description}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => setOpenCoupon(openCoupon === coupon.id ? null : coupon.id)}
                        style={{
                          background: coupon.color,
                          border: `2px solid ${coupon.borderColor}`,
                          borderRadius: '20px',
                          padding: '6px 16px',
                          fontFamily: "'Press Start 2P', monospace",
                          fontSize: '7px',
                          color: 'var(--pink-dark)',
                          boxShadow: `2px 2px 0 ${coupon.borderColor}`,
                          transition: 'all 0.1s',
                        }}
                      >
                        {openCoupon === coupon.id ? '▲ close' : '▼ open'}
                      </button>
                    </div>
                  </div>

                  {/* Right side envelope icons */}
                  <div style={{
                    background: `linear-gradient(180deg, ${coupon.color}, ${coupon.borderColor})`,
                    width: '44px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    padding: '12px 4px',
                    flexShrink: 0,
                    position: 'relative',
                  }}>
                    <span style={{ fontSize: '14px' }}>
  <Image 
    src="/bear.png" 
    alt="Bear" 
    width={30} 
    height={30}
  />
</span>
<span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '6px', color: 'white', writingMode: 'vertical-rl' }}>love coupon</span>
<span style={{ fontSize: '14px' }}>
  <Image 
    src="/bear.png" 
    alt="Bear" 
    width={30} 
    height={30}
  />
</span>
                  </div>
                </div>

                {/* Expanded content */}
                {openCoupon === coupon.id && (
                  <div style={{
                    borderTop: `2px dashed ${coupon.borderColor}`,
                    animation: 'fadeSlideIn 0.3s ease forwards',
                  }}>
                    <coupon.Component />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <p style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '8px',
            color: 'var(--pink-400)',
            lineHeight: '2',
          }}>
            valid forever
          </p>
          <div style={{ 
  fontSize: '24px', 
  marginTop: '8px', 
  animation: 'pulse 2s ease infinite',
  display: 'flex',
  gap: '8px',
  justifyContent: 'center',
  alignItems: 'center'
}}>
  <Image src="/bear.png" alt="Emoji" width={24} height={24} />
  <Image src="/bear.png" alt="Emoji" width={24} height={24} />
  <Image src="/bear.png" alt="Emoji" width={24} height={24} />
</div>
        </div>
      </main>
    </>
  );
}
