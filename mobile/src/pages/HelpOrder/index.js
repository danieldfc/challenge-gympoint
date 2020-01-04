import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// import { Container } from './styles';

export default function HelpOrder() {
  return <View />;
}

HelpOrder.navigationOptions = {
  tabBarLabel: '',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="edit_location" size={20} color={tintColor} />
  ),
};
