import React from 'react';
import { Button } from 'antd';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { RiMore2Fill } from 'react-icons/ri';

import InterviewActivity from './InterviewActivity';
import styles from './Hiring.module.css';

const data = [
  { name: 'Published', value: 80, color: '#b7e4f7' },
  { name: 'On hold', value: 30, color: '#fc988d' },
  { name: 'Internal', value: 21, color: '#f7d394' },
  { name: 'Closed', value: 15, color: '#c0f5ae' },
];
const COLORS = data.map((d) => d.color);

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

const Hiring: React.FC = () => {
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

  const chartSum = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <>
      <div className={styles.hiring}>
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
        <div className={`card ${styles.hiringCard}`}>
          <div className={styles.header}>
            <h2>Jobs Summary</h2>
            <RiMore2Fill className={styles.more} />
          </div>
          <div className={styles.chart}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  innerRadius="50%"
                  outerRadius="65%"
                  dataKey="value"
                  paddingAngle={3}
                >
                  {data.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize={40} fill="#fff">
                  {chartSum}
                </text>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className={styles.legend}>
            {data.map((obj) => (
              <div id={obj.name} className={styles.item}>
                <div className={styles.color} style={{ background: obj.color }} />
                <p>
                  {obj.value} <span>{obj.name}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
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
