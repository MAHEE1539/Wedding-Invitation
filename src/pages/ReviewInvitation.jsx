import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ConfirmationModal from '../components/ConfirmationModal'
import { InvitationContext } from '../context/InvitationContext'
import './pages.css'

export default function ReviewInvitation(){
  const navigate = useNavigate()
  const { formData: contextFormData } = useContext(InvitationContext)
  const [formData, setFormData] = useState(null)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [missingSection, setMissingSection] = useState('')

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if(contextFormData){
      setFormData(contextFormData)
      
      // Check for missing sections
      const hasDetails = contextFormData.ceremony?.venue || contextFormData.reception?.venue || contextFormData.dressCode
      const hasStory = contextFormData.storyCards && contextFormData.storyCards.length > 0 && contextFormData.storyCards.some(card => card.title)
      const hasGallery = contextFormData.galleryImages && contextFormData.galleryImages.length > 0

      const missing = []
      if(!hasDetails) missing.push('Wedding Details (Ceremony, Reception, Dress Code)')
      if(!hasStory) missing.push('Story Cards')
      if(!hasGallery) missing.push('Gallery Images')

      if(missing.length > 0){
        setMissingSection(missing.join(', '))
        setShowConfirmModal(true)
      }
    } else {
      navigate('/generate')
    }
  }, [contextFormData, navigate])

  const handleReEdit = () => {
    navigate('/generate')
  }

  const handleGenerate = () => {
    // Data is already in Context, just navigate to progress
    navigate('/progress')
  }

  const handleContactUs = () => {
    alert('Contact us: contactklippers@gmail.com')
  }

  if(!formData) return <div>Loading...</div>

  const eventDate = new Date(formData.date)
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  const formattedTime = eventDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })

  return (
    <div className="page-wrapper">
      <header className="site-header review-header">
        <div className="container header-inner">
          <div 
            className="logo" 
            style={{cursor: 'pointer'}}
            onClick={() => navigate('/')}
          >
            KLIPPERS
          </div>

          <nav className="review-nav">
            <button 
              className="btn-secondary"
              onClick={handleReEdit}
            >
              Re-Edit Details
            </button>
            <button 
              className="btn-primary"
              onClick={handleContactUs}
            >
              Contact Us
            </button>
          </nav>
        </div>
      </header>
      
      <main className="main-content">
        <section className="review-section">
          {/* Invitation Preview */}
          <div className="invitation-preview-container">
            <div className="hero preview-hero">
              <div className="hero-bg" style={{backgroundImage:`url('${formData.heroImagePreview}')`}} />
              <div className="container hero-content">
                <div className="couple-photo" data-animate-on-scroll>
                  <img src={formData.couplePhotoPreview} alt="Couple" />
                </div>
                
                <div className="hero-text">
                  <h1 className="names">{formData.brideName} & {formData.groomName}</h1>
                  <p className="headline">{formData.headline}</p>
                  <p className="date">{formattedDate} • {formattedTime}</p>
                  <p className="venue">{formData.venue}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Wedding Details Preview */}
          {(formData.ceremony?.venue || formData.reception?.venue || formData.dressCode) && (
            <div style={{marginTop: '40px', padding: '25px', backgroundColor: '#f9f9f9', borderRadius: '10px'}}>
              <h3>Wedding Details</h3>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '15px'}}>
                {formData.ceremony?.venue && (
                  <div className="card">
                    <h4>Ceremony</h4>
                    <p><strong>Venue:</strong> {formData.ceremony.venue}</p>
                    {formData.ceremony.time && <p><strong>Time:</strong> {formData.ceremony.time}</p>}
                  </div>
                )}
                {formData.reception?.venue && (
                  <div className="card">
                    <h4>Reception</h4>
                    <p><strong>Venue:</strong> {formData.reception.venue}</p>
                    {formData.reception.time && <p><strong>Time:</strong> {formData.reception.time}</p>}
                  </div>
                )}
                {formData.dressCode && (
                  <div className="card">
                    <h4>Dress Code</h4>
                    <p>{formData.dressCode}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Story Cards Preview */}
          {formData.storyCards.length > 0 && formData.storyCards.some(card => card.title) && (
            <div style={{marginTop: '40px', padding: '25px', backgroundColor: '#f9f9f9', borderRadius: '10px'}}>
              <h3>Our Story</h3>
              <div style={{marginTop: '15px'}}>
                {formData.storyCards.map((card, idx) => (
                  card.title && (
                    <div key={idx} style={{marginBottom: '15px', padding: '15px', backgroundColor: 'white', borderRadius: '8px', borderLeft: '4px solid #d4a574'}}>
                      <p style={{fontSize: '20px', margin: '0 0 5px 0'}}>{card.icon} <strong>{card.title}</strong></p>
                      <p style={{fontSize: '13px', color: '#999', margin: '0 0 8px 0'}}>{card.date}</p>
                      <p style={{margin: '0', color: '#666', fontSize: '14px'}}>{card.description}</p>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}

          {/* Gallery Preview */}
          {formData.galleryImages.length > 0 && (
            <div style={{marginTop: '40px', padding: '25px', backgroundColor: '#f9f9f9', borderRadius: '10px'}}>
              <h3>Gallery</h3>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '10px', marginTop: '15px'}}>
                {formData.galleryImages.map((img, idx) => (
                  <div key={idx} style={{borderRadius: '8px', overflow: 'hidden'}}>
                    <img src={img.preview} alt={`Gallery ${idx}`} style={{width: '100%', height: '120px', objectFit: 'cover'}} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Generate Button */}
          <div className="review-action">
            <button
              className="btn-primary btn-lg"
              onClick={handleGenerate}
            >
              Generate Invitation
            </button>
          </div>
        </section>
      </main>

      {/* Confirmation Modal for Missing Sections */}
      <ConfirmationModal
        isOpen={showConfirmModal}
        title="⚠️ Missing Sections"
        message={`You haven't updated these sections: ${missingSection}. Would you like to continue with the invitation as is?`}
        confirmText="Yes, Continue"
        cancelText="Go Back and Edit"
        onConfirm={() => setShowConfirmModal(false)}
        onCancel={() => navigate('/generate')}
      />
    </div>
  )
}
