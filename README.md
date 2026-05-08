# Campus Notifications Frontend

This project is a frontend-only Campus Notifications application built with React and Material UI.

## Architecture Overview
- React Router handles page navigation.
- Axios handles API calls with a shared instance and interceptor.
- A simple custom hook manages notifications state and UI interactions.
- A lightweight logging middleware sends important events to the logging API.

## Folder Structure
- logging_middleware/ - reusable Log function package
- notification_system_design/ - design documentation
- notification_app_fe/ - React frontend application

Inside notification_app_fe/src:
- components/ - reusable UI parts
- pages/ - main screens
- services/ - API and auth helpers
- middleware/ - frontend logging helper
- hooks/ - custom hooks
- styles/ - simple CSS

## API Flow
1. Auth service requests a token and stores it locally.
2. Axios interceptor attaches the token to all API calls.
3. Notifications API is called with paging and optional type filters.
4. Logging middleware sends logs for user actions and app events.

## Priority Sorting Logic
- Unread notifications only.
- Priority order: Placement > Result > Event.
- If the type is the same, newest timestamp comes first.

## Logging Middleware
- A shared Log function sends stack, level, package, and message to the logs API.
- Used across page load, API calls, filters, search, pagination, and read events.

## Screenshots
- Dashboard: [Add screenshot here]
- Details page: [Add screenshot here]

## Scalability Notes
- API calls are centralized in services for easy extension.
- The hook can be expanded to support caching or background refresh.
- UI components are split for reuse and simple maintenance.
