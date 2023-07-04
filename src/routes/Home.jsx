import React from 'react';
import { useJudgementApi } from '../hooks/useJudgementApi';
import StatBlock from '../components/StatBlock';

function HomeRoute() {
  const { data } = useJudgementApi();
  return (
    <div>
      <h1>Home</h1>
      {data.map((hero) => (
        <div key={hero.id}>
          {hero.name}

          <ul style={{ display: 'flex' }}>
            <li>
              <StatBlock name="Mov" value={hero.mov} />
            </li>
            <li>
              <StatBlock name="Rng" value={hero.rng} />
            </li>
            <li>
              <StatBlock name="Agi" value={hero.agi} />
            </li>
          </ul>
          <ul style={{ display: 'flex' }}>
            <li>
              <StatBlock name="Mel" value={hero.mel} />
            </li>
            <li>
              <StatBlock name="mag" value={hero.mag} />
            </li>
            <li>
              <StatBlock name="res" value={hero.res} />
            </li>
          </ul>

        </div>
      ))}
    </div>
  );
}

export default HomeRoute;
