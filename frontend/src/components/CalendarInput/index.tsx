import { FC, Props } from './typings';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './styles.module.scss';
import DatePicker from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';

import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const CalendarInput: FC<Props> = ({ label }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getDayClassName = (date: Date) => {
    const today = moment(selectedDate).format('D');
    const todayMonth = moment(selectedDate).format('M');
    const day = moment(date).format('D');
    const month = moment(date).format('M');
    const isWeekday = moment(date).day();
    if (today === day && month === todayMonth) {
      return styles.dayClassNameActive;
    }

    if (isWeekday === 6 || isWeekday === 0) {
      return styles.isWeekDay;
    }

    return styles.day;
  };

  return (
    <div className={styles.wrapper}>
      {!!label?.length && <div className={styles.label}>{label}</div>}
      <div className={styles.inputWrapper}>
        <div className={styles.icon}>
          <FontAwesomeIcon icon={faCalendarAlt} />
        </div>

        <DatePicker
          dayClassName={getDayClassName}
          calendarClassName={styles.calendar}
          className={styles.input}
          selected={selectedDate}
          locale="pl"
          dateFormat="dd/MM/yyyy"
          allowSameDay={true}
          shouldCloseOnSelect={true}
          onChange={(date: Date) => setSelectedDate(date)}
        />
      </div>
    </div>
  );
};

export default CalendarInput;
