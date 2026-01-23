import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { InvitationProvider } from './context/InvitationContext'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <InvitationProvider>
      <App />
    </InvitationProvider>
  </StrictMode>,
)
