import { useState } from 'react';
import Image from 'next/image';

const RATINGS = ['😐', '🙂', '😊', '🥰', '💗'];
const QUESTIONS = [
  { id: 'overall', label: 'How did you like my gift?', type: 'rating' },
  { id: 'sweetness', label: 'How sweet was it?', type: 'rating' },
  { id: 'message', label: 'Leave me a message', type: 'text' },
];

export default function FeedbackCoupon() {
  const [answers, setAnswers] = useState({ overall: null, sweetness: null, message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = () => {
    // Build a readable summary
    const summary = `
Gift Feedback
─────────────────
How you liked it: ${answers.overall !== null ? RATINGS[answers.overall] : 'not rated'} (${answers.overall !== null ? answers.overall + 1 : '-'}/5)
Sweetness rating: ${answers.sweetness !== null ? RATINGS[answers.sweetness] : 'not rated'} (${answers.sweetness !== null ? answers.sweetness + 1 : '-'}/5)
Your message: ${answers.message || '(no message)'}
    `.trim();

    // Copy to clipboard
    navigator.clipboard.writeText(summary).then(() => {
      setCopied(true);
    }).catch(() => {});

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ padding: '28px 20px', textAlign: 'center' }}>
        <div style={{ 
  animation: 'bounce 1s ease infinite', 
  marginBottom: '16px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}}>
  <Image 
    src="/Untitled.png" 
    alt="Mail" 
    width={60} 
    height={60}
  />
</div>
        <p style={{
          fontFamily: "'Press Start 2P', monospace",
          fontSize: '10px',
          color: 'var(--pink-deep)',
          marginBottom: '12px',
          lineHeight: '1.8',
        }}>
          thank you!! 
        </p>
        <p style={{ fontSize: '13px', color: 'var(--pink-500)', marginBottom: '16px', lineHeight: '1.6' }}>
          your feedback has been copied<br/>to your clipboard <br/>
          send it to me!! 
        </p>
        {copied && (
          <div style={{
            background: 'var(--pink-200)',
            borderRadius: '10px',
            padding: '10px 14px',
            fontSize: '11px',
            color: 'var(--pink-dark)',
            marginBottom: '12px',
          }}>
            copied to clipboard!
          </div>
        )}
        <button
          className="btn-pixel"
          onClick={() => { setSubmitted(false); setAnswers({ overall: null, sweetness: null, message: '' }); }}
          style={{ fontSize: '8px' }}
        >
          send again
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <p style={{
        textAlign: 'center',
        fontFamily: "'Press Start 2P', monospace",
        fontSize: '8px',
        color: 'var(--pink-deep)',
        marginBottom: '20px',
        lineHeight: '1.8',
      }}>
        tell me what you think! 
      </p>

      {/* Rating questions */}
      {QUESTIONS.filter(q => q.type === 'rating').map(q => (
        <div key={q.id} style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--pink-dark)', marginBottom: '10px' }}>
            {q.label}
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            {RATINGS.map((emoji, i) => (
              <button
                key={i}
                onClick={() => setAnswers(prev => ({ ...prev, [q.id]: i }))}
                style={{
                  fontSize: '26px',
                  background: answers[q.id] === i ? 'var(--pink-200)' : 'white',
                  border: answers[q.id] === i ? '2px solid var(--pink-400)' : '2px solid var(--pink-200)',
                  borderRadius: '12px',
                  padding: '6px 8px',
                  transform: answers[q.id] === i ? 'scale(1.2)' : 'scale(1)',
                  transition: 'all 0.2s',
                  lineHeight: 1,
                }}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Text message */}
      <div style={{ marginBottom: '20px' }}>
        <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--pink-dark)', marginBottom: '8px' }}>
          Leave me a message
        </p>
        <textarea
          value={answers.message}
          onChange={(e) => setAnswers(prev => ({ ...prev, message: e.target.value }))}
          placeholder="write something sweet... "
          rows={3}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '12px',
            border: '2px solid var(--pink-300)',
            background: 'var(--pink-100)',
            fontFamily: 'Nunito, sans-serif',
            fontSize: '13px',
            color: 'var(--text-dark)',
            resize: 'none',
            outline: 'none',
            transition: 'border-color 0.2s',
          }}
          onFocus={(e) => e.target.style.borderColor = 'var(--pink-400)'}
          onBlur={(e) => e.target.style.borderColor = 'var(--pink-300)'}
        />
      </div>

      <div style={{ textAlign: 'center' }}>
        <button
          className="btn-pixel"
          onClick={handleSubmit}
          style={{ fontSize: '9px' }}
        >
          send 💗
        </button>
        <p style={{ fontSize: '10px', color: 'var(--pink-400)', marginTop: '8px' }}>
          (copies to clipboard — paste & send to me!)
        </p>
      </div>
    </div>
  );
}
