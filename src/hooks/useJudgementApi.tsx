import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import championsFixture from './judgement-fixture-champions.json';
import godsFixture from './judgement-fixture-gods.json';
import { Champion, God } from '../types/judgement';

type JudgementApiState = {
  champions: Champion[] | null;
  gods: God[] | null;
};

const JudgementApiContext = createContext({});

const useProvideJudgementApi = () => {
  const [judgementData, setJudgementData] = useState<JudgementApiState>({
    champions: null,
    gods: null,
  });

  const fetchChampions = async () => {
    setJudgementData((state) => ({
      ...state,
      champions: championsFixture,
    }));
  };

  const fetchGods = async () => {
    setJudgementData((state) => ({
      ...state,
      gods: godsFixture,
    }));
  };

  return {
    loadChampions: fetchChampions,
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
