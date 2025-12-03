import React from 'react';

// PUBLIC_INTERFACE
export default function Footer() {
  /** Footer section with subtle border and theme colors. */
  return (
    <footer style={styles.footer}>
      <span style={styles.text}>© {new Date().getFullYear()} DNS Query Utility</span>
      <span style={styles.note}>Ocean Professional theme</span>
    </footer>
  );
}

const styles = {
  footer: {
    marginTop: 16,
    padding: '14px 20px',
    borderTop: '1px solid var(--ocean-border)',
    background: 'var(--ocean-surface)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 'var(--ocean-radius-md)',
    borderBottomRightRadius: 'var(--ocean-radius-md)',
  },
  text: {
    color: 'var(--ocean-subtle-text)',
    fontSize: 12,
  },
  note: {
    color: 'var(--ocean-secondary)',
    fontWeight: 600,
    fontSize: 12,
  },
};
