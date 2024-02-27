import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/pages/HomeScreen';
import AvaliacaoScreen from './src/pages/AvaliacaoScreen';
import TelaAgradecimento from './src/pages/TelaAgradecimento';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}  options={{headerShown: false}}/>
        <Stack.Screen name="Avaliacao" component={AvaliacaoScreen} options={{headerShown: false}}/>
				<Stack.Screen name="TelaAgradecimento" component={TelaAgradecimento} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;