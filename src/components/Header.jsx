
import { useState } from 'react'

export default function Header(){
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="logo">Wedding Hub</div>

        <button
          className={`nav-toggle ${open ? 'open' : ''}`}
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav ${open ? 'open' : ''}`} onClick={() => setOpen(false)}>
          <a href="#details">Details</a>
          <a href="#story">Our Story</a>
          <a href="#gallery">Gallery</a>
          <a href="#rsvp" className="btn-primary">RSVP</a>
        </nav>
      </div>
    </header>
  )
}
