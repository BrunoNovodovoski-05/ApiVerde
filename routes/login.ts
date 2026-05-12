const invalidCredentials = () =>
  Response.json({ message: "Invalid credentials" }, { status: 401 });

export async function post(req: Request): Promise<Response> {
  try {
    const { email, password } = (await req.json()) as {
      email?: unknown;
      password?: unknown;
    };

    if (email !== "usuario@esoft.com" || password !== "Abc123")
      return invalidCredentials();

    return Response.json({ token: crypto.randomUUID() });
  } catch {
    return invalidCredentials();
  }
}
