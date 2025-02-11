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
      throw new AxiosError(error.response.data.message)
    }
    throw new Error("error" + error);
  }
}
