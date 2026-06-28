import { useState, useEffect } from 'react'

function TaskForm({ onAdd, editingTask, onUpdate, onCancelEdit }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('medium')

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title)
      setDescription(editingTask.description)
      setPriority(editingTask.priority)
    } else {
      setTitle('')
      setDescription('')
      setPriority('medium')
    }
  }, [editingTask])

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return

    const taskData = {
      title: title.trim(),
      description: description.trim(),
      priority,
    }

    if (editingTask) {
      onUpdate(editingTask.id, taskData)
    } else {
      onAdd(taskData)
    }

    setTitle('')
    setDescription('')
    setPriority('medium')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2 className="form-title">{editingTask ? 'Edit Task' : 'Add Task'}</h2>
      <div className="form-fields">
        <input
          className="form-input"
          type="text"
          placeholder="Title *"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <input
          className="form-input"
          type="text"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <select
          className="form-select"
          value={priority}
          onChange={e => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className="form-buttons">
        <button type="submit" className="btn-submit">
          {editingTask ? 'Update Task' : 'Add Task'}
        </button>
        {editingTask && (
          <button type="button" className="btn-cancel" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default TaskForm
