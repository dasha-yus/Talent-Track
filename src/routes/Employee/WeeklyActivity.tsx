import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { Avatar, Divider } from 'antd';

import { SiSlack } from 'react-icons/si';
import { SiGooglemeet } from 'react-icons/si';
import { SiGooglechat } from 'react-icons/si';
import { SiGithub } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { FaDatabase } from "react-icons/fa";

import styles from './Employee.module.css';

const DEVELOPMENT_ACTIVITY = 72;

const data = [
  ...Array(DEVELOPMENT_ACTIVITY / 2).fill({ name: 'Development', value: 1, color: '#9c9c9c' }),
  ...Array((100 - DEVELOPMENT_ACTIVITY) / 2).fill({ name: 'Communication', value: 1, color: '#363636' }),
];

const WeeklyActivity: React.FC = () => {
  return (
    <>
      <div className={styles.weeklyActivity}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={true}
              innerRadius="80%"
              outerRadius="100%"
              dataKey="value"
              paddingAngle={3}
              startAngle={180}
              endAngle={0}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className={styles.activityLabel}>
          <h3>{DEVELOPMENT_ACTIVITY}%</h3>
          <p>Weekly activity</p>
        </div>
      </div>
      <div className={styles.activity}>
        <div className={styles.block}>
          <div className={styles.category}>
            <Avatar.Group>
              <Avatar className={styles.avatar} icon={<VscVscode className={styles.icon} />} />
              <Avatar className={styles.avatar} icon={<FaDatabase className={styles.icon} />} />
              <Avatar className={styles.avatar} icon={<SiGithub className={styles.icon} />} />
            </Avatar.Group>
            <p>Development</p>
          </div>
          <p>{DEVELOPMENT_ACTIVITY}%</p>
        </div>
        <Divider className={styles.divider} />
        <div className={styles.block}>
          <div className={styles.category}>
            <Avatar.Group>
              <Avatar className={styles.avatar} icon={<SiGooglechat className={styles.icon} />} />
              <Avatar className={styles.avatar} icon={<SiSlack className={styles.icon} />} />
              <Avatar className={styles.avatar} icon={<SiGooglemeet className={styles.icon} />} />
            </Avatar.Group>
            <p>Communication</p>
          </div>
          <p>{100 - DEVELOPMENT_ACTIVITY}%</p>
        </div>
      </div>
    </>
  );
};

export default WeeklyActivity;
