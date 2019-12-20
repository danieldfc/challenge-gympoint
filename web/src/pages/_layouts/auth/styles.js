import styled from 'styled-components';

import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  min-height: 100vh;
  background: #ee4d64;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 415px;
  text-align: center;
  background: #fff;
  padding: 20px 50px;
  border-radius: 4px;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 50px;

    label {
      display: flex;
      margin: 0 0 5px 0;
      font-weight: bold;
      color: #444;
      font-size: 14px;
    }

    input {
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #222;
      margin: 0 0 15px 0;

      &:focus {
        box-shadow: 0 0 3px rgba(255, 82, 82, 0.7);
      }
      &:hover {
        box-shadow: 0 0 3px rgba(71, 71, 135, 0.8);
      }
      &::placeholder {
        color: #000;
      }
    }

    span {
      color: #3b3b98;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #ee4d64;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.3s;

      &:hover {
        background: ${darken(0.01, '#ee4d64')};
      }
    }

    a {
      color: #ee4d64;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
