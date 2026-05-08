import { useEffect, useMemo, useState } from "react";
import { getNotifications } from "../services/notificationService";
import { Log } from "../middleware/logger";

function getType(notification) {
  return (
    notification.notification_type ||
    notification.type ||
    notification.category ||
    notification.Type ||
    "Event"
  );
}

function getMessage(notification) {
  return (
    notification.message ||
    notification.notification_message ||
    notification.text ||
    notification.Message ||
    ""
  );
}

function getTimestamp(notification) {
  return (
    notification.timestamp ||
    notification.time ||
    notification.created_at ||
    notification.createdAt ||
    notification.Timestamp ||
    ""
  );
}

function getNotificationKey(notification) {
  const id =
    notification.id ||
    notification._id ||
    notification.notificationId ||
    notification.ID;
  if (id) {
    return String(id);
  }

  return `${getType(notification)}_${getTimestamp(notification)}_${getMessage(
    notification
  ).slice(0, 20)}`;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [readMap, setReadMap] = useState({});

  const fetchNotifications = async () => {
    setLoading(true);
    Log("frontend", "info", "api", "Loading started");

    try {
      const params = { limit, page };
      if (filterType !== "All") {
        params.notification_type = filterType;
      }

      const data = await getNotifications(params);
      const list = Array.isArray(data)
        ? data
        : data?.notifications || data?.items || [];

      setNotifications(list);
      setError("");
      Log("frontend", "info", "api", "Notifications fetch success");
    } catch (err) {
      setError("Could not load notifications. Please try again.");
      Log("frontend", "error", "api", "Notifications fetch failed");
    } finally {
      setLoading(false);
      Log("frontend", "info", "api", "Loading completed");
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [page, filterType]);

  const visibleNotifications = useMemo(() => {
    if (!searchText.trim()) {
      return notifications;
    }

    const keyword = searchText.toLowerCase();
    return notifications.filter((notification) =>
      getMessage(notification).toLowerCase().includes(keyword)
    );
  }, [notifications, searchText]);

  const applyFilter = (type) => {
    setFilterType(type);
    setPage(1);
    Log("frontend", "info", "state", `Filter applied: ${type}`);
  };

  const performSearch = (text) => {
    setSearchText(text);
    Log("frontend", "info", "state", `Search performed: ${text}`);
  };

  const goToNextPage = () => {
    setPage((prev) => prev + 1);
    Log("frontend", "info", "state", "Pagination changed: next");
  };

  const goToPrevPage = () => {
    setPage((prev) => Math.max(1, prev - 1));
    Log("frontend", "info", "state", "Pagination changed: previous");
  };

  const markAsRead = (notification) => {
    const key = getNotificationKey(notification);
    setReadMap((prev) => ({ ...prev, [key]: true }));
    Log("frontend", "info", "state", "Notification marked read");
  };

  const isRead = (notification) => {
    const key = getNotificationKey(notification);
    return Boolean(readMap[key] || notification.read || notification.is_read);
  };

  return {
    notifications: visibleNotifications,
    loading,
    error,
    filterType,
    searchText,
    page,
    limit,
    applyFilter,
    performSearch,
    goToNextPage,
    goToPrevPage,
    markAsRead,
    isRead,
    getType,
    getMessage,
    getTimestamp
  };
}
