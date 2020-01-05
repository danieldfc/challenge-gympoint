import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';

import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Header from '~/components/Header';
import api from '~/services/api';

import {
  Container,
  Item,
  Title,
  DateFormatted,
  SubmitButton,
  List,
} from './styles';

export default function Dashboard() {
  const [checkins, setCheckins] = useState([]);
  const [loading, setLoading] = useState(false);

  const student_id = useSelector(state => state.auth.student.id);

  async function loadCheckins(id) {
    const response = await api.get(`/students/${id}/checkins`);

    const data = response.data.map(checkin => ({
      ...checkin,
      dateFormatted: formatRelative(parseISO(checkin.createdAt), new Date(), {
        locale: pt,
      }),
    }));

    setLoading(false);
    setCheckins(data);
  }

  useEffect(() => {
    setLoading(true);
    loadCheckins(student_id);
  }, []); // eslint-disable-line

  async function handleSubmit() {
    try {
      setLoading(true);
      await api.post(`/students/${student_id}/checkins`);

      loadCheckins(student_id);

      Alert.alert('Sucesso', 'Check-in realizado com sucesso!');
    } catch (err) {
      setLoading(false);
      Alert.alert('New Checkin error', 'Você já treinou 5 vezes essa semana.');
    }
  }

  return (
    <>
      <Header />
      <Container>
        <View>
          <SubmitButton onPress={handleSubmit}>Novo check-in</SubmitButton>
          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <List
              data={checkins}
              inverted
              showsHorizontalScrollIndicator={false}
              keyExtractor={checkin => String(checkin.id)}
              renderItem={({ item, index }) => (
                <Item key={item.id}>
                  <Title>Checkin #{index + 1}</Title>
                  <DateFormatted>{item.dateFormatted}</DateFormatted>
                </Item>
              )}
            />
          )}
        </View>
      </Container>
    </>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: '',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="edit-location" size={20} color={tintColor} />
  ),
};
