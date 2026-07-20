import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CompanyProvider, useCompany } from './context/CompanyContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AppLayout from './components/layout/AppLayout';
import SignInPage from './components/auth/SignInPage';
import HomePage from './pages/HomePage';
import QuickLinksPage from './pages/QuickLinksPage';
import DocumentsPage from './pages/DocumentsPage';
import HRPage from './pages/HRPage';
import ITSupportPage from './pages/ITSupportPage';
import PoliciesPage from './pages/PoliciesPage';
import DirectoryPage from './pages/DirectoryPage';
import HelpPage from './pages/HelpPage';

// Inner app — needs CompanyContext to pass selectedCompany to AuthProvider
function InnerApp() {
  const { selectedCompany } = useCompany();
  return (
    <AuthProvider selectedCompany={selectedCompany}>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <HomePage />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/quick-links"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <QuickLinksPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/documents"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <DocumentsPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/hr"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <HRPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/it-support"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <ITSupportPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/policies"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <PoliciesPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/directory"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <DirectoryPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/help"
            element={
              <ProtectedRoute>
                <AppLayout>
                  <HelpPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID_HERE'}>
      <CompanyProvider>
        <InnerApp />
      </CompanyProvider>
    </GoogleOAuthProvider>
  );
}
