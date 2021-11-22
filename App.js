import React, { useEffect } from 'react';
import Routes from './src/routes/route';
import SplashScreen from 'react-native-splash-screen';
import { Provider } from 'react-redux';
import { STORE, PERSISTOR } from './src/store/store.config';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar } from 'react-native';
const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={STORE}>
      <PersistGate persistor={PERSISTOR}>
        <Routes></Routes>
      </PersistGate>
    </Provider>
  );
};

export default App;
