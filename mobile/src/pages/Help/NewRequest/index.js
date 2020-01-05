import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import { Container } from './styles';

export default function NewRequest() {
  return <Text>NewRequest</Text>;
}

NewRequest.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ListRequestsAssistance');
      }}
    >
      <Icon name="chevron-left" size={20} color="#000" />
    </TouchableOpacity>
  ),
});
