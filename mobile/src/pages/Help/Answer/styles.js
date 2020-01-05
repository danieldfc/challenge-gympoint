import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #f5f5f5;
  padding: 15px;
`;

export const Content = styled.View`
  background: #fff;
  padding: 15px;
  border: 1px solid #e3e3e3;
  border-radius: 4px;
`;

export const ContentText = styled.Text`
  font-size: 14px;
  color: #666;
  line-height: 26px;
`;

export const Wrapper = styled.View`
  margin-bottom: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

export const WrapperDateFormatted = styled.Text`
  font-size: 14px;
  color: #666;
`;

export const WrapperText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #444;
`;

export const AnswerContent = styled.View`
  margin-top: 15px;
`;
