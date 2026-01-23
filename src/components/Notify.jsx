// Minimal reminder — single button that opens Google Calendar with the event prefilled
export default function Notify({ brideName = 'Bride', groomName = 'Groom', date = '2025-12-20T17:00:00', venue = 'Wedding Venue' }){
  const eventDate = new Date(date)
  const eventTitle = `${brideName} & ${groomName} — Wedding Ceremony`
  const eventLocation = venue

  function gcalDate(d){
    return d.toISOString().replace(/[-:]|\.\d{3}/g,'')
  }

  function createICSWithAlarm(){
    const start = gcalDate(eventDate)
    const end = gcalDate(new Date(eventDate.getTime() + 3*60*60*1000))
    const uid = `${Date.now()}@wedding-invite`
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Wedding Invite//EN',
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${start}`,
      `DTSTART:${start}`,
      `DTEND:${end}`,
      `SUMMARY:${eventTitle}`,
      `LOCATION:${eventLocation}`,
      'BEGIN:VALARM',
      'TRIGGER:-P1D',
      'ACTION:DISPLAY',
      'DESCRIPTION:Reminder: wedding event is tomorrow',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n')

    const blob = new Blob([ics], { type: 'text/calendar' })
    return URL.createObjectURL(blob)
  }

  function handleClick(){
    // open Google Calendar create event with prefilled info
    const start = gcalDate(eventDate)
    const end = gcalDate(new Date(eventDate.getTime() + 3*60*60*1000))
    const details = `Ananya & Raj's wedding at ${eventLocation}.`
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: eventTitle,
      dates: `${start}/${end}`,
      details,
      location: eventLocation,
      ctz: 'Asia/Kolkata'
    })
    const gcalUrl = `https://www.google.com/calendar/render?${params.toString()}`
    window.open(gcalUrl, '_blank')

    // create and download an .ics that contains a VALARM (1 day before)
    try{
      const icsUrl = createICSWithAlarm()
      const a = document.createElement('a')
      a.href = icsUrl
      a.download = `${brideName.toLowerCase()}-${groomName.toLowerCase()}-wedding.ics`
      document.body.appendChild(a)
      a.click()
      a.remove()
      setTimeout(()=> URL.revokeObjectURL(icsUrl), 5000)
    }catch(e){
      // fail silently — user can still add via Google Calendar
      console.warn('ics download failed', e)
    }
  }

  return (
    <section className="notify container" aria-label="Add event to calendar">
      <button className="btn-primary" onClick={handleClick}>Add to Google Calendar</button>
    </section>
  )
}
