import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import outfits from './outfit';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = width / 2 - 16;

const getSeasonFromTemp = (temp) => {
  if (temp >= 25) return 'yaz';
  if (temp >= 15) return 'ilkbahar';
  if (temp >= 10) return 'sonbahar';
  return 'kis';
};

export default function CombinationScreen({ route }) {
  const { weather } = route.params;
  const [season, setSeason] = useState(null);

  useEffect(() => {
    if (weather && weather.main && weather.main.temp !== undefined) {
      setSeason(getSeasonFromTemp(weather.main.temp));
    }
  }, [weather]);

  if (!season) return null;

  const allOutfits = outfits[season] || [];

  
  const leftColumn = [];
  const rightColumn = [];

  
  let leftHeight = 0;
  let rightHeight = 0;

  allOutfits.forEach((item, index) => {
    const height = 200 + (index % 3) * 50; 

    if (leftHeight <= rightHeight) {
      leftColumn.push({ ...item, height });
      leftHeight += height;
    } else {
      rightColumn.push({ ...item, height });
      rightHeight += height;
    }
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.column}>
        {leftColumn.map((item) => (
          <TouchableOpacity key={item.id} style={[styles.imageContainer, { height: item.height }]}>
            <Image source={item.local} style={styles.image} />
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.column}>
        {rightColumn.map((item) => (
          <TouchableOpacity key={item.id} style={[styles.imageContainer, { height: item.height }]}>
            <Image source={item.local} style={styles.image} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  column: {
    flex: 1,
    marginHorizontal: 6,
  },
  imageContainer: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: COLUMN_WIDTH,
    height: '100%',
    borderRadius: 12,
  },
});
