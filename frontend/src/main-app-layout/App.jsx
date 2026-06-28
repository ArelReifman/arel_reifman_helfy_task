import { useState, useEffect } from 'react'
import { fetchTasks, createTask, updateTask, deleteTask, toggleTask } from '../services/api'
import TaskList from '../components/TaskList'
import TaskForm from '../components/TaskForm'
import TaskFilter from '../components/TaskFilter'

function App() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [actionError, setActionError] = useState(null)
  const [editingTask, setEditingTask] = useState(null)

  useEffect(() => {
    loadTasks()
  }, [])

  async function loadTasks() {
    setIsLoading(true)
    setError(null)
    try {
      const data = await fetchTasks()
      setTasks(data)
    } catch (err) {
      setError('Failed to load tasks. Make sure the backend is running on port 4000.')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleAddTask(taskData) {
    try {
      const newTask = await createTask(taskData)
      setTasks(prev => [...prev, newTask])
      setActionError(null)
    } catch (err) {
      setActionError('Failed to add task.')
    }
  }

  async function handleUpdateTask(taskId, taskData) {
    try {
      const updatedTask = await updateTask(taskId, taskData)
      setTasks(prev => prev.map(task => (task.id === taskId ? updatedTask : task)))
      setEditingTask(null)
      setActionError(null)
    } catch (err) {
      setActionError('Failed to update task.')
    }
  }

  async function handleDeleteTask(taskId) {
    try {
      await deleteTask(taskId)
      setTasks(prev => prev.filter(task => task.id !== taskId))
      setActionError(null)
    } catch (err) {
      setActionError('Failed to delete task.')
    }
  }

  async function handleToggleTask(taskId) {
    try {
      const updatedTask = await toggleTask(taskId)
      setTasks(prev => prev.map(task => (task.id === taskId ? updatedTask : task)))
      setActionError(null)
    } catch (err) {
      setActionError('Failed to toggle task.')
    }
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed
    if (filter === 'pending') return !task.completed
    return true
  })

  return (
    <div className="app-container">
      <h1 className="app-title">Task Manager</h1>

      <TaskForm
        onAdd={handleAddTask}
        editingTask={editingTask}
        onUpdate={handleUpdateTask}
        onCancelEdit={() => setEditingTask(null)}
      />

      <TaskFilter activeFilter={filter} onFilterChange={setFilter} />

      {isLoading && <p className="status-loading">Loading tasks...</p>}
      {error && <p className="status-error">{error}</p>}

      {actionError && <p className="status-error">{actionError}</p>}

      {!isLoading && !error && (
        <TaskList
          tasks={filteredTasks}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
          onEdit={setEditingTask}
        />
      )}
    </div>
  )
}

export default App
