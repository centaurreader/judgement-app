import { useEffect, useRef } from 'react';

function useOutsideClickHandler(
  handler: () => void,
  options: {
    containerSelectors: string[],
  },
) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const { current: refInstance } = ref;
    const additionalContainers = options.containerSelectors
      .map((containerSelector) => document.querySelector(containerSelector));

    const listen = (event: MouseEvent) => {
      const refContainsTarget = refInstance?.contains(event.target as HTMLElement);
      const additionalsContainTarget = additionalContainers
        .some((additional) => additional?.contains(event.target as HTMLElement));
      if (refContainsTarget || additionalsContainTarget) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        return;
      }
      handler();
    };

    document.body.addEventListener('click', listen);
    return () => {
      document.body.removeEventListener('click', listen);
    };
  }, [handler, options]);

  return {
    ref,
  };
}

export default useOutsideClickHandler;
