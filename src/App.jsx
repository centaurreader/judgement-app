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
import { GamesProvider } from './hooks/useGames';

function App() {
  const {
    loadChampions,
    loadGods,
    data,
  } = useJudgementApi();

  useEffect(() => {
    if (
      data.gods !== null
      && data.champions !== null
    ) { return; }
    loadChampions();
    loadGods();
  }, [loadGods, loadChampions, data]);

  if (!data.gods) { return null; }

  return (
    <GamesProvider>
      <Routes>
        <Route
          element={(
            <GameProvider>
              <GameRoute />
            </GameProvider>
          )}
          path="/games/:id"
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
    </GamesProvider>
  );
}

export default App;
