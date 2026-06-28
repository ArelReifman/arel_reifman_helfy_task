const express = require('express')
const validateTask = require('../middleware/validateTask')

const router = express.Router()

let tasks = [
  { id: 1, title: 'Set up project structure', description: 'Initialize backend and frontend folders', completed: true, createdAt: new Date('2026-06-20'), priority: 'high' },
  { id: 2, title: 'Build REST API', description: 'Create all five endpoints with Express', completed: false, createdAt: new Date('2026-06-21'), priority: 'high' },
  { id: 3, title: 'Design the UI', description: 'Create a clean and responsive layout', completed: false, createdAt: new Date('2026-06-22'), priority: 'medium' },
  { id: 4, title: 'Implement carousel', description: 'Build endless animated carousel with vanilla React', completed: false, createdAt: new Date('2026-06-23'), priority: 'high' },
  { id: 5, title: 'Write README', description: 'Document setup instructions and API endpoints', completed: false, createdAt: new Date('2026-06-24'), priority: 'low' },
]

let nextId = 6

router.get('/', (req, res) => {
  res.json(tasks)
})

router.post('/', validateTask, (req, res) => {
  const { title, description, priority } = req.body

  const newTask = {
    id: nextId++,
    title: title.trim(),
    description: description ? description.trim() : '',
    completed: false,
    createdAt: new Date(),
    priority,
  }

  tasks.push(newTask)
  res.status(201).json(newTask)
})

router.put('/:id', validateTask, (req, res) => {
  const taskId = parseInt(req.params.id)
  const taskIndex = tasks.findIndex((task) => task.id === taskId)

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' })
  }

  const { title, description, priority } = req.body

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title: title.trim(),
    description: description ? description.trim() : '',
    priority,
  }

  res.status(200).json(tasks[taskIndex])
})

router.delete('/:id', (req, res) => {
  const taskId = parseInt(req.params.id)
  const taskIndex = tasks.findIndex((task) => task.id === taskId)

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' })
  }

  tasks.splice(taskIndex, 1)
  res.status(200).json({ message: 'Task deleted' })
})

router.patch('/:id/toggle', (req, res) => {
  const taskId = parseInt(req.params.id)
  const taskIndex = tasks.findIndex((task) => task.id === taskId)

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' })
  }

  tasks[taskIndex].completed = !tasks[taskIndex].completed
  res.status(200).json(tasks[taskIndex])
})

module.exports = router
