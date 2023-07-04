import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import style from './Button.css';

function Button({
  appearance,
  children,
  onClick,
  type,
}) {
  return (
    <button
      className={clsx(style.container, {
        [style.containerOutline]: appearance === 'outline',
      })}
      onClick={onClick}
      type={type === 'submit' ? 'submit' : 'button'}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  appearance: PropTypes.oneOf(['default', 'outline']),
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['submit', 'button']),
};

Button.defaultProps = {
  appearance: 'default',
  type: '',
};

export default Button;
