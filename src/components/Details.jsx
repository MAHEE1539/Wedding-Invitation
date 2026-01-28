
export default function Details({ ceremony, reception, dressCode, showDefaults = false }){
  // Check which sections have actual data
  const hasCeremony = ceremony?.venue || showDefaults
  const hasReception = reception?.venue || showDefaults
  const hasDressCode = dressCode || showDefaults

  // If no data at all, don't show the section
  if(!hasCeremony && !hasReception && !hasDressCode) {
    return null
  }

  return (
    <section id="details" className="details container">
      <h2>Wedding Details</h2>
      <div className="grid">
        {hasCeremony && (
          <div className="card" data-animate-on-scroll>
            <h3>Ceremony</h3>
            {ceremony?.venue ? (
              <>
                <p>Venue: {ceremony.venue}</p>
                {ceremony.time && <p>Time: {ceremony.time}</p>}
              </>
            ) : showDefaults ? (
              <>
                <p>Venue: The Grand Palace</p>
                <p>Time: 5:00 PM</p>
              </>
            ) : null}
          </div>
        )}
        {hasReception && (
          <div className="card" data-animate-on-scroll>
            <h3>Reception</h3>
            {reception?.venue ? (
              <>
                <p>Venue: {reception.venue}</p>
                {reception.time && <p>Time: {reception.time}</p>}
              </>
            ) : showDefaults ? (
              <>
                <p>Venue: Rose Garden Banquet</p>
                <p>Time: 8:00 PM</p>
              </>
            ) : null}
          </div>
        )}
        {hasDressCode && (
          <div className="card" data-animate-on-scroll>
            <h3>Dress Code</h3>
            <p>{dressCode || (showDefaults ? 'Traditional' : '')}</p>
          </div>
        )}
      </div>
    </section>
  )
}
