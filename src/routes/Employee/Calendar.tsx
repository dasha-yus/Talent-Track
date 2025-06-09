import React, { useState } from 'react';
import moment from 'moment';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { SiGooglemeet } from 'react-icons/si';

import styles from './Employee.module.css';

const meetings = [
  {
    id: '1',
    date: moment().set({ hour: 12, minute: 0 }),
    title: 'One to one',
    with: 'CEO',
  },
  {
    id: '2',
    date: moment().set({ hour: 13, minute: 40 }),
    title: 'Sales meeting',
    with: 'Creative director',
  },
  {
    id: '3',
    date: moment().set({ hour: 17, minute: 0 }),
    title: 'Art director',
    with: 'Design review',
  },
];

const Calendar: React.FC = () => {
  const today = moment();
  const [currentDate, setCurrentDate] = useState(moment());

  const startOfMonth = currentDate.clone().startOf('month');
  const endOfMonth = currentDate.clone().endOf('month');

  // Get the first day of the calendar grid (Monday of the first week)
  const startOfCalendar = startOfMonth.clone().startOf('week').add(1, 'days');

  // Get the last day of the calendar grid (Sunday of the last week)
  const endOfCalendar = endOfMonth.clone().endOf('week').add(1, 'days');

  const days = [];
  let day = startOfCalendar.clone();
  while (day.isBefore(endOfCalendar, 'day')) {
    days.push(day.clone());
    day.add(1, 'day');
  }

  const handlePrevMonth = () => setCurrentDate(currentDate.clone().subtract(1, 'month'));
  const handleNextMonth = () => setCurrentDate(currentDate.clone().add(1, 'month'));

  return (
    <>
      <div className={styles.calendar}>
        <div className={styles.header}>
          <button onClick={handlePrevMonth}>
            <FaChevronLeft />
          </button>
          <span>{currentDate.format('MMMM YYYY')}</span>
          <button onClick={handleNextMonth}>
            <FaChevronRight />
          </button>
        </div>

        <div className={styles.weekdays}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div key={day} className={styles.weekday}>
              {day}
            </div>
          ))}
        </div>

        <div className={styles.days}>
          {days.map((day, index) => (
            <div
              key={index}
              className={`${styles.day} ${day.isSame(currentDate, 'month') ? '' : styles.anotherMonth} ${
                day.isSame(today, 'day') ? styles.today : ''
              }`}
            >
              {day.date()}
            </div>
          ))}
        </div>
      </div>

      {/* Meetings */}
      {meetings.length ? (
        <div className={styles.meetings}>
          {meetings.map((meeting) => (
            <div className={`${styles.meeting} ${meeting.id === '1' && styles.currentMeeting}`}>
              <div className={styles.mettingInfo}>
                <div className={styles.mettingTime}>
                  <p>{meeting.date.format('DD MMM')}</p>
                  <h4>{meeting.date.format('HH:mm')}</h4>
                </div>
                <div className={styles.line} />
                <div>
                  <p>{meeting.with}</p>
                  <h4>{meeting.title}</h4>
                </div>
              </div>
              <SiGooglemeet />
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.noMeetings}>
          <p>No meeting today</p>
        </div>
      )}
    </>
  );
};

export default Calendar;
