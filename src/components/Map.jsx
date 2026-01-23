export default function Map(){
  const query = encodeURIComponent('The Grand Palace, Mumbai')
  const src = `https://www.google.com/maps?q=${query}&output=embed`

  return (
    <section className="map container" aria-label="Event location">
      <h2>Event Location</h2>
      <div className="map-wrapper">
        <iframe
          title="Event Location"
          src={src}
          width="100%"
          height="360"
          style={{border:0}}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <p className="map-note">Address: The Grand Palace, Mumbai</p>
    </section>
  )
}
