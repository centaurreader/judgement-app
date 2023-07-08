import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import style from './Tooltip.css';
import useOutsideClickHandler from '../hooks/useOutsideClickHandler';

function Tip({
  content,
  isOpen,
  position,
}: {
  content: React.ReactElement,
  isOpen: boolean;
  position: { top: number; left: number; };
}) {
  const [portal, setPortal] = useState<HTMLDivElement | null>(document.getElementById('tooltip') as HTMLDivElement ?? null);
  useEffect(() => {
    if (portal) { return; }
    const el = document.createElement('div');
    el.setAttribute('id', 'tooltip');
    document.body.appendChild(el);
    setPortal(el);
  }, [portal]);

  if (!portal || !isOpen) { return null; }

  return createPortal(
    (
      <div
        className={style.tip}
        style={{
          position: 'absolute',
          top: position.top,
          left: position.left,
        }}
      >
        {content}
      </div>
    ),
    portal,
  );
}

function Tooltip({
  children,
  content,
}: React.PropsWithChildren<{
  content: React.ReactElement;
}>) {
  const ref = useRef<HTMLButtonElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const getToolTipPosition = () => {
    if (!ref.current) { return { top: 0, left: 0 }; }
    const { y, height } = ref.current.getBoundingClientRect();
    const { x } = ref.current.getBoundingClientRect();
    return {
      top: y + height,
      left: x,
    };
  };

  const { ref: outsideClickHandlerRef } = useOutsideClickHandler(
    () => {
      if (!isOpen) { return; }
      setIsOpen(false);
    },
    {
      containerSelectors: ['#tooltip'],
    },
  );
  return (
    <span
      className={style.container}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      ref={outsideClickHandlerRef}
    >
      <button
        type="button"
        ref={ref}
        className={clsx(style.wrapper, {
          [style.wrapperOpen]: isOpen,
        })}
        onClick={() => setIsOpen((state) => !state)}
      >
        {children}
      </button>
      <Tip
        content={content}
        isOpen={isOpen}
        position={getToolTipPosition()}
      />
    </span>
  );
}

export default Tooltip;
