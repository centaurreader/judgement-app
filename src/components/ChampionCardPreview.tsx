import React from 'react';
import { Champion } from '../types/judgement';
import style from './ChampionCardPreview.css';
import StatBlock from './StatBlock';
import StatControl from './StatControl';
import ModalLink from './ModalLink';

function ChampionCardPreview({
  champion,
}: {
  champion: Champion;
}) {
  return (
    <div className={style.container}>
      <div className={style.details}>
        <img
          className={style.image}
          src={`https://hallofeternalchampions.com/images/${champion.avatarUrl}`}
          alt=""
        />

        <div>
          <p className={style.name}>{champion.name}</p>

          <div>
            <ul className={style.statList}>
              <li className={style.statListItem}>
                <StatBlock name="Mov" value={champion.mov} />
              </li>
              <li className={style.statListItem}>
                <StatBlock name="Agi" value={champion.agi} />
              </li>
              <li className={style.statListItem}>
                <StatBlock name="Res" value={champion.res} />
              </li>
              <li className={style.statListItem}>
                <StatBlock name="Mel" value={champion.mel} />
              </li>
              <li className={style.statListItem}>
                <StatBlock name="Mag" value={champion.mag} />
              </li>
              <li className={style.statListItem}>
                <StatBlock name="Rng" value={champion.rng} />
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={style.controls}>
        <div className={style.control}>
          <StatControl label="Level" defaultValue={0} />
        </div>
        <div className={style.control}>
          <StatControl label="Health" defaultValue={0} />
        </div>
      </div>

      <ModalLink to={`champion,${champion.id}`}>View</ModalLink>
    </div>
  );
}

export default ChampionCardPreview;
