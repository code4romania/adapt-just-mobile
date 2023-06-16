import { useEffect, useContext } from 'react';
import { LoadingViewContext } from '~/context/LoadingViewContext';

const useLoadingView = (visible) => {
  const { setVisible } = useContext(LoadingViewContext)

  useEffect(() => {
    setVisible(visible);
  }, [visible]);
};

export default useLoadingView;
