import React from 'react';

// PUBLIC_INTERFACE
export default function NavBar() {
  /** Top navigation bar for the app following Ocean Professional style. */
  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>
        <div style={styles.logo}>🌊</div>
        <div>
          <div style={styles.title}>DNS Query C Generator</div>
          <div style={styles.subtitle}>Generate a DNS client bound to your network interface</div>
        </div>
      </div>
      <div style={styles.actions}>
        <a
          href="https://reactjs.org"
          target="_blank"
          rel="noreferrer"
          style={styles.link}
          aria-label="Learn React"
          title="React documentation"
        >
          Docs
        </a>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    width: '100%',
    background: 'linear-gradient(90deg, rgba(37,99,235,0.08), rgba(249,250,251,1))',
    borderBottom: '1px solid var(--ocean-border)',
    position: 'sticky',
    top: 0,
    zIndex: 10,
    padding: '12px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backdropFilter: 'saturate(140%) blur(6px)',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, var(--ocean-primary), #60A5FA)',
    display: 'grid',
    placeItems: 'center',
    color: 'white',
    boxShadow: 'var(--ocean-shadow-md)',
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
    color: 'var(--ocean-text)',
  },
  subtitle: {
    fontSize: 12,
    color: 'var(--ocean-subtle-text)',
  },
  actions: {
    display: 'flex',
    gap: 12,
  },
  link: {
    color: 'var(--ocean-primary)',
    textDecoration: 'none',
    fontWeight: 600,
  },
};
