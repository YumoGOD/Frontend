import React from 'react';
import styled from 'styled-components';
import { FaBars, FaSun, FaMoon, FaTimes } from 'react-icons/fa'; // Импортируем иконки гамбургера, солнца, луны и крестика

// Основной контейнер для шапки
const HeaderContainer = styled.header`
  width: 100%;
  padding: 20px;
  background: ${({ theme }) => theme.headerBackground};
  color: ${({ theme }) => theme.logoColor};
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 101; /* Шапка должна быть над боковым меню */
`;

// Логотип по центру
const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  flex: 1; /* Это заставит логотип быть по центру */
  text-align: center;
`;

// Контейнер для кнопок в шапке
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px; /* Расстояние между кнопками */
`;

// Стиль для кнопки с иконкой
const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.logoColor};
  font-size: 24px; /* Размер иконки */
`;

const Header: React.FC<{
  onToggleTheme: () => void,
  onMenuToggle: () => void,
  currentTheme: 'light' | 'dark',
  isAuthenticated: boolean,
  isSidebarOpen: boolean // Добавляем пропс для состояния бокового меню
}> = ({ onToggleTheme, onMenuToggle, currentTheme, isAuthenticated, isSidebarOpen }) => {
  return (
    <HeaderContainer>
      {isAuthenticated && (
        <div>
          {/* Кнопка для открытия/закрытия бокового меню */}
          <IconButton onClick={onMenuToggle}>
            {isSidebarOpen ? <FaTimes /> : <FaBars />} {/* Меняем иконку в зависимости от состояния меню */}
          </IconButton>
        </div>
      )}

      {/* Логотип по центру */}
      <Logo>My App</Logo>

      {/* Контейнер для кнопок */}
      <ButtonContainer>
        {/* Иконка для смены темы */}
        {currentTheme === 'light' ? (
          <IconButton onClick={onToggleTheme}>
            <FaMoon />
          </IconButton>
        ) : (
          <IconButton onClick={onToggleTheme}>
            <FaSun />
          </IconButton>
        )}
      </ButtonContainer>
    </HeaderContainer>
  );
};

export default Header;
