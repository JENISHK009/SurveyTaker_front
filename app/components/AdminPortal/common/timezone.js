import moment from 'moment';

export const getTimeZoneFormat = (startTime, endTime) => {
  const timeZone = moment.tz.guess();
  const time = new Date();

  const timeZoneOffset = time.getTimezoneOffset();

  const dateFormat = `${moment(startTime).format('L')}${', '}${moment(
    startTime,
  ).format('LT')}${'-'}${moment(endTime).format('LT')} ${moment.tz
    .zone(timeZone)
    .abbr(timeZoneOffset)}
    `;
  return dateFormat;
};
