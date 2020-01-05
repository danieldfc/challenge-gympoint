import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #f5f5f5;
  padding: 15px 15px 70px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const QuestionContainerButton = styled(RectButton)`
  background: #fff;
  margin-bottom: 10px;
  flex-direction: column;
  height: 150px;
  padding: 15px;
  border-radius: 4px;
`;

export const ButtonRequest = styled(Button)`
  margin-bottom: 15px;
`;

export const Answer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const AnswerTitle = styled.Text`
  margin-left: 5px;
  color: ${props => (props.answered ? '#42CB59' : '#999')};
  font-weight: bold;
  font-size: 14px;
`;

export const AnswerIcon = styled(Icon)`
  color: ${props => (props.answered ? '#42CB59' : '#999')};
`;

export const Wrapper = styled.View`
  margin-bottom: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

export const DateFormatted = styled.Text`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
`;

export const Question = styled.Text`
  color: #666;
  font-size: 14px;
  line-height: 26px;
`;
