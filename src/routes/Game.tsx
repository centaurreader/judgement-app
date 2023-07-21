import React from 'react';
import { useLocation } from 'react-router-dom';
import { useGame } from '../hooks/useGame';
import Layout from '../components/Layout';
import { useJudgementApi } from '../hooks/useJudgementApi';
import ChampionCardPreview from '../components/ChampionCardPreview';
import ChampionCard from '../components/ChampionCard';
import ModalLink from '../components/ModalLink';

function GameRoute() {
  const { data } = useJudgementApi();
  const { gameState } = useGame();

  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const modals = (query.get('modals')?.split('|')
    .map((val) => val.split(','))) ?? [];

  const championModals = modals.filter((modal) => modal[0] === 'champion');

  return (
    <Layout
      detailChildren={championModals.map(([, id]) => {
        const champion = data.champions?.find((c) => c.id === id);
        if (!champion) { return null; }
        return (
          <div key={champion.id}>
            <ChampionCard
              key={champion.id}
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
              imageUrl={champion.avatarUrl}
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
            <ModalLink remove to={`champion,${champion.id}`}>
              Close
            </ModalLink>
          </div>
        );
      })}
      isDetailVisible={false}
    >
      <div>
        <p style={{ fontSize: '.5rem', wordBreak: 'break-word' }}>{JSON.stringify(gameState)}</p>
        {gameState.config?.player1.championIds.map((cId) => {
          const champion = data.champions?.find((c) => c.id === cId);
          if (!champion) { return null; }
          return (
            <div className="layout-margin--top_100" key={champion.id}>
              <ChampionCardPreview
                champion={champion}
              />
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

export default GameRoute;
