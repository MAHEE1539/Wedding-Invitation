import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Map from '../components/Map'
import Navigation from '../components/Navigation'
import { InvitationContext } from '../context/InvitationContext'
import './pages.css'

export default function GenerateInvitation() {
  const navigate = useNavigate()
  const { setFormData: setContextFormData } = useContext(InvitationContext)
  const fileInputRef = useRef(null)
  const heroImageRef = useRef(null)

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [formData, setFormData] = useState({
    brideName: '',
    groomName: '',
    date: '',
    time: '',
    venue: '',
    location: '',
    headline: 'We cordially invite you to join us',
    couplePhoto: null,
    heroImage: null,
    couplePhotoPreview: '/assets/couple.jpg',
    heroImagePreview: '/assets/hero.jpg',
    ceremony: {
      venue: '',
      date: '',
      time: ''
    },
    reception: {
      venue: '',
      date: '',
      time: ''
    },
    dressCode: '',
    storyCards: [
      { icon: '☕', title: '', date: '', description: '' }
    ],
    galleryImages: []
  })


  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleNestedInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const handleStoryCardChange = (idx, field, value) => {
    const updated = [...formData.storyCards]
    updated[idx] = { ...updated[idx], [field]: value }
    setFormData(prev => ({ ...prev, storyCards: updated }))
  }

  const addStoryCard = () => {
    setFormData(prev => ({
      ...prev,
      storyCards: [...prev.storyCards, { icon: '💑', title: '', date: '', description: '' }]
    }))
  }

  const removeStoryCard = (idx) => {
    setFormData(prev => ({
      ...prev,
      storyCards: prev.storyCards.filter((_, i) => i !== idx)
    }))
  }

  const handleCouplePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          couplePhoto: file,
          couplePhotoPreview: event.target.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleHeroImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          heroImage: file,
          heroImagePreview: event.target.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGalleryImageAdd = (e) => {
    const files = Array.from(e.target.files)
    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          galleryImages: [...prev.galleryImages, { file, preview: event.target.result }]
        }))
      }
      reader.readAsDataURL(file)
    })
  }

  const removeGalleryImage = (idx) => {
    setFormData(prev => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_, i) => i !== idx)
    }))
  }

  const handleReview = () => {
    if (!formData.brideName.trim() || !formData.groomName.trim() || !formData.date || !formData.time || !formData.venue.trim()) {
      alert('Please fill in all required fields')
      return
    }
    // Store in Context for review page (avoids sessionStorage quota issues)
    setContextFormData(formData)
    navigate('/review')
  }

  return (
    <div className="page-wrapper">
      <Navigation />

      <main className="main-content">
        <section className="generate-section">
          <div className="container">
            <h1 className="section-title">Create Your Invitation</h1>
            <p className="section-subtitle">Fill in your details and upload photos to get started</p>

            <div className="form-container">
              <form className="invitation-form">
                {/* Couple Names */}
                <div className="form-group">
                  <label htmlFor="brideName">Bride's Name *</label>
                  <input
                    type="text"
                    id="brideName"
                    name="brideName"
                    value={formData.brideName}
                    onChange={handleInputChange}
                    placeholder="Enter bride's name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="groomName">Groom's Name *</label>
                  <input
                    type="text"
                    id="groomName"
                    name="groomName"
                    value={formData.groomName}
                    onChange={handleInputChange}
                    placeholder="Enter groom's name"
                    required
                  />
                </div>

                {/* Date and Venue */}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="date">Wedding Date *</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="time">Wedding Time *</label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="venue">Venue *</label>
                    <input
                      type="text"
                      id="venue"
                      name="venue"
                      value={formData.venue}
                      onChange={handleInputChange}
                      placeholder="Enter wedding venue"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="location">Location (Address for map)</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Enter address or place for map preview"
                  />
                </div>

                {/* Headline */}
                <div className="form-group">
                  <label htmlFor="headline">Invitation Headline</label>
                  <input
                    type="text"
                    id="headline"
                    name="headline"
                    value={formData.headline}
                    onChange={handleInputChange}
                    placeholder="We cordially invite you to join us"
                  />
                </div>

                {/* Photo Uploads */}
                <div className="form-group">
                  <label>Couple Photo *</label>
                  <div className="photo-upload">
                    <div className="photo-preview">
                      <img src={formData.couplePhotoPreview} alt="Couple" />
                    </div>
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => fileInputRef.current.click()}
                    >
                      Upload Photo
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleCouplePhotoChange}
                      style={{ display: 'none' }}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Background Image</label>
                  <div className="photo-upload">
                    <div className="photo-preview large">
                      <img src={formData.heroImagePreview} alt="Background" />
                    </div>
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => heroImageRef.current.click()}
                    >
                      Upload Background
                    </button>
                    <input
                      ref={heroImageRef}
                      type="file"
                      accept="image/*"
                      onChange={handleHeroImageChange}
                      style={{ display: 'none' }}
                    />
                  </div>
                </div>

                {/* Wedding Details Section */}
                <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '2px solid #eee' }}>
                  <h3 style={{ marginBottom: '20px' }}>Wedding Details (Optional)</h3>

                  {/* Ceremony */}
                  <div className="form-group">
                    <label>Ceremony</label>
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                      <input
                        type="text"
                        placeholder="Venue"
                        value={formData.ceremony.venue}
                        onChange={(e) => handleNestedInputChange('ceremony', 'venue', e.target.value)}
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <input
                          type="date"
                          placeholder="Date"
                          value={formData.ceremony.date}
                          onChange={(e) => handleNestedInputChange('ceremony', 'date', e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="time"
                          placeholder="Time"
                          value={formData.ceremony.time}
                          onChange={(e) => handleNestedInputChange('ceremony', 'time', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Reception */}
                  <div className="form-group">
                    <label>Reception</label>
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                      <input
                        type="text"
                        placeholder="Venue"
                        value={formData.reception.venue}
                        onChange={(e) => handleNestedInputChange('reception', 'venue', e.target.value)}
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <input
                          type="date"
                          placeholder="Date"
                          value={formData.reception.date}
                          onChange={(e) => handleNestedInputChange('reception', 'date', e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="time"
                          placeholder="Time"
                          value={formData.reception.time}
                          onChange={(e) => handleNestedInputChange('reception', 'time', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Dress Code */}
                  <div className="form-group">
                    <label htmlFor="dressCode">Dress Code</label>
                    <input
                      type="text"
                      id="dressCode"
                      placeholder="e.g., Traditional, Formal, Casual"
                      value={formData.dressCode}
                      onChange={(e) => handleInputChange({ target: { name: 'dressCode', value: e.target.value } })}
                    />
                  </div>
                </div>

                {/* Map Preview (uses location if provided else venue) */}
                {(formData.location || formData.venue) && (
                  <div style={{ marginTop: '20px' }}>
                    <Map query={formData.location || formData.venue} address={formData.location || formData.venue} />
                  </div>
                )}

                {/* Story Cards Section */}
                <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '2px solid #eee' }}>
                  <h3 style={{ marginBottom: '20px' }}>Our Story (Optional)</h3>
                  {formData.storyCards.map((card, idx) => (
                    <div key={idx} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
                      <div className="form-row">
                        <div className="form-group">
                          <input
                            type="text"
                            placeholder="Icon (emoji)"
                            value={card.icon}
                            maxLength="2"
                            onChange={(e) => handleStoryCardChange(idx, 'icon', e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            placeholder="Title"
                            value={card.title}
                            onChange={(e) => handleStoryCardChange(idx, 'title', e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            placeholder="Month and Year"
                            value={card.date}
                            onChange={(e) => handleStoryCardChange(idx, 'date', e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <textarea
                          placeholder="Story description"
                          value={card.description}
                          onChange={(e) => handleStoryCardChange(idx, 'description', e.target.value)}
                          style={{ minHeight: '80px' }}
                        />
                      </div>
                      {formData.storyCards.length > 1 && (
                        <button
                          type="button"
                          className="btn-danger"
                          onClick={() => removeStoryCard(idx)}
                          style={{ marginTop: '10px' }}
                        >
                          Remove Story
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={addStoryCard}
                    style={{ marginTop: '10px' }}
                  >
                    + Add Story Card
                  </button>
                </div>

                {/* Gallery Section */}
                <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '2px solid #eee' }}>
                  <h3 style={{ marginBottom: '20px' }}>Gallery Images (Optional)</h3>
                  <div className="gallery-upload">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleGalleryImageAdd}
                      style={{ marginBottom: '15px' }}
                    />
                  </div>
                  <div className="gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '10px', marginTop: '15px' }}>
                    {formData.galleryImages.map((img, idx) => (
                      <div key={idx} style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden' }}>
                        <img src={img.preview} alt={`Gallery ${idx}`} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                        <button
                          type="button"
                          className="btn-danger"
                          onClick={() => removeGalleryImage(idx)}
                          style={{ position: 'absolute', top: '5px', right: '5px', padding: '3px 6px', fontSize: '12px' }}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Review Button */}
                <div className="form-actions">
                  <button
                    type="button"
                    className="btn-primary btn-lg"
                    onClick={handleReview}
                  >
                    Review Invitation
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
