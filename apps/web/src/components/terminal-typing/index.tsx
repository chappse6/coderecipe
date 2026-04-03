'use client';

import { useEffect, useRef, useState } from 'react';

const DEFAULT_PROMPTS = [
  '로그인 페이지 만들어줘.\n카카오 소셜 로그인도 넣어줘',
  '매출 데이터를 차트로 보여주는\n대시보드 만들어줘',
  '사용자가 할 일을 추가하고\n완료 체크할 수 있는 투두앱',
  '날씨 API 연동해서\n오늘 날씨 알려주는 앱 만들어줘',
  '채팅방 UI 만들어줘.\n메시지 보내기랑 읽음 표시도',
];

interface TerminalTypingProps {
  prompts?: string[];
  height?: number;
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
}

export default function TerminalTyping({
  prompts = DEFAULT_PROMPTS,
  height = 350,
  typeSpeed = 40,
  deleteSpeed = 20,
  pauseTime = 2500,
}: TerminalTypingProps) {
  const [displayText, setDisplayText] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  const stateRef = useRef({ pi: 0, ci: 0, deleting: false });
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const state = stateRef.current;

    function tick() {
      const prompt = prompts[state.pi];

      if (!state.deleting) {
        if (state.ci <= prompt.length) {
          setDisplayText(prompt.slice(0, state.ci));
          state.ci++;
          timerRef.current = setTimeout(tick, typeSpeed + Math.random() * typeSpeed);
        } else {
          setShowOutput(true);
          timerRef.current = setTimeout(() => {
            state.deleting = true;
            tick();
          }, pauseTime);
        }
      } else {
        if (state.ci > 0) {
          state.ci--;
          setDisplayText(prompt.slice(0, state.ci));
          timerRef.current = setTimeout(tick, deleteSpeed);
        } else {
          setShowOutput(false);
          state.deleting = false;
          state.pi = (state.pi + 1) % prompts.length;
          timerRef.current = setTimeout(tick, 400);
        }
      }
    }

    tick();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [prompts, typeSpeed, deleteSpeed, pauseTime]);

  return (
    <div
      style={{
        background: '#1C1917',
        borderRadius: 12,
        overflow: 'hidden',
        fontFamily: 'monospace',
        height,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 타이틀바 */}
      <div
        style={{
          background: '#292524',
          padding: '8px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#EF4444' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FBBF24' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#22C55E' }} />
        </div>
        <span style={{ fontSize: 12, color: '#A8A29E', marginLeft: 8 }}>CodeRecipe</span>
      </div>

      {/* 터미널 본문 */}
      <div
        style={{
          padding: '24px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {/* 프롬프트 라벨 */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <span style={{ color: '#FBBF24', fontSize: 14, fontWeight: 500 }}>recipe</span>
          <span style={{ color: '#A8A29E', fontSize: 14 }}>~</span>
        </div>

        {/* 타이핑 영역 */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
          <span style={{ color: '#22C55E', fontSize: 16 }}>$</span>
          <div>
            <span
              style={{
                color: '#E7E5E4',
                fontSize: 16,
                lineHeight: 1.7,
                whiteSpace: 'pre-wrap',
              }}
            >
              {displayText}
            </span>
            <span
              style={{
                display: 'inline-block',
                width: 9,
                height: 18,
                background: '#FBBF24',
                verticalAlign: 'text-bottom',
                animation: 'terminal-cursor-blink 1s step-end infinite',
              }}
            />
          </div>
        </div>

        {/* 하단 안내 */}
        {showOutput && (
          <div style={{ marginTop: 20 }}>
            <span style={{ color: '#A8A29E', fontSize: 13 }}>
              press enter to start cooking...
            </span>
          </div>
        )}
      </div>

      <style>{`
        @keyframes terminal-cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
