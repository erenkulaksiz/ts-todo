export interface TodoProps {
    title: string;
    completed: boolean;
    createdAt: number;
}

export interface TodoComponentProps{
    todo: TodoProps;
    onDeleteTodo: Function;
    onToggleTodo: Function;
}