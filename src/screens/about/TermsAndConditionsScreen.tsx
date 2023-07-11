import React from 'react';
import {
  View,
  Text,
  Linking,
  ScrollView,
} from 'react-native';
import {
  vs,
  ms,
  ScaledSheet,
} from 'react-native-size-matters/extend';

import HomeButton from '~/components/shared/buttons/HomeButton';
import ScreenTitle from '~/components/shared/screens/ScreenTitle';
import ScreenContainer from '~/components/shared/screens/ScreenContainer';

const listenText = [
  'Înapoi',
  'Termeni și condiții',
  'Termenii și Condițiile generale de utilizare stabilesc termenii și condițiile generale de utilizare a aplicației Ceasul Bun de către potențialii vizitatori sau beneficiari',
  'Ceasul Bun (în continuare denumit aplicația, Ceasul Bun) este o aplicație dedicată ajutorării persoanelor instituționalizate sau persoanelor care lucrează în centre rezidențiale, unități medicale, instituții psihiatrice sau alte astfel de instituții pentru a raporta situații de abuz fizic, psihologic sau neglijență. Ca urmare a faptului că persoanele cu dizabilități constituie grupul principal de utilizatori, aplicația este accesibilizată în termeni de vocabular și navigare. Dincolo de procesul ușor de parcurs și componente simple, aplicația are integrat cititor de ecran în interfața sa și o funcție de înregistrare care transformă discursul în text',
  'Asociația Code for Romania este o persoană juridică, având sediul în Municipiul București, Piața Alba Iulia număr 7, bloc I6, etaj 1, apartament 6, înregistrată în registrul special, Partea A, secțiunea I 67/06.07.2016',
  'Unu. Obiectivul aplicației',
  'Obiectivul Ceasul Bun este să ajute persoanele instituționalizate să raporteze abuzuri',
  'Aplicația permite utilizatorilor să transmită rapoarte și sesizări care sunt transferate direct către autoritățile competente',
  'Aplicația permite utilizatorilor să consulte resurse despre cum pot raporta abuzuri și ce servicii au la dispoziție precum și ghiduri utile',
  'Doi. Date personale',
  'Completând formularele puse la dispoziție în paginile aplicației putem colecta următoarele date personale:',
  'Nume și prenume',
  'Informații de localizare',
  'Fișiere pe care utilizatorul alege să le încarce',
  'Trei. Scop și temei',
  'Code for Romania procesează date cu caracter personal doar în interesul utilizatorilor care doresc să trimită o plângere sau o sesizare către autoritățile competente',
  'Patru. Durata stocării',
  'Datele personale furnizate sunt stocate temporar pe durata funcționării aplicației',
  'Cinci. Transmiterea Datelor personale către terți',
  'Code for Romania nu va furniza datele personale către terți care nu sunt listați în directorul de instituții al aplicației. Datele pot fi furnizate către instituții sau autorități publice, precum și altor organe abilitate ale statului, în baza și în limitele prevederilor legale, ca urmare a unor cereri expres formulate de acestea',
  'Șase. Drepturile tale',
  'În calitate de utilizator al aplicației, potrivit Legii număr 679/2016, precum și, începând cu 25 mai 2018, potrivit Regulamentului General privind protecția datelor, ai următoarele drepturi:',
  'Dreptul la informare cu privire la prelucrarea datelor personale de către Code for Romania;',
  'Dreptul de acces la datele personale, la cerere și în mod gratuit pentru o solicitare pe an;',
  'Dreptul de intervenție, rectificarea, ștergerea sau portabilitatea datelor personale, la cerere și în mod gratuit;',
  'Dreptul de a te adresa Autorității Naționale de Supraveghere privind Prelucrarea Datelor cu Caracter Personal (cu sediul în Bucureşti sector 1, Bulevardul General Gheorghe Magheru, www.dataprotection.ro) sau justiției, pentru apărarea oricăror drepturi garantate de lege;',
  'Dreptul la opoziţie şi procesul decizional individual automatizat;',
  'începând cu 25 mai 2018, potrivit Regulamentului general privind protecția datelor, dreptul la restricționarea prelucrării',
  'Șapte. Securitate și confidențialitate',
  'Protecția informațiilor în cursul prelucrării datelor tale personale este o preocupare majoră a Code for Romania, de aceea toate datele personale colectate în cursul utilizării aplicației sunt prelucrate conform prevederilor legale în vigoare în România. Code for Romania folosește tehnologii de ultimă generație și ia toate măsurile tehnice rezonabile pentru transmiterea și păstrarea datelor personale în condiții de deplină securitate și confidențialitate',
  'Toate datele personale de pe site sunt stocate și procesate pe servere situate în Uniunea Europeană, ce cad sub incidența legislației europene de protecție a datelor personale. Nicio informație oferită pe acest site nu părăsește teritoriul Uniunii Europene',
  'Code for Romania se angajează să nu dezvăluie datele personale cu privire la vizitele tale în aplicație, exceptând situațiile legale sau situațiile prezentate în acest document de Termeni și Condiții',
  'Dacă descoperim un incident cu privire la securitatea datelor personale care prezintă un risc pentru drepturile și libertățile utilizatorilor noștri, vom notifica Autoritatea Națională de Supraveghere privind Prelucrarea Datelor cu Caracter Personale în termen de 72 de ore. Dacă incidentul de securitate este de natură să prezinte un risc ridicat pentru drepturile și libertățile tale, vei fi, de asemenea, notificat',
  'Opt. Marca și dreptul de autor',
  'Dreptul de autor pentru toate informațiile existente în aplicație este deținut de Code for Romania. Nici un material nu poate fi reprodus parțial, integral sau modificat fără acordul expres exprimat de catre Code for Romania, titularul acestui drept',
  'Toate drepturile sunt rezervate.',
  'Este strict interzisă folosirea aplicației în scopul distrugerii sau alterării sale, a conținutului său a securității acesteia ori pentru discreditarea sau hărțuirea Ceasul Bun sau a organizației Code for Romania și a membrilor acesteia',
  'Code for Romania va aplica toate măsurile de securitate tehnică și organizatorică pentru protejarea datelor asupra cărora deține controlul împotriva oricărei situații de manipulare accidentală sau intenționată, pierdere, distrugere sau împotriva accesului unei persoane neautorizate',
  'Nouă. Modificări Termeni și Condiții generale de utilizare Site',
  'Termenii și Condițiile generale de utilizare constituie, în întregime, un acord încheiat între dumneavoastră și Code for Romania în privința utilizării Ceasul Bun',
  'Code for Romania își rezervă dreptul de a revizui și aduce la zi "Termenii și Condițiile generale de utilizare" în orice moment, fără o anunțare sau o acceptare prealabilă a utilizatorilor',
  'Dacă aveți întrebări cu privire la informațiile cuprinse în această pagină vă rugăm să ne scrieți la adresa code4@code4.ro',
  'Zece. Despre Code for Romania',
  'Code for Romania este o organizație neguvernamentală independentă, neafiliată politic și apolitică, înființată în anul 2016, al cărei scop este de a mobiliza tinerii profesioniști din domeniul IT să creeze instrumente digitale care ajută în soluționarea problemelor sociale. Code for Romania este înființată și funcționează în conformitate cu legea română, actul constitutiv și statutul său și codul de conduită',
  'Unsprezece. Contactează Code for Romania',
  'Pentru orice întrebări sau preocupări, precum și pentru exercitarea drepturilor tale legate de prelucrarea datelor personale de către Code for Romania, ne poți contacta la:',
  'Adresa: Piața Alba Iulia număr 7, bloc I6, etaj 1, apartament 6, municipiul București, Romania',
  'E-mail: contact@code4.ro',
];

