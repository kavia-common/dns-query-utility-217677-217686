export const oceanTheme = {
  name: 'Ocean Professional',
  colors: {
    primary: '#2563EB',
    secondary: '#F59E0B',
    success: '#10B981',
    error: '#EF4444',
    background: '#f9fafb',
    surface: '#ffffff',
    text: '#111827',
    subtleText: '#6B7280',
    border: '#E5E7EB',
    codeBg: '#0B1220',
    codeText: '#E5E7EB',
  },
  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
  },
  shadow: {
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 4px 12px rgba(0,0,0,0.08)',
    lg: '0 10px 24px rgba(0,0,0,0.12)',
  },
};

// PUBLIC_INTERFACE
export function applyThemeCssVars() {
  /** Apply theme values to CSS variables on :root for easy styling across app. */
  const r = document.documentElement;
  const c = oceanTheme.colors;
  r.style.setProperty('--ocean-primary', c.primary);
  r.style.setProperty('--ocean-secondary', c.secondary);
  r.style.setProperty('--ocean-success', c.success);
  r.style.setProperty('--ocean-error', c.error);
  r.style.setProperty('--ocean-bg', c.background);
  r.style.setProperty('--ocean-surface', c.surface);
  r.style.setProperty('--ocean-text', c.text);
  r.style.setProperty('--ocean-subtle-text', c.subtleText);
  r.style.setProperty('--ocean-border', c.border);
  r.style.setProperty('--ocean-code-bg', c.codeBg);
  r.style.setProperty('--ocean-code-text', c.codeText);
  r.style.setProperty('--ocean-radius-sm', oceanTheme.radius.sm);
  r.style.setProperty('--ocean-radius-md', oceanTheme.radius.md);
  r.style.setProperty('--ocean-radius-lg', oceanTheme.radius.lg);
  r.style.setProperty('--ocean-shadow-sm', oceanTheme.shadow.sm);
  r.style.setProperty('--ocean-shadow-md', oceanTheme.shadow.md);
  r.style.setProperty('--ocean-shadow-lg', oceanTheme.shadow.lg);
}
