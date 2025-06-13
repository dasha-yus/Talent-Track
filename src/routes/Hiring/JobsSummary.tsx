import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { RiMore2Fill } from 'react-icons/ri';

import styles from './Hiring.module.css';

const data = [
  { name: 'Published', value: 80, color: '#b7e4f7' },
  { name: 'On hold', value: 30, color: '#fc988d' },
  { name: 'Internal', value: 21, color: '#f7d394' },
  { name: 'Closed', value: 15, color: '#c0f5ae' },
];
const COLORS = data.map((d) => d.color);

const JobsSummary: React.FC = () => {
  const chartSum = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
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
  );
};

export default JobsSummary;
