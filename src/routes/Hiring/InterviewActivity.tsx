import React, { useEffect, useState } from 'react';
import moment from 'moment';

import styles from './Hiring.module.css';

// Helper function to generate the past year's data
const generateYearData = () => {
  const today = new Date();
  const yearAgo = new Date();
  yearAgo.setFullYear(today.getFullYear() - 1);

  const data = [];
  let currentDate = new Date(yearAgo);

  while (currentDate <= today) {
    data.push({
      date: new Date(currentDate),
      activity: Math.floor(Math.random() * 5), // Random activity level (0-4)
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return data;
};

// Helper function to group data by weeks
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

const ContributionGraph: React.FC = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const today = moment();
  const oneYearAgo = today.clone().subtract(13, 'month');
  const weeksDifference = today.diff(oneYearAgo, 'weeks');

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const yearData = generateYearData();
  const weeks = groupByWeeks(yearData);

  const months = [
    ...new Set(yearData.map((day) => day.date.toLocaleString('default', { month: 'short' }))),
    moment().format('MMM'),
  ];

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

      {/* Grid with day labels */}
      <div className={styles['grid-container']}>
        {/* Day labels */}
        <div className={styles['day-labels']}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
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
                    backgroundColor: getColor(day.activity),
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

const getColor = (level: any) => {
  const colors = ['#ebedf0', '#cadbfa', '#b6caf0', '#81a0db', '#5479bf'];
  return colors[level] || '#ebedf0';
};

export default ContributionGraph;
