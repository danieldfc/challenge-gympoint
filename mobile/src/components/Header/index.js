import React from 'react';
import { Image } from 'react-native';

import header from '~/assets/header.png';

import { Container } from './styles';

export default function Header() {
  return (
    <Container>
      <Image source={header} resizeMode="cover" />
    </Container>
  );
}
