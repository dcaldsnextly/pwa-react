import { CounterProps } from '../@types';
import styles from './Counter.module.css';

export const Counter = ({ title, count, color }: CounterProps) => {
    return (
        <div className={styles.counter}>
            <p className={styles.title} style={{ color }}>
                {title}
            </p>
            <span className={styles.count}> {count} </span>
        </div>
    )
}