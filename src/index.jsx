import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { JudgementApiProvider } from './hooks/useJudgementApi';
import { AppStateProvider } from './hooks/useAppState';

const root = createRoot(document.getElementById('app'));

root.render(
  <AppStateProvider>
    <JudgementApiProvider>
      <App />
    </JudgementApiProvider>
  </AppStateProvider>,
);
