export type LoginInput = { email: string; password: string };

export type User = { id: string; email: string };

export type LoginResult = { ok: true; user: User; token: string } | { ok: false; error: string };
