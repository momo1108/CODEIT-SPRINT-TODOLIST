import { TodoItem } from "@/app/types";
import { TodoCard } from "./TodoCard";

interface TodoSectionProps {
  title: "todo" | "done";
  todos: Array<TodoItem>;
}

export function TodoSection({ title, todos }: TodoSectionProps) {
  return (
    <div className="mb-6">
      <h2>
        {title} ({todos.length})
      </h2>
      <div className="grid-container">
        {todos.map((t) => (
          <TodoCard key={t.id} data={t} />
        ))}
      </div>
    </div>
  );
}