const TermsAndConditionsScreen = () => {
  const openCodeOfConduct = () => {
    const url = 'https://code4.ro/ro/codul-de-conduita';
    try {
      Linking.openURL(url);
    } catch (error) {}
  };

  return (
    <ScreenContainer
      listenText={listenText}
    >
      <View style={styles.buttonContainer}>
        <HomeButton
          screen="AboutApp"
          screenName="Înapoi"
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
      >
        <View style={styles.titleContainer}>
          <ScreenTitle
            marginTop={vs(25)}
            title="Termeni și condiții"
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.text}>
            Termenii și Condițiile generale de utilizare stabilesc termenii și condițiile generale de utilizare a aplicației Ceasul Bun de către potențialii vizitatori sau beneficiari.
          </Text>
          <Text style={styles.text}>
            "Ceasul Bun" (în continuare denumit "aplicația", ”Ceasul Bun”) este o aplicație dedicată ajutorării persoanelor instituționalizate sau persoanelor care lucrează în centre rezidențiale, unități medicale, instituții psihiatrice sau alte astfel de instituții pentru a raporta situații de abuz fizic, psihologic sau neglijență. Ca urmare a faptului că persoanele cu dizabilități constituie grupul principal de utilizatori, aplicația este accesibilizată în termeni de vocabular și navigare. Dincolo de procesul ușor de parcurs și componente simple, aplicația are integrat cititor de ecran în interfața sa și o funcție de înregistrare care transformă discursul în text.
          </Text>
          <Text style={styles.text}>
            Asociația Code for Romania este o persoană juridică, având sediul în Mun. București, Piața Alba Iulia nr. 7, bloc I6, etaj 1, ap. 6, înregistrată în registrul special, Partea A, secțiunea I 67/06.07.2016.
          </Text>

          <ScreenTitle
            fontSize={ms(16)}
            marginTop={vs(25)}
            title="1. Obiectivul aplicației"
          />
          <Text style={styles.text}>
            Obiectivul Ceasul Bun este să ajute persoanele instituționalizate să raporteze abuzuri.
          </Text>
          <View style={styles.row}>
            <View style={styles.bullet} />
            <Text style={[styles.text, styles.rowText]}>
              Aplicația permite utilizatorilor să transmită rapoarte și sesizări care sunt transferate direct către autoritățile competente
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.bullet} />
            <Text style={[styles.text, styles.rowText]}>
              Aplicația permite utilizatorilor să consulte resurse despre cum pot raporta abuzuri și ce servicii au la dispoziție precum și ghiduri utile
            </Text>
          </View>

          <ScreenTitle
            fontSize={ms(16)}
            marginTop={vs(25)}
            title="2. Date personale"
          />
          <Text style={styles.text}>
            Completând formularele puse la dispoziție în paginile aplicației putem colecta următoarele date personale:
          </Text>
          <View style={styles.row}>
            <View style={styles.bullet} />
            <Text style={[styles.text, styles.rowText]}>
              Nume și prenume
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.bullet} />
            <Text style={[styles.text, styles.rowText]}>
              Informații de localizare
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.bullet} />
            <Text style={[styles.text, styles.rowText]}>
              Fișiere pe care utilizatorul alege să le încarce
            </Text>
          </View>

          <ScreenTitle
            fontSize={ms(16)}
            marginTop={vs(25)}
            title="3. Scop și temei"
          />
          <Text style={styles.text}>
            Code for Romania procesează date cu caracter personal doar în interesul utilizatorilor care doresc să trimită o plângere sau o sesizare către autoritățile competente.
          </Text>

          <ScreenTitle
            fontSize={ms(16)}
            marginTop={vs(25)}
            title="4. Durata stocării"
          />
          <Text style={styles.text}>
            Datele personale furnizate sunt stocate temporar pe durata funcționării aplicației.
          </Text>

          <ScreenTitle
            fontSize={ms(16)}
            marginTop={vs(25)}
            title="5. Transmiterea Datelor personale către terți"
          />
          <Text style={styles.text}>
            Code for Romania nu va furniza datele personale către terți care nu sunt listați în directorul de instituții al aplicației. Datele pot fi furnizate către instituții sau autorități publice, precum și altor organe abilitate ale statului, în baza și în limitele prevederilor legale, ca urmare a unor cereri expres formulate de acestea.
          </Text>

          <ScreenTitle
            fontSize={ms(16)}
            marginTop={vs(25)}
            title="6. Drepturile tale"
          />
          <Text style={styles.text}>
            În calitate de utilizator al aplicației, potrivit Legii nr. 679/2016, precum și, începând cu 25 mai 2018, potrivit Regulamentului General privind protecția datelor, ai următoarele drepturi:
          </Text>
          <View style={styles.row}>
            <View style={styles.bullet} />
            <Text style={[styles.text, styles.rowText]}>
              Dreptul la informare cu privire la prelucrarea datelor personale de către Code for Romania;
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.bullet} />
            <Text style={[styles.text, styles.rowText]}>
              Dreptul de acces la datele personale, la cerere și în mod gratuit pentru o solicitare pe an;
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.bullet} />
            <Text style={[styles.text, styles.rowText]}>
              Dreptul de intervenție, rectificarea, ștergerea sau portabilitatea datelor personale, la cerere și în mod gratuit;
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.bullet} />
            <Text style={[styles.text, styles.rowText]}>
              Dreptul de a te adresa Autorității Naționale de Supraveghere privind Prelucrarea Datelor cu Caracter Personal (cu sediul în Bucureşti sector 1, B-dul G-ral. Gheorghe Magheru, www.dataprotection.ro) sau justiției, pentru apărarea oricăror drepturi garantate de lege;
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.bullet} />
            <Text style={[styles.text, styles.rowText]}>
              Dreptul la opoziţie şi procesul decizional individual automatizat;
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.bullet} />
            <Text style={[styles.text, styles.rowText]}>
              începând cu 25 mai 2018, potrivit Regulamentului general privind protecția datelor, dreptul la restricționarea prelucrării.
            </Text>
          </View>

          <ScreenTitle
            fontSize={ms(16)}
            marginTop={vs(25)}
            title="7. Securitate și confidențialitate"
          />
          <Text style={styles.text}>
            Protecția informațiilor în cursul prelucrării datelor tale personale este o preocupare majoră a Code for Romania, de aceea toate datele personale colectate în cursul utilizării aplicației sunt prelucrate conform prevederilor legale în vigoare în România. Code for Romania folosește tehnologii de ultimă generație și ia toate măsurile tehnice rezonabile pentru transmiterea și păstrarea datelor personale în condiții de deplină securitate și confidențialitate.
          </Text>
          <Text style={styles.text}>
            Toate datele personale de pe site sunt stocate și procesate pe servere situate în Uniunea Europeană, ce cad sub incidența legislației europene de protecție a datelor personale. Nicio informație oferită pe acest site nu părăsește teritoriul Uniunii Europene.
          </Text>
          <Text style={styles.text}>
            Code for Romania se angajează să nu dezvăluie datele personale cu privire la vizitele tale în aplicație, exceptând situațiile legale sau situațiile prezentate în acest document de Termeni și Condiții.
          </Text>
          <Text style={styles.text}>
            Dacă descoperim un incident cu privire la securitatea datelor personale care prezintă un risc pentru drepturile și libertățile utilizatorilor noștri, vom notifica Autoritatea Națională de Supraveghere privind Prelucrarea Datelor cu Caracter Personale în termen de 72 de ore. Dacă incidentul de securitate este de natură să prezinte un risc ridicat pentru drepturile și libertățile tale, vei fi, de asemenea, notificat
          </Text>

          <ScreenTitle
            fontSize={ms(16)}
            marginTop={vs(25)}
            title="8. Marca și dreptul de autor"
          />
          <Text style={styles.text}>
            Dreptul de autor pentru toate informațiile existente în aplicație este deținut de Code for Romania. Nici un material nu poate fi reprodus parțial, integral sau modificat fără acordul expres exprimat de catre Code for Romania, titularul acestui drept.
          </Text>
          <View style={styles.row}>
            <View style={styles.bullet} />
            <Text style={[styles.text, styles.rowText]}>
              Toate drepturile sunt rezervate.
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.bullet} />
            <Text style={[styles.text, styles.rowText]}>
              Este strict interzisă folosirea aplicației în scopul distrugerii sau alterării sale, a conținutului său a securității acesteia ori pentru discreditarea sau hărțuirea Ceasul Bun sau a organizației Code for Romania și a membrilor acesteia.
            </Text>
          </View>
          <View style={styles.row}>
            <View style={styles.bullet} />
            <Text style={[styles.text, styles.rowText]}>
              Code for Romania va aplica toate măsurile de securitate tehnică și organizatorică pentru protejarea datelor asupra cărora deține controlul împotriva oricărei situații de manipulare accidentală sau intenționată, pierdere, distrugere sau împotriva accesului unei persoane neautorizate.
            </Text>
          </View>

          <ScreenTitle
            fontSize={ms(16)}
            marginTop={vs(25)}
            title="9. Modificări Termeni și Condiții generale de utilizare Site"
          />
          <Text style={styles.text}>
            "Termenii și Condițiile generale de utilizare" constituie, în întregime, un acord încheiat între dumneavoastră și Code for Romania în privința utilizării Ceasul Bun.
          </Text>
          <Text style={styles.text}>
            Code for Romania își rezervă dreptul de a revizui și aduce la zi "Termenii și Condițiile generale de utilizare" în orice moment, fără o anunțare sau o acceptare prealabilă a utilizatorilor.
          </Text>
          <Text style={styles.text}>
            Dacă aveți întrebări cu privire la informațiile cuprinse în această pagină vă rugăm să ne scrieți la adresa code4@code4.ro.
          </Text>

          <ScreenTitle
            fontSize={ms(16)}
            marginTop={vs(25)}
            title="10. Despre Code for Romania"
          />
          <Text style={styles.text}>
            Code for Romania este o organizație neguvernamentală independentă, neafiliată politic și apolitică, înființată în anul 2016, al cărei scop este de a mobiliza tinerii profesioniști din domeniul IT să creeze instrumente digitale care ajută în soluționarea problemelor sociale. Code for Romania este înființată și funcționează în conformitate cu legea română, actul constitutiv și statutul său și <Text style={styles.linkText} onPress={openCodeOfConduct}>codul de conduită</Text>.
          </Text>

          <ScreenTitle
            fontSize={ms(16)}
            marginTop={vs(25)}
            title="11. Contactează Code for Romania"
          />
          <Text style={styles.text}>
            Pentru orice întrebări sau preocupări, precum și pentru exercitarea drepturilor tale legate de prelucrarea datelor personale de către Code for Romania, ne poți contacta la:
          </Text>
          <Text style={styles.text}>
            Adresa: Piața Alba Iulia nr. 7, bloc I6, etaj 1, ap. 6, mun. București, Romania
          </Text>
          <Text style={styles.text}>
            E-mail: contact@code4.ro
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default TermsAndConditionsScreen;

const styles = ScaledSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: '30@vs',
  },
  buttonContainer: {
    marginTop: '35@vs',
    flexDirection: 'row',
    paddingBottom: '5@vs',
    marginHorizontal: '30@s',
  },
  titleContainer: {
    paddingHorizontal: '30@s',
  },
  content: {
    paddingHorizontal: '24@s',
  },
  row: {
    marginLeft: '20@s',
    marginTop: '10@vs',
    flexDirection: 'row',
  },
  bullet: {
    width: '8@msr',
    height: '8@msr',
    marginTop: '10@vs',
    marginRight: '10@s',
    borderRadius: '4@msr',
    backgroundColor: '#000',
  },
  text: {
    color: '#000',
    fontSize: '16@msr',
    marginTop: '20@vs',
    fontFamily: 'EncodeSans-Regular'
  },
  linkText: {
    textDecorationLine: 'underline',
    fontFamily: 'EncodeSans-SemiBold',
  },
  rowText: {
    flex: 1,
    marginTop: 0,
  },
});
