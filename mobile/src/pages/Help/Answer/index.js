import React, { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';

import {
  Container,
  Content,
  ContentText,
  Wrapper,
  WrapperDateFormatted,
  WrapperText,
  AnswerContent,
} from './styles';

export default function Answer({ navigation }) {
  const requestHelp = navigation.getParam('requestHelp');

  const dateFormattedAnswer = useMemo(
    () =>
      requestHelp.answer_at
        ? formatRelative(parseISO(requestHelp.answer_at), new Date(), {
            locale: pt,
          })
        : '',
    [requestHelp.answer_at]
  );

  return (
    <Container>
      <Content>
        <Wrapper>
          <WrapperText>Pergunta</WrapperText>
          <WrapperDateFormatted>
            {requestHelp.dateFormatted}
          </WrapperDateFormatted>
        </Wrapper>
        <ContentText>{requestHelp.question}</ContentText>
        {requestHelp.answer && (
          <AnswerContent>
            <Wrapper>
              <WrapperText>Resposta</WrapperText>
              <WrapperDateFormatted>{dateFormattedAnswer}</WrapperDateFormatted>
            </Wrapper>
            <ContentText>{requestHelp.answer}</ContentText>
          </AnswerContent>
        )}
      </Content>
    </Container>
  );
}

Answer.navigationOptions = ({ navigation }) => ({
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

Answer.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};
