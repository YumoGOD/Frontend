import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Стилизованный контейнер для бокового меню
const SidebarContainer = styled.div<{ $isOpen: boolean }>`
  width: 250px;
  position: fixed;
  top: 70px;
  left: 0;
  height: 100%;
  background: ${({ theme }) => theme.sidebarBackground};
  transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(-250px)')};
  transition: transform 0.3s ease; /* Плавное выдвижение */
  z-index: 100; /* Меню должно быть выше шапки */
`;

// Стилизованный элемент для каждой ссылки в меню
const SidebarLink = styled.div`
  padding: 15px;
  color: ${({ theme }) => theme.sidebarText};
  &:hover {
    background: ${({ theme }) => theme.sidebarHover};
  }

  a {
    color: inherit; /* Наследует цвет из родителя */
    text-decoration: none; /* Убираем подчеркивание */
  }
`;

const Sidebar: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const sidebarRef = useRef<HTMLDivElement | null>(null); // Используем ref для бокового меню

  // Закрытие меню при клике вне его
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <SidebarContainer ref={sidebarRef} $isOpen={isOpen}>
      <SidebarLink>
        <Link to="/profile">Home</Link>
      </SidebarLink>
      <SidebarLink>
        <Link to="/info">Настройки</Link>
      </SidebarLink>
      <SidebarLink>
        <Link to="/info">Info</Link>
      </SidebarLink>
    </SidebarContainer>
  );
};

export default Sidebar;
