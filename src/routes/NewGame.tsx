import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import { useJudgementApi } from '../hooks/useJudgementApi';
import style from './NewGame.css';
import Layout from '../components/Layout';
import GodCard from '../components/GodCard';
import Modal from '../components/Modal';
import ChampionCard from '../components/ChampionCard';
import PlayerSetup from '../components/PlayerSetup';
import { Game, PlayerConfig } from '../types/app';
import { useGames } from '../hooks/useGames';

function NewGameRoute() {
  const {
    loadChampions,
    loadGods,
    loadCommonInnateAbilities,
    data,
  } = useJudgementApi();
  useEffect(() => {
    if (data.gods !== null && data.champions !== null) { return; }
    loadGods();
    loadChampions();
    loadCommonInnateAbilities();
  }, [loadGods, loadChampions, data, loadCommonInnateAbilities]);

  const [game, setGame] = useState<Game>({
    name: '',
    championCount: null,
    player1: { godId: null, championIds: [] },
    player2: { godId: null, championIds: [] },
  });

  const setName: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setGame((state) => ({
      ...state,
      name: event.target.value,
    }));
  };

  const setChampionCount: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;
    const valueInt = parseInt(value, 10);
    if (Number.isNaN(valueInt)) { return; }
    setGame((state) => ({
      ...state,
      championCount: valueInt,
    }));
  };

  const setGod = (player: string, godId: string) => {
    setGame((state) => ({
      ...state,
      [player]: { ...state[player], godId },
    }));
  };

  const toggleChampion = (player: string, championId: string) => {
    setGame((state) => ({
      ...state,
      [player]: {
        ...state[player],
        championIds: state[player].championIds.includes(championId)
          ? state[player].championIds.filter((cId: string) => cId !== championId)
          : [...state[player].championIds, championId],
      },
    }));
  };

  const isPlayerValid = (player: PlayerConfig) => {
    if (player.championIds.length !== game.championCount) { return false; }
    if (!player.godId) { return false; }
    return true;
  };

  const navigate = useNavigate();

  const { setGame: persistGame } = useGames();
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!game.championCount) { return; }
    if (!isPlayerValid(game.player1)) { return; }
    if (!isPlayerValid(game.player2)) { return; }
    const id = v4();
    persistGame(id, game);
    navigate(`/games/${id}`);
  };

  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const modals = (query.get('modals')?.split('|')
    .map((val) => val.split(','))) ?? [];

  const gods = modals.filter((modal) => modal[0] === 'god');
  const champions = modals.filter((modal) => modal[0] === 'champion');

  const closeChampionModal = (id: string) => {
    const updatedQuery = modals.filter((m) => m[1] !== id)
      .map((m) => m.join(','))
      .join('|');
    query.set(
      'modals',
      updatedQuery,
    );
    navigate(`?${query.toString()}`);
  };

  if (data.gods === null) { return null; }

  return (
    <>
      <Layout
        isDetailVisible={!!gods.length}
        detailChildren={gods.length ? (
          gods.map((modal) => {
            const god = data.gods?.find((g) => g.id === modal[1]);
            if (!god) { return null; }
            return (
              <GodCard
                key={modal[1]}
                avatar={god.avatar}
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
            );
          })
        ) : null}
      >
        <form onSubmit={handleSubmit}>
          <h1>New Game</h1>

          <section className={style.gameSection}>
            <h2>Game Info</h2>
            <label htmlFor="name">
              Game Name (optional)
              <input name="name" type="text" value={game.name ?? ''} onChange={setName} />
            </label>

            <label htmlFor="size">
              Game Size
              <label htmlFor="three">
                <input
                  type="radio"
                  onChange={setChampionCount}
                  name="size"
                  id="three"
                  value="3"
                  checked={game.championCount?.toString() === '3'}
                />
                3v3
              </label>
              <label htmlFor="five">
                <input
                  type="radio"
                  onChange={setChampionCount}
                  name="size"
                  id="five"
                  value="5"
                  checked={game.championCount?.toString() === '5'}
                />
                5v5
              </label>
            </label>
          </section>

          <section className={style.gameSection}>
            <h2>Player 1 Info</h2>
            <PlayerSetup
              championCount={game.championCount ?? 0}
              championIds={game.player1.championIds}
              champions={data.champions ?? []}
              godId={game.player1.godId ?? ''}
              gods={data.gods ?? []}
              setGod={(godId) => setGod('player1', godId)}
              toggleChampion={(championId) => toggleChampion('player1', championId)}
              playerName="player1"
            />
          </section>

          <section className={style.gameSection}>
            <h2>Player 2 Info</h2>
            <PlayerSetup
              championCount={game.championCount ?? 0}
              championIds={game.player2.championIds}
              champions={data.champions ?? []}
              godId={game.player2.godId ?? ''}
              gods={data.gods ?? []}
              setGod={(godId) => setGod('player2', godId)}
              toggleChampion={(championId) => toggleChampion('player2', championId)}
              playerName="player2"
            />
          </section>

          <button type="submit">
            Create Game
          </button>
        </form>

        <div>{JSON.stringify(game)}</div>
      </Layout>
      <div>
        {champions.map((modal) => {
          const champion = data.champions?.find((c) => c.id === modal[1]);
          if (!champion) { return null; }
          return (
            <Modal key={champion.id} onClose={() => closeChampionModal(champion.id)}>
              <ChampionCard
                activeAbilities={champion.activeAbilities}
                combatManoeuvres={champion.combatManoeuvres}
                commonInnateAbilities={champion.commonInnateAbilities.map((cia) => {
                  const dataCia = data.commonInnateAbilities?.find(
                    (d) => d.name.toUpperCase() === cia.toUpperCase(),
                  );
                  return {
                    name: cia,
                    description: dataCia?.description ?? 'No info available',
                  };
                })}
                imageUrl={champion.imageUrl}
                name={champion.name}
                soulHarvest={champion.soulHarvest}
                stats={[
                  { label: 'Mov', value: champion.mov },
                  { label: 'Rng', value: champion.rng },
                  { label: 'Agi', value: champion.agi },
                  { label: 'Mel', value: champion.mel },
                  { label: 'Mag', value: champion.mag },
                  { label: 'Res', value: champion.res },
                ]}
                uniqueInnateAbilities={champion.uniqueInnateAbilities}
                weapons={champion.weapons}
                maxhp={champion.health}
              />
            </Modal>
          );
        })}
      </div>
    </>
  );
}

export default NewGameRoute;
