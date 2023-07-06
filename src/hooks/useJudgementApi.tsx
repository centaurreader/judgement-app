import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import heroesFixture from './judgement-fixture-heroes.json';
import godsFixture from './judgement-fixture-gods.json';
import { Champion, God } from '../types/judgement';

type JudgementApiState = {
  heroes: Champion[] | null;
  gods: God[] | null;
};

const JudgementApiContext = createContext({});

const useProvideJudgementApi = () => {
  const [judgementData, setJudgementData] = useState<JudgementApiState>({
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
};

export function JudgementApiProvider({ children }: React.PropsWithChildren) {
  const value = useProvideJudgementApi();
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
