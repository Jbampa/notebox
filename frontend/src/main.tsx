import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Providers } from './providers/Providers.tsx'
import { AuthContextProvider } from './contexts/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </Providers>
  </StrictMode>,
)
