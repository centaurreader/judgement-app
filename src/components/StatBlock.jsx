import React from 'react';
import PropTypes from 'prop-types';
import style from './StatBlock.css';

function StatBlock({
  name,
  value,
}) {
  return (
    <div className={style.container}>
      <span className={style.name}>{name}</span>
      <span className={style.value}>{value}</span>
    </div>
  );
}

StatBlock.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
};

StatBlock.defaultProps = {
  value: '-',
};

export default StatBlock;
