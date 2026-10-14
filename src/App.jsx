import { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'react-todo-assignment:v1';
const INITIAL_TASKS = [
  { id: 'sample-1', text: 'Do coding challenges', active: true },
  { id: 'sample-2', text: 'Do coding challenges', active: true },
  { id: 'sample-3', text: 'Task done', active: false },
];

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'completed', label: 'Completed' },
];

function readSavedTasks() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return INITIAL_TASKS;
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : INITIAL_TASKS;
  } catch {
    return INITIAL_TASKS;
  }
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path d="M7.2 3.3h5.6l.6 1.5h3v1.5H3.6V4.8h3l.6-1.5Zm-1.5 4h9.6l-.7 9.1c-.1.8-.7 1.3-1.5 1.3H7.9c-.8 0-1.4-.5-1.5-1.3l-.7-9.1Zm2.6 1.5v6.8h1.3V8.8H8.3Zm2.1 0v6.8h1.3V8.8h-1.3Z" />
    </svg>
  );
}

export default function App() {
  const [tasks, setTasks] = useState(readSavedTasks);
  const [currentTab, setCurrentTab] = useState('all');
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const visibleTasks = useMemo(() => {
    if (currentTab === 'active') return tasks.filter((task) => task.active);
    if (currentTab === 'completed') return tasks.filter((task) => !task.active);
    return tasks;
  }, [currentTab, tasks]);

  function addTask(event) {
    event.preventDefault();
    const text = newTask.trim();
    if (!text) return;

    setTasks((existing) => [
      ...existing,
      { id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, text, active: true },
    ]);
    setNewTask('');
  }

  function toggleTask(id) {
    setTasks((existing) => existing.map((task) => (
      task.id === id ? { ...task, active: !task.active } : task
    )));
  }

  function deleteTask(id) {
    setTasks((existing) => existing.filter((task) => task.id !== id));
  }

  function deleteCompleted() {
    setTasks((existing) => existing.filter((task) => task.active));
  }

  const completedCount = tasks.filter((task) => !task.active).length;

  return (
    <main className="todo-app">
      <h1>#todo</h1>

      <nav className="tabs" aria-label="Lọc công việc">
        {TABS.map((tab) => (
          <button
            className={`tab${currentTab === tab.id ? ' tab--selected' : ''}`}
            key={tab.id}
            type="button"
            aria-current={currentTab === tab.id ? 'page' : undefined}
            onClick={() => setCurrentTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {currentTab !== 'completed' && (
        <form className="add-form" onSubmit={addTask}>
          <label className="sr-only" htmlFor="new-task">Nội dung công việc mới</label>
          <input
            id="new-task"
            type="text"
            placeholder="add details"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
            autoComplete="off"
          />
          <button className="add-button" type="submit">Add</button>
        </form>
      )}

      <section className="task-list" aria-label={`${currentTab} tasks`}>
        {visibleTasks.length === 0 ? (
          <p className="empty-state">
            {currentTab === 'completed' ? 'Chưa có công việc hoàn thành.' : 'Chưa có công việc nào. Hãy thêm công việc mới!'}
          </p>
        ) : (
          visibleTasks.map((task) => (
            <div className={`task-row${task.active ? '' : ' task-row--completed'}`} key={task.id}>
              <input
                className="task-checkbox"
                id={`task-${task.id}`}
                type="checkbox"
                checked={!task.active}
                onChange={() => toggleTask(task.id)}
                aria-label={`${task.active ? 'Đánh dấu hoàn thành' : 'Đánh dấu chưa hoàn thành'}: ${task.text}`}
              />
              <label className="task-label" htmlFor={`task-${task.id}`}>{task.text}</label>
              {currentTab === 'completed' && (
                <button
                  className="icon-button"
                  type="button"
                  aria-label={`Xóa công việc: ${task.text}`}
                  title="Xóa công việc này"
                  onClick={() => deleteTask(task.id)}
                >
                  <TrashIcon />
                </button>
              )}
            </div>
          ))
        )}
      </section>

      {currentTab === 'completed' && completedCount > 0 && (
        <div className="list-actions">
          <button className="delete-all-button" type="button" onClick={deleteCompleted}>
            <TrashIcon />
            <span>delete all</span>
          </button>
        </div>
      )}
    </main>
  );
}
