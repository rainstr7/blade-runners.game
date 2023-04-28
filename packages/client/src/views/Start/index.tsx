

import styles from './style.module.css'

const Start = () => {
    return (
        <div className={styles['game-container']}>
            <div className={styles['content']}>
                <div className="game-container_title">
                    Blade Runner 
                </div>

                <div className={styles['start-content']}>
                    <button>
                        Start Game
                    </button>
                    <button>
                        Settings
                    </button>
                </div>
            </div> 
            
            <div className={styles['buttons']}>
                <button>
                    Leaderboard
                </button>
                <button>
                    Forum
                </button>
            </div>
        </div>
    );
};

export default Start;
