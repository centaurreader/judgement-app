import React from 'react';
import { useJudgementApi } from '../hooks/useJudgementApi';
import ChampionCard from '../components/ChampionCard';

function HomeRoute() {
  const { data } = useJudgementApi();

  if (data.heroes === null) { return null; }

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Home</h1>
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
        }}
      >
        {data.heroes.map((hero) => (
          <div
            style={{
              marginTop: '1rem',
            }}
          >
            <ChampionCard
              key={hero.id}
              commonInnateAbilities={hero.commonInnateAbilities}
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
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeRoute;
