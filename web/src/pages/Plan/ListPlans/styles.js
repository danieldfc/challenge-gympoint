import styled from 'styled-components';

import Button from '~/components/Button';

export const Container = styled.div`
  max-width: 900px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 4px;
`;

export const Wrapper = styled.div`
  margin: 0 0 20px;
  display: flex;
  justify-content: space-between;

  h1 {
    font-size: 24px;
    color: #444;
  }
`;

export const Grid = styled.div`
  background: #fff;
  min-width: 100%;
  padding: 20px;

  li {
    display: grid;
    color: #444;
    grid-template-columns: repeat(4, 1fr);
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;

    & + li {
      border-bottom: 1px solid #eee;
    }

    &:last-child {
      border-bottom: 0;
    }

    p {
      color: #666;
    }

    button {
      background: none;
      border: 0;
      color: #00f;
      font-size: 16px;

      & + button {
        margin-left: 40px;
        color: #f00;
      }
    }
  }
`;

export const GridButton = styled.div`
  display: flex;
  a {
    & + button {
      margin-left: 20px;
      color: #f00;
    }
  }

  button {
    background: none;
    border: 0;
    color: #00f;
    font-size: 16px;
  }
`;

export const WrapperButton = styled(Button)`
  width: 142px;
  background: #ee4d64;
`;
