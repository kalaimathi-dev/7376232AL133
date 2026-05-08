import React, { useEffect } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Log } from "../middleware/logger";

function NotificationDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const notification = location.state?.notification;

  useEffect(() => {
    Log("frontend", "info", "page", "Notification details loaded");
  }, []);

  if (!notification) {
    return (
      <Box>
        <Typography variant="h5" className="section-title">
          Notification Details
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          No notification data available. Please go back to the dashboard.
        </Typography>
        <Button variant="outlined" onClick={() => navigate("/")}
        >
          Back to Dashboard
        </Button>
      </Box>
    );
  }

  const type =
    notification.notification_type ||
    notification.type ||
    notification.category ||
    "Event";

  const message =
    notification.message ||
    notification.notification_message ||
    notification.text ||
    "";

  const timestamp =
    notification.timestamp ||
    notification.time ||
    notification.created_at ||
    notification.createdAt ||
    "";

  const readStatus =
    notification._localRead || notification.read || notification.is_read
      ? "Read"
      : "Unread";

  return (
    <Box>
      <Typography variant="h4" className="section-title">
        Notification Details
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          Type
        </Typography>
        <Typography sx={{ mb: 2 }}>{type}</Typography>

        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          Timestamp
        </Typography>
        <Typography sx={{ mb: 2 }}>{timestamp || "No timestamp"}</Typography>

        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          Message
        </Typography>
        <Typography sx={{ mb: 2 }}>{message || "No message"}</Typography>

        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          Read Status
        </Typography>
        <Typography sx={{ mb: 2 }}>{readStatus}</Typography>

        <Button variant="outlined" onClick={() => navigate("/")}
        >
          Back
        </Button>
      </Paper>
    </Box>
  );
}

export default NotificationDetails;
