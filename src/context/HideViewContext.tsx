import React, {
  useMemo,
  useState,
  createContext,
} from 'react';

import HideView from '~/components/shared/HideView';

export const HideViewContext = createContext({});

export const HideViewProvider = ({
  children,
}) => {
  const [visible, setVisible] = useState(false);

  const context = useMemo(() => ({
    visible,
    setVisible,
  }), [visible]);

  return (
    <HideViewContext.Provider value={context}>
      {children}
      <HideView visible={visible} />
    </HideViewContext.Provider>
  );
};
