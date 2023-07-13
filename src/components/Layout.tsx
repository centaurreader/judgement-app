import React from 'react';
import clsx from 'clsx';
import style from './Layout.css';

function Layout({
  children,
  detailChildren,
  isDetailVisible,
}: React.PropsWithChildren<{
  detailChildren: React.ReactNode;
  isDetailVisible: boolean;
}>) {
  return (
    <div className={style.layout}>
      <div className={style.main}>
        {children}
      </div>
      <div
        className={clsx(style.detail, {
          [style.detailVisible]: isDetailVisible,
        })}
      >
        {detailChildren}
      </div>
    </div>
  );
}

export default Layout;
