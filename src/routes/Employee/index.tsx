// import { useParams } from 'react-router-dom';
// import { PiTimerBold } from 'react-icons/pi';

// import type { PathParams, ROUTES } from '@/shared/config/routes';

// import AvatarPlaceholder from '@/asssets/images/avatar-placeholder.png';
import Calendar from './Calendar';
import Notes from './Notes';
import WeeklyActivity from './WeeklyActivity';

import styles from './Employee.module.css';

// const employee = {
//   firstName: 'Ivan',
//   lastName: 'Ivanov',
//   email: 'test@test.com',
//   photo: '',
//   position: 'Product Designer',
//   grade: 'Senior',
//   joined: new Date('2025-05-12'),
// };

const Employee = () => {
  // const params = useParams<PathParams[typeof ROUTES.EMPLOYEE]>();

  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <div className={`card ${styles.cardTall}`}>
          {/* <div className={styles.info}>
            <Image alt="avatar" src={employee.photo} fallback={AvatarPlaceholder} width={'50%'} />
            <div className={styles.infoText}>
              <div>
                <p>Name</p>
                <h3>
                  {employee.firstName} {employee.lastName}
                </h3>
              </div>
              <div>
                <p>Position</p>
                <h4>
                  {employee.grade} {employee.position}
                </h4>
              </div>
              <div>
                <p>Email</p>
                <h4>
                  <a href={`mailto:${employee.email}`} target="_blank">
                    {employee.email}
                  </a>
                </h4>
              </div>
              <div>
                <p>Joined on</p>
                <h4>{moment(employee.joined).format('MMM DD, YYYY')}</h4>
              </div>
            </div>
          </div> */}
        </div>
        <div className={styles.column}>
          <div className={styles.row}>
             <div className="card"></div>
            <div className="card"></div>
          </div>
          <div className={styles.row}>
            <div className="card"></div>
            <div className="card"></div>
          </div>
        </div>
      </div>
      <div className={styles.column}>
        <div className="card">
          <WeeklyActivity />
        </div>
        <div className="card"></div>
        <div className="card"></div>
      </div>
      <div className={styles.column}>
        <div className={`card ${styles.card}`}>
          <Notes />
        </div>
        <div className={`card ${styles.cardTall}`}>
          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default Employee;
