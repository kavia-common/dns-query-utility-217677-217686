import React, { useEffect, useMemo, useState } from "react";
import "./theme.css";
import "./index.css";
import { buildCSource, buildMakefileSnippet } from "./utils/codegen";

// Simple helpers
const defaultState = {
  iface: "eth0",
  dnsServer: "8.8.8.8",
  domain: "example.com",
  recordType: "A",
  timeout: 3,
  retries: 2,
  useRaw: false,
};
const STORAGE_KEY = "dns-query-ui-state-v1";

// PUBLIC_INTERFACE
function Navbar() {
  /** Navbar with Ocean Professional gradient and brand */
  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-inner">
        <div className="brand">
          <div className="brand-icon">DNS</div>
          <div>
            <div className="brand-title">DNS Query Builder</div>
            <div className="brand-sub">Ocean Professional UI</div>
          </div>
        </div>
        <div className="btn-row" aria-label="Actions">
          <a
            className="btn ghost"
            href="https://man7.org/linux/man-pages/man7/resolver.7.html"
            target="_blank"
            rel="noreferrer"
          >
            Docs
          </a>
        </div>
      </div>
    </nav>
  );
}

// PUBLIC_INTERFACE
function Footer() {
  /** Minimal footer */
  return (
    <footer className="footer" role="contentinfo">
      <div>© {new Date().getFullYear()} DNS Query Utility • Built with React</div>
    </footer>
  );
}

