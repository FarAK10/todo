export interface ILoginDTO {
  email: string;
  password: number;
}
export interface ILoginResponse {
  token: string;
  username: string;
  user_id: number;
}
