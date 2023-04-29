
import { FC } from 'react'

import styles from './style.module.css';
import { UserName } from '../../components/UserName';
import Button from '../../components/UI/Button';

export const Finish: FC = () => {
  return (
    <div className={styles['game-container']}>
        <div className={styles['content']}>
            <Header title="BLADE RUNNER" />

            <div className={styles['finish-content']}>
            
                <UserName 
                    name='KEKS OUALNIY' 
                    image='https://sun9-62.userapi.com/s/v1/if2/hX2drELI1dlQ9an7NbVcl9inBZ4UXS9V2aUkS9FmB3C7STg2CRMY8THQursyE4tTuxJvx2cNmCI_YW3zrdlLLwh8.jpg?size=320x400&quality=96&type=album'
                />

                <div className={styles['result']}>
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

            <div className={styles['buttons']}>
                <Button label="Restart" />
                <Button label="To main" />
            </div>

        </div>
    </div>
  )
}
