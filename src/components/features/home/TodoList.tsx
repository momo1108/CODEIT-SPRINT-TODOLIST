import { TodoSection } from "./TodoSection";
import { TodoItem } from "@/app/types";

export function TodoList({ initialTodos }: { initialTodos: TodoItem[] }) {
  const incompleteTodos = initialTodos.filter((t) => !t.isCompleted);
  const completeTodos = initialTodos.filter((t) => t.isCompleted);

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-12 lg:gap-6
    hide-scroll overflow-y-auto"
    >
      <TodoSection title="todo" todos={incompleteTodos} />
      <TodoSection title="done" todos={completeTodos} />
    </div>
  );
}
