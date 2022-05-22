import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeComponent from './components/HomeComponent';
import GameComponent from './components/GameComponent';
import LevelSelectionComponent from './components/LevelSelectionComponent';
import LoadStateComponent from './components/LoadStateComponent';
import LeadboardComponent from './components/LeadboardComponent';
import SettingsComponent from './components/SettingsComponent';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode='none'>
        <Stack.Screen name='Home'
          component={HomeComponent}
          options={{ title: 'Home' }} />
        <Stack.Screen name="Game"
          component={GameComponent}
          options={{ title: 'Game' }} />
        <Stack.Screen name="Levels"
          component={LevelSelectionComponent}
          options={{ title: 'Levels' }} />
        <Stack.Screen name="Continue"
          component={LoadStateComponent}
          options={{ title: 'Continue' }} />
        <Stack.Screen name="Leadboard"
          component={LeadboardComponent}
          options={{ title: 'Leadboard' }} />
        <Stack.Screen name="Settings"
          component={SettingsComponent}
          options={{ title: 'Settings' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

