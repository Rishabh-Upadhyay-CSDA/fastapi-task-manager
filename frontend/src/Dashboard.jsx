import { useState, useEffect } from 'react';
import api from './api';
import Header from './components/Header';
import Footer from './components/Footer';

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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans selection:bg-indigo-500 selection:text-white">
      <div>
        <Header onOpenProfile={onOpenProfile} onLogout={onLogout} />

        <main className="max-w-3xl mx-auto px-6 py-10">
          
          {/* Welcome Banner */}
          <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-slate-900 border border-indigo-500/20 shadow-xl backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mb-1">
              Organize your focus!
            </h2>
            <p className="text-sm text-slate-400">
              Track tasks seamlessly across production PostgreSQL storage.
            </p>
          </div>

          {/* New Task Input Card */}
          <form onSubmit={handleAddTask} className="relative mb-8">
            <div className="flex gap-3 bg-slate-900/90 border border-slate-800 p-2 rounded-xl shadow-2xl focus-within:border-indigo-500 transition-all">
              <input
                type="text"
                placeholder="What needs to be done?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-transparent px-4 py-2 text-slate-100 placeholder-slate-500 outline-none"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold px-6 py-2.5 rounded-lg shadow-lg shadow-indigo-500/25 transition-all"
              >
                Add Task
              </button>
            </div>
          </form>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 mb-6 bg-slate-900/50 p-1.5 rounded-xl border border-slate-800/80 w-fit">
            {['all', 'pending', 'completed'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`capitalize text-xs font-semibold px-4 py-2 rounded-lg transition-all ${
                  filter === f
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Task List */}
          <div className="space-y-3">
            {tasks.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-slate-800 rounded-2xl bg-slate-900/20">
                <p className="text-slate-500 text-sm">No tasks found for this view.</p>
              </div>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="group flex items-center justify-between p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/30 hover:bg-slate-900/90 transition-all shadow-sm"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task)}
                      className="w-5 h-5 rounded border-slate-700 bg-slate-800 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-slate-950 cursor-pointer"
                    />
                    <span className={`text-sm truncate ${task.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                      {task.title}
                    </span>
                  </div>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="opacity-0 group-hover:opacity-100 text-rose-400 hover:text-rose-300 text-xs font-medium px-2.5 py-1 rounded hover:bg-rose-500/10 transition-all"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>

        </main>
      </div>

      {/* Persistent Footer */}
      <Footer />
    </div>
  );
}