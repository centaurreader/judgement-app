import React, { createContext, useContext, useState } from 'react';
import judgementFixture from './judgement-fixture.json';

const JudgementApiContext = createContext({});

function provideJudgementApi() {
  const [judgementData, setJudgementData] = useState(null);

  const fetchJudgementData = async () => {
    setJudgementData(judgementFixture);
  };
  return {
    load: fetchJudgementData,
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

export function useJudgementApi() {
  return useContext(JudgementApiContext);
}
