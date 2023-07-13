import React from 'react';
import PropTypes from 'prop-types';
import style from './StatControl.css';

function StatControl({
  defaultValue,
  label,
  value,
}) {
  return (
    <div className={style.container}>
      <label htmlFor={label} className={style.label}>
        {label}
      </label>

      <div className={style.control}>
        <button type="button" className={style.button}>
          <span className="a11y_hidden">
            {`Decrement ${label}`}
          </span>
          -
        </button>

        <input
          type="number"
          step={1}
          name={label}
          defaultValue={defaultValue}
          value={value}
          className={style.input}
        />

        <button type="button" className={style.button}>
          <span className="a11y_hidden">
            {`Increment ${label}`}
          </span>
          +
        </button>
      </div>
    </div>
  );
}

StatControl.propTypes = {
  defaultValue: PropTypes.number,
  label: PropTypes.string.isRequired,
  value: PropTypes.number,
};

StatControl.defaultProps = {
  defaultValue: undefined,
  value: undefined,
};

export default StatControl;
