import React from 'react';
import { FaPlus } from 'react-icons/fa';

import styles from './Employee.module.css';
import moment from 'moment';

const notes = [
  { date: new Date('2025-05-14'), text: 'Make sure all requests have a vacation note' },
  {
    date: new Date('2025-05-19'),
    text: 'Discuss the possibility of teaching students. If agree, redirect to M2 for details',
  },
];

const Notes: React.FC = () => {
  return (
    <>
      <div className={styles.title}>
        <h3>Notes</h3>
        <FaPlus />
      </div>
      <div className={styles.notes}>
        {notes
          .sort((n1, n2) => n1.date.getTime() - n2.date.getTime())
          .map((note) => (
            <div className={styles.note}>
              <p className={styles.date}>{moment(note.date).format('MMM DD, YYYY')}</p>
              <p className={styles.text}>{note.text}</p>
            </div>
          ))}
      </div>
    </>
  );
};

export default Notes;
