export default function Story({ storyCards, showDefaults = false }){
  const defaultMoments = [
    {
      icon: '☕',
      title: 'We Met',
      date: 'March 2019',
      description: 'On a rainy Tuesday at our favorite coffee shop, two strangers became one. Over shared lattes and awkward jokes, we found comfort in each other\'s smile.'
    },
    {
      icon: '🎁',
      title: 'First Gift',
      date: 'May 2019',
      description: 'A handwritten journal filled with memories and dreams. Every page became a promise of forever, carefully written with love and hope.'
    },
    {
      icon: '💍',
      title: 'The Proposal',
      date: 'December 2024',
      description: 'Under the stars by the beach, with trembling hands and an overflowing heart, came the question that changed everything. A resounding "Yes!" echoed through the night.'
    },
    {
      icon: '💑',
      title: 'Growing Together',
      date: 'Every Day',
      description: 'From late-night conversations to shared adventures, we\'ve built a love story worth celebrating. Now it\'s time to say "I do" surrounded by those we cherish.'
    }
  ]

  const hasStory = storyCards && storyCards.length > 0 && storyCards.some(card => card.title)
  
  if(!hasStory && !showDefaults) {
    return null
  }

  const moments = hasStory
    ? storyCards.filter(card => card.title)
    : (showDefaults ? defaultMoments : [])

  return (
    <section id="story" className="story container">
      <h2>Our Story</h2>
      <p className="story-intro">A journey of love, laughter, and unforgettable moments...</p>
      <div className="story-timeline">
        {moments.map((moment, idx) => (
          <div key={idx} className="story-card" data-animate-on-scroll>
            <div className="story-card-icon">{moment.icon}</div>
            <div className="story-card-content">
              <h3>{moment.title}</h3>
              <p className="story-card-date">{moment.date}</p>
              <p className="story-card-desc">{moment.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
