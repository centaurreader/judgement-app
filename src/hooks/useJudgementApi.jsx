import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import heroesFixture from './judgement-fixture-heroes.json';
import godsFixture from './judgement-fixture-gods.json';

const JudgementApiContext = createContext({});

function provideJudgementApi() {
  const [judgementData, setJudgementData] = useState({
    heroes: null,
    gods: null,
  });

  const fetchHeroes = async () => {
    setJudgementData((state) => ({
      ...state,
      heroes: heroesFixture,
    }));
  };

  const fetchGods = async () => {
    setJudgementData((state) => ({
      ...state,
      gods: godsFixture,
    }));
  };

  return {
    loadHeroes: fetchHeroes,
    loadGods: fetchGods,
    hasLoaded: judgementData !== null,
    data: judgementData,
  };
}

export function JudgementApiProvider({ children }) {
  const value = provideJudgementApi();
  return (
    <JudgementApiContext.Provider value={value}>
      {children}
    </JudgementApiContext.Provider>
  );
}

JudgementApiProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useJudgementApi() {
  return useContext(JudgementApiContext);
}
