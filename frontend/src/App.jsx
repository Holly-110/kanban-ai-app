import { useState } from 'react'

// タスクの初期データ (モック)
const initialTasks = [
  {
    id: 1,
    title: 'AWS無料枠の仕様を確認する',
    status: 'TODO',
    subtasks: [
      { id: 101, text: 'S3の無料利用枠の調査', completed: true },
      { id: 102, text: 'EC2とRDSが無料枠内か調べる', completed: false }
    ]
  },
  {
    id: 2,
    title: 'ReactでカンバンボードのUIを作る',
    status: 'PROGRESS',
    subtasks: []
  },
  {
    id: 3,
    title: 'Gitの初期設定を完了する',
    status: 'DONE',
    subtasks: []
  }
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTitle, setNewTitle] = useState('');
  const [loadingAI, setLoadingAI] = useState({}); // { [taskId]: boolean }

  // 1. 新しいタスクを追加する関数
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask = {
      id: Date.now(), // 簡易的な一意のID
      title: newTitle,
      status: 'TODO',
      subtasks: []
    };

    setTasks([...tasks, newTask]);
    setNewTitle('');
  };

  // 2. タスクを削除する関数
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // 3. タスクのステータス（移動）を変更する関数
  const handleMoveTask = (id, direction) => {
    const statusOrder = ['TODO', 'PROGRESS', 'DONE'];
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const currentIndex = statusOrder.indexOf(task.status);
        let nextIndex = currentIndex + direction;
        
        // 範囲外にいかないようにガード
        if (nextIndex >= 0 && nextIndex < statusOrder.length) {
          return { ...task, status: statusOrder[nextIndex] };
        }
      }
      return task;
    }));
  };

  // 4. サブタスクのチェック状態を切り替える関数
  const handleToggleSubtask = (taskId, subtaskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          subtasks: task.subtasks.map(sub => 
            sub.id === subtaskId ? { ...sub, completed: !sub.completed } : sub
          )
        };
      }
      return task;
    }));
  };

  // 5. 【AI機能モック】Gemini APIをシミュレートしてサブタスクを生成する関数
  const handleGenerateSubtasks = (taskId, taskTitle) => {
    // ローディング開始
    setLoadingAI(prev => ({ ...prev, [taskId]: true }));

    // APIを呼び出している風の2秒のディレイ（バックエンド接続時に本当のAPIに変えます）
    setTimeout(() => {
      const generatedMockSubtasks = [
        { id: Date.now() + 1, text: `【AI】「${taskTitle}」の具体的な準備をする`, completed: false },
        { id: Date.now() + 2, text: `【AI】必要なツールや情報を整理する`, completed: false },
        { id: Date.now() + 3, text: `【AI】動作テストと最終チェックを行う`, completed: false }
      ];

      setTasks(prevTasks => prevTasks.map(task => {
        if (task.id === taskId) {
          return { ...task, subtasks: generatedMockSubtasks };
        }
        return task;
      }));

      // ローディング終了
      setLoadingAI(prev => ({ ...prev, [taskId]: false }));
    }, 2000);
  };

  return (
    <div className="container">
      {/* ヘッダー部分 */}
      <header className="app-header">
        <h1 className="app-title">Kanban Task Board</h1>
        <p className="app-subtitle">React + Go + PostgreSQL + Gemini AI フルスタック開発学習</p>
      </header>

      {/* タスク新規追加フォーム */}
      <div className="task-form-container">
        <form onSubmit={handleAddTask} className="task-form">
          <input
            type="text"
            className="task-input"
            placeholder="新しいタスクを入力..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button type="submit" className="add-button">タスク追加</button>
        </form>
      </div>

      {/* カンバンボードエリア */}
      <main className="kanban-board">
        {/* TODO カラム */}
        <div className="kanban-column status-todo">
          <div className="column-header">
            <div className="column-title-container">
              <span className="status-indicator"></span>
              <h2 className="column-title">未着手 (To Do)</h2>
            </div>
            <span className="task-count">
              {tasks.filter(t => t.status === 'TODO').length}
            </span>
          </div>
          <div className="task-list">
            {tasks.filter(t => t.status === 'TODO').map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onDelete={handleDeleteTask}
                onMove={handleMoveTask}
                onToggleSubtask={handleToggleSubtask}
                onAISubtask={handleGenerateSubtasks}
                loadingAI={loadingAI[task.id]}
              />
            ))}
          </div>
        </div>

        {/* PROGRESS カラム */}
        <div className="kanban-column status-progress">
          <div className="column-header">
            <div className="column-title-container">
              <span className="status-indicator"></span>
              <h2 className="column-title">進行中 (In Progress)</h2>
            </div>
            <span className="task-count">
              {tasks.filter(t => t.status === 'PROGRESS').length}
            </span>
          </div>
          <div className="task-list">
            {tasks.filter(t => t.status === 'PROGRESS').map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onDelete={handleDeleteTask}
                onMove={handleMoveTask}
                onToggleSubtask={handleToggleSubtask}
                onAISubtask={handleGenerateSubtasks}
                loadingAI={loadingAI[task.id]}
              />
            ))}
          </div>
        </div>

        {/* DONE カラム */}
        <div className="kanban-column status-done">
          <div className="column-header">
            <div className="column-title-container">
              <span className="status-indicator"></span>
              <h2 className="column-title">完了 (Done)</h2>
            </div>
            <span className="task-count">
              {tasks.filter(t => t.status === 'DONE').length}
            </span>
          </div>
          <div className="task-list">
            {tasks.filter(t => t.status === 'DONE').map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onDelete={handleDeleteTask}
                onMove={handleMoveTask}
                onToggleSubtask={handleToggleSubtask}
                onAISubtask={handleGenerateSubtasks}
                loadingAI={loadingAI[task.id]}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

// タスクカードコンポーネント
function TaskCard({ task, onDelete, onMove, onToggleSubtask, onAISubtask, loadingAI }) {
  return (
    <div className="task-card">
      <div className="task-card-header">
        <h3 className="task-title">{task.title}</h3>
        <button
          className="delete-button"
          onClick={() => onDelete(task.id)}
          title="タスクを削除"
        >
          ✕
        </button>
      </div>

      {/* AI自動分解セクション */}
      <div className="ai-section">
        {task.subtasks.length === 0 && !loadingAI && (
          <button
            className="ai-button"
            onClick={() => onAISubtask(task.id, task.title)}
          >
            ✨ AIでサブタスクに分解
          </button>
        )}

        {/* AI処理中のスケルトンアニメーション */}
        {loadingAI && (
          <div className="ai-loading">
            <div className="skeleton-line"></div>
            <div className="skeleton-line" style={{ width: '80%' }}></div>
            <div className="skeleton-line" style={{ width: '60%' }}></div>
          </div>
        )}

        {/* サブタスク一覧の表示 */}
        {task.subtasks.length > 0 && !loadingAI && (
          <div className="subtasks-container">
            {task.subtasks.map(sub => (
              <label key={sub.id} className="subtask-item">
                <input
                  type="checkbox"
                  className="subtask-checkbox"
                  checked={sub.completed}
                  onChange={() => onToggleSubtask(task.id, sub.id)}
                />
                <span style={{ textDecoration: sub.completed ? 'line-through' : 'none', opacity: sub.completed ? 0.6 : 1 }}>
                  {sub.text}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 移動コントロールボタン */}
      <div className="card-controls">
        {task.status !== 'TODO' ? (
          <button className="move-button" onClick={() => onMove(task.id, -1)}>
            ◀ 戻す
          </button>
        ) : <div />}
        
        {task.status !== 'DONE' ? (
          <button className="move-button" onClick={() => onMove(task.id, 1)}>
            進める ▶
          </button>
        ) : <div />}
      </div>
    </div>
  );
}

export default App
