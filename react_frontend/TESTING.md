# Testing - React Frontend

This project uses Create React App (CRA) which includes Jest and React Testing Library out of the box. A setupTests.js is already present to configure jest-dom matchers.

## Install
npm install

## Run tests (watch disabled)
npm test -- --watchAll=false

## CI-friendly (non-interactive)
npm run test:ci

- CI=true ensures Jest runs in non-interactive mode.
- --watchAll=false prevents watch behavior in CI environments.

## Test locations
- Unit/Integration: 
  - src/App.test.js (smoke test)
  - src/__tests__/test_app_integration.spec.js (integration tests for UI and preview)
