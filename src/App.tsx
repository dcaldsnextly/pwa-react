import styles from './App.module.css';

import { useState, useMemo, FormEvent, ChangeEvent } from 'react';
import { PlusCircle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

import { Todo } from './components/Todo';
import { Counter } from './components/Counter';

import { TodoProps } from './@types';

import Logo from './assets/logo.png';
import Empty from './assets/empty.png';

function App() {

  const [todoList, setTodoList] = useState<TodoProps[]>([]);
  const [todoTitle, setTodoTitle] = useState<string>('');

  const onSubmitForm = (event: FormEvent): void => {
    event.preventDefault();

    setTodoList([...todoList, {
      id: uuidv4(),
      title: todoTitle,
      isDone: false,
    }])

    setTodoTitle('');
  }

  const onChangeTodoTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
  }

  const changeTodoStatus = (id: string) => {
    const newTodoList = todoList.map(todo => {
      if (todo.id === id) {
        return {
          id: todo.id,
          title: todo.title,
          isDone: !todo.isDone,
        }
      } else { return todo }
    });

    setTodoList(newTodoList);
  }

  const deleteTodo = (id: string) => {
    const newTodoList = todoList.filter(todo => todo.id !== id);

    setTodoList(newTodoList);
  }

  const allTodosDone = useMemo(() => {
    const todosDone = todoList.reduce((acc, cur) => cur.isDone ? acc + 1 : acc, 0)

    return todosDone;
  }, [todoList]);

  return (
    <main>
      <div className={styles.top}>
        <img src={Logo} alt="Todo" />
      </div>

      <div className={styles.bottom}>

        <form onSubmit={onSubmitForm}>
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
            value={todoTitle}
            onChange={onChangeTodoTitle}
            className={styles.titleInput}
            required
          />

          <button type="submit">
            <span>Criar</span>
            <PlusCircle size={16} color={'white'} />
          </button>
        </form>

        <div className={styles.data}>
          <div className={styles.header}>
            <Counter title={'Tarefas criadas'} count={String(todoList.length)} color={'var(--blue)'} />

            <Counter title={'Concluidas'} count={allTodosDone + ' de ' + String(todoList.length)} color={'var(--purple)'} />
          </div>

          <div className={styles.todos}>
            {
              !todoList[0] && (
                <div className={styles.empty}>
                  <img src={Empty} alt="Empty Icon" width={56} />
                  <p>
                    <span> Você ainda não tem tarefas cadastradas </span> <br />
                    Crie tarefas e organize seus itens a fazer
                  </p>
                </div>
              )
            }

            {
              todoList.map(todo => <Todo key={todo.id} todo={todo} onStatusChange={changeTodoStatus} onDeleteTodo={deleteTodo} />)
            }
          </div>

        </div>
      </div>
    </main>
  )
}

export default App
