import axios from "axios";

export const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://192.168.10.178:3000"
      : "https://meu-servidor.com",
});


