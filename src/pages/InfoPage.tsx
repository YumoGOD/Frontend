import React from 'react';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: ${({ theme }) => theme.pageBackground};
`;

const ProfileCard = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 400px;
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-bottom: 20px;
`;

const ProfilePage: React.FC = () => {
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://via.placeholder.com/100',
  };

  return (
    <ProfileContainer>
      <ProfileCard>
        <Avatar src={user.avatar} alt="User Avatar" />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <button>Edit Profile</button>
        <button>Logout</button>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default ProfilePage;
