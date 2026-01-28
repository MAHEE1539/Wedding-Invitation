import { doc, getDoc } from 'firebase/firestore'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navigation from '../components/Navigation'
import { InvitationContext } from '../context/InvitationContext'
import { db } from '../utils/firebase'
import './pages.css'

export default function SharePage(){
  const { coupleId } = useParams()
  const navigate = useNavigate()
  const { formData: contextFormData } = useContext(InvitationContext)
  const [copied, setCopied] = useState(false)
  const [formData, setFormData] = useState(null)
  const [loading, setLoading] = useState(true)

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [coupleId])

  useEffect(() => {
    const fetchInvitationData = async () => {
      try {
        setLoading(true)
        
        // First try to get from Context (if just created)
        if(contextFormData){
          setFormData(contextFormData)
          return
        }

        // Otherwise fetch from Firebase
        const docRef = doc(db, 'invitations', coupleId)
        const docSnap = await getDoc(docRef)
        
        if(docSnap.exists()){
          const firebaseData = docSnap.data()
          setFormData({
            brideName: firebaseData.brideName,
            groomName: firebaseData.groomName,
            couplePhoto: firebaseData.couplePhoto,
            heroImage: firebaseData.heroImage
          })
        } else {
          console.warn('No invitation found in Firestore for coupleId:', coupleId)
        }
      } catch(error) {
        console.error('Error fetching invitation data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchInvitationData()
  }, [coupleId, contextFormData])

  const invitationLink = `${window.location.origin}/invitation/${coupleId}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(invitationLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = (platform) => {
    const text = `You are cordially invited to join ${formData?.brideName} & ${formData?.groomName} on their special day! 💕`
    let shareUrl = ''

    switch(platform){
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + invitationLink)}`
        break
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(invitationLink)}`
        break
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(invitationLink)}`
        break
      default:
        break
    }

    if(shareUrl){
      window.open(shareUrl, '_blank')
    }
  }

  if(loading) return (
    <div className="page-wrapper">
      <Navigation />
      <main className="main-content">
        <div style={{textAlign: 'center', padding: '40px', marginTop: '60px'}}>
          <h2>Preparing your invitation link...</h2>
          <p>Please wait a moment.</p>
        </div>
      </main>
    </div>
  )

  if(!formData) return (
    <div className="page-wrapper">
      <Navigation />
      <main className="main-content">
        <div style={{textAlign: 'center', padding: '40px', marginTop: '60px'}}>
          <h2>Unable to load invitation</h2>
          <p>The invitation could not be found. Please check the link or try creating a new invitation.</p>
          <button 
            className="btn-primary btn-generate"
            onClick={() => navigate('/generate')}
            style={{marginTop: '20px'}}
          >
            Create New Invitation
          </button>
        </div>
      </main>
    </div>
  )

  return (
    <div className="page-wrapper">
      <Navigation />
      
      <main className="main-content">
        <section className="share-section">
          <div className="container">
            <div className="share-card">
              <div className="success-icon">✓</div>
              <h1 className="share-title">Your Invitation is Ready!</h1>
              <p className="share-subtitle">
                Your beautiful invitation for {formData.brideName} & {formData.groomName} has been created successfully.
              </p>

              {/* Invitation Preview Mini */}
              <div className="invitation-mini-preview">
                <div className="preview-content">
                  <img src={formData.couplePhotoPreview} alt="Couple" className="preview-photo" />
                  <div className="preview-text">
                    <h2>{formData.brideName} & {formData.groomName}</h2>
                    <p>{formData.headline}</p>
                  </div>
                </div>
              </div>

              {/* Share Link */}
              <div className="share-link-section">
                <label>Your Unique Invitation Link</label>
                <div className="link-container">
                  <input 
                    type="text" 
                    value={invitationLink} 
                    readOnly 
                    className="link-input"
                  />
                  <button 
                    className="btn-primary"
                    onClick={handleCopyLink}
                  >
                    {copied ? '✓ Copied!' : 'Copy Link'}
                  </button>
                </div>
                <p className="link-info">Share this link with your guests via WhatsApp, Email, or SMS</p>
              </div>

              {/* Share Buttons */}
              <div className="share-buttons">
                <h3>Share On</h3>
                <div className="social-buttons">
                  <button 
                    className="social-btn whatsapp"
                    onClick={() => handleShare('whatsapp')}
                  >
                    📱 WhatsApp
                  </button>
                  <button 
                    className="social-btn facebook"
                    onClick={() => handleShare('facebook')}
                  >
                    f Facebook
                  </button>
                  <button 
                    className="social-btn twitter"
                    onClick={() => handleShare('twitter')}
                  >
                    𝕏 Twitter
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="share-actions">
                <button 
                  className="btn-secondary"
                  onClick={() => navigate('/')}
                >
                  Create Another Invitation
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
