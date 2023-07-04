import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

function ModalLink({
  children,
  to,
}) {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const modals = query.get('modals');

  const getTo = () => {
    if (!modals) { return to; }
    return `${modals}|${to}`;
  };

  return (
    <Link to={`?modals=${getTo()}`}>
      {children}
    </Link>
  );
}

ModalLink.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};

export default ModalLink;
