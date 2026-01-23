import { createContext, useState } from 'react'

export const InvitationContext = createContext()

export function InvitationProvider({ children }){
  const [formData, setFormData] = useState(null)

  return (
    <InvitationContext.Provider value={{ formData, setFormData }}>
      {children}
    </InvitationContext.Provider>
  )
}
