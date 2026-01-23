import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navigation from '../components/Navigation'
import './pages.css'

export default function Home(){
  const navigate = useNavigate()
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="page-wrapper">
      <Navigation />
      
      <main className="main-content">
        {/* Hero Section */}
        <section className="home-hero">
          <div className="container">
            <div className="hero-inner">
              <h1 className="hero-title">Create Your Perfect Wedding Invitation</h1>
              <p className="hero-subtitle">
                Share your special moment with elegance. Design stunning invitations, generate unique links, and let your guests celebrate with you.
              </p>

              <div className="hero-features">
                <div className="feature-item">
                  <div className="feature-icon">✨</div>
                  <h3>Beautiful Templates</h3>
                  <p>Professional wedding invitation designs with cultural elegance</p>
                </div>
                
                <div className="feature-item">
                  <div className="feature-icon">🎨</div>
                  <h3>Personalized</h3>
                  <p>Customize with your photos, names, dates, and venue details</p>
                </div>
                
                <div className="feature-item">
                  <div className="feature-icon">🔗</div>
                  <h3>Easy Sharing</h3>
                  <p>Get a unique link to share with your guests instantly</p>
                </div>
              </div>

              <div className="home-cta-buttons">
                <button 
                  className="btn-primary btn-lg"
                  onClick={() => navigate('/template')}
                >
                  View Template
                </button>
                <button 
                  className="btn-secondary btn-lg"
                  onClick={() => navigate('/generate')}
                >
                  Generate Your Invitation
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="home-about">
          <div className="container">
            <h2>Why Wedding Hub?</h2>
            <div className="about-grid">
              <div className="about-card">
                <h4>🎭 Cultural Excellence</h4>
                <p>Our invitations celebrate the cultural richness and traditions of Indian weddings with authentic designs and elegant aesthetics.</p>
              </div>
              <div className="about-card">
                <h4>📱 Digital First</h4>
                <p>Share invitations instantly with your guests through a unique, memorable link. No printing, no delays, just pure elegance.</p>
              </div>
              <div className="about-card">
                <h4>⚡ Lightning Fast</h4>
                <p>Create and share your invitations in minutes. Our platform is optimized for speed and simplicity.</p>
              </div>
              <div className="about-card">
                <h4>🔒 Secure & Private</h4>
                <p>Your photos and details are securely stored. Share only what you want, with whom you want.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="how-it-works">
          <div className="container">
            <h2>How It Works</h2>
            <div className="steps-grid">
              <div className="step-item">
                <div className="step-number">1</div>
                <h3>Add Your Details</h3>
                <p>Fill in your names, date, venue, and upload your photos</p>
              </div>
              <div className="step-item">
                <div className="step-number">2</div>
                <h3>Review</h3>
                <p>See your beautiful invitation exactly as your guests will see it</p>
              </div>
              <div className="step-item">
                <div className="step-number">3</div>
                <h3>Generate</h3>
                <p>Create your unique invitation link instantly</p>
              </div>
              <div className="step-item">
                <div className="step-number">4</div>
                <h3>Share</h3>
                <p>Send the link to all your guests via WhatsApp, email, or SMS</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
