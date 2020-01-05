import React, { useState } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import Button from '~/components/Button';
import api from '~/services/api';

import { Container, TextAreaInput } from './styles';

export default function NewRequest({ navigation }) {
  const [question, setQuestion] = useState();

  const student_id = useSelector(state => state.auth.student.id);

  async function handleSubmit() {
    try {
      await api.post(`/students/${student_id}/help-orders`, {
        question,
      });

      Alert.alert(
        'Sucesso',
        'Sua solicitação de ajuda foi emitida com sucesso'
      );

      navigation.navigate('ListRequestsAssistance');
    } catch (err) {
      Alert.alert('Error', 'Sua solicitação teve algum problema');
    }
  }

  return (
    <Container>
      <TextAreaInput
        multiline
        placeholder="Inclua seu pedido de auxílio"
        value={question}
        onChangeText={setQuestion}
      />
      <Button onPress={handleSubmit}>Enviar pedido</Button>
    </Container>
  );
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

NewRequest.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
