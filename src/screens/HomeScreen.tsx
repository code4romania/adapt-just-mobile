import React, {
  useRef,
  useEffect,
  useContext,
} from 'react';
import {
  View,
  Platform,
  ScrollView,
} from 'react-native';
import {
  check,
  request,
  RESULTS,
  PERMISSIONS,
} from 'react-native-permissions';
import {
  ms,
  ScaledSheet,
} from 'react-native-size-matters/extend';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  UploadUtil,
  ComplaintUtil,
} from '~/utils';
import { NetInfoContext } from '~/context/NetInfoContext';
import { LocationsContext } from '~/context/LocationsContext';

import HomeMenu from '~/components/home/HomeMenu';
import ScreenTitle from '~/components/shared/screens/ScreenTitle';
import ScreenContainer from '~/components/shared/screens/ScreenContainer';

const title = 'Cu ce te putem ajuta?';

const listenText = [
  'Cu ce te putem ajuta?',
  'Cere ajutor',
  'Informații',
  'Resurse de sprijin',
  'Despre aplicație',
  'Sună la 1 1 2',
];

const HomeScreen = ({
  navigation,
}) => {
  const complaintRef = useRef('');

  const { loading } = useContext(LocationsContext);
  const { isConnected } = useContext(NetInfoContext);

  useEffect(() => {
    const getData = async () => {
      const complaint = await AsyncStorage.getItem('@complaint');

      if (!complaint) return;
      complaintRef.current = complaint;

      if (isConnected) {
        checkComplaint();
      }
    };

    getData();
  }, []);

  useEffect(() => {
    if (!loading) {
      checkSpeechPermissions();
    }
  }, [loading]);

  const checkComplaint = async () => {
    const complaint = JSON.parse(complaintRef.current);

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

  const checkSpeechPermissions = () => {
    let permission = PERMISSIONS.IOS.SPEECH_RECOGNITION;

    if (Platform.OS === 'android') {
      permission = PERMISSIONS.ANDROID.RECORD_AUDIO;
    }

    check(permission)
      .then((result) => {
        if (result === RESULTS.DENIED) {
          request(permission).then(pResult => {
            if (pResult === RESULTS.GRANTED) {}
          }).catch((e) => {});
        } else if (result === RESULTS.BLOCKED) {
        } else if (result === RESULTS.GRANTED) {
        } else if (result === RESULTS.UNAVAILABLE) {}
      })
      .catch((e) => {});
  };

  return (
    <ScreenContainer
      listenText={listenText}
    >
      <ScrollView
        contentContainerStyle={styles.container}
      >
        <ScreenTitle
          title={title}
          fontSize={ms(32)}
        />

        <View style={styles.menu}>
          <HomeMenu
            navigation={navigation}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default HomeScreen;

const styles = ScaledSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: '30@msr',
  },
  menu: {
    marginTop: '40@vs',
  },
});
