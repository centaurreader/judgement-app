import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import style from './Modal.css';

function Modal({
  children,
  onClose,
}) {
  const [portal, setPortal] = useState(false);
  useEffect(() => {
    if (portal) {
      return;
    }
    const el = document.createElement('div');
    el.setAttribute('id', 'modals');
    document.body.appendChild(el);
    setPortal(el);
  }, [portal]);

  if (!portal) {
    return null;
  }

  return createPortal(
    <div>
      <div className={style.content}>
        <button onClick={onClose} type="button">Close</button>
        {children}
      </div>
      <button className={style.scrim} type="button" tabIndex={0}>
        <span className="a11y_hidden">Close</span>
      </button>
    </div>,
    portal,
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
