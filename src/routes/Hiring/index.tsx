import React from 'react';

import InterviewActivity from './InterviewActivity';
import styles from './Hiring.module.css';
import Vacancies from './Vacancies';
import JobsSummary from './JobsSummary';

const Hiring: React.FC = () => {
  return (
    <>
      <div className={styles.hiring}>
        <Vacancies />
        <JobsSummary />
      </div>
      <div className={`card ${styles.hiringCard} ${styles.interviews}`}>
        <div className={styles.header}>
          <h2>Interview activity</h2>
        </div>
        <InterviewActivity />
      </div>
    </>
  );
};

export default Hiring;
