import React, {
  useRef,
  useMemo,
  useContext,
} from 'react';
import {
  View,
  Text,
  FlatList,
} from 'react-native';
import {
  vs,
  ScaledSheet,
} from 'react-native-size-matters/extend';

import ComplaintLocation from './ComplaintLocation';
import { LocationsContext } from '~/context/LocationsContext';

const itemHeight = vs(60);

const ListHeader = ({
  count = 0,
}) => {
  const text = useMemo(() => {
    if (!count) {
      return 'Nu s-au găsit rezultate';
    }

    return `${count} ${count > 1 ? 'rezultate' : 'rezultat'}`;
  }, [count]);

  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>
        {text}
      </Text>
    </View>
  );
};

const ComplaintLocations = ({
  search = '',
  location = null,
  screen = 'ComplaintLocation',
}) => {
  const list = useRef(null);

  const {
    locations: allLocations,
  } = useContext(LocationsContext);

  const locations = useMemo(() => {
    let loc = [...allLocations];
    if (location?.id) {
      loc = loc.filter(l => l.id !== location.id);
      loc.unshift(location);
    }

    if (!search) {
      return loc;
    }

    const s = search.trim().toLowerCase();

    return loc.filter(
      l => {
        const name = `${l.name} ${l.city_name}`.toLowerCase();
        const label = `${l.label}, ${l.city_label}`.toLowerCase();
        
        return name.includes(s) || label.includes(s);
      }
    );
  }, [search, location]);

  const getItemLayout = (_, index) => ({
    index,
    length: itemHeight,
    offset: itemHeight * index,
  });

  const renderItem = ({ item }) => {
    const isSelected = item.id === location?.id;

    return (
      <ComplaintLocation
        location={item}
        search={search}
        screen={screen}
        isSelected={isSelected}
      />
    );
  };

  return (
    <FlatList
      ref={list}
      data={locations}
      renderItem={renderItem}
      initialNumToRender={20}
      getItemLayout={getItemLayout}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      keyExtractor={(item) => `location_${item.id}`}
      ListHeaderComponent={<ListHeader count={locations.length} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

export default ComplaintLocations;

const styles = ScaledSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: '10@vs',
  },
  header: {
    paddingTop: '20@vs',
    marginBottom: '16@vs',
    marginHorizontal: '20@s',
  },
  headerText: {
    color: '#333333',
    fontSize: '14@msr',
    lineHeight: '21@msr',
    textTransform: 'uppercase',
    fontFamily: 'EncodeSans-Medium',
  },
  separator: {
    height: '8@vs',
  },
});
