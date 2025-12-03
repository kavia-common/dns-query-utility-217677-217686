import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import { applyThemeCssVars } from './theme/oceanTheme';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import ConfigForm from './components/ConfigForm';
import CodePreview from './components/CodePreview';
import { generateCSource } from './utils/cCodeGenerator';

// PUBLIC_INTERFACE
function App() {
  /** Root application; manages state and live code generation. */
  const [values, setValues] = useState({
    domain: 'example.com',
    dnsServer: '8.8.8.8',
    iface: '',
    qtype: 'A',
    timeout: 3,
    retries: 2,
  });

  useEffect(() => {
    // Initialize theme variables regardless of .env; runs client-side only.
    applyThemeCssVars();
  }, []);

  const code = useMemo(() => generateCSource({
    domain: values.domain.trim() || 'example.com',
    dnsServer: values.dnsServer.trim() || '8.8.8.8',
    iface: values.iface.trim(),
    qtype: values.qtype,
    timeout: Math.max(1, Number(values.timeout || 1)),
    retries: Math.max(0, Number(values.retries || 0)),
  }), [values]);

  const onReset = () =>
    setValues({ domain: 'example.com', dnsServer: '8.8.8.8', iface: '', qtype: 'A', timeout: 3, retries: 2 });

  return (
    <div style={styles.page}>
      <NavBar />
      <main style={styles.main}>
        <div style={styles.content}>
          <div style={styles.leftCol}>
            <ConfigForm values={values} onChange={setValues} />
            <div style={styles.spacer} />
            <CodePreview code={code} />
          </div>
          <div style={styles.rightCol}>
            <Sidebar values={values} onChange={setValues} onReset={onReset} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  main: {
    width: '100%',
    padding: '16px',
  },
  content: {
    maxWidth: 1200,
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr 320px',
    gap: 16,
  },
  leftCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  rightCol: {
    width: '100%',
  },
  spacer: { height: 4 },
};

export default App;
