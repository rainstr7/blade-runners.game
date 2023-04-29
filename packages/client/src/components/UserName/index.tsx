import styles from './style.module.css';


export const UserName = ({image, name}: {image: string, name: string}) => {
    return (
        <div className={styles['user']}>
            <div className={styles['user_image']}>
                <img src={image} alt={name} />
            </div>
            <span className={styles['user_name']}>{name}</span>
        </div>
    )
}
