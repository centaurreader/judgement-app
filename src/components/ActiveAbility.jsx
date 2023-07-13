import React from 'react';
import PropTypes from 'prop-types';
import style from './ActiveAbility.css';

function ActiveAbility({
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

ActiveAbility.propTypes = {
  description: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  cost: PropTypes.string.isRequired,
};

export default ActiveAbility;
