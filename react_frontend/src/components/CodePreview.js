import React from 'react';
import { copyToClipboard, downloadTextFile } from '../utils/cCodeGenerator';

// PUBLIC_INTERFACE
export default function CodePreview({ code }) {
  /** Code preview with copy and download actions. */
  const onCopy = async () => {
    await copyToClipboard(code);
    alert('Code copied to clipboard.');
  };

  const onDownload = () => {
    downloadTextFile('main.c', code);
  };

  return (
    <section style={styles.wrapper} aria-label="Code preview">
      <div style={styles.header}>
        <div>
          <div style={styles.title}>Generated main.c</div>
          <div style={styles.subtitle}>Auto-updates as you edit settings.</div>
        </div>
        <div style={styles.actions}>
          <button style={{ ...styles.btn, background: 'var(--ocean-primary)', color: '#fff' }} onClick={onCopy}>
            Copy
          </button>
          <button style={{ ...styles.btn, background: 'var(--ocean-secondary)', color: '#111827' }} onClick={onDownload}>
            Download .c
          </button>
        </div>
      </div>
      <pre style={styles.pre} tabIndex={0}>
        <code style={styles.code}>{code}</code>
      </pre>
    </section>
  );
}

const styles = {
  wrapper: {
    background: 'var(--ocean-surface)',
    border: '1px solid var(--ocean-border)',
    borderRadius: 'var(--ocean-radius-md)',
    boxShadow: 'var(--ocean-shadow-md)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    padding: '12px 16px',
    borderBottom: '1px solid var(--ocean-border)',
    background: 'linear-gradient(90deg, rgba(37,99,235,0.06), rgba(255,255,255,1))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
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
  actions: {
    display: 'flex',
    gap: 10,
  },
  btn: {
    padding: '8px 12px',
    borderRadius: 'var(--ocean-radius-sm)',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 700,
    boxShadow: 'var(--ocean-shadow-sm)',
  },
  pre: {
    margin: 0,
    padding: 16,
    background: 'var(--ocean-code-bg)',
    color: 'var(--ocean-code-text)',
    maxHeight: 420,
    overflow: 'auto',
    fontSize: 12,
    lineHeight: 1.5,
  },
  code: {
    whiteSpace: 'pre',
  },
};
