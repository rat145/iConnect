import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

export default function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f6f5f4' }}>
      <Header onMenuOpen={() => setSidebarOpen(true)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main style={{ flex: 1, background: '#f6f5f4' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px' }}>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
