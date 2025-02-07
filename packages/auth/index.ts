import { api } from "@expense/axios-config";
import { AxiosError } from "axios";

export async function login(email: string, password: string) {
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    return response.data.accessToken;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data;
    }
    throw new Error("error" + error);
  }
}
