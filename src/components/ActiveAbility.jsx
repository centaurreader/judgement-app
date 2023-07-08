import React from 'react';
import PropTypes from 'prop-types';
import style from './ActiveAbility.css';

function ActiveAbility({
  description,
  name,
  cost,
}) {
  return (
    <div>
      <p>
        {' '}
        <span className={style.name}>{name}</span>
        {' '}
        <span className={style.cost}>
          (
          {cost}
          )
        </span>
      </p>
      <p className={style.description}>{description}</p>
    </div>
  );
}

ActiveAbility.propTypes = {
  description: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  cost: PropTypes.string.isRequired,
};

export default ActiveAbility;
