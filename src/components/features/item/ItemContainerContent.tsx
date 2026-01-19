"use client";

import { useState, useRef } from "react";
import { TodoItem, UpdateTodoItemDto } from "@/app/types";
import { ItemToolbar } from "@/components/features/item/ItemToolbar";
import { ErrorAlert } from "@/components/ui/ErrorAlert";
import { ImageUpload } from "@/components/features/item/ImageUpload";
import Button from "@/components/ui/Button";
import { CheckIcon } from "@/components/icons/CheckIcon";
import { XIcon } from "@/components/icons/XIcon";
import { ItemTextarea } from "./ItemTextarea";
import { deleteTodo, updateTodo } from "@/app/actions";

interface ClientItemPageProps {
  data: TodoItem | undefined;
  error: string | undefined;
}

export default function ItemContainerContent({
  data,
  error,
}: ClientItemPageProps) {
  const [formData, setFormData] = useState<UpdateTodoItemDto>(
    data
      ? {
          name: data.name,
          memo: data.memo || "",
          imageUrl: data.imageUrl || "",
          isCompleted: data.isCompleted,
        }
      : {
          name: "",
          memo: "",
          imageUrl: "",
          isCompleted: false,
        },
  );

  // 업로드할 File 객체 저장 (리렌더링 방지를 위해 useRef 사용)
  const fileRef = useRef<File | null>(null);

  const handleToggleCompleted = () => {
    setFormData((prev) => ({
      ...prev,
      isCompleted: !prev.isCompleted,
    }));
  };

  const handleMemoChange = (memo: string) => {
    setFormData((prev) => ({
      ...prev,
      memo,
    }));
  };

  const handleImageChange = (imageUrl: string, file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      imageUrl,
    }));
    fileRef.current = file; // 업로드용 File 저장
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const submitter = (e.nativeEvent as SubmitEvent)
      .submitter as HTMLButtonElement;
    const buttonName = submitter?.name;

    // 데이터 유효성 검사
    if (!data?.id) {
      alert("삭제할 아이템의 ID를 찾을 수 없습니다.");
      return;
    }

    if (buttonName === "update") {
      // FormData 객체 생성 및 데이터 추가
      const submitFormData = new FormData();
      submitFormData.append("name", formData.name);
      submitFormData.append("memo", formData.memo);
      submitFormData.append("isCompleted", String(formData.isCompleted));
      submitFormData.append("imageUrl", formData.imageUrl || "");

      if (fileRef.current) {
        submitFormData.append("file", fileRef.current); // 새 이미지 파일 첨부
      }

      // 수정 완료 액션
      const result = await updateTodo(data.id, submitFormData);
      if (result && result.error) {
        alert("아이템 수정에 실패했습니다: " + result.error);
      }
    } else if (buttonName === "delete") {
      // 삭제 액션
      await deleteTodo(data.id);
    }
  };

  return (
    <>
      {error ? (
        <ErrorAlert message={error} />
      ) : data ? (
        <form className="flex flex-col gap-4 md:gap-6" onSubmit={handleSubmit}>
          {/* 완료 상태 토글 */}
          <ItemToolbar
            formData={formData}
            onToggleCompleted={handleToggleCompleted}
          />

          <div className="flex flex-col lg:flex-row gap-6">
            {/* 이미지 업로드 */}
            <ImageUpload
              imageUrl={formData.imageUrl}
              onImageChange={handleImageChange}
            />

            {/* 메모 입력 */}
            <ItemTextarea
              formData={formData}
              handleMemoChange={handleMemoChange}
            />
          </div>

          {/* 제출 버튼, 삭제 버튼 */}
          <div className="flex justify-center md:justify-end gap-2 md:gap-4">
            <Button
              type="submit"
              name="update"
              variant={`${formData.isCompleted ? "modify-not-empty" : "modify-empty"}`}
              icon={<CheckIcon />}
              label="수정 완료"
              isResponsive={false}
            />
            <Button
              type="submit"
              name="delete"
              variant="delete"
              icon={<XIcon />}
              label="삭제하기"
              isResponsive={false}
            />
          </div>
        </form>
      ) : (
        <ErrorAlert message="데이터를 불러올 수 없습니다." />
      )}
    </>
  );
}
