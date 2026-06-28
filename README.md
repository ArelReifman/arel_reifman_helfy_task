# Task Manager App

A small fullstack task manager app. Users can add, edit, delete, and filter tasks. Tasks are displayed in an endless animated carousel built with React and CSS.

## Backend Setup

1. `cd backend`
2. `npm install`
3. `npm run dev`

Runs on port 4000.

## Frontend Setup

1. `cd frontend`
2. `npm install`
3. `npm run dev`

Runs on the Vite port shown in the terminal, usually `http://localhost:5173`.

> Start the backend before opening the frontend, otherwise tasks won't load.

## API Endpoints

- `GET /api/tasks` — returns all tasks
- `POST /api/tasks` — creates a new task
- `PUT /api/tasks/:id` — updates an existing task
- `DELETE /api/tasks/:id` — deletes a task
- `PATCH /api/tasks/:id/toggle` — toggles the completed status

`POST` and `PUT` require a JSON body with `title` (required), `description` (optional), and `priority` (required: `low`, `medium`, or `high`).

## Task Model

```json
{
  "id": 1,
  "title": "Example task",
  "description": "Optional description",
  "completed": false,
  "createdAt": "2026-06-28T10:00:00.000Z",
  "priority": "medium"
}
```

## Assumptions and Design Decisions

- Tasks are stored in memory on the backend. Restarting the server resets the data.
- The backend starts with 5 sample tasks so the carousel has content on first load.
- The carousel is built with React state and CSS transitions, no external library.
- With only one task, the carousel controls are hidden and the task is shown directly.
- If the initial load fails, the task list is replaced with an error message. If a later action fails, the list stays visible and a short error appears above it.

## Time Spent

- Backend API: ~90 minutes
- Frontend components and API connection: ~90 minutes
- Carousel: ~30 minutes
- CSS and responsive layout: ~30 minutes
- Testing and fixes: ~30 minutes
