import { User } from "../user/type";

export type LoginInput = { email: string; password: string };


export type ExternalSessionResponse = { token: string; user: User };

export type FieldErrors = Record<string, string[]>;
export type LoginResult = { ok: true; user: User; token: string } | { ok: false; error: string | FieldErrors };

export type LoginControllerResult =
  | { status: 200; user: User; token: string }
  | { status: 400; error: string | FieldErrors };