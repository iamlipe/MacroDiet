import React from 'react';
import Background from '@/core/presentation/shared/Background';
import IntroductionCreateUserView from './IntroductionCreateUser.view';

const IntroductionCreateUser: React.FC = () => {
  return (
    <Background>
      <IntroductionCreateUserView />
    </Background>
  );
};

export default IntroductionCreateUser;
