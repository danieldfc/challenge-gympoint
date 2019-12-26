import { Link } from 'react-router-dom';

import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const NavItem = styled(Link)`
  font-weight: bold;
  color: ${props => (props.active ? '#444' : '#ccc')};
  margin-right: 10px;
`;

export const Content = styled.div`
  height: 64px;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;
    img {
      max-width: 170px;
      max-height: 40px;
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #eee;
  text-align: right;
  margin-right: 10px;

  strong {
    display: block;
    color: #333;
  }

  button {
    background: none;
    border: 0;
    display: block;
    margin-top: 2px;
    color: #ee4d64;
  }

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
`;
