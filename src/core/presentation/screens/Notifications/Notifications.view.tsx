import React, { useEffect, useMemo } from 'react';
import { StyledScroll, StyledToggle, StyledDescription } from './styles';
import { useUser } from '@/core/infrastructure/hooks/useUser';
import { useUserStore } from '@/core/infrastructure/store/userStore';
import { useNotification } from '@/core/infrastructure/hooks/useNotification';

const NotificationsView: React.FC = () => {
  const { user } = useUserStore();
  const { updateNotifications } = useUser();
  const { cancelAllTriggerNotifications, scheduleNotificationForTheNextWeek } =
    useNotification();

  const valueNotificationMeals = useMemo(() => {
    return user?.preferences?.notifications.receiveNotifiicationsMeals || false;
  }, [user]);

  const valueNotificationsDrinkWatter = useMemo(() => {
    return (
      user?.preferences?.notifications.reciveNotificationsDrinkWatter || false
    );
  }, [user]);

  const onChangeValueNotificationMeals = async () => {
    if (!valueNotificationMeals) {
      return await cancelAllTriggerNotifications();
    }

    await scheduleNotificationForTheNextWeek();
  };

  useEffect(() => {
    onChangeValueNotificationMeals();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueNotificationMeals]);

  return (
    <StyledScroll>
      <StyledDescription>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </StyledDescription>

      <StyledToggle
        title="Alerta refeições"
        value={valueNotificationMeals}
        onChange={() =>
          updateNotifications({
            reciveNotificationsDrinkWatter: valueNotificationsDrinkWatter,
            receiveNotifiicationsMeals: !valueNotificationMeals,
          })
        }
      />

      <StyledToggle
        title="Alerta para beber água"
        value={valueNotificationsDrinkWatter}
        onChange={() =>
          updateNotifications({
            reciveNotificationsDrinkWatter: !valueNotificationsDrinkWatter,
            receiveNotifiicationsMeals: valueNotificationMeals,
          })
        }
      />
    </StyledScroll>
  );
};

export default NotificationsView;
