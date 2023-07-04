import React from 'react';
import PropTypes from 'prop-types';
import style from './Ability.css';

function Ability({
  description,
  name,
  note,
}) {
  return (
    <div>
      <p className={style.name}>{name}</p>
      <p className={style.description}>{description}</p>
      {note ? (
        <p className={style.note}>{note}</p>
      ) : null}
    </div>
  );
}

Ability.propTypes = {
  description: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  note: PropTypes.string,
};

Ability.defaultProps = {
  note: '',
};

export default Ability;
