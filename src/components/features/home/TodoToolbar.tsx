"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { PlusIcon } from "@/components/icons/PlusIcon";
import { TodoItem } from "@/app/types";
import { createTodo } from "@/app/actions";
import { useFormStatus } from "react-dom";
import { useEffect, useRef } from "react";

export function TodoToolbar({ initialTodos }: { initialTodos: TodoItem[] }) {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await createTodo(formData);
      }}
      className="flex items-center gap-4"
    >
      <ToolbarContent isEmpty={initialTodos.length === 0} />
    </form>
  );
}

// useFormStatus 를 사용하기 위해 분리
function ToolbarContent({ isEmpty }: { isEmpty: boolean }) {
  const { pending } = useFormStatus(); // ✅ 제출 중 상태 감지
  const inputRef = useRef<HTMLInputElement>(null);

  // pending 을 기반으로 완료 되면 input 에 포커스
  useEffect(() => {
    if (!pending) {
      inputRef.current?.focus();
    }
  }, [pending, inputRef]);

  return (
    <>
      <Input
        ref={inputRef}
        name="name"
        placeholder="할 일을 입력해주세요"
        disabled={pending}
        required
      />

      <Button
        type="submit"
        icon={<PlusIcon width={16} height={16} isEmpty={isEmpty} />}
        disabled={pending}
        label={pending ? "추가 중.." : "추가하기"}
        variant={isEmpty ? "add-empty" : "add-not-empty"}
      />
    </>
  );
}
