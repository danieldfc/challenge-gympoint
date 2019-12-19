import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 4px;

  div {
    display: flex;
  }

  span {
    color: #ee4d64;
    margin-bottom: 10px;
  }

  form {
    label,
    input {
      margin-bottom: 10px;
    }

    label {
      font-weight: bold;
    }

    div {
      display: flex;
      justify-content: space-between;
      & + div {
        background: #fff;
      }
    }

    input {
      color: #666;
      padding: 10px;
      border: 1px solid #999;
      border-radius: 4px;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  padding: 20px;
  border-radius: 4px;

  div {
    display: flex;
    flex-direction: column;
  }

  div.numbers {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
  }
`;
