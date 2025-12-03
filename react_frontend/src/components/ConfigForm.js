import React from 'react';

const qtypes = ['A', 'AAAA', 'CNAME', 'TXT', 'MX', 'NS', 'SRV'];

// PUBLIC_INTERFACE
export default function ConfigForm({ values, onChange }) {
  /** Form for domain, DNS server, and query type with validation hints. */
  const handle = (key) => (e) => onChange({ ...values, [key]: e.target.value });

  return (
    <section style={styles.card} aria-label="Configuration form">
      <div style={styles.header}>
        <div>
          <div style={styles.title}>Query Configuration</div>
          <div style={styles.subtitle}>Set the target domain, DNS server, and record type.</div>
        </div>
      </div>

      <div style={styles.grid}>
        <label style={styles.label}>
          Target Domain
          <input
            style={styles.input}
            placeholder="example.com"
            value={values.domain}
            onChange={handle('domain')}
            aria-label="Target domain"
            title="Domain or hostname to query (e.g., example.com)"
            required
          />
        </label>

        <label style={styles.label}>
          DNS Server (IPv4)
          <input
            style={styles.input}
            placeholder="8.8.8.8"
            value={values.dnsServer}
            onChange={handle('dnsServer')}
            aria-label="DNS server IPv4 address"
            title="IPv4 address of DNS server (e.g., 1.1.1.1)"
            pattern="^((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$"
          />
        </label>

        <label style={styles.label}>
          Query Type
          <select
            style={styles.input}
            value={values.qtype}
            onChange={handle('qtype')}
            aria-label="DNS record type"
            title="DNS record type to query"
          >
            {qtypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>
      </div>

      <div style={styles.hint}>
        Tip: SO_BINDTODEVICE is Linux-specific and may require sudo privileges.
      </div>
    </section>
  );
}

const styles = {
  card: {
    background: 'var(--ocean-surface)',
    border: '1px solid var(--ocean-border)',
    borderRadius: 'var(--ocean-radius-md)',
    boxShadow: 'var(--ocean-shadow-md)',
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 700,
    color: 'var(--ocean-text)',
    fontSize: 16,
  },
  subtitle: {
    color: 'var(--ocean-subtle-text)',
    fontSize: 12,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: 12,
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    color: 'var(--ocean-subtle-text)',
    fontSize: 12,
  },
  input: {
    padding: '10px 12px',
    border: '1px solid var(--ocean-border)',
    borderRadius: 'var(--ocean-radius-sm)',
    outline: 'none',
    fontSize: 14,
    color: 'var(--ocean-text)',
    background: '#fff',
  },
  hint: {
    fontSize: 12,
    color: 'var(--ocean-secondary)',
    fontWeight: 600,
  },
};
