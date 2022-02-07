import React, { useEffect, useState } from 'react';
import styles from './EnterCode.module.scss';

const EnterCode = () => {
  const [code, setCode] = useState('');
  const [errorCode, setError] = useState(null);

  const handleChange = (event) => {
    setCode(event.target.value);
  };

  useEffect(() => {
    if (code === '') {
      setError('');
      return;
    }
    if (code !== '123456') {
      setError('Wrong Code');
      return;
    }

    setError('');
  }, [code]);

  return (
    <div className={styles.wrapper}>
      <h2>Enter Your Conversation Code here:</h2>
      <input value={code} onChange={handleChange} className={styles.input} />
      <span>{errorCode}</span>
      <div className={styles.newRoom}>
        <h4>Or create your own new room:</h4>
        <button className={styles.input}>Create</button>
        <span></span>
      </div>
    </div>
  );
};

export default EnterCode;
