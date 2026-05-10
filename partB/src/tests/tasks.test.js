const request = require('supertest');
const express = require('express');
const taskRoutes = require('../routes/taskRoutes');
const db = require('../db');

const app = express();
app.use(express.json());
app.use('/api/tasks', taskRoutes);

// Clear and reseed database before tests
beforeAll((done) => {
  db.serialize(() => {
    db.run('DELETE FROM tasks');
    db.run("INSERT INTO tasks (id, title, completed, priority) VALUES (1, 'Test task', 0, 'high')", done);
  });
});

afterAll((done) => {
  db.close(done);
});

describe('Task API', () => {
  test('GET /api/tasks returns array', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /api/tasks/:id returns single task', async () => {
    const res = await request(app).get('/api/tasks/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Test task');
  });

  test('GET /api/tasks/:id 404 for missing', async () => {
    const res = await request(app).get('/api/tasks/999');
    expect(res.statusCode).toBe(404);
  });

  test('POST /api/tasks creates new task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Buy milk', priority: 'low' });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Buy milk');
  });

  test('POST /api/tasks fails without title', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ priority: 'high' });
    expect(res.statusCode).toBe(400);
  });

  test('PUT /api/tasks/:id updates task', async () => {
    const res = await request(app)
      .put('/api/tasks/1')
      .send({ completed: true });
    expect(res.statusCode).toBe(200);
    expect(res.body.completed).toBe(1);
  });

  test('PUT /api/tasks/:id 404 for missing', async () => {
    const res = await request(app)
      .put('/api/tasks/999')
      .send({ title: 'Ghost' });
    expect(res.statusCode).toBe(404);
  });

  test('DELETE /api/tasks/:id removes task', async () => {
    const res = await request(app).delete('/api/tasks/1');
    expect(res.statusCode).toBe(204);
  });

  test('DELETE /api/tasks/:id 404 for missing', async () => {
    const res = await request(app).delete('/api/tasks/999');
    expect(res.statusCode).toBe(404);
  });

  test('GET /api/tasks?priority=high filters', async () => {
    await request(app).post('/api/tasks').send({ title: 'urgent', priority: 'high' });
    const res = await request(app).get('/api/tasks?priority=high');
    expect(res.body.every(t => t.priority === 'high')).toBe(true);
  });

  test('GET /api/tasks?search= keyword', async () => {
    await request(app).post('/api/tasks').send({ title: 'Special meeting' });
    const res = await request(app).get('/api/tasks?search=meeting');
    expect(res.body.some(t => t.title.includes('meeting'))).toBe(true);
  });
});