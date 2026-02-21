import { addDoc, collection } from 'firebase/firestore'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InvitationContext } from '../context/InvitationContext'
import { db, storage } from '../utils/firebase'
import './pages.css'

export default function GenerationProgress() {
  const navigate = useNavigate()
  const { formData: contextFormData } = useContext(InvitationContext)
  const [progress, setProgress] = useState(0)
  const [formData, setFormData] = useState(null)
  const [uploading, setUploading] = useState(false)

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (contextFormData) {
      setFormData(contextFormData)
    } else {
      // Fallback to sessionStorage for legacy support
      const stored = sessionStorage.getItem('invitationDataForGeneration')
      if (stored) {
        setFormData(JSON.parse(stored))
      }
    }
  }, [contextFormData])

  useEffect(() => {
    // Simulate generation progress - slower to match actual Firebase operations
    let currentProgress = 0

    const interval = setInterval(() => {
      setProgress(prev => {
        // Slower progress increase that syncs better with actual uploads
        currentProgress = prev + Math.random() * 8

        // Cap at 95% until actual completion
        if (currentProgress >= 95) {
          clearInterval(interval)
          return 95
        }
        return currentProgress
      })
    }, 400)

    return () => clearInterval(interval)
  }, [formData, navigate])

  // Trigger Firebase upload when progress reaches 95%
  useEffect(() => {
    if (progress >= 95 && !uploading && formData) {
      setUploading(true)
      saveToFirebase(formData)
    }
  }, [progress, uploading, formData])

  const saveToFirebase = async (data) => {
    const timestamp = Date.now()

    console.log('🚀 Starting Firebase upload...')

    try {
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
      setProgress(100) // 10% progress for couple photo

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
      setProgress(100) // 20% progress for hero image

      // Upload gallery images
      const galleryURLs = []
      const progressPerImage = Math.floor(20 / Math.max(data.galleryImages.length, 1))
      for (let i = 0; i < data.galleryImages.length; i++) {
        const galleryImageRef = ref(storage, `invitations/${timestamp}/gallery-${i}.jpg`)
        console.log(`📤 Uploading gallery image ${i + 1}...`)
        await uploadString(galleryImageRef, data.galleryImages[i].preview, 'data_url')
        const galleryImageURL = await getDownloadURL(galleryImageRef)
        galleryURLs.push(galleryImageURL)
        console.log(`✅ Gallery image ${i + 1} URL:`, galleryImageURL)
        setProgress(prev => Math.min(100, prev + progressPerImage)) // Increment for each gallery image
      }

      // Save to Firestore
      console.log('💾 Saving to Firestore...')
      const invitationData = {
        brideName: data.brideName,
        groomName: data.groomName,
        headline: data.headline,
        date: data.date,
        time: data.time || '',
        venue: data.venue,
        location: data.location || '',
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
      setProgress(100) // Final 100% when complete

      console.log('✅ ALL FIREBASE OPERATIONS SUCCESSFUL!')
      setTimeout(() => {
        navigate(`/share/${invitationId}`)
      }, 300) // Brief delay to show 100% completion
    } catch (error) {
      console.error('❌ Firebase upload error:', error)
      setUploading(false)
      // Progress bar stays where it is on error; user can retry
    }
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
                style={{ width: `${progress}%` }}
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
