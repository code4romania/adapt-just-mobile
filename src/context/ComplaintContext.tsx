import React, {
  useMemo,
  createContext,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ComplaintUtil } from '~/utils';
import agencies from '~/constants/agencies';
import useWithReducer from '~/hooks/use-with-reducer';
import { getInstitutions } from '~/services/complaint-service';

const complaintState = {
  cnp: '',
  name: '',
  type: '',           // hurt, move, evaluation
  lat: null,
  lng: null,
  victim: '',         // me, other
  reason: '',
  details: [],
  uploads: [],
  proofType: '',      // yes, later, no
  signature: null,
  location: null,
  locationTo: null,
  locationToType: '', // location, none
  idCardUpload: null,
};

const initialState = {
  ...complaintState,

  step: 1,
  dataShown: false,
  triedSubmit: false,
  disclaimerShown: false,

  institutionsList: [],
  institutionsLoading: true,
};

export const ComplaintContext = createContext({});

export const ComplaintProvider = ({
  children,
}) => {
  const [state, setState] = useWithReducer(initialState);

  const steps = useMemo(() => {
    let steps = 9;

    switch (state.type) {
      case 'move':
        steps = 8;
        break;
      case 'evaluation':
        steps = 6;
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

  const locationToName = useMemo(() => {
    const { locationTo } = state;

    return locationTo?.label || locationTo?.name || '';
  }, [state.locationTo]);

  const institutions = useMemo(() => {
    let text = '';
    
    if (state.institutionsLoading) {
      return text;
    }

    if (state.institutionsList.length) {
      text = state.institutionsList.join(', ');
      text = `${text}.`;
    } else {
      text = agenciesText;
    }

    return text;
  }, [
    agenciesText,
    state.institutionsList,
    state.institutionsLoading
  ]);

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
        victim: state.victim,
      }; 
    }

    if (type && type !== 'hurt') {
      newState.details = [type];
    }

    setState(newState);
  };

  const setCnp = (cnp) => {
    setState({ cnp });
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

  const setSignature = (signature) => {
    setState({ signature });
  };

  const setIdCardUpload = (idCardUpload) => {
    setState({ idCardUpload });
  };

  const getInstitutionsAsync = async () => {
    if (!state.institutionsLoading) {
      setState({
        ...state,
        institutionsLoading: true,
      });
    }

    try {
      const params = {
        lat: state.lat,
        lng: state.lng,
        type: state.type,
        victim: state.victim,
        location_id: state.location?.id || null,
      };

      const institutionsList = await getInstitutions(params);
      setState({
        ...state,
        institutionsList,
        institutionsLoading: false,
      });
    } catch (error) {
      setState({
        ...state,
        institutionsLoading: false,
      });
    }
  };

  const submit = async () => {
    return await ComplaintUtil.create(state);
  };

  const context = useMemo(() => ({
    ...state,
    steps,
    locationName,
    agenciesText,
    locationToName,
    institutions,

    setCnp,
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
    setSignature,
    setIdCardUpload,
    setComplaintStep,
    getInstitutionsAsync,

    submit,
  }), [state]);

  return (
    <ComplaintContext.Provider value={context}>
      {children}
    </ComplaintContext.Provider>
  );
};
