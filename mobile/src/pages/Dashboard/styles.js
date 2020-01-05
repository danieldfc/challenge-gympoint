import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: rgba(0, 0, 0, 0.1);
  padding: 15px 15px 70px;
`;

export const Item = styled.View`
  background: #fff;
  margin-bottom: 10px;
  flex-direction: row;
  justify-content: space-between;
  height: 46px;
  align-items: center;
  padding: 0 15px;
  border-radius: 4px;
`;

export const Title = styled.Text`
  font-size: 14px;
  color: #444;
  font-weight: bold;
`;

export const DateFormatted = styled.Text`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
`;

export const SubmitButton = styled(Button)`
  margin-bottom: 15px;
`;

export const List = styled.FlatList.attrs({
  showsHorizontalScrollIndicator: false,
})``;
