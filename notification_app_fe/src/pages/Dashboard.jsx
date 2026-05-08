import React, { useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FilterBar from "../components/FilterBar";
import SearchBar from "../components/SearchBar";
import NotificationCard from "../components/NotificationCard";
import PrioritySection from "../components/PrioritySection";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";
import PaginationControls from "../components/PaginationControls";
import { useNotifications } from "../hooks/useNotifications";
import { Log } from "../middleware/logger";

function Dashboard() {
  const navigate = useNavigate();
  const {
    notifications,
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
  } = useNotifications();

  useEffect(() => {
    Log("frontend", "info", "page", "Dashboard loaded");
  }, []);

  const handleOpen = (notification) => {
    const id =
      notification.id ||
      notification._id ||
      notification.notificationId ||
      getTimestamp(notification) ||
      "0";

    markAsRead(notification);
    Log("frontend", "info", "page", "Notification opened");
    navigate(`/notification/${id}`, {
      state: { notification: { ...notification, _localRead: true } }
    });
  };

  const disableNext = notifications.length < limit;

  return (
    <Box>
      <Typography variant="h4" className="section-title">
        Dashboard
      </Typography>

      <FilterBar activeFilter={filterType} onFilterChange={applyFilter} />
      <SearchBar onSearch={performSearch} defaultValue={searchText} />

      <PrioritySection
        notifications={notifications}
        isRead={isRead}
        getType={getType}
        getMessage={getMessage}
        getTimestamp={getTimestamp}
      />

      {loading && <Loader />}
      {!loading && error && <ErrorMessage message={error} />}

      {!loading && !error && notifications.length === 0 && (
        <EmptyState message="No notifications found." />
      )}

      {!loading && !error && notifications.length > 0 && (
        <Grid container spacing={2}>
          {notifications.map((notification, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <NotificationCard
                notification={notification}
                onOpen={handleOpen}
                isRead={isRead}
                getType={getType}
                getMessage={getMessage}
                getTimestamp={getTimestamp}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {!loading && !error && notifications.length > 0 && (
        <PaginationControls
          page={page}
          onPrev={goToPrevPage}
          onNext={goToNextPage}
          disableNext={disableNext}
        />
      )}
    </Box>
  );
}

export default Dashboard;
