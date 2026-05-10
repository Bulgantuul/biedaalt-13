const db = require('../db');

const getAll = (filters = {}) => {
  return new Promise((resolve, reject) => {
    let sql = 'SELECT * FROM tasks WHERE 1=1';
    const params = [];

    if (filters.priority) {
      sql += ' AND priority = ?';
      params.push(filters.priority);
    }
    if (filters.search) {
      sql += ' AND title LIKE ?';
      params.push(`%${filters.search}%`);
    }

    sql += ' ORDER BY created_at DESC';
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const getById = (id) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const create = (task) => {
  return new Promise((resolve, reject) => {
    const { title, priority = 'medium' } = task;
    db.run(
      'INSERT INTO tasks (title, priority) VALUES (?, ?)',
      [title, priority],
      function(err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, title, priority, completed: 0 });
      }
    );
  });
};

const update = (id, updates) => {
  return new Promise((resolve, reject) => {
    const fields = [];
    const values = [];
    if (updates.title !== undefined) {
      fields.push('title = ?');
      values.push(updates.title);
    }
    if (updates.priority !== undefined) {
      fields.push('priority = ?');
      values.push(updates.priority);
    }
    if (updates.completed !== undefined) {
      fields.push('completed = ?');
      values.push(updates.completed ? 1 : 0);
    }
    if (fields.length === 0) return resolve(null);
    values.push(id);
    db.run(
      `UPDATE tasks SET ${fields.join(', ')} WHERE id = ?`,
      values,
      function(err) {
        if (err) reject(err);
        else resolve({ changes: this.changes });
      }
    );
  });
};

const remove = (id) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM tasks WHERE id = ?', [id], function(err) {
      if (err) reject(err);
      else resolve({ deleted: this.changes });
    });
  });
};

module.exports = { getAll, getById, create, update, remove };