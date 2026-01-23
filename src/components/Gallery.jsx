
const defaultImages = [
  '/assets/gallery-1.jpg','/assets/gallery-2.jpg','/assets/gallery-3.jpg',
  '/assets/gallery-4.jpg','/assets/gallery-5.jpg','/assets/gallery-6.jpg'
]

export default function Gallery({ images }){
  const displayImages = (images && images.length > 0) 
    ? images.map(img => typeof img === 'string' ? img : img.preview)
    : defaultImages

  return (
    <section id="gallery" className="gallery container">
      <h2>Gallery</h2>
      <div className="gallery-grid">
        {displayImages.map((src,i)=> (
          <div key={i} className="gallery-item" data-animate-on-scroll>
            <img src={src} alt={`Gallery ${i+1}`} />
          </div>
        ))}
      </div>
    </section>
  )
}
