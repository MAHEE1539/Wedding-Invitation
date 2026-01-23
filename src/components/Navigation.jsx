import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Navigation({ hideContactUs = false, onContactClick = null }){
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const handleContactUs = () => {
    if(onContactClick) onContactClick()
    else {
      // You can integrate email or contact form here
      alert('Contact us: contactklippers@gmail.com')
    }
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div 
          className="logo" 
          style={{cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px'}}
          onClick={() => navigate('/')}
        >
          <img src="src/assets/golden.png" alt="Klippers" className="logo-img"  />
          <span>KLIPPERS</span>
        </div>

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
          <a href="/" className="nav-link">Home</a>
          {!hideContactUs && (
            <button 
              className="btn-primary nav-btn"
              onClick={handleContactUs}
            >
              Contact Us
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}
