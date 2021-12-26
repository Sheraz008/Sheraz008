import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SignupScreen from '../Screens/Signup/SignupScreen'
import LoginScreen from '../Screens/Login/LoginScreen'
import HomePage from '../Screens/Home/HomePage'
import ProfileScreen from '../Screens/Profile/ProfileScreen'
import ConsultantScreen from '../Screens/OnlineConsultant/ConsultantScreen'
import Chatscreen from '../Screens/Chat/Chatscreen'
import SendMailscreen from '../Screens/SendMail/SendMailscreen'
import {useDispatch, useSelector} from 'react-redux';
import { useTranslation } from 'react-i18next';
import ResetPasswordScreen from '../Screens/ResetPassword/ResetPasswordScreen'
const Routes = () => {
  const Stack = createStackNavigator();
  const user = useSelector(state => state.auth.user);
  const Language = useSelector(state => state.auth.language);
  const { i18n } = useTranslation();
      const Loader = useSelector(state => state.auth.loadingLoader);
    console.log("Loader---->",Loader);
  useEffect(() => {

    Language == 'ita' ?  i18n.changeLanguage("ita"):i18n.changeLanguage("en")
  
  }, [])
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {
            !user ?
            
              <> 
          
        <Stack.Screen
            name='Login'
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='SingUp'
            component={SignupScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
          name='Reset'
          component={ResetPasswordScreen}
          options={{ headerShown: false }}
        />
          
          </>
          :
          <>
          <Stack.Screen
            name='Home'
            component={HomePage}
            options={{ headerShown: false }}
          />
          
          <Stack.Screen
            name='Profile'
            component={ProfileScreen}
            options={{ headerShown: false }}
          />
          
          <Stack.Screen
            name='Consultant'
            component={ConsultantScreen}
            options={{ headerShown: false }}
          />
          
          <Stack.Screen
            name='Chat'
            component={Chatscreen}
            options={{ headerShown: false }}
          />
          
          <Stack.Screen
            name='SendMail'
            component={SendMailscreen}
            options={{ headerShown: false }}
          />
          </>
          }
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Routes;
