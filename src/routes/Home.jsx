import React from 'react';
import { useJudgementApi } from '../hooks/useJudgementApi';
import HeroCard from '../components/HeroCard';

function HomeRoute() {
  const { data } = useJudgementApi();
  return (
    <div>
      <h1>Home</h1>
      {data.map((hero) => (
        <HeroCard
          key={hero.id}
          name={hero.name}
          stats={[
            { label: 'Mov', value: hero.mov },
            { label: 'Rng', value: hero.rng },
            { label: 'Agi', value: hero.agi },
            { label: 'Mel', value: hero.mel },
            { label: 'Mag', value: hero.mag },
            { label: 'Res', value: hero.res },
          ]}
        />
      ))}
    </div>
  );
}

export default HomeRoute;
