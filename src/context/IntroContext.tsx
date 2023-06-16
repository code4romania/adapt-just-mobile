import React, {
  useMemo,
  useEffect,
  createContext,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import useWithReducer from '~/hooks/use-with-reducer';

const initialState = {
  isIntro: false,
  introCheck: false,
};

export const IntroContext = createContext({});

export const IntroProvider = ({
  children,
}) => {
  const [state, setState] = useWithReducer(initialState);

  useEffect(() => {
    const checkIntro = async () => {
      let {
        isIntro,
        introCheck,
      } = state;

      const introDone = await AsyncStorage.getItem('@has_intro');
      if (!introDone) {
        isIntro = true;
      }

      introCheck = true;

      setState({
        isIntro,
        introCheck,
      });
    };

    checkIntro();
  }, []);

  const handleIntro = async () => {
    await AsyncStorage.setItem('@has_intro', 'true');
    setState({ isIntro: false });
  };

  const context = useMemo(() => ({
    ...state,
    handleIntro,
  }), [state]);

  return (
    <IntroContext.Provider
      value={context}
    >
      {children}
    </IntroContext.Provider>
  );
};
