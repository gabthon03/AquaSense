import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './src/screens/LoginScreen';
import Routes from './src/navigation/routes';

export default function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      {userLoggedIn ? (
        <Routes onLogout={() => setUserLoggedIn(false)} />
      ) : (
        <LoginScreen onLoginSuccess={() => setUserLoggedIn(true)} />
      )}
    </NavigationContainer>
  );
}