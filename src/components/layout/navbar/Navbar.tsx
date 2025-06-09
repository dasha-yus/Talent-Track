import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { motion } from 'framer-motion';

import styles from './Navbar.module.css';
import { ROUTES } from '@/shared/config/routes';

type MenuItem = {
  title: string;
  url: string;
};

const menuItems: MenuItem[] = [
  { title: 'Employees', url: ROUTES.EMPLOYEES },
  { title: 'Stats', url: ROUTES.EMPLOYEE + '1' },
  { title: 'Projects', url: ROUTES.EMPLOYEE + '2' },
  { title: 'Hiring', url: ROUTES.EMPLOYEE + '3' },
];

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const renderLogo = () => {
    return (
      <Link to={ROUTES.HOME} className={styles.logo}>
        TALENT<span className={styles.logoPrimary}>TRACK</span>
      </Link>
    );
  };

  return (
    <nav className={styles.navbar}>
      {renderLogo()}
      <div className={styles.navbarRight}>
        <div className={styles.menu}>
          {menuItems.map((item) => (
            <Link key={item.url} to={item.url} className={item.url === location.pathname ? styles.active : ''}>
              {item.title}
            </Link>
          ))}
        </div>
        <div className={styles.avatar}>DY</div>
      </div>
      <GiHamburgerMenu className={styles.burger} onClick={toggleSidebar} />

      {isSidebarOpen && (
        <motion.div
          className={styles.sidebar}
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.3 }}
        >
          <div className={styles.sidebarHeader}>
            {renderLogo()}
            <button onClick={toggleSidebar} className={styles.closeButton}>
              ✕
            </button>
          </div>
          <ul className={styles.sidebarMenu}>
            {menuItems.map((item) => (
              <li key={item.url}>
                <Link
                  to={item.url}
                  className={item.url === location.pathname ? styles.active : ''}
                  onClick={toggleSidebar}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
