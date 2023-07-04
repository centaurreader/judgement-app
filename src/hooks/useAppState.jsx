import React, { createContext, useContext, useState } from 'react';

const AppStateContext = createContext({});

function provideAppState() {
  const [appState, setAppState] = useState({});

  return {
    appState,
    setAppState,
  };
}

export function AppStateProvider({ children }) {
  const value = provideAppState();
  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  return useContext(AppStateContext);
}
