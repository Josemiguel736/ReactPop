import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import storage from './utils/storage.ts'
import { setAuthorizationHeader } from './api/client.ts'
import { AuthProvider } from './pages/auth/AuthProvider.tsx'
import Layout from './components/layout/Layout.tsx'

const accessToken = storage.get("auth");
if (accessToken) {
  setAuthorizationHeader(accessToken);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider defaultIsLogged={!!accessToken}>
      <Layout>
    <App />
    </Layout>
    </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
