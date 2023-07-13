import React, { useEffect } from 'react';
import {
  Route,
  Routes,
} from 'react-router-dom';
import HomeRoute from './routes/Home';
import { useJudgementApi } from './hooks/useJudgementApi';
import NewGameRoute from './routes/NewGame';
import GameRoute from './routes/Game';
import { GameProvider } from './hooks/useGame';

function App() {
  const {
    loadChampions,
    loadCommonInnateAbilities,
    loadGods,
    data,
  } = useJudgementApi();

  useEffect(() => {
    if (
      data.gods !== null
      && data.champions !== null
      && data.commonInnateAbilities !== null
    ) { return; }
    loadChampions();
    loadGods();
    loadCommonInnateAbilities();
  }, [loadGods, loadChampions, data, loadCommonInnateAbilities]);

  if (!data.gods) { return null; }

  return (
    <Routes>
      <Route
        element={(
          <GameProvider>
            <GameRoute />
          </GameProvider>
        )}
        path="/games"
      />
      <Route
        element={<NewGameRoute />}
        path="/new-game"
      />
      <Route
        element={<HomeRoute />}
        index
      />
    </Routes>
  );
}

export default App;
