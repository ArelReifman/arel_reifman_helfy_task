function TaskItem({ task, onToggle, onDelete, onEdit }) {
  function handleDelete() {
    if (window.confirm(`Delete "${task.title}"?`)) {
      onDelete(task.id)
    }
  }

  const formattedDate = new Date(task.createdAt).toLocaleDateString()

  return (
    <div className={`task-card ${task.completed ? 'task-completed' : ''}`}>
      <div className="task-header">
        <span className={`priority-badge priority-${task.priority}`}>{task.priority}</span>
        <span className="task-date">{formattedDate}</span>
      </div>
      <h3 className="task-title">{task.title}</h3>
      {task.description && <p className="task-description">{task.description}</p>}
      <div className="task-actions">
        <button className="btn-toggle" onClick={() => onToggle(task.id)}>
          {task.completed ? 'Mark Pending' : 'Mark Done'}
        </button>
        <button className="btn-edit" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button className="btn-delete" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default TaskItem
