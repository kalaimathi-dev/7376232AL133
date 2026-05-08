import axios from "axios";
import { tokenStorage } from "./tokenStorage";
import { ensureAuthToken } from "./authService";

const api = axios.create({
  baseURL: ""
});

api.interceptors.request.use(async (config) => {
  let token = tokenStorage.getToken();

  if (!token) {
    token = await ensureAuthToken();
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
