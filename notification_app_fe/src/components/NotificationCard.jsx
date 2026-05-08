import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Chip,
  Stack
} from "@mui/material";

function NotificationCard({
  notification,
  onOpen,
  isRead,
  getType,
  getMessage,
  getTimestamp
}) {
  const type = getType(notification);
  const message = getMessage(notification);
  const timestamp = getTimestamp(notification);
  const readStatus = isRead(notification);

  return (
    <Card className={readStatus ? "card-read" : "card-unread"}>
      <CardActionArea onClick={() => onOpen(notification)}>
        <CardContent>
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip label={type} color="primary" size="small" />
            {!readStatus && (
              <Chip label="Unread" color="warning" size="small" />
            )}
          </Stack>

          <Typography variant="body1" sx={{ marginTop: 1 }}>
            {message || "No message"}
          </Typography>

          <Typography variant="caption" color="text.secondary">
            {timestamp || "No timestamp"}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default NotificationCard;
