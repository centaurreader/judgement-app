import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import championsFixture from './judgement-fixture-champions.json';
import commonInnateAbilities from './judgement-fixture-common-innate-abilities.json';
import godsFixture from './judgement-fixture-gods.json';
import { Ability, Champion, God } from '../types/judgement';

type JudgementApiState = {
  champions: Champion[] | null;
  commonInnateAbilities: Ability[] | null;
  gods: God[] | null;
};

const JudgementApiContext = createContext({});

const useProvideJudgementApi = () => {
  const [judgementData, setJudgementData] = useState<JudgementApiState>({
    champions: null,
    commonInnateAbilities: null,
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
      gods: godsFixture.map((god) => ({
        ...god,
        avatar: {
          ...god.avatar,
          id: championsFixture
            .find((c) => c.name.toUpperCase() === god.avatar.name.toUpperCase())?.id,
        },
        champions: god.champions
          .map((godChamp) => {
            const champion = championsFixture
              .find((champ) => godChamp.name.toUpperCase() === champ.name.toUpperCase());
            return {
              name: godChamp.name,
              url_name: godChamp.url_name,
              id: champion?.id,
            };
          }),
      })),
    }));
  };

  const fetchCommonInnateAbilities = async () => {
    setJudgementData((state) => ({
      ...state,
      commonInnateAbilities,
    }));
  };

  return {
    loadChampions: fetchChampions,
    loadGods: fetchGods,
    loadCommonInnateAbilities: fetchCommonInnateAbilities,
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
