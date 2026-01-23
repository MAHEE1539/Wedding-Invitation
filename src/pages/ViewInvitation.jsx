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
      </main>
      
      <Footer />
    </div>
  )
}
