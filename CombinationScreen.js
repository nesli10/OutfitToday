import React, { useState, useRef } from 'react';
import { View, Image, StyleSheet, FlatList, Dimensions } from 'react-native';
import outfitsData from './outfit.json';

const windowWidth = Dimensions.get('window').width;
const imageWidth = (windowWidth - 60) / 2;
const ITEMS_PER_PAGE = 4;

export default function CombinationScreen({ route }) {
  const { weather } = route.params;

  const temp = weather.main.temp;

  let sezon = 'ilkbahar';
  if (temp >= 25) sezon = 'yaz';
  else if (temp < 10) sezon = 'kis';
  else if (temp >= 10 && temp < 20) sezon = 'sonbahar';

  const selectedOutfits = outfitsData[sezon] || outfitsData.ilkbahar;

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const onEndReachedCalledDuringMomentum = useRef(false);

  const visibleOutfits = selectedOutfits.slice(0, visibleCount);

  const loadMore = () => {
    if (onEndReachedCalledDuringMomentum.current) return;
    if (visibleCount >= selectedOutfits.length) return;

    setVisibleCount(prev => Math.min(prev + ITEMS_PER_PAGE, selectedOutfits.length));
    onEndReachedCalledDuringMomentum.current = true;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={visibleOutfits}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        onMomentumScrollBegin={() => { onEndReachedCalledDuringMomentum.current = false; }}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item, index }) => {
          const isSecondRow = index >= 2;
          return (
            <View style={[styles.card, isSecondRow && { marginTop: 40 }]}>
              <Image source={{ uri: item.uri }} style={styles.image} />
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    backgroundColor: '#fafafa',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    width: imageWidth,
    height: imageWidth * 1.4,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
