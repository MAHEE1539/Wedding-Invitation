import { useState } from 'react'

export default function RSVP(){
  const [name,setName] = useState('')
  const [attending,setAttending] = useState('yes')
  const [submitted,setSubmitted] = useState(false)

  function handleSubmit(e){
    e.preventDefault()
    // Replace with real API or backend hook. For now we just show a confirmation.
    setSubmitted(true)
  }

  return (
    <section id="rsvp" className="rsvp container">
      <h2>RSVP</h2>
      {!submitted ? (
      <form onSubmit={handleSubmit} className="rsvp-form">
        <label>
          Your Name
          <input value={name} onChange={e=>setName(e.target.value)} required />
        </label>
        <label>
          Will you attend?
          <select value={attending} onChange={e=>setAttending(e.target.value)}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>
        <button className="btn-primary">Send RSVP</button>
      </form>
      ) : (
        <div className="rsvp-thanks">Thanks {name || 'friend'} — your RSVP has been recorded.</div>
      )}
    </section>
  )
}
