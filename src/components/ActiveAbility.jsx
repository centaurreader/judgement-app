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
        <text className={style.name}>{name}</text>
        {' '}
        <text className={style.cost}>
          (
          {cost}
          )
        </text>
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
