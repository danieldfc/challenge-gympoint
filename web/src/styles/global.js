import { createGlobalStyle } from 'styled-components';

import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  html, body, #root {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    max-width: 1980px;
    min-width: 1200px;
  }

  body {
    -webkit-font-smoothing: antialiased !important;
  }

  body, input, button, table {
    font: 14px 'Roboto', sans-serif;
    background: #fff;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }
`;
