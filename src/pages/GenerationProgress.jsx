import { addDoc, collection } from 'firebase/firestore'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InvitationContext } from '../context/InvitationContext'
import { db, storage } from '../utils/firebase'
import './pages.css'

export default function GenerationProgress(){
  const navigate = useNavigate()
  const { formData: contextFormData } = useContext(InvitationContext)
  const [progress, setProgress] = useState(0)
  const [formData, setFormData] = useState(null)

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if(contextFormData){
      setFormData(contextFormData)
    } else {
      // Fallback to sessionStorage for legacy support
      const stored = sessionStorage.getItem('invitationDataForGeneration')
      if(stored){
        setFormData(JSON.parse(stored))
      }
    }
  }, [contextFormData])

  useEffect(() => {
    // Simulate generation progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 30
        if(newProgress >= 100){
          clearInterval(interval)
          // Save to Firebase after 1 second
          setTimeout(() => {
            if(formData){
              saveToFirebase(formData)
            }
          }, 1000)
          return 100
        }
        return newProgress
      })
    }, 500)

    return () => clearInterval(interval)
  }, [formData, navigate])

  const saveToFirebase = async (data) => {
    const timestamp = Date.now()
    
    console.log('🚀 Starting Firebase upload...')
    
    // Upload couple photo
    const couplePhotoValue = data.couplePhotoPreview
    const couplePhotoRef = ref(storage, `invitations/${timestamp}/couple-photo.jpg`)
    console.log('📤 Uploading couple photo...')
    
    if (!couplePhotoValue.startsWith('data:')) {
      throw new Error('couple photo is not a valid data URL')
    }
    
    await uploadString(couplePhotoRef, couplePhotoValue, 'data_url')
    const couplePhotoURL = await getDownloadURL(couplePhotoRef)
    console.log('✅ Couple photo URL:', couplePhotoURL)

    // Upload hero image
    const heroImageValue = data.heroImagePreview
    const heroImageRef = ref(storage, `invitations/${timestamp}/hero-image.jpg`)
    console.log('📤 Uploading hero image...')
    
    if (!heroImageValue.startsWith('data:')) {
      throw new Error('hero image is not a valid data URL')
    }
    
    await uploadString(heroImageRef, heroImageValue, 'data_url')
    const heroImageURL = await getDownloadURL(heroImageRef)
    console.log('✅ Hero image URL:', heroImageURL)

    // Upload gallery images
    const galleryURLs = []
    for (let i = 0; i < data.galleryImages.length; i++) {
      const galleryImageRef = ref(storage, `invitations/${timestamp}/gallery-${i}.jpg`)
      console.log(`📤 Uploading gallery image ${i + 1}...`)
      await uploadString(galleryImageRef, data.galleryImages[i].preview, 'data_url')
      const galleryImageURL = await getDownloadURL(galleryImageRef)
      galleryURLs.push(galleryImageURL)
      console.log(`✅ Gallery image ${i + 1} URL:`, galleryImageURL)
    }

    // Save to Firestore
    console.log('💾 Saving to Firestore...')
    const invitationData = {
      brideName: data.brideName,
      groomName: data.groomName,
      headline: data.headline,
      date: data.date,
      venue: data.venue,
      couplePhoto: couplePhotoURL,
      heroImage: heroImageURL,
      ceremony: data.ceremony,
      reception: data.reception,
      dressCode: data.dressCode,
      storyCards: data.storyCards.filter(card => card.title),
      galleryImages: galleryURLs,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    }

    const docRef = await addDoc(collection(db, 'invitations'), invitationData)
    const invitationId = docRef.id
    console.log('✅ Firestore document created:', invitationId)

    console.log('✅ ALL FIREBASE OPERATIONS SUCCESSFUL!')
    navigate(`/share/${invitationId}`)
  }

  const base64ToBlob = (base64, mimeType) => {
    const bstr = atob(base64.split(',')[1] || base64)
    const n = bstr.length
    const u8arr = new Uint8Array(n)
    for (let i = 0; i < n; i++) {
      u8arr[i] = bstr.charCodeAt(i)
    }
    return new Blob([u8arr], { type: mimeType })
  }

  return (
    <div className="generation-overlay">
      <div className="generation-modal">
        <div className="generation-content">
          <h2>Creating Your Invitation...</h2>
          <p>Please wait while we generate your beautiful invitation</p>
          
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{width: `${progress}%`}}
              />
            </div>
            <span className="progress-text">{Math.round(progress)}%</span>
          </div>

          <div className="generation-steps">
            <div className={`step ${progress >= 20 ? 'done' : ''}`}>
              <span className="step-check">✓</span>
              <span>Uploading Images</span>
            </div>
            <div className={`step ${progress >= 50 ? 'done' : ''}`}>
              <span className="step-check">✓</span>
              <span>Creating Invitation</span>
            </div>
            <div className={`step ${progress >= 80 ? 'done' : ''}`}>
              <span className="step-check">✓</span>
              <span>Generating Link</span>
            </div>
            <div className={`step ${progress >= 100 ? 'done' : ''}`}>
              <span className="step-check">✓</span>
              <span>Ready to Share</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
