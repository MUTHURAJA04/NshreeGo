import "./global.css"

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './Components/AppNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;
