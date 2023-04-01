import moment from 'moment';

export const getFormatInHours = (date: unknown) => {
  const isDate = date instanceof Date;

  let hour = null;

  if (isDate) {
    hour = date;
  } else {
    const time = date as any;
    hour = new Date(time.seconds * 1000);
  }

  return moment(hour).format('HH:mm');
};
