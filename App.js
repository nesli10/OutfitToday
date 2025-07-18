import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import CombinationScreen from './CombinationScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Hava Durumu' }} />
        <Stack.Screen name="Combination" component={CombinationScreen} options={{ title: 'Kombinler' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
