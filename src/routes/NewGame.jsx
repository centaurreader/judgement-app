import React, { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useJudgementApi } from '../hooks/useJudgementApi';
import Button from '../components/Button';
import style from './NewGame.css';
import Layout from '../components/Layout';
import GodCard from '../components/GodCard';
import Modal from '../components/Modal';
import ChampionCard from '../components/ChampionCard';

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

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const { search } = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(search);
  const modals = (query.get('modals')?.split('|')
    .map((val) => val.split(','))) ?? [];

  const gods = modals.filter((modal) => modal[0] === 'god');
  const champions = modals.filter((modal) => modal[0] === 'champion');

  const closeChampionModal = (id) => {
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
        isDetailVisible={gods.length}
        detailChildren={gods.length ? (
          gods.map((modal) => {
            const god = data.gods.find((g) => g.id === modal[1]);
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

          <section>
            <h2>Game Info</h2>
            <label htmlFor="name">
              Game Name (optional)
              <input name="name" type="text" />
            </label>

            <label htmlFor="size">
              Game Size
              <label htmlFor="three">
                <input type="radio" name="size" id="three" value="3" />
                3v3
              </label>
              <label htmlFor="five">
                <input type="radio" name="size" id="five" value="5" />
                5v5
              </label>
            </label>
          </section>

          <section>
            <h2>Player Info</h2>
            <label htmlFor="god">
              God
              {data.gods.map((god) => (
                <label htmlFor={god.name} className={style.god} key={god.id}>
                  <input type="radio" id={god.name} name="god" />
                  <p style={{ flex: 1 }}>{god.name}</p>
                  <Link to={`?modals=god,${god.id}`}>
                    <Button appearance="outline" type="button" onClick={() => {}}>View</Button>
                  </Link>
                </label>
              ))}
            </label>

            <label htmlFor="god">
              Champions
              <select id="god" name="god" multiple>
                <option value="">Choose one...</option>
                {data.champions.map((hero) => (
                  <option id={hero.id} key={hero.id}>
                    {hero.name}
                  </option>
                ))}
              </select>
            </label>
          </section>

          <button type="submit">
            Create Game
          </button>
        </form>
      </Layout>
      <div>
        {champions.map((modal) => {
          const champion = data.champions.find((c) => c.id === modal[1]);
          return (
            <Modal key={champion.id} onClose={() => closeChampionModal(champion.id)}>
              <ChampionCard
                activeAbilities={champion.activeAbilities}
                combatManoeuvres={champion.combatManoeuvres}
                commonInnateAbilities={champion.commonInnateAbilities.map((cia) => {
                  const dataCia = data.commonInnateAbilities
                    .find((d) => d.name.toUpperCase() === cia.toUpperCase());
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
              />
            </Modal>
          );
        })}
      </div>
    </>
  );
}

export default NewGameRoute;
