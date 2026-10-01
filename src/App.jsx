import { useEffect, useState } from 'react'
import Window from './components/Window.jsx'
import { Star, Moon, Folder, Clouds, VibeScene, useChiptune } from './components/Pixels.jsx'
import { profile, skills, projects, experience, education } from './data.js'

const WINDOWS = [
  { id: 'hello', title: 'hello.exe', tab: 'início' },
  { id: 'about', title: 'sobre_mim.txt', tab: 'sobre' },
  { id: 'skills', title: 'Skills', tab: 'skills' },
  { id: 'vibe', title: 'vibe.png' },
  { id: 'contact', title: 'Contato!!!', tab: 'contato' },
  { id: 'projects', title: 'Projetos', tab: 'projetos' },
  { id: 'mood', title: 'mood.mp3' },
  { id: 'timeline', title: 'experiencia.log', tab: 'experiência' },
  { id: 'education', title: 'formacao.txt', tab: 'formação' },
]

export default function App() {
  const [open, setOpen] = useState(() => new Set(WINDOWS.map((w) => w.id)))
  const [order, setOrder] = useState(WINDOWS.map((w) => w.id))
  const [detail, setDetail] = useState(null)
  const [startOpen, setStartOpen] = useState(false)
  const music = useChiptune()

  const focus = (id) => setOrder((o) => [...o.filter((x) => x !== id), id])
  const z = (id) => 10 + order.indexOf(id)
  const close = (id) => setOpen((s) => { const n = new Set(s); n.delete(id); return n })
  const show = (id) => {
    setOpen((s) => new Set(s).add(id))
    focus(id)
    setStartOpen(false)
    requestAnimationFrame(() =>
      document.getElementById(`w-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    )
  }

  const win = (id, area, body, bodyClass) =>
    open.has(id) && (
        <Window
          id={`w-${id}`}
          title={WINDOWS.find((w) => w.id === id).title}
          area={area}
          z={z(id)}
          onFocus={() => focus(id)}
          onClose={() => close(id)}
          bodyClass={bodyClass}
        >
          {body}
        </Window>
    )

  return (
    <div className="desktop">
      <nav className="tabs">
        <span className="tabs__search">⌕</span>
        {WINDOWS.filter((w) => w.tab).map((w) => (
          <button key={w.id} className="tab" onClick={() => show(w.id)}>{w.tab}</button>
        ))}
      </nav>

      <Star style={{ top: 70, left: '46%' }} />
      <Star style={{ top: 190, left: 6 }} size={24} />
      <Star style={{ top: 420, right: '6%' }} />
      <Star style={{ bottom: 120, left: '30%' }} size={26} />
      <Star style={{ top: 760, right: 4 }} size={22} />
      <Moon style={{ top: 470, right: '2%' }} />

      <main className="grid">
        {win('hello', 'hello', (
          <div className="hello">
            <p className="hello__hi">olá, eu sou</p>
            <h1>{profile.name}</h1>
            <p className="hello__role">{profile.role}</p>
            <p className="hello__tag">{profile.tagline}</p>
            <p className="hello__status"><span className="blink">●</span> {profile.status}</p>
          </div>
        ))}

        {win('vibe', 'vibe', <VibeScene />, 'win__body--flush')}

        {win('skills', 'skills', (
          <ul className="skills">
            {skills.map((s) => (
              <li key={s.group}>
                <span className="chk">✓</span>
                <span className="skills__name">{s.group}</span>
                <span className="chips">{s.items.map((i) => <span key={i} className="chip">{i}</span>)}</span>
              </li>
            ))}
          </ul>
        ))}

        {win('about', 'about', (
          <div className="about">
            {profile.about.map((t, i) => <p key={i}>{t}</p>)}
            <p className="muted">📍 {profile.location}</p>
          </div>
        ))}

        {win('contact', 'contact', (
          <div className="contact">
            <a className="btn" href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a>
            <a className="btn" href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="btn" href={profile.links.email}>E-mail</a>
            <a className="btn" href={profile.links.cv} target="_blank" rel="noreferrer">Currículo</a>
          </div>
        ))}

        {win('projects', 'projects', (
          <div className="folders">
            {projects.map((p) => (
              <button key={p.id} className="folder-btn" onClick={() => setDetail({ ...p, title: `${p.title}.exe` })}>
                <Folder pattern={p.pattern} />
                <span>{p.name}</span>
              </button>
            ))}
          </div>
        ), 'win__body--soft')}

        {win('mood', 'mood', (
          <div className="mood">
            <div className="mood__screen"><Clouds /></div>
            <div className="mood__ctrl">
              <button onClick={music.prev} aria-label="Anterior">|◀</button>
              {music.playing
                ? <button onClick={music.stop} aria-label="Pausar">▌▌</button>
                : <button onClick={music.play} aria-label="Tocar">▶</button>}
              <button onClick={music.next} aria-label="Próxima">▶|</button>
            </div>
          </div>
        ))}

        {win('timeline', 'timeline', <HoloList items={experience} onOpen={setDetail} />)}

        {win('education', 'education', <HoloList items={education} onOpen={setDetail} />)}
      </main>

      {detail && (
        <div className="overlay" onClick={() => setDetail(null)}>
          <div onClick={(e) => e.stopPropagation()}>
            <Window title={detail.title} z={2000} floating onClose={() => setDetail(null)}>
              <div className="project">
                {detail.heading && <h3>{detail.heading}</h3>}
                {detail.sub && <p className="muted">{detail.sub}</p>}
                {detail.description && <p>{detail.description}</p>}
                {detail.details && <ul className="bullets">{detail.details.map((d) => <li key={d}>{d}</li>)}</ul>}
                {detail.stack && (
                  <div className="chips">{detail.stack.map((x) => <span key={x} className="chip">{x}</span>)}</div>
                )}
                {detail.repo && (
                  <div className="contact">
                    <a className="btn" href={detail.repo} target="_blank" rel="noreferrer">Ver no GitHub</a>
                  </div>
                )}
              </div>
            </Window>
          </div>
        </div>
      )}

      <footer className="taskbar">
        <button className="start" onClick={() => setStartOpen((o) => !o)}>★ start</button>
        {startOpen && (
          <div className="startmenu">
            {WINDOWS.map((w) => (
              <button key={w.id} onClick={() => show(w.id)}>
                {open.has(w.id) ? '▣' : '□'} {w.title}
              </button>
            ))}
          </div>
        )}
        <div className="taskbar__apps">
          {WINDOWS.filter((w) => !open.has(w.id)).map((w) => (
            <button key={w.id} onClick={() => show(w.id)}>{w.title}</button>
          ))}
        </div>
        <Clock />
      </footer>
    </div>
  )
}

function Clock() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 10000)
    return () => clearInterval(t)
  }, [])
  return <span className="clock">{now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
}

function HoloList({ items, onOpen }) {
  return (
    <ul className="timeline">
      {items.map((t, i) => (
        <li key={i}>
          <button
            className="holo"
            style={{ '--d': `${i * 1.3}s` }}
            onClick={() => onOpen({ ...t, title: `${t.place}.txt`, heading: t.title, sub: t.period })}
          >
            <strong>{t.title}</strong>
            <span>{t.place} · {t.period}</span>
          </button>
        </li>
      ))}
    </ul>
  )
}
