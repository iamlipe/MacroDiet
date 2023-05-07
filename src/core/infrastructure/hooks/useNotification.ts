import notifee, {
  AndroidImportance,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';
import { useUserStore } from '@/core/infrastructure/store/userStore';
import moment from 'moment';

const daysWeek: { [key: string]: number } = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

export const useNotification = () => {
  const { user } = useUserStore();

  const getAllTriggerNotifications = async () => {
    return await notifee.getTriggerNotificationIds();
  };

  const cancelAllTriggerNotifications = async () => {
    const notificationsIds = await notifee.getTriggerNotificationIds();
    await notifee.cancelTriggerNotifications(notificationsIds);
  };

  const onCreateTriggerNotification = async (
    title: string,
    body: string,
    channelId: string,
    date: Date,
  ) => {
    await notifee.requestPermission();

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(),
    };

    await notifee.createTriggerNotification(
      {
        title: title,
        body: body,
        android: {
          channelId: channelId,
          importance: AndroidImportance.HIGH,
        },
        ios: { sound: 'default' },
      },
      trigger,
    );
  };

  const scheduleNotificationForTheNextWeek = async () => {
    await cancelAllTriggerNotifications();

    const now = new Date();
    const activeMealTimes = user?.preferences?.mealTimes?.filter(
      item => item.isActive,
    );

    const notifications: Promise<void>[] = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + i,
      );
      const dayOfWeek = moment(date).format('ddd');

      activeMealTimes?.forEach(async item => {
        if (!item.daysWeek.includes(daysWeek[dayOfWeek])) {
          return;
        }

        const notificationDate = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          item.time.hours,
          item.time.minutes,
          0,
        );

        if (moment(notificationDate).isBefore(now)) {
          notificationDate.setDate(notificationDate.getDate() + 7);
        }

        const title = `Lembrete ${item.title}`;
        const body = `Hora de ${item.title}! Não esqueça de se alimentar bem para manter a energia e saúde. Escolha opções saudáveis e equilibradas.`;

        const notification = onCreateTriggerNotification(
          body,
          title,
          'meals',
          notificationDate,
        );

        notifications.push(notification);
      });
    }

    await Promise.all(notifications);
  };

  return {
    getAllTriggerNotifications,
    cancelAllTriggerNotifications,
    onCreateTriggerNotification,
    scheduleNotificationForTheNextWeek,
  };
};
