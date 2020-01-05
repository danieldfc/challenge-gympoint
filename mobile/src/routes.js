import React from 'react';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import header from '~/assets/header.png';
import Dashboard from '~/pages/Dashboard';
import Answer from '~/pages/Help/Answer';
import ListRequestsAssistance from '~/pages/Help/ListRequestsAssistance';
import NewRequest from '~/pages/Help/NewRequest';
import SignIn from '~/pages/SignIn';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
        App: createBottomTabNavigator(
          {
            Dashboard,
            Help: {
              screen: createStackNavigator(
                {
                  ListRequestsAssistance,
                  NewRequest,
                  Answer,
                },
                {
                  defaultNavigationOptions: {
                    headerTitleAlign: 'center',
                    headerTitle: () => <Image source={header} />,
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                    },
                  },
                }
              ),
              navigationOptions: {
                tabBarLabel: 'Pedir ajuda',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="live-help" size={20} color={tintColor} />
                ),
              },
            },
          },
          {
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#ee4e62',
              inactiveTintColor: '#999',
              style: {
                backgroundColor: '#fff',
              },
            },
          }
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      }
    )
  );
