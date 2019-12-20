import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

import { Container, Content, Profile, NavItem } from './styles';

export default function Header() {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const path = window.location.pathname;

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Gympoint" />
          <NavItem
            to="/dashboard/students"
            active={
              path === '/dashboard/students' ||
              path === '/created/student' ||
              path === '/students/:id'
            }
          >
            ALUNOS
          </NavItem>
          <NavItem
            to="/dashboard/plans"
            active={
              path === '/dashboard/plans' ||
              path === '/created/plans' ||
              path === '/plans/:id'
            }
          >
            PLANOS
          </NavItem>
          <NavItem
            to="/dashboard/enrollment"
            active={path === '/dashboard/enrollment'}
          >
            MATRÍCULAS
          </NavItem>
          <NavItem
            to="/dashboard/help_order"
            active={path === '/dashboard/help_order'}
          >
            PEDIDOS DE AUXÍLIO
          </NavItem>
        </nav>

        <aside>
          <Profile>
            <strong>{(user && user.name) || 'Undefined'}</strong>
            <button type="submit" onClick={handleSignOut}>
              Sair do Sistema
            </button>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
