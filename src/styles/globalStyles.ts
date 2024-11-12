import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Arial', sans-serif;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.textColor};
    transition: background-color 0.3s ease, color 0.3s ease;
    padding-top: 60px; /* Добавлен отступ сверху, чтобы не перекрывалась шапка */
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .Toastify__toast {
    background-color: ${({ theme }) => theme.sidebarBackground};
    color: ${({ theme }) => theme.sidebarText};
  }
`;
