"use client";

import { UpdateTodoItemDto } from "@/app/types";
import { CheckboxIcon } from "@/components/icons/CheckboxIcon";

interface ItemToolbarProps {
  formData: UpdateTodoItemDto;
  onToggleCompleted: () => void;
}

export function ItemToolbar({ formData, onToggleCompleted }: ItemToolbarProps) {
  return (
    <div
      className={`h-16 flex justify-center items-center gap-4 text-xl font-bold
    rounded-[24px] border-2 border-slate-900 transition-colors ${
      formData.isCompleted ? "bg-violet-100" : "bg-white"
    }`}
      onClick={onToggleCompleted}
    >
      <CheckboxIcon className="w-8 h-8" isChecked={formData.isCompleted} />
      <span className="underline">{formData.name}</span>
    </div>
  );
}
