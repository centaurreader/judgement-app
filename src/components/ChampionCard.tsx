import React from 'react';
import PropTypes from 'prop-types';
import StatBlock from './StatBlock';
import style from './ChampionCard.css';
import StatControl from './StatControl';
import ActiveAbility from './ActiveAbility';
import CombatManoeuvres from './CombatManoeuvres';
import { Ability, Weapon } from '../types/judgement';
import Tooltip from './Tooltip';

function ChampionCard({
  imageUrl,
  commonInnateAbilities,
  gods,
  name,
  soulHarvest,
  stats,
  weapons,
  uniqueInnateAbilities,
  activeAbilities,
  combatManoeuvres,
}: {
  imageUrl: string;
  commonInnateAbilities: { name: string; description: string; }[];
  gods?: string[];
  name: string;
  soulHarvest: string;
  stats: { label: string; value: string; }[];
  weapons: Weapon[];
  uniqueInnateAbilities: Ability[];
  activeAbilities: Ability[];
  combatManoeuvres: Ability[];
}) {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.header}>
          <div className={style.headerLeft}>
            <p className={style.name}>{name}</p>
            {gods?.length ? (
              <p>
                Gods:
                {' '}
                {gods.join(', ')}
              </p>
            ) : null}
            <p>
              Soul Harvest:
              {' '}
              {soulHarvest}
            </p>
            <p>
              {commonInnateAbilities.map((ability, i) => (
                <React.Fragment key={ability.name}>
                  <Tooltip
                    content={(
                      // eslint-disable-next-line react/no-danger
                      <p dangerouslySetInnerHTML={{ __html: ability.description }} />
                    )}
                  >
                    {ability.name}
                  </Tooltip>
                  {i === commonInnateAbilities.length - 1 ? '' : ', '}
                </React.Fragment>
              ))}
            </p>
            <p>{uniqueInnateAbilities.map((abillity) => abillity.name).join(', ')}</p>
          </div>

          <ul className={`${style.statList} ${style.headerRight}`}>
            {stats.map((stat) => (
              <li key={stat.label} className={style.statListItem}>
                <StatBlock name={stat.label} value={stat.value} />
              </li>
            ))}
          </ul>
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
            {weapons.map((weapon) => (
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
        <div>
          Active Abillities:
          <p>
            {' '}
            {activeAbilities.map(
              (activeAbility) => (
                <ActiveAbility
                  key={activeAbility.name}
                  name={activeAbility.name}
                  description={activeAbility.description}
                  cost={activeAbility.cost as string}
                />
              ),
            )}
          </p>
        </div>
        <div>
          Combat Manoeuvres:
          <p>
            {' '}
            {combatManoeuvres.map(
              (combatManoeuvre) => (
                <CombatManoeuvres
                  key={combatManoeuvre.name}
                  name={combatManoeuvre.name}
                  description={combatManoeuvre.description}
                  cost={combatManoeuvre.cost as string}
                />
              ),
            )}
          </p>
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

      <div
        className={style.image}
        style={{
          backgroundImage: `url(https://hallofeternalchampions.com/images/${imageUrl})`,
        }}
      />
    </div>
  );
}

ChampionCard.propTypes = {
  commonInnateAbilities: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  })).isRequired,
  gods: PropTypes.arrayOf(PropTypes.string),
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  soulHarvest: PropTypes.string.isRequired,
  stats: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
  })).isRequired,
  weapons: PropTypes.arrayOf(PropTypes.shape({
    cost: PropTypes.string.isRequired,
    crit: PropTypes.string.isRequired,
    glance: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    reach: PropTypes.string.isRequired,
    solid: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
  uniqueInnateAbilities: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  })).isRequired,
  activeAbilities: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  })).isRequired,
  combatManoeuvres: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  })).isRequired,
};

ChampionCard.defaultProps = {
  gods: undefined,
};

export default ChampionCard;
