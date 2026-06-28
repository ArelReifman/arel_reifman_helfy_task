import { useState, useEffect, useRef } from 'react'
import TaskItem from './TaskItem'

function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  const [currentIndex, setCurrentIndex] = useState(tasks.length)
  const [animated, setAnimated] = useState(true)
  const intervalRef = useRef(null)

  useEffect(() => {
    setCurrentIndex(tasks.length)
    setAnimated(true)
  }, [tasks.length])

  useEffect(() => {
    if (tasks.length < 2) return
    startAutoPlay()
    return () => clearInterval(intervalRef.current)
  }, [tasks.length])

  useEffect(() => {
    if (tasks.length < 2) return

    if (currentIndex >= tasks.length * 2) {
      const timer = setTimeout(() => {
        setAnimated(false)
        setCurrentIndex(tasks.length)
      }, 400)
      return () => clearTimeout(timer)
    }

    if (currentIndex <= 0) {
      const timer = setTimeout(() => {
        setAnimated(false)
        setCurrentIndex(tasks.length)
      }, 400)
      return () => clearTimeout(timer)
    }
  }, [currentIndex, tasks.length])

  useEffect(() => {
    if (!animated) {
      const timer = setTimeout(() => setAnimated(true), 50)
      return () => clearTimeout(timer)
    }
  }, [animated])

  function startAutoPlay() {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prev => prev + 1)
    }, 3000)
  }

  function handlePrev() {
    setCurrentIndex(prev => prev - 1)
    startAutoPlay()
  }

  function handleNext() {
    setCurrentIndex(prev => prev + 1)
    startAutoPlay()
  }

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>No tasks here. Try a different filter or add a new task.</p>
      </div>
    )
  }

  if (tasks.length === 1) {
    return (
      <div className="single-task-wrapper">
        <TaskItem
          task={tasks[0]}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      </div>
    )
  }

  const tripled = [...tasks, ...tasks, ...tasks]

  return (
    <div className="carousel-wrapper">
      <button className="carousel-btn" onClick={handlePrev}>&#8249;</button>
      <div className="carousel-viewport">
        <div
          className="carousel-track"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: animated ? 'transform 0.4s ease' : 'none',
          }}
        >
          {tripled.map((task, index) => (
            <div className="carousel-slide" key={`${task.id}-${index}`}>
              <TaskItem
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            </div>
          ))}
        </div>
      </div>
      <button className="carousel-btn" onClick={handleNext}>&#8250;</button>
    </div>
  )
}

export default TaskList
