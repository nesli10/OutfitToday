import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import * as Location from 'expo-location';

const API_KEY = '4f5212169a2fe0f4064eb5c28f01bc8b';

export default function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getWeather();
  }, []);

  const getWeather = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Konum izni reddedildi');
        setLoading(false);
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=tr&appid=${API_KEY}`
      );
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      Alert.alert('Hava durumu alınamadı');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#10B981" />
      </View>
    );
  }

  if (!weather || !weather.weather) {
    return (
      <View style={styles.container}>
        <Text>Hava durumu verisi bulunamadı.</Text>
      </View>
    );
  }

  const icon = weather.weather[0].icon;
  const description = weather.weather[0].description;
  const temperature = Math.round(weather.main.temp);
  const locationName = weather.name;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `https://openweathermap.org/img/wn/${icon}@4x.png` }}
        style={styles.weatherIcon}
      />
      <Text style={styles.temperature}>{temperature}°C</Text>
      <Text style={styles.location}>{locationName}</Text>
      <Text style={styles.description}>{description}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Kombinleri Göster</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FADADD',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  weatherIcon: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 22,
    color: '#666',
    marginBottom: 40,
    textTransform: 'capitalize',
  },
  location: {
  fontSize: 20,
  color: '#666',
  marginBottom: 10,
  textTransform: 'capitalize',
  fontWeight: '600',
},
  button: {
    backgroundColor: '#FF69B4',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
  },
});
