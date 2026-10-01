import { useRef, useState } from 'react'

export default function Window({ id, title, area, z, onFocus, onClose, children, bodyClass = '', floating }) {
  const [min, setMin] = useState(false)
  const [max, setMax] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const drag = useRef(null)

  const onPointerDown = (e) => {
    onFocus?.()
    if (e.target.closest('button') || max) return
    if (window.matchMedia('(max-width: 640px)').matches) return
    drag.current = { sx: e.clientX - pos.x, sy: e.clientY - pos.y }
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e) => {
    if (!drag.current) return
    setPos({ x: e.clientX - drag.current.sx, y: e.clientY - drag.current.sy })
  }
  const onPointerUp = () => (drag.current = null)

  return (
    <section id={id}
      className={`win ${max ? 'win--max' : ''} ${floating ? 'win--floating' : ''}`}
      style={{
        gridArea: area,
        zIndex: max ? 1000 : z,
        transform: max ? undefined : `translate(${pos.x}px, ${pos.y}px)`,
      }}
      onMouseDown={onFocus}
    >
      <header
        className="win__bar"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onDoubleClick={() => setMax((m) => !m)}
      >
        <span className="win__title">{title}</span>
        <div className="win__btns">
          <button aria-label="Maximizar" onClick={() => setMax((m) => !m)}>
            <span className="ico-max" />
          </button>
          <button aria-label="Minimizar" onClick={() => setMin((m) => !m)}>
            <span className="ico-min" />
          </button>
          <button aria-label="Fechar" onClick={onClose}>✕</button>
        </div>
      </header>
      {!min && <div className={`win__body ${bodyClass}`}>{children}</div>}
    </section>
  )
}
