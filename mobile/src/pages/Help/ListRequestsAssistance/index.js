import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { useSelector } from 'react-redux';

import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';

import api from '~/services/api';

import {
  Answer,
  AnswerTitle,
  AnswerIcon,
  Container,
  ButtonRequest,
  DateFormatted,
  List,
  Question,
  QuestionContainerButton,
  Wrapper,
} from './styles';

function ListRequestsAssistance({ navigation, isFocused }) {
  const [requestHelps, setRequestHelps] = useState([]);
  const [loading, setLoading] = useState(false);

  const student_id = useSelector(state => state.auth.student.id);

  async function loadRequestHelps(id) {
    const response = await api.get(`/students/${id}/help-orders`);

    const data = response.data.map(help => ({
      ...help,
      dateFormatted: formatRelative(parseISO(help.createdAt), new Date(), {
        locale: pt,
      }),
    }));

    setLoading(false);
    setRequestHelps(data);
  }

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      loadRequestHelps(student_id);
    }
  }, [isFocused]); // eslint-disable-line

  function handleNewRequest() {
    navigation.navigate('NewRequest');
  }

  function handleAnswer(requestHelp) {
    navigation.navigate('Answer', { requestHelp });
  }

  return (
    <Container>
      <View>
        <ButtonRequest onPress={handleNewRequest}>
          Novo pedido de auxílio
        </ButtonRequest>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <List
            data={requestHelps}
            keyExtractor={request => String(request.id)}
            renderItem={({ item }) => (
              <QuestionContainerButton
                key={item.id}
                onPress={() => handleAnswer(item)}
              >
                <Wrapper>
                  <Answer>
                    <AnswerIcon
                      name="check-circle"
                      answered={item.answer_at}
                      size={14}
                    />
                    <AnswerTitle answered={item.answer_at}>
                      {item.answer_at ? 'Respondido' : 'Sem resposta'}
                    </AnswerTitle>
                  </Answer>
                  <DateFormatted>{item.dateFormatted}</DateFormatted>
                </Wrapper>
                <Question numberOfLines={3}>{item.question}</Question>
              </QuestionContainerButton>
            )}
          />
        )}
      </View>
    </Container>
  );
}

ListRequestsAssistance.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  isFocused: PropTypes.bool,
};

ListRequestsAssistance.defaultProps = {
  isFocused: false,
};

export default withNavigationFocus(ListRequestsAssistance);
