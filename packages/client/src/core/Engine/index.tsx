import React, { FC } from 'react';
import styles from './style.module.css'

const Engine: FC = () => {
  return (
    <div className={styles.container}>
      <h1>
        Blade Runner
      </h1>

      <span className={styles.character}></span>
    </div>
  )
}

export default Engine;
