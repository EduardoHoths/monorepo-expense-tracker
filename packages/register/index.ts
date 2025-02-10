import { AxiosError } from "axios";
import { api } from "@expense/axios-config";

export async function register(name: string, email: string, password: string) {
  try {
    const response = await api.post("/users/create", {
      name,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data;
    }

    throw error;
  }
}
