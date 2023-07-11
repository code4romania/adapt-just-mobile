import React, {
  useMemo,
  createContext,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ComplaintUtil } from '~/utils';
import agencies from '~/constants/agencies';
import useWithReducer from '~/hooks/use-with-reducer';

const complaintState = {
  name: '',
  type: '',           // hurt, move, evaluation
  lat: null,
  lng: null,
  victim: '',         // me, other
  reason: '',
  details: [],
  uploads: [],
  proofType: '',      // yes, later, no
  location: null,
  locationTo: null,
  locationToType: '', // location, none
};

const initialState = {
  ...complaintState,

  step: 1,
  dataShown: false,
  triedSubmit: false,
  disclaimerShown: false,
};

export const ComplaintContext = createContext({});

export const ComplaintProvider = ({
  children,
}) => {
  const [state, setState] = useWithReducer(initialState);

  const steps = useMemo(() => {
    let steps = 7;

    switch (state.type) {
      case 'move':
        steps = 6;
        break;
      case 'evaluation':
        steps = 4;
        break;
      default:
        break;
    }

    return steps;
  }, [state.type]);

  const agenciesText = useMemo(() => {
    let tp = state.type || 'hurt';
    if (state.victim === 'other') {
      tp = 'hurt';
    }

    const text = agencies[tp].map((agency, index) => {
      if (index === 0) {
        return agency;
      }

      if (index === agencies[tp].length - 1) {
        return ` și ${agency}.`;
      }
    
      return `, ${agency}`;
    }).join('') || '';

    return text;
  }, [
    state.type,
    state.victim,
  ]);

  const locationName = useMemo(() => {
    const { location } = state;

    return location?.label || location?.name || '';
  }, [state.location]);

  const setComplaint = (complaint) => {
    setState({
      ...complaint,
      triedSubmit: false,
    });
  };

  const resetComplaint = async (params = {}) => {
    const data = {
      ...initialState,
      ...params,
    };

    await AsyncStorage.setItem(
      '@complaint',
      JSON.stringify(data)
    );

    setState(data);
  };

  const setCoords = (lat = null, lng = null) => {
    setState({
      lat,
      lng,
    });
  };

  const setComplaintStep = async (params = {}) => {
    const data = {
      ...state,
      ...params,
    };

    await AsyncStorage.setItem(
      '@complaint',
      JSON.stringify(data)
    );

    setState(data);
  };

  const setVictim = async (victim) => {
    if (state.victim && victim !== state.victim) {
      await resetComplaint({
        victim,
      });

      return;
    }

    setState({
      ...state,
      victim,
    });
  };

  const setType = (type) => {
    let newState = {
      ...state,
      type,
    };

    if (state.type && type !== state.type) {
      newState = {
        ...initialState,
        type,
      }; 
    }

    if (type && type !== 'hurt') {
      newState.details = [type];
    }

    setState(newState);
  };

  const setName = (name) => {
    setState({ name });
  };

  const setLocation = (location) => {
    setState({ location });
  };

  const setLocationTo = (locationTo) => {
    const newState = {
      ...state,
      locationTo,
    };

    if (locationTo) {
      newState.locationToType = 'location';
    }

    setState(newState);
  };

  const setLocationToType = (locationToType) => {
    const newState = {
      ...state,
      locationToType,
    };

    if (locationToType === 'none') {
      newState.locationTo = null;
    }

    setState(newState);
  };

  const setDetails = (details) => {
    setState({ ...details });
  };

  const setReason = (reason) => {
    setState({ reason });
  };

  const setProofType = (proofType) => {
    setState({ proofType });
  };

  const setUploads = (uploads) => {
    setState({ uploads });
  };

  const submit = async () => {
    return await ComplaintUtil.create(state);
  };

  const context = useMemo(() => ({
    ...state,
    steps,
    locationName,
    agenciesText,

    setCoords,
    setComplaint,
    resetComplaint,
    setVictim,
    setType,
    setName,
    setLocation,
    setLocationTo,
    setLocationToType,
    setDetails,
    setReason,
    setProofType,
    setUploads,
    setComplaintStep,

    submit,
  }), [state]);

  return (
    <ComplaintContext.Provider value={context}>
      {children}
    </ComplaintContext.Provider>
  );
};
