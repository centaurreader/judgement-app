import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

function ModalLink({
  children,
  to,
  replace,
  remove,
}: React.PropsWithChildren<{
  to: string;
  replace?: boolean;
  remove?: boolean;
}>) {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const modals = query.get('modals');

  const getTo = () => {
    if (!modals || replace) { return to; }
    if (remove) { return modals.replace(to, ''); }
    if (modals.includes(to)) { return modals; }
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
  replace: PropTypes.bool,
  to: PropTypes.string.isRequired,
};

ModalLink.defaultProps = {
  replace: false,
};

export default ModalLink;
