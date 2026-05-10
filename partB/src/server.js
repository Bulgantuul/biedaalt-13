const express = require('express');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/tasks', taskRoutes);

// Simple frontend (optional)
app.get('/', (req, res) => {
  res.send(`
    <h1>To-do List API</h1>
    <p>Use /api/tasks endpoints</p>
    <pre>
GET    /api/tasks
GET    /api/tasks?priority=high&search=work
GET    /api/tasks/:id
POST   /api/tasks (body: { title, priority })
PUT    /api/tasks/:id (body: { title, priority, completed })
DELETE /api/tasks/:id
    </pre>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});