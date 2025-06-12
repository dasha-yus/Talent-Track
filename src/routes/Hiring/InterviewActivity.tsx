import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { getDataIntervals, isInDataInterval } from '@/utils/General';
import styles from './Hiring.module.css';

const generateYearData = () => {
  const today = new Date();
  const yearAgo = new Date();
  yearAgo.setFullYear(today.getFullYear() - 1);

  const data = [];
  let currentDate = new Date(yearAgo);

  while (currentDate <= today) {
    data.push({
      date: new Date(currentDate),
      activity: Math.floor(Math.random() * 5),
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return data;
};

const groupByWeeks = (data: any[]) => {
  const weeks: any[][] = [];
  let week: any[] = [];

  data.forEach((day, index) => {
    week.push(day);
    if (week.length === 7 || index === data.length - 1) {
      weeks.push(week);
      week = [];
    }
  });

  return weeks;
};

const InterviewActivity: React.FC = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const today = moment();
  const oneYearAgo = today.clone().subtract(13, 'month');
  const weeksDifference = today.diff(oneYearAgo, 'weeks');

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const createGradientColor = (intervals: number[][], value: number) => {
    const [interval1, interval2, interval3, interval4, interval5] = intervals;
    if (interval1 && interval2 && interval3 && interval4 && interval5) {
      if (isInDataInterval(value, interval1)) {
        return '#ebedf0';
      } else if (isInDataInterval(value, interval2)) {
        return '#cadbfa';
      } else if (isInDataInterval(value, interval3)) {
        return '#a6c3f7';
      } else if (isInDataInterval(value, interval4)) {
        return '#86aaeb';
      } else if (isInDataInterval(value, interval5)) {
        return '#5d89d9';
      }
    }
    return '#ebedf0';
  };

  const getDaysOfWeek = () => {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const todayIndex = moment().isoWeekday() - 1;
    return weekdays.slice(todayIndex).concat(weekdays.slice(0, todayIndex));
  };

  const yearData = generateYearData();
  const weeks = groupByWeeks(yearData);

  const months = [
    ...new Set(yearData.map((day) => day.date.toLocaleString('default', { month: 'short' }))),
    moment().format('MMM'),
  ];

  const max = yearData.reduce((prev, current) => (prev.activity > current.activity ? prev : current));
  const intervals = getDataIntervals(max.activity);

  return (
    <div className={styles['contribution-graph']}>
      {/* Month headers */}
      <div className={styles['months-row']}>
        {months.map((month, index) => (
          <div key={index} className={styles['month-header']}>
            {month}
          </div>
        ))}
      </div>

      {/* Day labels */}
      <div className={styles['grid-container']}>
        <div className={styles['day-labels']}>
          {getDaysOfWeek().map((day, index) => (
            <div key={index} className={styles['day-label']}>
              {day}
            </div>
          ))}
        </div>

        {/* Activity grid */}
        <div className={styles['grid']}>
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className={styles['week']}>
              {week.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className={styles['day']}
                  style={{
                    backgroundColor: createGradientColor(intervals, day.activity),
                    width: `${(width - 160 - 60 - 4 * (weeksDifference - 1)) / (weeksDifference - 1)}px`,
                    height: 16,
                  }}
                  title={`${day.date.toDateString()}: ${day.activity} interviews`}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InterviewActivity;
