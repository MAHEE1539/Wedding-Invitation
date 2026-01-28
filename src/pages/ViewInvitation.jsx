import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Details from '../components/Details'
import Footer from '../components/Footer'
import Gallery from '../components/Gallery'
import Navigation from '../components/Navigation'
import Notify from '../components/Notify'
import Story from '../components/Story'
import { db } from '../utils/firebase'
import './pages.css'

export default function ViewInvitation(){
  const { id } = useParams()
  const [invitation, setInvitation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [source, setSource] = useState(null)
  const [copied, setCopied] = useState(false)

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  useEffect(() => {
    const fetchInvitation = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch from Firestore only
        const docRef = doc(db, 'invitations', id)
        const docSnap = await getDoc(docRef)
        
        if(docSnap.exists()){
          const firebaseData = docSnap.data()
          const data = {
            brideName: firebaseData.brideName,
            groomName: firebaseData.groomName,
            headline: firebaseData.headline,
            date: firebaseData.date,
            venue: firebaseData.venue,
            couplePhotoPreview: firebaseData.couplePhoto,
            heroImagePreview: firebaseData.heroImage,
            ceremony: firebaseData.ceremony || {},
            reception: firebaseData.reception || {},
            dressCode: firebaseData.dressCode || '',
            storyCards: firebaseData.storyCards || [],
            galleryImages: firebaseData.galleryImages || []
          }
          
          setInvitation(data)
          setSource('firebase')
        } else {
          setError('Invitation not found. The link may be invalid or expired.')
        }
      } catch(firebaseErr) {
        console.error('Error fetching invitation:', firebaseErr)
        setError('Unable to load invitation. Please check the link or try again later.')
      } finally {
        setLoading(false)
      }
    }
    
    fetchInvitation()
  }, [id])

  const invitationLink = `${window.location.origin}/invitation/${id}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(invitationLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = (platform) => {
    const text = `You are cordially invited to join ${invitation?.brideName} & ${invitation?.groomName} on their special day! 💕`
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

  if(loading){
    return (
      <div className="page-wrapper">
        <Navigation />
        <main className="main-content">
          <div style={{textAlign: 'center', padding: '60px 20px', marginTop: '60px'}}>
            <h2>Loading invitation...</h2>
            <p>Please wait while we load your invitation</p>
          </div>
        </main>
      </div>
    )
  }

  if(error){
    return (
      <div className="page-wrapper">
        <Navigation />
        <main className="main-content">
          <div className="container" style={{textAlign: 'center', padding: '60px 20px', marginTop: '60px'}}>
            <h2>⚠️ {error}</h2>
            <button 
              className="btn-primary"
              onClick={() => window.location.href = '/'}
              style={{marginTop: '20px'}}
            >
              Create New Invitation
            </button>
          </div>
        </main>
      </div>
    )
  }

  if(!invitation){
    return (
      <div className="page-wrapper">
        <Navigation />
        <main className="main-content">
          <div style={{textAlign: 'center', padding: '60px 20px', marginTop: '60px'}}>
            <h2>Invitation not available</h2>
            <p>This invitation could not be loaded.</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="page-wrapper">
      <Navigation hideContactUs={false} />
      
      <main className="main-content template-view">
        {/* Hero Section with User's Photos and Details */}
        <section className="hero">
          <div className="hero-bg" style={{backgroundImage:`url('${invitation.heroImagePreview}')`}} />
          <div className="container hero-content">
            <div className="couple-photo" data-animate-on-scroll>
              <img src={invitation.couplePhotoPreview} alt="Couple" />
            </div>
            
            <div className="hero-text">
              <h1 className="names">{invitation.brideName} & {invitation.groomName}</h1>
              <p className="headline">{invitation.headline}</p>
              <p className="date">{invitation.date}</p>
              <p className="venue">{invitation.venue}</p>
            </div>
          </div>
        </section>

        {/* Standard Invitation Sections */}
        <Details 
          ceremony={invitation.ceremony}
          reception={invitation.reception}
          dressCode={invitation.dressCode}
        />
        <Story storyCards={invitation.storyCards} />
        <Gallery images={invitation.galleryImages} />
        <Notify 
          brideName={invitation.brideName}
          groomName={invitation.groomName}
          date={invitation.date}
          venue={invitation.venue}
        />

        {/* Share Feature Section */}
        <section className="share-feature-section">
          <div className="container">
            <div className="share-feature-card">
              <h2>Share This Invitation</h2>
              <p className="feature-subtitle">Spread the joy! Share this beautiful invitation with your loved ones.</p>
              
              <div className="share-feature-grid">
                {/* Direct Link Share */}
                <div className="share-feature-item">
                  <div className="feature-icon">🔗</div>
                  <h3>Copy Link</h3>
                  <p>Copy the invitation link to share via any platform</p>
                  <button 
                    className="btn-primary"
                    onClick={handleCopyLink}
                  >
                    {copied ? '✓ Copied!' : 'Copy Invitation Link'}
                  </button>
                </div>

                {/* WhatsApp Share */}
                <div className="share-feature-item">
                  <div className="feature-icon">💬</div>
                  <h3>WhatsApp</h3>
                  <p>Share directly on WhatsApp with guests</p>
                  <button 
                    className="btn-primary"
                    onClick={() => handleShare('whatsapp')}
                  >
                    Share on WhatsApp
                  </button>
                </div>

                {/* Facebook Share */}
                <div className="share-feature-item">
                  <div className="feature-icon">f</div>
                  <h3>Facebook</h3>
                  <p>Post this invitation on Facebook</p>
                  <button 
                    className="btn-primary"
                    onClick={() => handleShare('facebook')}
                  >
                    Share on Facebook
                  </button>
                </div>

                {/* Twitter Share */}
                <div className="share-feature-item">
                  <div className="feature-icon">𝕏</div>
                  <h3>Twitter</h3>
                  <p>Share this special moment on Twitter</p>
                  <button 
                    className="btn-primary"
                    onClick={() => handleShare('twitter')}
                  >
                    Share on Twitter
                  </button>
                </div>

                {/* Email Share */}
                <div className="share-feature-item">
                  <div className="feature-icon">📧</div>
                  <h3>Email</h3>
                  <p>Share via email with the invitation link</p>
                  <button 
                    className="btn-primary"
                    onClick={() => {
                      const subject = `You're Invited to ${invitation?.brideName} & ${invitation?.groomName}'s Wedding!`
                      const body = `You are cordially invited to join ${invitation?.brideName} & ${invitation?.groomName} on their special day!\n\nView the invitation here: ${invitationLink}\n\nLooking forward to celebrating with you! 💕`
                      window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
                    }}
                  >
                    Share via Email
                  </button>
                </div>

                {/* SMS Share */}
                <div className="share-feature-item">
                  <div className="feature-icon">📱</div>
                  <h3>SMS</h3>
                  <p>Share via text message with guests</p>
                  <button 
                    className="btn-primary"
                    onClick={() => {
                      const text = `You're invited to ${invitation?.brideName} & ${invitation?.groomName}'s wedding! ${invitationLink}`
                      window.location.href = `sms:?body=${encodeURIComponent(text)}`
                    }}
                  >
                    Share via SMS
                  </button>
                </div>
              </div>

              <div className="share-tips">
                <h3>💡 Sharing Tips</h3>
                <ul>
                  <li>Share the link with guests 2-4 weeks before the wedding</li>
                  <li>Use WhatsApp for quick group sharing with family</li>
                  <li>Post on social media to announce your special day</li>
                  <li>Send email invites for formal guest lists</li>
                  <li>Your invitation link expires after 30 days</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
