import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './App';
import { JudgementApiProvider } from './hooks/useJudgementApi';
import { AppStateProvider } from './hooks/useAppState';

const root = createRoot(document.getElementById('app') as Element);

root.render(
  <BrowserRouter>
    <AppStateProvider>
      <JudgementApiProvider>
        <App />
      </JudgementApiProvider>
    </AppStateProvider>
  </BrowserRouter>,
);
