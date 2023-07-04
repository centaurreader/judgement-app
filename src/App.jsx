import React, { useEffect } from 'react';
import {
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import HomeRoute from './routes/Home';
import { useJudgementApi } from './hooks/useJudgementApi';
import NewGameRoute from './routes/NewGame';
import Modal from './components/Modal';
import GodCard from './components/GodCard';

function App() {
  const {
    loadHeroes,
    loadGods,
    data,
  } = useJudgementApi();

  useEffect(() => {
    loadHeroes();
    loadGods();
  }, []);

  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const modals = (query.get('modals')?.split('|')
    .map((val) => val.split(','))) ?? [];

  if (!data.gods) { return null; }

  return (
    <>
      <Routes>
        <Route
          element={<NewGameRoute />}
          path="/new-game"
        />
        <Route
          element={<HomeRoute />}
          index
        />
      </Routes>

      {modals.length ? (
        modals.map((modal) => {
          const god = data.gods.find((g) => g.id === modal[1]);
          return (
            <Modal key={modal[1]}>
              <GodCard
                avatarName={god.avatar.name}
                champions={god.champions}
                effigyPower={{
                  avatarBonus: god.divineGifts.effigy_power.avatar_bonus,
                  description: god.divineGifts.effigy_power.description,
                  name: god.divineGifts.effigy_power.name,
                }}
                name={god.name}
                logo={`${god.logo}`}
                sacredArtefact={god.divineGifts.sacred_artefact}
                traits={god.traits}
                warbandBonus={god.divineGifts.warband_bonus}
              />
            </Modal>
          );
        })
      ) : null}
    </>
  );
}

export default App;
