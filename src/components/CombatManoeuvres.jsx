import React from 'react';
import PropTypes from 'prop-types';
import style from './CombatManoeuvres.css';

function CombatManoeuvres({
  description,
  name,
  cost,
}) {
  return (
    <span>
      <span>
        {' '}
        <span className={style.name}>{name}</span>
        {' '}
        <span className={style.cost}>
          (
          {cost}
          )
        </span>
      </span>
      <span className={style.description}>{description}</span>
    </span>
  );
}

CombatManoeuvres.propTypes = {
  description: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  cost: PropTypes.string.isRequired,
};

export default CombatManoeuvres;
