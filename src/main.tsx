/**
 * @license LLM Thinking Animation
 * Copyright (C) 2025 Mingxuan Wang
 *
 * This program is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, either version 3 of
 * the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

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
