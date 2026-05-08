import React from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

const priorityRank = {
  Placement: 3,
  Result: 2,
  Event: 1
};

function PrioritySection({ notifications, isRead, getType, getMessage, getTimestamp }) {
  const unreadNotifications = notifications.filter(
    (notification) => !isRead(notification)
  );

  const sorted = [...unreadNotifications].sort((a, b) => {
    const typeA = getType(a);
    const typeB = getType(b);
    const rankA = priorityRank[typeA] || 0;
    const rankB = priorityRank[typeB] || 0;

    if (rankA !== rankB) {
      return rankB - rankA;
    }

    const timeA = new Date(getTimestamp(a)).getTime() || 0;
    const timeB = new Date(getTimestamp(b)).getTime() || 0;
    return timeB - timeA;
  });

  const topItems = sorted.slice(0, 3);

  return (
    <Box className="priority-box">
      <Typography className="section-title">Priority Notifications</Typography>
      {topItems.length === 0 ? (
        <Typography variant="body2">No unread priority alerts.</Typography>
      ) : (
        <List dense>
          {topItems.map((notification, index) => (
            <ListItem key={`${getType(notification)}-${index}`}>
              <ListItemText
                primary={getMessage(notification) || "No message"}
                secondary={`${getType(notification)} | ${
                  getTimestamp(notification) || "No timestamp"
                }`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}

export default PrioritySection;
