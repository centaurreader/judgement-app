import React from 'react';
import { useJudgementApi } from '../hooks/useJudgementApi';
import ChampionCard from '../components/ChampionCard';
import Layout from '../components/Layout';

function HomeRoute() {
  const { data } = useJudgementApi();

  if (data.champions === null) { return null; }

  return (
    <Layout
      isDetailVisible
      detailChildren={(data.champions.map((hero) => (
        <div
          style={{
            marginTop: '1rem',
          }}
          key={hero.id}
        >
          <ChampionCard
            key={hero.id}
            commonInnateAbilities={hero.commonInnateAbilities.map((cia) => {
              const dataCia = data.commonInnateAbilities.find((d) => d.name === cia);
              return {
                name: cia,
                description: dataCia?.description ?? 'No info available',
              };
            })}
            gods={hero.gods}
            imageUrl={hero.imageUrl}
            name={hero.name}
            soulHarvest={hero.soulHarvest}
            stats={[
              { label: 'Mov', value: hero.mov },
              { label: 'Rng', value: hero.rng },
              { label: 'Agi', value: hero.agi },
              { label: 'Mel', value: hero.mel },
              { label: 'Mag', value: hero.mag },
              { label: 'Res', value: hero.res },
            ]}
            weapons={hero.weapons}
            uniqueInnateAbilities={hero.uniqueInnateAbilities}
            activeAbilities={hero.activeAbilities}
            combatManoeuvres={hero.combatManoeuvres}
            maxhp={hero.health}
          />
        </div>
      )))}
    >
      <h1>Home</h1>
      {(data.champions.map((hero) => (
        <div
          style={{
            marginTop: '1rem',
          }}
          key={hero.id}
        >
          <ChampionCard
            key={hero.id}
            commonInnateAbilities={hero.commonInnateAbilities.map((cia) => {
              const dataCia = data.commonInnateAbilities.find((d) => d.name === cia);
              return {
                name: cia,
                description: dataCia?.description ?? 'No info available',
              };
            })}
            gods={hero.gods}
            imageUrl={hero.imageUrl}
            name={hero.name}
            soulHarvest={hero.soulHarvest}
            stats={[
              { label: 'Mov', value: hero.mov },
              { label: 'Rng', value: hero.rng },
              { label: 'Agi', value: hero.agi },
              { label: 'Mel', value: hero.mel },
              { label: 'Mag', value: hero.mag },
              { label: 'Res', value: hero.res },
            ]}
            weapons={hero.weapons}
            uniqueInnateAbilities={hero.uniqueInnateAbilities}
            activeAbilities={hero.activeAbilities}
            combatManoeuvres={hero.combatManoeuvres}
            maxhp={hero.health}
          />
        </div>
      )))}
    </Layout>
  );
}

export default HomeRoute;
