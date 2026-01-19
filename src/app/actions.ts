"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { apiCall } from "./api";
import { TodoItem, UpdateTodoItemDto } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID;
const ITEMS_URL = `${BASE_URL}/${TENANT_ID}/items`;
const IMAGE_UPLOAD_URL = `${BASE_URL}/${TENANT_ID}/images/upload`;

export async function fetchTodos() {
  const result = await apiCall<TodoItem[]>(ITEMS_URL, {
    method: "GET",
  });
  return result;
}

export async function fetchTodo(id: number) {
  const result = await apiCall<TodoItem>(`${ITEMS_URL}/${id}`, {
    method: "GET",
  });
  return result;
}

export async function createTodo(formData: FormData) {
  const name = (formData.get("name") as string).trim();
  if (!name) return;

  const { error } = await apiCall<TodoItem[]>(ITEMS_URL, {
    method: "POST",
    body: JSON.stringify({ name }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (error) {
    console.error("할 일 추가에 실패했습니다: " + error);
    return;
  }

  revalidatePath("/"); // 데이터 새로고침
}

// 헬퍼: FormData 생성
function createUpdateFormData(
  name: string,
  memo: string,
  imageUrl: string,
  isCompleted: boolean,
): FormData {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("memo", memo);
  formData.append("imageUrl", imageUrl);
  formData.append("isCompleted", String(isCompleted));
  return formData;
}

// Todo 의 isCompleted 토글 전용 함수
export async function toggleTodoComplete(id: number, currentData: TodoItem) {
  const formData = createUpdateFormData(
    currentData.name,
    currentData.memo || "",
    currentData.imageUrl || "",
    !currentData.isCompleted,
  );

  return updateTodo(id, formData);
}

/**
 * TodoCard 를 클릭해서 세부 정보를 변경하거나, 완료 상태만 토글할 때 사용
 * @param id Todo 아이템의 id
 * @param formData 수정할 데이터를 담은 FormData
 * @returns
 */
export async function updateTodo(id: number, formData: FormData) {
  // FormData에서 값 추출
  const name = (formData.get("name") as string).trim();
  const memo = (formData.get("memo") as string).trim();
  const file = formData.get("file") as File | null;
  const isCompleted = formData.get("isCompleted") === "true";
  let imageUrl = (formData.get("imageUrl") as string).trim();

  // 이미지 업로드 (파일이 있으면)
  if (file && file.size > 0) {
    const uploadedUrl = await uploadImage(file);
    if (!uploadedUrl) {
      return { error: "이미지 업로드 실패" };
    }
    imageUrl = uploadedUrl;
  }

  // 업데이트 DTO 생성
  const updateTodoItemDto: UpdateTodoItemDto = {
    name,
    memo,
    imageUrl,
    isCompleted,
  };

  console.log(formData, updateTodoItemDto);

  await apiCall<TodoItem[]>(`${ITEMS_URL}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updateTodoItemDto),
    headers: {
      "Content-Type": "application/json",
    },
  });

  revalidatePath("/");
  redirect("/");
}

export async function deleteTodo(id: number) {
  await fetch(`${ITEMS_URL}/${id}`, {
    method: "DELETE",
  });

  revalidatePath("/");
  redirect("/");
}

// 이미지 업로드 헬퍼
async function uploadImage(file: File): Promise<string | null> {
  const formData = new FormData();
  formData.append("image", file);

  const { data, error } = await apiCall<{ url: string }>(IMAGE_UPLOAD_URL, {
    method: "POST",
    body: formData,
  });

  if (error || !data) {
    console.error("이미지 업로드 실패:", error);
    return null;
  }

  return data.url;
}
