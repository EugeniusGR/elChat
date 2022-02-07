import React from 'react';
import { Link } from 'react-router-dom';
import { RoutesPath } from '../../constants';
import styles from './WelcomeScreen.module.scss';

const WelcomeScreen = () => {
  return (
    <div className={styles.wrapper}>
      <h2>Welcome to SecretConvers</h2>
      <img src='assets/hello1.png' />
      <Link to={RoutesPath.ENTER_CODE}>
        <button className={styles.continueButton}>Continue</button>
      </Link>
    </div>
  );
};

export default WelcomeScreen;
