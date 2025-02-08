import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import storage from './utils/storage.ts'
import { removeAuthorizationHeader, setAuthorizationHeader } from './api/client.ts'
import { AuthProvider } from './pages/auth/AuthProvider.tsx'
import Layout from './components/layout/Layout.tsx'
import ErrorBoundary from './components/errors/ErrorBoundary.tsx'
import { authTokenValid } from './pages/auth/service.ts'

const checkAccessToken = async () => {
  const token = storage.get("auth");
  if (token) {
    try {
      setAuthorizationHeader(token);
      await authTokenValid()
      return true
     
   } catch (error) {
     removeAuthorizationHeader()
     return false
   }
  }return false
}

const accessToken = await checkAccessToken()


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
    <BrowserRouter>
    <AuthProvider defaultIsLogged={accessToken}>
      <Layout>
    <App />
    </Layout>
    </AuthProvider>
    </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
)
