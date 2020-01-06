import styled from 'styled-components';

import { Form } from '@rocketseat/unform';
import { darken } from 'polished';

import Button from '~/components/Button';

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
`;

export const Content = styled.div`
  background: #fff;
  padding: 30px;
  margin-top: 20px;

  h1 {
    font-size: 16px;
  }
`;

export const ListStudents = styled.ul`
  margin-top: 5px;

  li {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    line-height: 20px;
    color: #666;
    border-bottom: 1px solid #ddd;
    padding: 16px 0;

    &:last-child {
      padding: 16px 0 0 0;
      border-bottom: 0;
    }

    button {
      border: 0;
      font-size: 15px;
      color: #4d85ee;
    }
  }
`;

export const EmptyContainer = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    margin-top: 20px;
    font-size: 18px;
    color: #444;
    font-weight: bold;
  }
`;

export const AnswerContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.8);
`;

export const ButtonAnswer = styled(Button)`
  width: 100%;
  background: #ee4d64;
  justify-content: center;
  font-size: 16px;
  margin-top: 10px;
`;

export const FormAnswer = styled(Form)`
  background: #fff;
  width: 450px;
  padding: 30px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 14px;
    color: #444;
    font-weight: bold;
  }

  label {
    color: #444;
    font-weight: bold;
    font-size: 14px;
    margin: 7px 0 5px 0;
  }

  textarea {
    align-items: flex-start;
    padding: 10px;
    height: 200px;
    border-radius: 4px;
    min-height: 100px;
    max-height: 100px;
    max-width: 100%;
    font-size: 14px;
    line-height: 15px;
  }

  p {
    font-size: 16px;
    color: #666666;
    line-height: 26px;
  }

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;

    button {
      width: 20px;
      height: 20px;
      border: 0;
      background: #ccc;
      border-radius: 50px;
      align-items: center;
      transition: background 0.2s;
      color: #000;
      font-size: 12px;

      &:hover {
        color: #fff;
        background: ${darken(0.03, '#ee4d64')};
      }
    }
  }
`;
