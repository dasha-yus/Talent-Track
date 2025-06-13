import React from 'react';
import { Button } from 'antd';

import styles from './Hiring.module.css';

type CandidatesObj = {
  value: number;
  status: 'active' | 'inactive';
};

type Job = {
  id: string;
  position: string;
  free: number;
  color: string;
  candidates: {
    new: CandidatesObj;
    screening?: CandidatesObj;
    softSkills?: CandidatesObj;
    hardSkills?: CandidatesObj;
    hired?: CandidatesObj;
  };
};

const jobs: Job[] = [
  {
    id: '1',
    position: 'React developer',
    free: 3,
    color: '#b7e4f7',
    candidates: {
      new: {
        value: 18,
        status: 'inactive',
      },
      screening: {
        value: 8,
        status: 'inactive',
      },
      softSkills: {
        value: 5,
        status: 'inactive',
      },
      hardSkills: {
        value: 4,
        status: 'inactive',
      },
      hired: {
        value: 2,
        status: 'active',
      },
    },
  },
  {
    id: '2',
    position: 'Angular developer',
    free: 2,
    color: '#fc988d',
    candidates: {
      new: {
        value: 10,
        status: 'inactive',
      },
      screening: {
        value: 7,
        status: 'inactive',
      },
      softSkills: {
        value: 5,
        status: 'active',
      },
    },
  },
  {
    id: '3',
    position: 'QA',
    free: 4,
    color: '#f7d394',
    candidates: {
      new: {
        value: 14,
        status: 'inactive',
      },
      screening: {
        value: 10,
        status: 'active',
      },
    },
  },
  {
    id: '4',
    position: 'Vue developer',
    free: 1,
    color: '#c0f5ae',
    candidates: {
      new: {
        value: 5,
        status: 'inactive',
      },
      screening: {
        value: 5,
        status: 'inactive',
      },
      softSkills: {
        value: 4,
        status: 'inactive',
      },
      hardSkills: {
        value: 4,
        status: 'active',
      },
    },
  },
];

const Vacancies: React.FC = () => {
  const renderCandidates = (color: string, candidates?: CandidatesObj) => {
    return (
      <div
        className={`${styles.block} ${styles.candidates} ${candidates || styles.noCandidates} ${candidates?.status === 'active' && styles.activeCandidates}`}
        style={{ backgroundColor: color, opacity: candidates?.status === 'inactive' ? 0.7 : 1 }}
      >
        {candidates ? `${candidates.value} Candidates` : ''}
      </div>
    );
  };

  return (
    <div className={`card ${styles.hiringCard}`}>
      <div className={styles.header}>
        <h2>Hiring</h2>
        <Button>Manage vacancies</Button>
      </div>
      <div className={styles.jobs}>
        <h3 className={`${styles.block} ${styles.flexColumn}`}>Jobs</h3>
        <h3 className={`${styles.block} ${styles.flexColumn}`}>New Applied</h3>
        <h3 className={`${styles.block} ${styles.flexColumn}`}>Screening</h3>
        <h3 className={`${styles.block} ${styles.flexColumn}`}>Soft Skills</h3>
        <h3 className={`${styles.block} ${styles.flexColumn}`}>Hard Skills</h3>
        <h3 className={`${styles.block} ${styles.flexColumn}`}>Hired</h3>
        {jobs.map((job) => (
          <React.Fragment key={job.id}>
            <div className={`p-l-0 ${styles.block} ${styles.flexColumn}`}>
              <h4>{job.position}</h4>
              <p>Open vacancies: {job.free}</p>
            </div>
            {renderCandidates(job.color, job.candidates.new)}
            {renderCandidates(job.color, job.candidates.screening)}
            {renderCandidates(job.color, job.candidates.softSkills)}
            {renderCandidates(job.color, job.candidates.hardSkills)}
            {renderCandidates(job.color, job.candidates.hired)}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Vacancies;
