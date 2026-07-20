import React, { createContext, useContext, useState, useEffect } from 'react';
import { companies } from '../data';

const CompanyContext = createContext(null);

const STORAGE_KEY = 'iconnect_company';

export function CompanyProvider({ children }) {
  const [selectedCompany, setSelectedCompanyState] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const found = companies.find((c) => c.id === stored);
        if (found) return found;
      }
    } catch (e) {
      // ignore
    }
    return companies[0];
  });

  const setSelectedCompany = (companyOrId) => {
    if (typeof companyOrId === 'string') {
      const found = companies.find((c) => c.id === companyOrId);
      if (found) {
        setSelectedCompanyState(found);
        localStorage.setItem(STORAGE_KEY, found.id);
      }
    } else {
      setSelectedCompanyState(companyOrId);
      localStorage.setItem(STORAGE_KEY, companyOrId.id);
    }
  };

  return (
    <CompanyContext.Provider value={{ selectedCompany, setSelectedCompany, companies }}>
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  const ctx = useContext(CompanyContext);
  if (!ctx) throw new Error('useCompany must be used within CompanyProvider');
  return ctx;
}

export default CompanyContext;
