import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Dashboard() {
  return <View />;
}

Dashboard.navigationOptions = {
  tabBarLabel: '',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="edit_location" size={20} color={tintColor} />
  ),
};
