import { Button, Space, Tag, type TableProps } from 'antd';
import { TiUserAdd } from 'react-icons/ti';
import { IoIosPeople } from 'react-icons/io';
import { MdWork } from 'react-icons/md';
import moment from 'moment';

import styles from './Employees.module.css';
import Table from '@/components/table';

interface DataType {
  key: string;
  name: string;
  department: string;
  position: string;
  grade: string;
  status: 'active' | 'inactive' | 'on leave';
  joinDate: Date;
}

const departments = ['React', 'Node.js', 'Angular', 'Vue', 'Design', 'Marketing', 'DevOps', 'QA'];
const positions = ['Developer', 'Designer', 'Manager', 'Analyst', 'Tester'];
const grades = [
  'Intern',
  'Junior-',
  'Junior',
  'Junior+',
  'Midddle-',
  'Midddle',
  'Midddle+',
  'Senior-',
  'Senior',
  'Senior+',
  'Lead',
];
const statuses: DataType['status'][] = ['active', 'inactive', 'on leave'];

const getRandomElement = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

const generateRandomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const generateData = (num: number): DataType[] => {
  const newData: DataType[] = [];
  for (let i = 1; i <= num; i++) {
    newData.push({
      key: (i + 1).toString(),
      name: `FirstName${i} LastName${i}`,
      department: getRandomElement(departments),
      position: `${getRandomElement(positions)}`,
      grade: getRandomElement(grades),
      status: getRandomElement(statuses) as 'active' | 'inactive' | 'on leave',
      joinDate: generateRandomDate(new Date('2020-01-01'), new Date()),
    });
  }
  return newData;
};

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    department: 'React',
    position: 'Developer',
    grade: 'Senior-',
    status: 'active',
    joinDate: new Date('2025-05-12'),
  },
  ...generateData(20),
];

const Employees = () => {
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '25%',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      filters: departments.map((dep) => ({ text: dep, value: dep })),
      onFilter: (value, record) => record.department.indexOf(value as string) === 0,
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      key: 'grade',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'green' : status === 'inactive' ? 'red' : 'yellow'}>
          {status.toUpperCase()}
        </Tag>
      ),
      filters: statuses.map((dep) => ({ text: dep.toUpperCase(), value: dep })),
      onFilter: (value, record) => record.status.indexOf(value as string) === 0,
    },
    {
      title: 'Join Date',
      dataIndex: 'joinDate',
      key: 'joinDate',
      render: (joinDate) => moment(joinDate).format('DD-MM-YYYY'),
      sorter: (a, b) => a.joinDate.getTime() - b.joinDate.getTime(),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a href={`/employees/${record.key}`}>View details</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className={styles.header}>
        <h1>Employee list</h1>
        <div className={styles.buttons}>
          <Button size="large" icon={<TiUserAdd />}>
            Add a new employee
          </Button>
          <Button size="large" icon={<TiUserAdd />}>
            Add a new intern
          </Button>
        </div>
      </div>
      <div className={styles.stats}>
        <div className="card">
          <div className={styles.title}>
            <IoIosPeople size={24} />
            <p>Total employees</p>
          </div>
          <p className={styles.number}>134</p>
          <p className={styles.lastMonth}>
            <span className={styles.plus}>+2</span> from last month
          </p>
        </div>
        <div className="card">
          <div className={styles.title}>
            <IoIosPeople size={24} />
            <p>Total interns</p>
          </div>
          <p className={styles.number}>48</p>
          <p className={styles.lastMonth}>
            <span className={styles.plus}>+5</span> from last month
          </p>
        </div>
        <div className="card">
          <div className={styles.title}>
            <TiUserAdd size={20} />
            <p>New hires this month</p>
          </div>
          <p className={styles.number}>5</p>
          <p className={styles.lastMonth}>
            <span className={styles.plus}>+2</span> from last month
          </p>
        </div>
        <div className="card">
          <div className={styles.title}>
            <MdWork size={18} />
            <p>Average Tenure (Years)</p>
          </div>
          <p className={styles.number}>2.8</p>
          <p className={styles.lastMonth}>
            <span className={styles.plus}>+1.2%</span> from last month
          </p>
        </div>
      </div>
      <Table columns={columns} data={data} styles={styles} columnsWithSearch={['name']} />
    </>
  );
};

export default Employees;
