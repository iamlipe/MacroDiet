import React from 'react';
import Background from '@/core/presentation/shared/Background';
import NotificationsView from './Notifications.view';

const Notifications: React.FC = () => {
  return (
    <Background>
      <NotificationsView />
    </Background>
  );
};

export default Notifications;
