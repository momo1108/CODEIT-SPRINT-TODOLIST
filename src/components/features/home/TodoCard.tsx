"use client";

import { TodoItem } from "@/app/types";
import { CheckboxIcon } from "../../icons/CheckboxIcon";
import { toggleTodoComplete } from "@/app/actions";
import { useRef, useState } from "react";
import Link from "next/link";

interface TodoCardProps {
  data: TodoItem;
}

export function TodoCard({ data }: TodoCardProps) {
  const isToggling = useRef(false);
  const handleToggle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // 링크 이동 방지
    if (isToggling.current) {
      alert("이미 토글 작업이 진행 중입니다.");
      return;
    } // 중복 클릭 방지

    isToggling.current = true;
    await toggleTodoComplete(data.id, data);
    isToggling.current = false;
  };

  return (
    <Link href={`/items/${data.id}`}>
      <div
        className={`flex px-2 gap-4 items-center h-[50px] rounded-[25px] 
    border-2 border-slate-900 ${data.isCompleted ? "bg-violet-100" : "bg-white"}`}
      >
        <button
          onClick={handleToggle}
          className="cursor-pointer hover:opacity-80 transition"
        >
          <CheckboxIcon className="w-8 h-8" isChecked={data.isCompleted} />
        </button>
        <span className="text-slate-800">{data.name}</span>
      </div>
    </Link>
  );
}
