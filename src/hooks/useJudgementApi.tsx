import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Champion, CommonInnateAbility, God } from '../types/judgement.generated';
import data from '../data/output.json';

type JudgementApiStore = {
  data: {
    gods: God[] | null;
    champions: Champion[] | null;
  };
  loadChampions: () => Promise<void>;
  loadGods: () => Promise<void>;
};

type JudgementApiState = {
  champions: Champion[] | null;
  commonInnateAbilities: CommonInnateAbility[] | null;
  gods: God[] | null;
};

const JudgementApiContext = createContext({} as JudgementApiStore);

const useProvideJudgementApi = () => {
  const [judgementData, setJudgementData] = useState<JudgementApiState>({
    champions: null,
    commonInnateAbilities: null,
    gods: null,
  });

  const fetchChampions = async () => {
    setJudgementData((state) => ({
      ...state,
      champions: data.champions,
    }));
  };

  const fetchGods = async () => {
    setJudgementData((state) => ({
      ...state,
      gods: data.gods,
    }));
  };

  return {
    loadChampions: fetchChampions,
    loadGods: fetchGods,
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
