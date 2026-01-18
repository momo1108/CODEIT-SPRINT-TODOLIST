import { TodoItem } from "@/app/types";
import { TodoSection } from "./TodoSection";

interface TodoListProps {
  todos: Array<TodoItem>;
}

export function TodoList({ todos }: TodoListProps) {
  const incompleteTodos = todos.filter((t) => !t.isCompleted);
  const completeTodos = todos.filter((t) => t.isCompleted);

  return (
    <>
      <TodoSection title="todo" todos={incompleteTodos} />
      <TodoSection title="done" todos={completeTodos} />
    </>
  );
}
