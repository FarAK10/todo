export interface IGetAllTodosRes {
  count: number;
  prev: number;
  next: number;
  results: IGetTodoDTO[];
}

export interface IGetTodoDTO {
  id: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
  title: string;
  user: number;
}
