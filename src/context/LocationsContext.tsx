import React, {
  useMemo,
  useEffect,
  createContext,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { LocationsService } from '~/services';
import useWithReducer from '~/hooks/use-with-reducer';
import useLoadingView from '~/hooks/use-loading-view';
import { storageKey } from '~/utils/app-environment';

const locationsKey = storageKey('@locations');

const initialState = {
  loading: true,
  locations: [],
};

export const LocationsContext = createContext({});

export const LocationsProvider = ({
  children,
}) => {
  const [state, setState] = useWithReducer(initialState);

  useLoadingView(state.loading);

  useEffect(() => {
    getLocations();
  }, []);

  const getLocations = async () => {
    let locations = [];
    const loading = false;

    try {
      const response = await LocationsService.getLocations();
      locations = response.data;

      await AsyncStorage.setItem(locationsKey, JSON.stringify(locations));
    } catch (error) {
      const value = await AsyncStorage.getItem(locationsKey);
      locations = value ? JSON.parse(value) : [];
    }

    setState({
      loading,
      locations,
    });
  };

  const context = useMemo(() => ({
    ...state,
  }), [state]);

  return (
    <LocationsContext.Provider value={context}>
      {children}
    </LocationsContext.Provider>
  );
};
