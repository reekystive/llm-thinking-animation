import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { scan } from 'react-scan';
import { App } from './app.tsx';
import './global.css';
import { AppAnimationControlProvider } from './providers/animation-control.tsx';
import { initTheme } from './utils/theme.ts';

if (import.meta.env.DEV) {
  scan({ enabled: true });
}

initTheme();

const root = document.getElementById('root');
if (!root) throw new Error('No root element');

createRoot(root).render(
  <StrictMode>
    <AppAnimationControlProvider>
      <App />
    </AppAnimationControlProvider>
  </StrictMode>
);
