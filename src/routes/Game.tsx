import React from 'react';
import { useGame } from '../hooks/useGame';
import Layout from '../components/Layout';
import { useJudgementApi } from '../hooks/useJudgementApi';
import ChampionCard from '../components/ChampionCard';

function GameRoute() {
  const { data } = useJudgementApi();
  const { gameState } = useGame();
  return (
    <Layout
      detailChildren={(<div />)}
      isDetailVisible
    >
      <div>
        {JSON.stringify(gameState)}
        {gameState.config?.player1.championIds.map((cId) => {
          const champion = data.champions?.find((c) => c.id === cId);
          if (!champion) { return null; }
          return (
            <ChampionCard
              activeAbilities={champion.activeAbilities}
              combatManoeuvres={champion.combatManoeuvres}
              commonInnateAbilities={champion.commonInnateAbilities.map((cia) => {
                const dataCia = data.commonInnateAbilities?.find((d) => d.name === cia);
                return {
                  name: cia,
                  description: dataCia?.description ?? 'No info available',
                };
              })}
              imageUrl={champion.imageUrl}
              maxhp={champion.health}
              name={champion.name}
              soulHarvest={champion.soulHarvest}
              uniqueInnateAbilities={champion.uniqueInnateAbilities}
              weapons={champion.weapons}
              stats={[
                { label: 'Mov', value: champion.mov },
                { label: 'Rng', value: champion.rng },
                { label: 'Agi', value: champion.agi },
                { label: 'Mel', value: champion.mel },
                { label: 'Mag', value: champion.mag },
                { label: 'Res', value: champion.res },
              ]}
              key={champion.id}
            />
          );
        })}
      </div>
    </Layout>
  );
}

export default GameRoute;
