import React, {
  useRef,
  useMemo,
  useContext,
} from 'react';
import {
  View,
  FlatList,
} from 'react-native';
import {
  vs,
  ScaledSheet,
} from 'react-native-size-matters/extend';

import { LocationsContext } from '~/context/LocationsContext';

import ComplaintLocation from './ComplaintLocation';
import ListEmpty from '~/components/shared/screens/ListEmpty';
import ComplaintLocationsHeader from './ComplaintLocationsHeader';

const itemHeight = vs(60);

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

  const renderListEmpty = () => {
    return (
      <ListEmpty
        text="Nu s-au găsit rezultate"
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
      ListEmptyComponent={renderListEmpty}
      contentContainerStyle={styles.container}
      keyExtractor={(item) => `location_${item.id}`}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={<ComplaintLocationsHeader count={locations.length} />}
    />
  );
};

export default ComplaintLocations;

const styles = ScaledSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: '10@vs',
  },
  separator: {
    height: '8@vs',
  },
});
