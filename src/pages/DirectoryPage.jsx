import React, { useState, useMemo } from 'react';
import { useCompany } from '../context/CompanyContext';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Avatar from '../components/common/Avatar';

export default function DirectoryPage() {
  const { selectedCompany } = useCompany();
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('All');

  const employees = selectedCompany.directory || [];

  const departments = useMemo(() => {
    const depts = ['All', ...new Set(employees.map((e) => e.department))];
    return depts;
  }, [employees]);

  const filtered = useMemo(() => {
    return employees.filter((emp) => {
      const matchDept = department === 'All' || emp.department === department;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        emp.name.toLowerCase().includes(q) ||
        emp.role.toLowerCase().includes(q) ||
        emp.department.toLowerCase().includes(q) ||
        (emp.email || '').toLowerCase().includes(q);
      return matchDept && matchSearch;
    });
  }, [employees, search, department]);

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.03em', color: '#000', marginBottom: 6 }}>Employee Directory</h1>
        <p style={{ color: '#615d59', fontSize: '0.9375rem' }}>Find colleagues across {selectedCompany.name}.</p>
      </div>

      {/* Search + Filter */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24, alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: '1 1 280px', maxWidth: 400 }}>
          <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: '#a39e98', pointerEvents: 'none' }}>🔍</span>
          <input
            type="text"
            placeholder="Search by name, role, department…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '9px 12px 9px 32px', border: '1px solid #e6e6e6', borderRadius: '8px', fontSize: '0.875rem', background: '#fff', outline: 'none' }}
            onFocus={(e) => e.target.style.borderColor = '#0075de'}
            onBlur={(e) => e.target.style.borderColor = '#e6e6e6'}
          />
        </div>
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          style={{
            padding: '9px 32px 9px 12px',
            border: '1px solid #e6e6e6',
            borderRadius: '8px',
            fontSize: '0.875rem',
            background: '#fff',
            color: '#31302e',
            outline: 'none',
            cursor: 'pointer',
            appearance: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23a39e98' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 10px center',
          }}
        >
          {departments.map((d) => (
            <option key={d} value={d}>{d === 'All' ? 'All Departments' : d}</option>
          ))}
        </select>
        <span style={{ fontSize: '0.8125rem', color: '#a39e98' }}>{filtered.length} employee{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Employee Grid */}
      {filtered.length === 0 ? (
        <p style={{ color: '#a39e98', textAlign: 'center', padding: '40px 0' }}>No employees found.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
          {filtered.map((emp) => (
            <Card key={emp.id} hoverable style={{ padding: '20px', textAlign: 'center' }}>
              <Avatar name={emp.name} picture={emp.avatar} size={56} style={{ margin: '0 auto 12px' }} />
              <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: '#000', marginBottom: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{emp.name}</div>
              <div style={{ fontSize: '0.8125rem', color: '#615d59', marginBottom: 6, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{emp.role}</div>
              <Badge label={emp.department} style={{ marginBottom: 12 }} />
              <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <a href={`mailto:${emp.email}`} style={{ fontSize: '0.75rem', color: '#0075de', textDecoration: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>✉️ {emp.email}</a>
                <span style={{ fontSize: '0.75rem', color: '#a39e98' }}>📞 {emp.phone}</span>
                {emp.location && <span style={{ fontSize: '0.75rem', color: '#a39e98' }}>📍 {emp.location}</span>}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
