export interface IBaseTodoDTO {
  title: string;
  user: number;
  completed: boolean;
}
export interface IGetTodoDTO extends IBaseTodoDTO {
  id: string;
  created_at: string;
  updated_at: string;
}
export interface IGetAllTodosRes {
  count: number;
  prev: number;
  next: number;
  results: IGetTodoDTO[];
}
