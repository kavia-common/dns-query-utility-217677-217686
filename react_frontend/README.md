# DNS Query C Generator (Ocean Professional)

This app helps you configure and preview a C program that performs DNS queries via a specific network interface.

## Run locally
- npm start
- App opens at http://localhost:3000
- No backend needed. Env vars are optional and not required to boot.

## Features
- Live C source preview (main.c)
- Configure: domain, DNS server, query type, interface, timeout, retries
- Download .c file and copy-to-clipboard
- Responsive layout with NavBar, ConfigForm, Sidebar, CodePreview, Footer

## Build
- npm run build

Note: SO_BINDTODEVICE is Linux-specific and may require sudo when running the generated program.
