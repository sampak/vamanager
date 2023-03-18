import * as moment from 'moment';

export const groupByDates = async (
  data: Array<any>,
  startDate: moment.Moment,
  endDate: moment.Moment
) => {
  const historyDates = [];

  let actualDate = startDate;

  while (!moment(actualDate).isAfter(endDate)) {
    const searchDate = actualDate.format('YYYY-MM-DD');

    const count = data.reduce((prevState, column: { createdAt }) => {
      const date = moment(column.createdAt).format('YYYY-MM-DD');
      if (date === searchDate) {
        return prevState + 1;
      }
      return prevState;
    }, 0);

    historyDates.push({ date: searchDate, pireps: count });

    actualDate = actualDate.add(1, 'day').startOf('day');
  }

  return historyDates;
};
