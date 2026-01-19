import { TodoItem } from "@/app/types";
import { TodoCard } from "./TodoCard";
import Image from "next/image";

interface TodoSectionProps {
  title: "todo" | "done";
  todos: Array<TodoItem>;
}

export function TodoSection({ title, todos }: TodoSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <Image
        src={title === "todo" ? "/images/todo.png" : "/images/done.png"}
        alt={title}
        width={101}
        height={36}
      />
      {todos.length === 0 ? (
        <div className="flex flex-col gap-6 lg:py-9 items-center justify-center">
          <Image
            className={`hidden md:block max-w-[240px]`}
            src={
              title === "todo"
                ? "/images/todo_large.png"
                : "/images/done_large.png"
            }
            alt="no items"
            width={720}
            height={720}
          />
          <Image
            className="block md:hidden"
            src={
              title === "todo"
                ? "/images/todo_small.png"
                : "/images/done_small.png"
            }
            alt="no items"
            width={120}
            height={120}
          />
          <pre className="font-nanum text-center text-base text-slate-400 font-bold">
            {title === "todo"
              ? "할 일이 없어요.\nTODO를 새롭게 추가해주세요!"
              : "아직 다 한 일이 없어요.\n해야 할 일을 체크해보세요!"}
          </pre>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {todos.map((t) => (
            <TodoCard key={t.id} data={t} />
          ))}
        </div>
      )}
    </div>
  );
}
