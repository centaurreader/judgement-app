import React from 'react';
import PropTypes from 'prop-types';
import StatBlock from './StatBlock';
import style from './HeroCard.css';

function HeroCard({
  name,
  stats,
}) {
  return (
    <div className={style.container}>
      <p>{name}</p>

      <ul className={style.statList}>
        {stats.map((stat) => (
          <li key={stat.label} className={style.statListItem}>
            <StatBlock name={stat.label} value={stat.value} />
          </li>
        ))}
      </ul>
    </div>
  );
}

HeroCard.propTypes = {
  name: PropTypes.string.isRequired,
  stats: PropTypes.arrayOf(PropTypes.objectOf({
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
  })).isRequired,
};

export default HeroCard;
