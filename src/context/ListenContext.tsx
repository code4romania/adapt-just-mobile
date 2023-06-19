import React, {
  useRef,
  useMemo,
  useEffect,
  useCallback,
  createContext,
} from 'react';
import {
  AppState,
  Platform,
} from 'react-native';
import Tts from 'react-native-tts';

import useWithReducer from '~/hooks/use-with-reducer';

const rate = 0.425;

const params = Platform.select({
  ios: { rate },
  android: {
    KEY_PARAM_PAN: -1,
    KEY_PARAM_VOLUME: 1,
    KEY_PARAM_STREAM: 'STREAM_MUSIC',
  },
});

const progress = {
  length: 0,
  position: -1,
}

const initialState = {
  progress,
  isReady: false,
  isListen: false,
};

const defaultLanguage = 'ro-RO';
const isAndroid = Platform.OS === 'android';

export const ListenContext = createContext({});

export const ListenProvider = ({
  children,
}) => {
  const textRef = useRef([]);
  const positionRef = useRef(-1);
  const currentIndex = useRef(0);
  const isListenRef = useRef(false);
  const appStateRef = useRef(AppState.currentState);

  const [state, setState] = useWithReducer(initialState);

  useEffect(() => {
    bootstrap();
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    isListenRef.current = state.isListen;
  }, [state.isListen]);

  const handleAppStateChange = async (nextAppState) => {
    if (
      nextAppState.match(/inactive|background/) &&
      isListenRef.current
    ) {
      await handleStop();
    }

    appStateRef.current = nextAppState;
  };

  const bootstrap = useCallback(
    async () => {
      Tts.addEventListener('tts-start', handleStart);
      Tts.addEventListener('tts-progress', handleProgress);
      Tts.addEventListener('tts-finish', handleFinish);
      Tts.addEventListener('tts-cancel', handleCancel);

      await initTts();
    },
    []
  );

  const initTts = useCallback(
    async () => {
      try {
        await Tts.getInitStatus();

        if (isAndroid) {
          const engines = await Tts.engines();
          const hasEngine = engines?.length > 0;

          if (!hasEngine) {
            await Tts.requestInstallEngine();
          } else {
            const googleEngine = engines?.find((engine) => {
              return engine?.name === 'com.google.android.tts';
            });

            if (googleEngine && !googleEngine?.default) {
              await Tts.setDefaultEngine('com.google.android.tts');
            }
          }
        }

        await Tts.setDucking(true);
        await Tts.setIgnoreSilentSwitch('ignore');
        await Tts.setDefaultLanguage(defaultLanguage);

        setState({ isReady: true });
      } catch (err) {
        let hasErrors = false;

        if (err?.code === 'no_engine') {
          try {
            await Tts.requestInstallEngine();
          } catch (err) {
            hasErrors = true;
          }
        }

        if (err?.code === 'lang_not_supported') {
          try {
            await Tts.requestInstallData();
          } catch (err) {
            hasErrors = true;
          }
        }

        if (!hasErrors) {
          setState({ isReady: true });
        }
      }
    },
    []
  );

  const handleStart = (event) => {
    setState({ isListen: true });
  };

  const handleProgress = (event) => { };

  const handleFinish = (event) => {
    textRef.current = [];
    positionRef.current = -1;
    currentIndex.current = 0;

    setState({ isListen: false });
  };

  const handleCancel = (event) => {
    textRef.current = [];
    positionRef.current = -1;
    currentIndex.current = 0;

    setState({ isListen: false });
  };

  const handleListen = async (text = []) => {
    if (!state.isReady || !text.length) {
      return;
    }

    textRef.current = text;

    // if (state.isListen) {
    if (isListenRef.current) {
      await handleStop();
      return;
    }

    const newText = text.join(' . ');
    Tts.speak(newText, params);
  };

  const handleStop = async () => {
    await Tts.stop();
  };

  const context = useMemo(() => ({
    ...state,
    handleStop,
    handleListen,
  }), [state]);

  return (
    <ListenContext.Provider value={context}>
      {children}
    </ListenContext.Provider>
  );
};
