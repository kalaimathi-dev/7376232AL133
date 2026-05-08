# Notification System Design

## Architecture Explanation
The frontend is split into pages, components, and services. A custom hook manages the notification state without any global state library. Logging is a reusable middleware function that can be plugged into any UI action or API call.

## Folder Structure
- logging_middleware/
  - Log.js
- notification_system_design/
  - Notification_System_Design.md
- notification_app_fe/
  - public/
  - src/
    - components/
    - pages/
    - services/
    - middleware/
    - hooks/
    - styles/

## API Flow
1. The app calls the auth API to receive a bearer token.
2. The token is stored and attached to outgoing requests via an interceptor.
3. Notifications are fetched using paging and optional type filters.
4. Logs are sent for key events like page load, search, and read actions.

## Priority Sorting Logic
- Only unread notifications are considered.
- Type priority: Placement > Result > Event.
- Newest timestamp wins for ties in the same type.

## Logging Middleware Explanation
The Log function accepts stack, level, package, and message. It posts this information to the logging endpoint with a bearer token. Failures are handled silently to avoid breaking the UI.

## Screenshots Placeholders
- Dashboard View: [Add screenshot here]
- Notification Details: [Add screenshot here]
- Mobile Layout: [Add screenshot here]

## Scalability Explanation
- Services keep API logic separate from UI components.
- The custom hook can be upgraded to support caching and background refresh.
- Components are reusable and can be extended for new notification types.
