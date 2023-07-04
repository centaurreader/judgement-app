import React from 'react';
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

export default StatBlock;
