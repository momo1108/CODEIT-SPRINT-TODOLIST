import { TodoItem } from "@/app/types";

interface TodoCardProps {
  data: TodoItem;
}

export function TodoCard({ data }: TodoCardProps) {
  return <div className="grid-item">{/* 할 일 카드 내용 */}</div>;
}
