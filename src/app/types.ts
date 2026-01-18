export interface TodoItem {
  id: number;
  tenantId: string;
  name: string;
  memo?: string;
  imageUrl?: string;
  isCompleted: boolean;
}

export interface CreateTodoItemDto {
  name: string;
}

export interface UpdateTodoItemDto {
  name: string;
  memo: string;
  imageUrl: string;
  isCompleted: boolean;
}
