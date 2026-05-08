import axios from "axios";
import { tokenStorage } from "./tokenStorage";
import { Log } from "../middleware/logger";

const AUTH_URL = "http://4.224.186.213/evaluation-service/auth";

// Simple placeholder values to make the request valid for testing
const authPayload = {
    "email": "kalaimathi.al23@bitsathy.ac.in",
    "name": "kalaimathi",
    "rollNo": "7376232al133",
    "accessCode": "uKaJfm",
    "clientID": "ac6336f7-d35f-42d2-8874-32cdf47a3218",
    "clientSecret": "syJdrFuPbfAKznVY"
};

export async function requestNewToken() {
  try {
    Log("frontend", "info", "api", "Auth request started");
    const response = await axios.post(AUTH_URL, authPayload, {
      headers: { "Content-Type": "application/json" }
    });

    const token =
      response.data?.token ||
      response.data?.access_token ||
      response.data?.accessToken;

    if (token) {
      tokenStorage.setToken(token);
      Log("frontend", "info", "api", "Auth token stored");
    } else {
      Log("frontend", "warn", "api", "Auth response had no token");
    }

    return token;
  } catch (error) {
    Log("frontend", "error", "api", "Auth request failed");
    return null;
  }
}

export async function ensureAuthToken() {
  const existingToken = tokenStorage.getToken();
  if (existingToken) {
    return existingToken;
  }

  return requestNewToken();
}
