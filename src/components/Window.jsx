import { useEffect, useRef, useState } from 'react'

const canDrag = () => window.matchMedia('(min-width: 641px) and (hover: hover)').matches

export default function Window({
  id, title, area, z, onFocus, onClose, children, bodyClass = '', floating,
  minimized = false, onToggleMin,
}) {
  const [localMin, setLocalMin] = useState(false)
  const [max, setMax] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [slotHeight, setSlotHeight] = useState(null)
  const drag = useRef(null)
  const ref = useRef(null)

  // janelas do grid têm o minimizar controlado pelo App (para abas e barra de tarefas restaurarem)
  const min = onToggleMin ? minimized : localMin
  const toggleMin = () => {
    if (max) setMax(false)
    onToggleMin ? onToggleMin() : setLocalMin((m) => !m)
  }

  const toggleMax = () => {
    if (!max) {
      // guarda a altura para o grid não "pular" enquanto a janela está em tela cheia
      setSlotHeight(ref.current?.offsetHeight ?? null)
      if (min) toggleMin()
    }
    setMax((m) => !m)
    onFocus?.()
  }

  useEffect(() => {
    if (!max) return
    const onKey = (e) => e.key === 'Escape' && setMax(false)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [max])

  const onPointerDown = (e) => {
    onFocus?.()
    if (e.target.closest('button') || max || !canDrag()) return
    drag.current = { sx: e.clientX - pos.x, sy: e.clientY - pos.y }
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e) => {
    if (!drag.current) return
    setPos({ x: e.clientX - drag.current.sx, y: e.clientY - drag.current.sy })
  }
  const onPointerUp = () => (drag.current = null)

  const win = (
    <section
      id={id}
      ref={ref}
      className={`win ${max ? 'win--max' : ''} ${min ? 'win--min' : ''} ${floating ? 'win--floating' : ''}`}
      style={{
        gridArea: area,
        zIndex: max ? 1000 : z,
        transform: max ? undefined : `translate(${pos.x}px, ${pos.y}px)`,
      }}
      onMouseDown={onFocus}
      role={max ? 'dialog' : undefined}
      aria-label={title}
    >
      <header
        className="win__bar"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onDoubleClick={() => canDrag() && toggleMax()}
        onClick={(e) => min && !e.target.closest('button') && toggleMin()}
      >
        <span className="win__title">{title}</span>
        <div className="win__btns">
          <button aria-label={max ? 'Restaurar' : 'Maximizar'} title={max ? 'Restaurar' : 'Maximizar'} onClick={toggleMax}>
            <span className={max ? 'ico-restore' : 'ico-max'} />
          </button>
          <button aria-label={min ? 'Restaurar' : 'Minimizar'} title={min ? 'Restaurar' : 'Minimizar'} onClick={toggleMin}>
            <span className={min ? 'ico-unmin' : 'ico-min'} />
          </button>
          <button aria-label="Fechar" title="Fechar" onClick={onClose}>✕</button>
        </div>
      </header>
      {!min && <div className={`win__body ${bodyClass}`}>{children}</div>}
    </section>
  )

  if (floating) return win

  return (
    <div className="win-slot" style={{ gridArea: area, minHeight: max ? slotHeight ?? undefined : undefined }}>
      {max && <div className="win-backdrop" onClick={() => setMax(false)} />}
      {win}
    </div>
  )
}
