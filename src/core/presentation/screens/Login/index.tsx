import React from 'react';
import Background from '@/core/presentation/shared/Background';
import LoginView from './Login.view';

const Login: React.FC = () => {
  return (
    <Background>
      <LoginView />
    </Background>
  );
};

export default Login;
