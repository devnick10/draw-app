export type Tool = "circle" | "rect" | "pencil";
export interface User {
  id: string;
  username: string;
  email: string;
}
export interface Room {
  id: string;
  slug: string;
}
export interface AuthForm {
  email: string;
  password: string;
  username?: string;
};