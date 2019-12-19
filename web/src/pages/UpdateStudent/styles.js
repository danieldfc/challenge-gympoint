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

    button {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #ccc;
      border: 0;
      width: 142px;
      height: 36px;
      border-radius: 4px;
      padding: 5px;
      color: #fff;
      font-weight: bold;

      & + button {
        margin-left: 10px;
        background: #ee4d64;
      }
    }
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
