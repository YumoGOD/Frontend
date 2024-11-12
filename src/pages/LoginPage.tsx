// LoginPage.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../services/api'; // Импортируем axios-инстанс

// Стили для страницы
const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: ${({ theme }) => theme.background};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

const LoginCard = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  background: ${({ theme }) => theme.inputBackground};
  border: 1px solid ${({ theme }) => theme.inputBorder};
  color: ${({ theme }) => theme.textColor};
  border-radius: 8px;
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.buttonBackground};
  padding: 12px;
  width: 100%;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
  }
`;

const SwitchModeButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.buttonBackground};
  cursor: pointer;
  font-size: 14px;
  margin-top: 10px;
  text-decoration: underline;
  &:hover {
    color: ${({ theme }) => theme.buttonHover};
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 15px;
  font-size: 14px;
`;

// Обновленный тип пропсов для компонента LoginPage
interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      // Отправка запроса на бэкенд для логина
      const response = await api.post('auth/login/', {
        username,
        password,
      });

      // Пример успешной авторизации
      if (response.data.token) {
        localStorage.setItem('token', response.data.token); // Сохраняем токен в localStorage
        window.location.href = '/profile'; // Перенаправляем на страницу профиля
      }
    } catch (err) {
      setError('Invalid credentials'); // Если ошибка, показываем сообщение
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Отправка запроса на бэкенд для регистрации
      const response = await api.post('auth/register/', {
        username,
        password,
      });

      // Пример успешной регистрации
      if (response.data.token) {
        localStorage.setItem('token', response.data.token); // Сохраняем токен в localStorage
        window.location.href = '/profile'; // Перенаправляем на страницу профиля
      }
    } catch (err) {
      setError('Registration failed'); // Если ошибка, показываем сообщение
    }
  };

  return (
    <LoginPageContainer>
      <LoginCard>
        <h2>{isRegistering ? 'Register' : 'Login'}</h2>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={isRegistering ? handleRegister : handleLogin}>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isRegistering && (
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          <Button type="submit">{isRegistering ? 'Register' : 'Login'}</Button>
        </form>
        <SwitchModeButton onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
        </SwitchModeButton>
      </LoginCard>
    </LoginPageContainer>
  );
};

export default LoginPage;
