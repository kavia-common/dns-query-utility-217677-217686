import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

// Basic smoke tests focused on visible UI and user interactions.
// These tests run in jsdom via CRA + RTL (setupTests.js already imports jest-dom).

describe('App integration', () => {
  test('shows navbar brand and docs button', () => {
    render(<App />);
    expect(screen.getByText(/DNS Query Builder/i)).toBeInTheDocument();
    const docs = screen.getByRole('link', { name: /Docs/i });
    expect(docs).toBeInTheDocument();
    expect(docs).toHaveAttribute('href', expect.stringContaining('man7.org'));
  });

  test('renders settings form fields with initial values and validates input', () => {
    render(<App />);

    // Interface
    const iface = screen.getByLabelText(/Network Interface/i);
    expect(iface).toBeInTheDocument();
    expect(iface).toHaveValue('eth0');

    // DNS Server
    const dns = screen.getByLabelText(/DNS Server/i);
    expect(dns).toHaveValue('8.8.8.8');

    // Domain
    const domain = screen.getByLabelText(/Query Domain/i);
    expect(domain).toHaveValue('example.com');

    // Change domain to an invalid one and expect validation error
    fireEvent.change(domain, { target: { value: 'invalid_domain' } });
    // blur is not strictly required because validation runs via effect based on state
    const error = screen.findByText(/Enter a valid domain name/i);
    return expect(error).resolves.toBeInTheDocument();
  });

  test('record type selector changes and code preview updates', () => {
    render(<App />);

    const selector = screen.getByLabelText(/Record Type/i);
    expect(selector).toBeInTheDocument();

    // Before change, the code block should show Record Type: A
    const codeBefore = screen.getByRole('region', { name: /C code preview/i });
    expect(codeBefore).toHaveTextContent(/Record Type: A/);

    // Change to AAAA and verify preview reflects the new type
    fireEvent.change(selector, { target: { value: 'AAAA' } });
    const codeAfter = screen.getByRole('region', { name: /C code preview/i });
    expect(codeAfter).toHaveTextContent(/Record Type: AAAA/);
  });

  test('Makefile snippet is shown in the preview', () => {
    render(<App />);
    const makefileRegion = screen.getByRole('region', { name: /Makefile snippet/i });
    expect(makefileRegion).toBeInTheDocument();
    expect(makefileRegion).toHaveTextContent(/CC=gcc/);
    expect(makefileRegion).toHaveTextContent(/CFLAGS=-O2 -Wall/);
  });
});
