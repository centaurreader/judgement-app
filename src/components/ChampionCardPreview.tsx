import React from 'react';
import style from './ChampionCardPreview.css';
import StatBlock from './StatBlock';
import StatControl from './StatControl';
import ModalLink from './ModalLink';
import { Champion } from '../types/judgement.generated';

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
          <p className={style.soulHarvest}>
            Soul Harvest:
            {' '}
            {champion.soulHarvest}
          </p>
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
        <table className={style.weaponTable}>
          <thead>
            <tr className={style.weaponTableHead}>
              <td className={`${style.weaponTableCellLeft} ${style.weaponTableCell}`}>Weapon</td>
              <td className={style.weaponTableCell}>Type</td>
              <td className={style.weaponTableCell}>Cost</td>
              <td className={style.weaponTableCell}>Reach</td>
              <td className={style.weaponTableCell}>Glance</td>
              <td className={style.weaponTableCell}>Solid</td>
              <td className={style.weaponTableCell}>Crit</td>
            </tr>
          </thead>
          <tbody>
            {champion.weapons.map((weapon) => (
              <tr key={JSON.stringify(weapon)} className={style.weaponTableRow}>
                <td className={`${style.weaponTableCellLeft} ${style.weaponTableCell}`}>{weapon.name}</td>
                <td className={style.weaponTableCell}>{weapon.type}</td>
                <td className={style.weaponTableCell}>{weapon.cost}</td>
                <td className={style.weaponTableCell}>{weapon.reach}</td>
                <td className={style.weaponTableCell}>{weapon.glance}</td>
                <td className={style.weaponTableCell}>{weapon.solid}</td>
                <td className={style.weaponTableCell}>{weapon.crit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <p className={style.abilities}>
          {champion.uniqueInnateAbilities.map((abillity) => abillity.name).join(', ')}
          {', '}
          {champion.commonInnateAbilities.map((abillity) => abillity).join(', ')}
        </p>
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
