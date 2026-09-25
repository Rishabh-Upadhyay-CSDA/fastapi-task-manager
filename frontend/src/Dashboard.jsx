import { useState, useEffect } from 'react';
import api from './api';

export default function Dashboard({ onLogout, onOpenProfile }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState('all');

  const fetchTasks = async () => {
    try {
      let url = '/tasks';
      if (filter === 'completed') url += '?completed=true';
      if (filter === 'pending') url += '?completed=false';

      const response = await api.get(url);
      setTasks(response.data);
    } catch (err) {
      if (err.response?.status === 401) onLogout();
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await api.post('/tasks', { title });
    setTitle('');
    fetchTasks();
  };

  const toggleTask = async (task) => {
    await api.put(`/tasks/${task.id}`, { completed: !task.completed });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2>Task Dashboard</h2>
        <div>
          <button onClick={onOpenProfile} style={{ marginRight: '10px' }}>Profile</button>
          <button onClick={onLogout} style={{ background: '#dc3545', color: 'white' }}>Logout</button>
        </div>
      </header>

      {/* Task Creation */}
      <form onSubmit={handleAddTask} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="New task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ flex: 1, padding: '8px' }}
        />
        <button type="submit">Add Task</button>
      </form>

      {/* Filter Bar */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <button onClick={() => setFilter('all')} disabled={filter === 'all'}>All</button>
        <button onClick={() => setFilter('pending')} disabled={filter === 'pending'}>Pending</button>
        <button onClick={() => setFilter('completed')} disabled={filter === 'completed'}>Completed</button>
      </div>

      {/* Task List */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map((task) => (
          <li key={task.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', borderBottom: '1px solid #ccc' }}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task)}
            />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none', flex: 1 }}>
              {task.title}
            </span>
            <button onClick={() => deleteTask(task.id)} style={{ color: 'red' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}