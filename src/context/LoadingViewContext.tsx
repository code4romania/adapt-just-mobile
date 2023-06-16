import React, {
  useMemo,
  useState,
  createContext,
} from 'react';

import LoadingView from '~/components/shared/screens/LoadingView';

export const LoadingViewContext = createContext({});

export const LoadingViewProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);

  const context = useMemo(() => ({
    visible,
    setVisible,
  }), [visible]);

  return (
    <LoadingViewContext.Provider value={context}>
      {children}
      <LoadingView visible={visible} />
    </LoadingViewContext.Provider>
  );
};
