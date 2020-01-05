import { Platform } from 'react-native';

import styled from 'styled-components/native';

import Input from '~/components/Input';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  padding: 15px;
`;

export const TextAreaInput = styled(Input)`
  background: #fff;
  height: 300px;
  padding: 0;
  align-items: flex-start;
  margin-bottom: 10px;
`;
