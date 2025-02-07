import { api } from "@expense/axios-config";

export async function login(email: string, password: string) {
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    return response.data.accessToken;
  } catch (error) {
    throw new Error("Erro ao fazer login:" + error);
  }
}
