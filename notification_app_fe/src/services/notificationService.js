import api from "./api";

const NOTIFICATIONS_URL =
  "http://4.224.186.213/evaluation-service/notifications";

export async function getNotifications(params) {
  const response = await api.get(NOTIFICATIONS_URL, { params });
  return response.data;
}
