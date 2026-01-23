import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Details from '../components/Details'
import Footer from '../components/Footer'
import Gallery from '../components/Gallery'
import Hero from '../components/Hero'
import Map from '../components/Map'
import Navigation from '../components/Navigation'
import Notify from '../components/Notify'
import RSVP from '../components/RSVP'
import Story from '../components/Story'
import './pages.css'

export default function TemplatePreview(){
  const navigate = useNavigate()
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="page-wrapper">
      <Navigation />
      
      <main className="main-content template-view">
        <div className="template-header">
          <div className="container">
            <h2>Template Preview</h2>
            <p>See how your invitation will look. Ready to create yours?</p>
            <button 
              className="btn-primary"
              onClick={() => navigate('/generate')}
            >
              Generate Your Invitation
            </button>
          </div>
        </div>

        <Hero />
        <Details />
        <Story />
        <Gallery />
        <RSVP />
        <Map />
        <Notify />

        <div className="container" style={{textAlign: 'center', marginTop: '40px', paddingBottom: '40px'}}>
          <button className="btn-primary" onClick={() => navigate('/generate')}>Generate Your Invitation</button>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
