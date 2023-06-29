import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import {
  vs,
  ScaledSheet,
} from 'react-native-size-matters/extend';

import HomeButton from '~/components/shared/buttons/HomeButton';
import ScreenTitle from '~/components/shared/screens/ScreenTitle';
import ScreenContainer from '~/components/shared/screens/ScreenContainer';

import {
  complaintName,
  askHelpComplaint,
} from '~/assets/images';

const listenText = [
  'Înapoi',
  'Cum fac o plângere?',
  'Dacă vrei să faci o plângere, apasă pe cere ajutor din ecranul principal',
  'După ce ai apăsat pe cere ajutor, în funcție de nevoile pe care le ai, va trebui să completezi un formular cu o serie de informații precum nume, unde te afli sau ce ai pățit',
  'Dacă nu știi sau nu poți să scrii, poți să și vorbești',
  'Tot ce trebuie să faci e să ții apăsat pe microfon și să te oprești când ai terminat',
  'Atenție!',
  'Unii pași sunt obligatorii și nu vei putea apăsa pe continuă până nu completezi cererea',
  'După ce completezi cererea și ești sigur că vrei să o trimiți, apasă pe trimite',
  'După ce ai trimis cererea, această acțiune nu mai poate fi dată înapoi',
];

const AboutComplaintScreen = () => {
  return (
    <ScreenContainer
      listenText={listenText}
    >
      <View style={styles.buttonContainer}>
        <HomeButton
          screenName="Înapoi"
          screen="HowToUseApp"
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
      >
        <View style={styles.titleContainer}>
          <ScreenTitle
            marginTop={vs(25)}
            title="Cum fac o plângere?"
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.text}>
            Dacă vrei să faci o plângere, apasă pe <Text style={styles.textBold}>cere ajutor</Text> din ecranul principal.
          </Text>

          <View style={styles.imageContainer}>
            <Image
              resizeMode="contain"
              source={askHelpComplaint}
            />
          </View>

          <Text style={styles.text}>
            După ce ai apăsat pe cere ajutor, în funcție de nevoile pe care le ai, va trebui să completezi un formular cu o serie de informații precum nume, unde te afli sau ce ai pățit.{`\r\n`}
          </Text>
          <Text style={styles.text}>
            Dacă nu știi sau nu poți să scrii, poți să și vorbești.{`\r\n`}
          </Text>
          <Text style={styles.text}>
            Tot ce trebuie să faci e să ții apăsat pe microfon și să te oprești când ai terminat.
          </Text>

          <View style={styles.imageContainer}>
            <Image
              resizeMode="contain"
              source={complaintName}
            />
          </View>

          <Text style={[
            styles.text,
            styles.textBold,
          ]}>
            Atenție!
          </Text>
          <Text style={styles.text}>
            Unii pași sunt obligatorii și nu vei putea apăsa pe continuă până nu completezi cererea.{`\r\n`}
          </Text>
          <Text style={styles.text}>
            După ce completezi cererea și ești sigur că vrei să o trimiți, apasă pe trimite.{`\r\n`}
          </Text>
          <Text style={styles.text}>
            După ce ai trimis cererea, această acțiune nu mai poate fi dată înapoi.
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default AboutComplaintScreen;

const styles = ScaledSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: '40@vs',
  },
  buttonContainer: {
    marginTop: '35@vs',
    flexDirection: 'row',
    paddingBottom: '5@vs',
    marginHorizontal: '30@s',
  },
  titleContainer: {
    paddingHorizontal: '38@s',
  },
  content: {
    marginTop: '40@vs',
    paddingHorizontal: '35@s',
  },
  text: {
    color: '#000',
    fontSize: '20@msr',
    lineHeight: '26@msr',
    letterSpacing: '0.6@msr',
    textTransform: 'uppercase',
    fontVariant: ['small-caps'],
    fontFamily: 'EncodeSans-Regular',
  },
  textBold: {
    fontFamily: 'EncodeSans-Bold',
  },
  imageContainer: {
    marginTop: '28@vs',
    alignItems: 'center',
    marginBottom: '32@vs',
  },
});
