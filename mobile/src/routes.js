import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Dashboard from '~/pages/Dashboard';
import HelpOrder from '~/pages/HelpOrder';
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
            HelpOrder,
          },
          {
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#ee4d64',
              inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
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
