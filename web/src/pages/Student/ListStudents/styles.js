import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 4px;
`;

export const Wrapper = styled.div`
  margin: 0 0 10px;
  display: flex;
  justify-content: space-between;

  div {
    display: flex;
    button {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #ee4d64;
      border: 0;
      width: 142px;
      height: 36px;
      border-radius: 4px;
      margin-right: 10px;
      padding: 5px;
      color: #fff;
      font-weight: bold;
    }

    input {
      padding: 4px;
      border: 0;
      border-radius: 4px;
      width: 237px;
      height: 36px;
      padding-left: 20px;
    }
  }
`;

export const Content = styled.div`
  background: #fff;
`;

export const Grid = styled.ul`
  min-width: 100%;
  padding: 20px;

  li {
    display: grid;
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
`;