// PUBLIC_INTERFACE
function SettingsForm({ value, onChange, errors }) {
  /**
   * Settings form to configure generation options.
   * Props:
   *  - value: object with current state
   *  - onChange: function(partial) to update state
   *  - errors: object of field errors
   */
  const setField = (k, v) => onChange({ [k]: v });

  return (
    <div className="card" aria-labelledby="settings-title">
      <div className="card-header">
        <div className="card-title" id="settings-title">Settings</div>
      </div>
      <div className="card-body">
        <div className="form-row">
          <div className="form-group">
            <label className="label" htmlFor="iface">Network Interface</label>
            <input
              id="iface"
              className={`input ${errors.iface ? "error" : ""}`}
              placeholder="e.g., eth0"
              value={value.iface}
              onChange={(e) => setField("iface", e.target.value)}
            />
            {errors.iface ? (
              <div className="error-text">{errors.iface}</div>
            ) : (
              <div className="hint">Linux interface like eth0, wlan0.</div>
            )}
          </div>

          <div className="form-group">
            <label className="label" htmlFor="dnsServer">DNS Server (IP)</label>
            <input
              id="dnsServer"
              className={`input ${errors.dnsServer ? "error" : ""}`}
              placeholder="8.8.8.8"
              value={value.dnsServer}
              onChange={(e) => setField("dnsServer", e.target.value)}
            />
            {errors.dnsServer ? (
              <div className="error-text">{errors.dnsServer}</div>
            ) : (
              <div className="hint">IPv4 (or IPv6) address of the resolver.</div>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="label" htmlFor="domain">Query Domain</label>
            <input
              id="domain"
              className={`input ${errors.domain ? "error" : ""}`}
              placeholder="example.com"
              value={value.domain}
              onChange={(e) => setField("domain", e.target.value)}
            />
            {errors.domain ? (
              <div className="error-text">{errors.domain}</div>
            ) : (
              <div className="hint">Domain name to query.</div>
            )}
          </div>

          <div className="form-group">
            <label className="label" htmlFor="recordType">Record Type</label>
            <select
              id="recordType"
              className="select"
              value={value.recordType}
              onChange={(e) => setField("recordType", e.target.value)}
            >
              <option value="A">A</option>
              <option value="AAAA">AAAA</option>
              <option value="CNAME">CNAME</option>
              <option value="TXT">TXT</option>
              <option value="MX">MX</option>
            </select>
            <div className="hint">Choose the type of DNS record.</div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="label" htmlFor="timeout">Timeout (seconds)</label>
            <input
              id="timeout"
              type="number"
              min={1}
              max={30}
              className={`input ${errors.timeout ? "error" : ""}`}
              value={value.timeout}
              onChange={(e) =>
                setField("timeout", Number.isNaN(parseInt(e.target.value, 10)) ? "" : parseInt(e.target.value, 10))
              }
            />
            {errors.timeout ? (
              <div className="error-text">{errors.timeout}</div>
            ) : (
              <div className="hint">Receive/send timeout for the socket.</div>
            )}
          </div>

          <div className="form-group">
            <label className="label" htmlFor="retries">Retries</label>
            <input
              id="retries"
              type="number"
              min={0}
              max={10}
              className={`input ${errors.retries ? "error" : ""}`}
              value={value.retries}
              onChange={(e) =>
                setField("retries", Number.isNaN(parseInt(e.target.value, 10)) ? "" : parseInt(e.target.value, 10))
              }
            />
            {errors.retries ? (
              <div className="error-text">{errors.retries}</div>
            ) : (
              <div className="hint">Number of additional attempts if it fails.</div>
            )}
          </div>
        </div>

        <div className="form-group">
          <label className="label">Mode</label>
          <label className="switch">
            <input
              type="checkbox"
              checked={value.useRaw}
              onChange={(e) => setField("useRaw", e.target.checked)}
              aria-checked={value.useRaw}
              aria-label="Use raw sockets"
            />
            <span className="track"><span className="thumb" /></span>
            <span className="hint">Use raw sockets instead of system resolver</span>
          </label>
        </div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function CodePreview({ code, filename, makefileSnippet }) {
  /**
   * Shows a live preview of generated C code with copy and download actions.
   * Props:
   *  - code: string
   *  - filename: suggested file name (e.g., dns_query.c)
   *  - makefileSnippet: string
   */
  const doCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      alert("C code copied to clipboard.");
    } catch (e) {
      alert("Copy failed. Your browser may restrict clipboard access.");
    }
  };

  const downloadFile = () => {
    const blob = new Blob([code], { type: "text/x-csrc;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename || "dns_query.c";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="card" aria-labelledby="preview-title">
      <div className="card-header">
        <div className="card-title" id="preview-title">Generated C Program</div>
        <div className="btn-row">
          <button className="btn ghost" onClick={doCopy} aria-label="Copy code">
            Copy
          </button>
          <button className="btn secondary" onClick={downloadFile} aria-label="Download C file">
            Download .c
          </button>
        </div>
      </div>
      <div className="card-body">
        <div className="code-wrap" role="region" aria-label="C code preview">
          <div className="code-header">
            <span>{filename}</span>
            <span>c • preview</span>
          </div>
          <pre className="code-window">
            <code>{code}</code>
          </pre>
        </div>

        <div style={{ height: 14 }} />

        <div className="card-title" style={{ fontSize: 14 }}>Makefile snippet</div>
        <div className="code-wrap" role="region" aria-label="Makefile snippet">
          <div className="code-header">
            <span>Makefile</span>
            <span>build • instructions</span>
          </div>
          <pre className="code-window">
            <code>{makefileSnippet}</code>
          </pre>
        </div>

        <div style={{ height: 14 }} />

        <div className="card-title" style={{ fontSize: 14 }}>Compile & Run</div>
        <div className="code-wrap" role="region" aria-label="Compile and run instructions">
          <div className="code-header">
            <span>Shell</span>
            <span>how-to</span>
          </div>
          <pre className="code-window">
            <code>{`# Save the generated file (e.g., dns_query.c)
make        # uses Makefile snippet above
./dns_query # run the program
`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  /**
   * Main application: layout with settings panel on left and code preview on right.
   * Persists form state in localStorage and regenerates code live as inputs change.
   */
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? { ...defaultState, ...JSON.parse(raw) } : defaultState;
    } catch {
      return defaultState;
    }
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const update = (partial) => setState((s) => ({ ...s, ...partial }));

  const validate = useMemo(() => {
    const errs = {};
    if (!state.iface || !/^[a-zA-Z0-9_.:-]{1,32}$/.test(state.iface)) {
      errs.iface = "Provide a valid interface (letters/numbers/._:-, up to 32 chars).";
    }
    const ipLike =
      /^(\d{1,3}\.){3}\d{1,3}$/.test(state.dnsServer) ||
      /^(([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4})$/.test(state.dnsServer);
    if (!state.dnsServer || !ipLike) {
      errs.dnsServer = "Enter a valid IPv4 or IPv6 address.";
    }
    if (!state.domain || !/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(state.domain)) {
      errs.domain = "Enter a valid domain name (e.g., example.com).";
    }
    if (state.timeout === "" || isNaN(state.timeout) || state.timeout < 1 || state.timeout > 30) {
      errs.timeout = "Timeout must be between 1 and 30 seconds.";
    }
    if (state.retries === "" || isNaN(state.retries) || state.retries < 0 || state.retries > 10) {
      errs.retries = "Retries must be between 0 and 10.";
    }
    return errs;
  }, [state]);

  useEffect(() => {
    setErrors(validate);
  }, [validate]);

  const code = useMemo(() => buildCSource(state), [state]);
  const filename = "dns_query.c";
  const makefileSnippet = useMemo(() => buildMakefileSnippet(filename), [filename]);

  return (
    <div className="app">
      <Navbar />
      <main className="content">
        <section aria-label="Editor panel">
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card-header">
              <div className="card-title">Generator</div>
              <div className="btn-row">
                <button
                  className="btn ghost"
                  onClick={() => setState(defaultState)}
                  aria-label="Reset form"
                  title="Reset form"
                >
                  Reset
                </button>
              </div>
            </div>
            <div className="card-body">
              <p style={{ marginTop: 0, color: "var(--muted)" }}>
                Configure your DNS query program. The preview updates live. No data leaves your browser.
              </p>
            </div>
          </div>

          <SettingsForm value={state} onChange={update} errors={errors} />
        </section>

        <section aria-label="Code preview panel">
          <CodePreview code={code} filename={filename} makefileSnippet={makefileSnippet} />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
