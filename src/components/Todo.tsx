import styles from './Todo.module.css';

import { TodoPassedProps } from '../@types';
import { Trash } from 'lucide-react';

export const Todo = ({ todo, onStatusChange, onDeleteTodo }: TodoPassedProps) => {
    return (
        <div className={styles.todo}>
            <div className={styles.info}>
                <input
                    type="checkbox"
                    checked={todo.isDone}
                    onChange={() => onStatusChange(todo.id)}
                    className={styles.checkbox}
                />

                {!todo.isDone && (
                    <p className={styles.titleTodo}>
                        {todo.title}
                    </p>
                )}

                {todo.isDone && (
                    <p className={styles.titleDone}>
                        {todo.title}
                    </p>
                )}
            </div>

            <div
                className={styles.trash}
                onClick={() => onDeleteTodo(todo.id)}
            >
                <Trash size={16} />
            </div>
        </div>

    )
}