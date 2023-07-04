import React from 'react';
import { useJudgementApi } from '../hooks/useJudgementApi';
import HeroCard from '../components/HeroCard';

function HomeRoute() {
  const { data } = useJudgementApi();
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
        {data.map((hero) => (
          <div
            style={{
              marginTop: '1rem',
            }}
          >
            <HeroCard
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
