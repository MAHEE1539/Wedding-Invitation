import { useEffect } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Decorative from './components/Decorative'
import GenerateInvitation from './pages/GenerateInvitation'
import GenerationProgress from './pages/GenerationProgress'
import Home from './pages/Home'
import ReviewInvitation from './pages/ReviewInvitation'
import SharePage from './pages/SharePage'
import TemplatePreview from './pages/TemplatePreview'
import ViewInvitation from './pages/ViewInvitation'

export default function App(){
  useEffect(()=>{
    const nodes = Array.from(document.querySelectorAll('[data-animate-on-scroll]'))
    if(!nodes.length) return
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('in-view')
        } else {
          entry.target.classList.remove('in-view')
        }
      })
    }, { threshold: 0.35 })
    nodes.forEach(n=>obs.observe(n))
    return ()=> obs.disconnect()
  }, [])

  return (
    <Router>
      <div className="site-root">
        <Decorative />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/template" element={<TemplatePreview />} />
          <Route path="/generate" element={<GenerateInvitation />} />
          <Route path="/review" element={<ReviewInvitation />} />
          <Route path="/progress" element={<GenerationProgress />} />
          <Route path="/share/:coupleId" element={<SharePage />} />
          <Route path="/invitation/:id" element={<ViewInvitation />} />
        </Routes>
      </div>
    </Router>
  )

}
