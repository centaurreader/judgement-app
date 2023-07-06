import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const AppStateContext = createContext({});

const useProvideAppState = () => {
  const [appState, setAppState] = useState({});

  return {
    appState,
    setAppState,
  };
};

export function AppStateProvider({ children }) {
  const value = useProvideAppState();
  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

AppStateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAppState() {
  return useContext(AppStateContext);
}
