import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Platform} from 'react-native';
import * as Work from '../exporter';
import Iicon from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import moment from 'moment';
import Dashboard from '../../pages/DrawerLayout/DrawerScreens/Dashboard';
import StatsScreen from '../../pages/Stats/StatsScreen';
import Services from '../../pages/Services/Services'
import Community from '../../pages/Community/Community';
import ProfileScreen from '../../pages/Profile/ProfileScreen';
import * as Jobs from '../../store/actions/auth.action';
import * as Bobs from '../../store/actions/community.action';
import {useSelector, useDispatch} from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FontAicon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
const {WP, HP} = Work;

const Tab = createBottomTabNavigator();
const BottomTabBar = ({navigation}) => {
 
  const [selectedDate, setselectedDate] = useState(new Date());
  const dispatch = useDispatch();
  useEffect(() => {
    UserTask();
  }, []);
  const UserTask = async () => {
    dispatch(
      Jobs.userTask({
        task_date: moment(selectedDate).format('YYYY-MM-DD'),
      }),
    );
  };

  
  return (
    <SafeAreaProvider>
    <Tab.Navigator
        backBehavior='initialRoute'
      initialRouteName="HomeScreen"
      tabBarOptions={{
        tabStyle: {
          justifyContent: 'center',
        },
        style: {
          backgroundColor: Work.THEME.colors.white,
          height: HP('14'),
          alignItems: 'center',
        },
      }}>
      <Tab.Screen
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={[
                styles.txt,
                {
                  color: focused
                    ? Work.THEME.colors.darkpink
                    : Work.THEME.colors.black,
                },
              ]}>
              Home
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <Iicon
              name="home"
              size={focused ? Work.WP('9') : Work.WP('7.5')}
              style={{
                marginTop: WP('5'),
              }}
              color={
                focused ? Work.THEME.colors.darkpink : Work.THEME.colors.black
              }
            />
          ),
        }}
        name="HomeScreen"
        component={Dashboard}
      />
      <Tab.Screen
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={[
                styles.txt,
                {
                  color: focused
                    ? Work.THEME.colors.darkpink
                    : Work.THEME.colors.black,
                },
              ]}>
              Community
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <Iicon
            style={{
              marginTop:Platform.OS === 'ios' ? WP('4'):WP('5'),
            }}
              name="people-outline"
              size={focused ? Work.WP('11') : Work.WP('10')}
              color={
                focused ? Work.THEME.colors.darkpink : Work.THEME.colors.black
              }
            />
          ),
        }}
        name="UserCommunity"
        component={Community}
      />
      <Tab.Screen
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={[
                styles.txt,
                {
                  color: focused
                    ? Work.THEME.colors.darkpink
                    : Work.THEME.colors.black,
                },
              ]}>
              Stats
            </Text>
          ),
          tabBarIcon: ({focused}) => (

            <Iicon
              name="stats-chart-outline"
              size={focused ? Work.WP('9') : Work.WP('7.5')}
              style={{
                marginTop: WP('5'),
              }}
              color={
                focused ? Work.THEME.colors.darkpink : Work.THEME.colors.black
              }
            />
          ),
        }}
        name="StatsScreen"
        component={StatsScreen}
      />

       <Tab.Screen
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={[
                styles.txt,
                {
                  color: focused
                    ? Work.THEME.colors.darkpink
                    : Work.THEME.colors.black,
                },
              ]}>
              Services
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <FontAicon
            style={{
             
              marginTop:Platform.OS === 'ios' ? WP('3.5'):WP('5'),
            }}
              name="mosque"
              size={focused ? Work.WP('8') : Work.WP('7')}
              color={
                focused ? Work.THEME.colors.darkpink : Work.THEME.colors.black
              }
            />
          ),
        }}
        name="Services"
        component={Services}
      />
      <Tab.Screen
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={[
                styles.txt,
                {
                  color: focused
                    ? Work.THEME.colors.darkpink
                    : Work.THEME.colors.black,
                },
              ]}>
              Profile
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <Iicon
            style={{
             
              marginTop:Platform.OS === 'ios' ? WP('3.5'):WP('5'),
            }}
              name="person-circle-outline"
              size={focused ? Work.WP('11') : Work.WP('10')}
              color={
                focused ? Work.THEME.colors.darkpink : Work.THEME.colors.black
              }
            />
          ),
        }}
        name="ProfileScreen"
        component={ProfileScreen}
      />
     
      
    </Tab.Navigator>
    </SafeAreaProvider>
  );
};

export default BottomTabBar;

const styles = StyleSheet.create({
  txt: {
    marginBottom: Platform.OS === 'ios' ? WP('5') : WP('5'),
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontSize: WP('3'),
  },
});
