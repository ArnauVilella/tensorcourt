import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css"
import { installMockApi } from './mockApi'
import App from './App.tsx'

// Install client-side mock API (replaces Express server for static hosting)
installMockApi();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
