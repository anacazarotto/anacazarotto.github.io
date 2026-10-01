import { useEffect, useRef, useState } from 'react'

export function Star({ style, size = 30 }) {
  return (
    <svg className="deco star" style={style} width={size} height={size} viewBox="0 0 24 24">
      <path
        d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 20.9l1.6-7L2 9.2l7.1-.6z"
        fill="#fde68a"
        stroke="#5b5fa8"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Moon({ style }) {
  return (
    <svg className="deco moon" style={style} width="70" height="80" viewBox="0 0 70 80">
      <path
        d="M48 4C28 8 16 26 18 44s18 32 40 30C42 82 14 74 6 50S18 4 48 4z"
        fill="#fde68a"
        stroke="#5b5fa8"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const patterns = {
  blank: null,
  lines: (
    <g stroke="#fff" strokeWidth="2" opacity=".85">
      <line x1="10" y1="30" x2="62" y2="30" />
      <line x1="10" y1="37" x2="62" y2="37" />
      <line x1="10" y1="44" x2="62" y2="44" />
    </g>
  ),
  grid: (
    <g stroke="#fff" strokeWidth="1.5" opacity=".85">
      {[16, 24, 32, 40, 48, 56].map((x) => <line key={x} x1={x} y1="24" x2={x} y2="52" />)}
      {[30, 38, 46].map((y) => <line key={y} x1="8" y1={y} x2="64" y2={y} />)}
    </g>
  ),
  dots: (
    <g fill="#fff" opacity=".9">
      {[14, 24, 34, 44, 54].flatMap((x) =>
        [30, 38, 46].map((y) => <circle key={`${x}-${y}`} cx={x + (y % 16 ? 4 : 0)} cy={y} r="1.4" />)
      )}
    </g>
  ),
}

export function Folder({ pattern = 'blank' }) {
  return (
    <svg className="folder" width="72" height="58" viewBox="0 0 72 58">
      <path d="M4 8h22l5 6h37v40H4z" fill="#f06bb8" stroke="#5b5fa8" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M2 20h68l-4 34H6z" fill="#f79ad0" stroke="#5b5fa8" strokeWidth="2.5" strokeLinejoin="round" />
      {patterns[pattern]}
    </svg>
  )
}

export function Clouds() {
  return (
    <svg className="clouds" viewBox="0 0 200 90" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a5b4fc" />
          <stop offset="1" stopColor="#f9c5e4" />
        </linearGradient>
      </defs>
      <rect width="200" height="90" fill="url(#sky)" />
      <g fill="#fff" stroke="#5b5fa8" strokeWidth="1.4" className="cloud-a">
        <path d="M10 70a10 10 0 0 1 12-12 13 13 0 0 1 24 2 9 9 0 0 1 4 10z" />
      </g>
      <g fill="#fff" stroke="#5b5fa8" strokeWidth="1.4" className="cloud-b">
        <path d="M120 66a9 9 0 0 1 12-10 13 13 0 0 1 24 0 10 10 0 0 1 8 10z" />
      </g>
      <g fill="#fbcfe8" stroke="#5b5fa8" strokeWidth="1.2" className="cloud-c">
        <path d="M70 40a7 7 0 0 1 9-7 9 9 0 0 1 17 1 6 6 0 0 1 3 6z" />
      </g>
    </svg>
  )
}

export function VibeScene() {
  return (
    <svg className="vibe" viewBox="0 0 200 110" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="vibe-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c7d2fe" />
          <stop offset=".55" stopColor="#e9d5ff" />
          <stop offset="1" stopColor="#fbcfe8" />
        </linearGradient>
      </defs>
      <rect width="200" height="110" fill="url(#vibe-sky)" />
      {[[20, 18], [60, 30], [100, 12], [150, 26], [180, 50], [40, 60]].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="2" height="2" fill="#fff" className="twinkle" style={{ animationDelay: `${i * 0.4}s` }} />
      ))}
      <g stroke="#6b6fb8" strokeWidth="1.2" fill="none">
        <path d="M0 40 Q80 60 150 34" />
        <path d="M0 48 Q80 70 150 42" />
        <path d="M150 34 Q180 30 200 40" />
      </g>
      <g fill="#6b6fb8">
        <rect x="148" y="20" width="4" height="90" />
        <rect x="138" y="30" width="24" height="3" />
        <rect x="141" y="38" width="18" height="2" />
      </g>
    </svg>
  )
}

// chiptune bem simples com Web Audio
const melody = [523, 659, 784, 659, 587, 698, 880, 698, 523, 659, 784, 988, 880, 784, 659, 587]

export function useChiptune() {
  const [playing, setPlaying] = useState(false)
  const ctx = useRef(null)
  const timer = useRef(null)
  const step = useRef(0)

  const stop = () => {
    clearInterval(timer.current)
    setPlaying(false)
  }

  const play = () => {
    ctx.current ??= new (window.AudioContext || window.webkitAudioContext)()
    const ac = ctx.current
    ac.resume()
    timer.current = setInterval(() => {
      const f = melody[step.current++ % melody.length]
      const o = ac.createOscillator()
      const g = ac.createGain()
      o.type = 'square'
      o.frequency.value = f
      g.gain.setValueAtTime(0.04, ac.currentTime)
      g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.22)
      o.connect(g).connect(ac.destination)
      o.start()
      o.stop(ac.currentTime + 0.24)
    }, 240)
    setPlaying(true)
  }

  const next = () => (step.current += 4)
  const prev = () => (step.current = Math.max(0, step.current - 4))

  useEffect(() => () => clearInterval(timer.current), [])
  return { playing, play, stop, next, prev }
}
