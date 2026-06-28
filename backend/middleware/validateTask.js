const VALID_PRIORITIES = ['low', 'medium', 'high']

function validateTask(req, res, next) {
  const { title, priority } = req.body

  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' })
  }

  if (!priority || !VALID_PRIORITIES.includes(priority)) {
    return res.status(400).json({ error: 'Priority must be low, medium, or high' })
  }

  next()
}

module.exports = validateTask
