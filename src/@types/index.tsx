export type TodoProps = {
    id: string,
    title: string,
    isDone: boolean,
}

export type TodoPassedProps = {
    todo: TodoProps;
    onStatusChange: (id: string) => void;
    onDeleteTodo: (id: string) => void;
}

export type CounterProps = {
    title: string,
    count: string,
    color: string,
}