
import { FC } from 'react'

import styles from './style.module.css';

export const Finish: FC = () => {
  return (
    <div className={styles['game-container']}>
        <div className={styles['content']}>
            {/* <Header title="BLADE RUNNER" /> */}

            <div className={styles['finish-content']}>
                
                <div className="user">
                    <img src="https://sun9-62.userapi.com/s/v1/if2/hX2drELI1dlQ9an7NbVcl9inBZ4UXS9V2aUkS9FmB3C7STg2CRMY8THQursyE4tTuxJvx2cNmCI_YW3zrdlLLwh8.jpg?size=320x400&quality=96&type=album" alt="" />
                    <span>KEKS OUAKNIY</span>
                </div>

                <div className="result">
                    <div className="scope">
                        Scope: 321312
                    </div>
                    <div className="ranking">
                        Ranking: 56
                    </div>
                    <div className="scores">
                        Scores: 321312
                    </div>
                </div>

            </div>

            <button>
                Restart
            </button>

            <button>
                To main
            </button>


        </div>
    </div>
  )
}
