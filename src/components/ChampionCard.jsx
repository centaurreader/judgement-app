import React from 'react';
import PropTypes from 'prop-types';
import StatBlock from './StatBlock';
import style from './ChampionCard.css';
import StatControl from './StatControl';
import ActiveAbility from './ActiveAbility';

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

}) {
  return (
    <div className={style.container}>
      <img className={style.image} src={`https://hallofeternalchampions.com/images/${imageUrl}`} alt="" />

      <div className={style.content}>
        <div className={style.header}>
          <div className={style.headerLeft}>
            <p className={style.name}>{name}</p>
            <p>
              Gods:
              {' '}
              {gods.join(', ')}
            </p>
            <p>
              Soul Harvest:
              {' '}
              {soulHarvest}
            </p>
            <p>{commonInnateAbilities.join(', ')}</p>
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
      </div>

      <div>
        <p>
          Active Abillities:
          <p>
            {' '}
            {activeAbilities.map(
              (activeAbility) => (
                <ActiveAbility
                  name={activeAbility.name}
                  description={activeAbility.description}
                  cost={activeAbility.cost}
                />
              ),
            )}
          </p>
        </p>

      </div>
      <div className={style.controls}>
        <div className={style.control}>
          <StatControl label="Level" value={0} />
        </div>
        <div className={style.control}>
          <StatControl label="Health" value={0} />
        </div>
      </div>
    </div>
  );
}

ChampionCard.propTypes = {
  commonInnateAbilities: PropTypes.arrayOf(PropTypes.string).isRequired,
  gods: PropTypes.arrayOf(PropTypes.string).isRequired,
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
  uniqueInnateAbilities: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeAbilities: PropTypes.arrayOf(PropTypes.string).isRequired,

};

export default ChampionCard;
