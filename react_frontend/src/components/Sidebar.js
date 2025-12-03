import React from 'react';

// PUBLIC_INTERFACE
export default function Sidebar({ values, onChange, onReset }) {
  /** Sidebar settings for interface and advanced options */
  const handle = (key) => (e) => onChange({ ...values, [key]: e.target.value });

  return (
    <aside style={styles.wrapper} aria-label="Settings panel">
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Interface</div>
        <label style={styles.label}>
          Network Interface
          <input
            style={styles.input}
            placeholder="e.g., eth0 or wlan0"
            value={values.iface}
            onChange={handle('iface')}
            aria-label="Network interface name"
            title="Linux: eth0, wlan0, etc. Used with SO_BINDTODEVICE; may require root."
          />
        </label>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}>Advanced</div>
        <div style={styles.row}>
          <label style={styles.labelFlex}>
            Timeout (s)
            <input
              type="number"
              min="1"
              max="60"
              style={styles.input}
              value={values.timeout}
              onChange={handle('timeout')}
              aria-label="Timeout seconds"
              title="Receive/send timeout in seconds"
            />
          </label>
          <label style={styles.labelFlex}>
            Retries
            <input
              type="number"
              min="0"
              max="10"
              style={styles.input}
              value={values.retries}
              onChange={handle('retries')}
              aria-label="Retry count"
              title="Number of retry attempts after timeout"
            />
          </label>
        </div>
        <button style={styles.resetBtn} onClick={onReset} aria-label="Reset form">
          Reset form
        </button>
      </div>
    </aside>
  );
}

const styles = {
  wrapper: {
    width: '100%',
    maxWidth: 320,
    background: 'var(--ocean-surface)',
    border: '1px solid var(--ocean-border)',
    borderRadius: 'var(--ocean-radius-md)',
    boxShadow: 'var(--ocean-shadow-md)',
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    height: 'fit-content',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  sectionTitle: {
    fontWeight: 700,
    color: 'var(--ocean-text)',
    fontSize: 14,
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    color: 'var(--ocean-subtle-text)',
    fontSize: 12,
  },
  labelFlex: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    color: 'var(--ocean-subtle-text)',
    fontSize: 12,
    flex: 1,
  },
  input: {
    padding: '10px 12px',
    border: '1px solid var(--ocean-border)',
    borderRadius: 'var(--ocean-radius-sm)',
    outline: 'none',
    fontSize: 14,
    color: 'var(--ocean-text)',
    background: 'white',
  },
  row: {
    display: 'flex',
    gap: 10,
  },
  resetBtn: {
    border: '1px solid var(--ocean-border)',
    background: '#fff',
    color: 'var(--ocean-text)',
    borderRadius: 'var(--ocean-radius-sm)',
    padding: '10px 12px',
    fontWeight: 600,
    cursor: 'pointer',
  },
};
