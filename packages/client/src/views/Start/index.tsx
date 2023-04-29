
import Header from '../../components/UI/Header'
import Button from '../../components/UI/Button'

import styles from './style.module.scss'

const Start = () => {
    return (
        <div className={styles['game-container']}>
            <div className={styles['content']}>
                <Header title="BLADE RUNNER" />

                <div className={styles['start-content']}>
                    <Button label="Start Game" />
                    <Button label="Settings" />
                </div>
            </div> 
            
            <div className={styles['buttons']}>
                <Button label="Leaderboard" />
                <Button label="Forum" />
            </div>
        </div>
    );
};

export default Start;
