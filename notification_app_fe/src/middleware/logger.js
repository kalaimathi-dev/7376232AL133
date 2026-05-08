import axios from "axios";
import { tokenStorage } from "../services/tokenStorage";

const LOG_URL = "http://4.224.186.213/evaluation-service/logs";
const FALLBACK_TOKEN = "YOUR_BEARER_TOKEN";

export async function Log(stack, level, packageName, message) {
  const payload = {
    stack,
    level,
    package: packageName,
    message,
    timestamp: new Date().toISOString()
  };

  const storedToken = tokenStorage.getToken();
  const authHeader = storedToken
    ? `Bearer ${storedToken}`
    : `Bearer ${FALLBACK_TOKEN}`;

  try {
    await axios.post(LOG_URL, payload, {
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.warn("Log failed", error?.message || error);
  }
}
