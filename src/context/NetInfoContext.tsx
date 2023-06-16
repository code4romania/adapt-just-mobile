import React, {
  useRef,
  useMemo,
  useEffect,
  createContext,
} from 'react';
import NetInfo, {
  NetInfoStateType,
} from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  UploadUtil,
  ComplaintUtil,
} from '~/utils';
import useWithReducer from '~/hooks/use-with-reducer';

const initialState = {
  isConnected: true,
  // isConnected: false,
  type: NetInfoStateType.none
};

export const NetInfoContext = createContext({});

export const NetInfoProvider = ({ children }) => {
  const isConnectedRef = useRef(true);
  const [state, setState] = useWithReducer(initialState);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(handleConnectionChange);

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const { isConnected } = state;

    if (isConnected !== isConnectedRef.current) {
      if (isConnected && !isConnectedRef.current) {
        checkComplaint();
      }

      isConnectedRef.current = state.isConnected;
    }
  }, [state.isConnected]);

  // const testConnection = () => {
  //   setTimeout(() => {
  //     setState({
  //       isConnected: true,
  //     });
  //   }, 5000);
  // };

  const checkComplaint = async () => {
    let complaint = await AsyncStorage.getItem('@complaint');
    if (!complaint) {
      return;
    }

    complaint = JSON.parse(complaint);

    if (
      complaint?.triedSubmit &&
      complaint?.step === complaint?.steps - 1
    ) {
      const newUploads = [];
      let uploads = complaint.uploads;

      if (uploads.length > 0) {
        for (const upload of uploads) {
          if (!upload?.id) {
            const newUpload = await UploadUtil.uploadFile(upload);
            if (newUpload) {
              newUploads.push(newUpload);
            }
          }
        }

        uploads = uploads.filter(upload => upload?.id);
        uploads = [...uploads, ...newUploads];
        complaint.uploads = uploads;

        try {
          await ComplaintUtil.create(complaint);
          await AsyncStorage.removeItem('@complaint');
        } catch (error) {}
      }
    }
  };

  const handleConnectionChange = (netInfoState) => {
    const {
      type,
      isConnected,
    } = netInfoState;

    setState({
      type,
      isConnected,
    });
  };

  const fetchNetInfo = () => {
    NetInfo.fetch().then(netState => {
      const { isConnected, type } = netState;
      setState({ isConnected, type });
    }).catch(error => {});
  };

  const context = useMemo(() => ({
    ...state,
    fetchNetInfo,
    // testConnection,
  }), [state]);

  return (
    <NetInfoContext.Provider value={context}>
      {children}
    </NetInfoContext.Provider>
  );
};
