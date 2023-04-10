import { useCallback, useMemo, useState } from 'react';
import { groupBy } from '@utils/help';
import { useUserStore } from '@stores/index';
import useAsyncStorage from './useAsyncStorage';
import notifee, {
  AndroidImportance,
  DisplayedNotification,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';
import moment from 'moment';

interface IScheduleNotifications {
  notificationDate: Date;
  title: string;
  body: string;
  channelId: string;
}

const useNotification = () => {
  const [displayedNotifications, setDisplayedNotifications] = useState<
    DisplayedNotification[]
  >([]);
  const { read } = useAsyncStorage();
  const { user } = useUserStore();

  const initialValuesNotifications = useMemo(() => {
    const { receiveNotifiicationsMeals, reciveNotificationsDrinkWatter } =
      user.preferences.notifications;

    return {
      receiveNotifiicationsMeals: `${receiveNotifiicationsMeals}`,
      reciveNotificationsDrinkWatter: `${reciveNotificationsDrinkWatter}`,
    };
  }, [user]);

  const savePreferencesNotifications = useCallback(() => {}, []);

  const getAllTriggerNotifications = async () => {
    return await notifee.getTriggerNotifications();
  };

  const cancelAllTriggerNotifications = async () => {
    const notificationsIds = await notifee.getTriggerNotificationIds();

    await notifee.cancelTriggerNotifications(notificationsIds);
  };

  const getDisplayedNotifications = useCallback(async () => {
    const notifications = await notifee.getDisplayedNotifications();

    setDisplayedNotifications(notifications);
  }, []);

  const displayedNotificationsGroupByDay = useMemo(() => {
    return groupBy({
      arr: displayedNotifications.map(notification => {
        let formatedDate = '';
        const date = new Date(notification.date);
        const today = new Date();
        const yesterday = new Date();

        yesterday.setDate(today.getDate() - 1);

        if (moment(date).isSame(today, 'day')) {
          formatedDate = 'Hoje';
        } else if (moment(date).isSame(yesterday, 'day')) {
          formatedDate = 'Ontem';
        } else {
          formatedDate = moment(date).format('ddd');
        }

        return { ...notification, formatedDate };
      }),
      keySelector: arr => arr.formatedDate,
    });
  }, [displayedNotifications]);

  const scheduleNotifications = async ({
    notificationDate,
    title,
    body,
    channelId,
  }: IScheduleNotifications) => {
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: notificationDate.getTime(),
    };

    await notifee.createTriggerNotification(
      {
        title,
        body,
        android: {
          channelId: channelId,
          importance: AndroidImportance.HIGH,
        },
        ios: { sound: 'default' },
      },
      trigger,
    );
  };

  const scheduleMealNotificationForTheNextDays = useCallback(
    async (daysToAdd: number) => {
      const now = new Date();

      await cancelAllTriggerNotifications();

      user.preferences.mealsTime.forEach(item => {
        Array.from({ length: daysToAdd }, async (_, i) => {
          const title = `Lembrete ${item.title}`;
          const body = `Hora de ${item.title}! Não esqueça de se alimentar bem para manter a energia e saúde. Escolha opções saudáveis e equilibradas.`;
          const date = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + i,
            item.time.hour,
            item.time.minutes,
            0,
          );

          if (moment(date).isBefore(now)) {
            date.setDate(date.getDate() + daysToAdd);
          }

          await scheduleNotifications({
            channelId: 'meals',
            notificationDate: date,
            title,
            body,
          });
        });
      });
    },
    [user.preferences.mealsTime],
  );

  const scheduleMealsNotification = useCallback(async () => {
    const lastScheduledMealNotification = await read(
      'lastScheduledMealNotification',
    );

    if (!lastScheduledMealNotification) {
      await scheduleMealNotificationForTheNextDays(3);
    }
  }, [read, scheduleMealNotificationForTheNextDays]);

  return {
    displayedNotifications,
    displayedNotificationsGroupByDay,
    scheduleNotifications,
    getAllTriggerNotifications,
    initialValuesNotifications,
    savePreferencesNotifications,
    scheduleMealsNotification,
    getDisplayedNotifications,
  };
};

export default useNotification;
