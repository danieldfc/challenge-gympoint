import styled from 'styled-components';

import { Form } from '@rocketseat/unform';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 900px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 4px;

  h1 {
    font-size: 24px;
    color: #444;
  }

  div {
    button {
      &:first-child {
        transition: background 0.2s;

        &:hover {
          background: ${darken(0.03, '#ccc')};
        }
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  background: #f5f5f5;
  margin-bottom: 20px;

  div {
    display: flex;
  }
`;

export const FormSubmit = styled(Form)`
  min-width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const Child = styled.div`
  padding: 30px;
  background: #fff;
`;

export const Wrapper = styled.div`
  display: flex;
  border-radius: 4px;
  margin-bottom: 20px;

  span {
    color: rgba(255, 82, 82, 0.7);
    align-self: flex-start;
    margin: 10px 0 0 0;
    font-weight: bold;
  }

  &:last-child {
    margin-bottom: 0;
  }

  div {
    display: flex;
    flex: 1;
    max-width: 900px;
    flex-direction: column;
    margin-right: 10px;

    label {
      margin-bottom: 8px;
      color: #444;
      font-weight: bold;
    }

    input {
      height: 45px;
      min-width: 100%;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 13px;

      &:focus {
        box-shadow: 0 0 3px rgba(255, 82, 82, 0.7);
      }
      &:hover {
        transition: box-shadow 0.4s;
        box-shadow: 0 0 3px rgba(255, 82, 82, 0.7);
      }
    }
  }
`;
