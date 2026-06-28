function TaskFilter({ activeFilter, onFilterChange }) {
  return (
    <div className="task-filter">
      <button
        className={activeFilter === 'all' ? 'filter-btn active' : 'filter-btn'}
        onClick={() => onFilterChange('all')}
      >
        All
      </button>
      <button
        className={activeFilter === 'pending' ? 'filter-btn active' : 'filter-btn'}
        onClick={() => onFilterChange('pending')}
      >
        Pending
      </button>
      <button
        className={activeFilter === 'completed' ? 'filter-btn active' : 'filter-btn'}
        onClick={() => onFilterChange('completed')}
      >
        Completed
      </button>
    </div>
  )
}

export default TaskFilter
