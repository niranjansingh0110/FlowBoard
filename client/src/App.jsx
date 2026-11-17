import { useMemo, useState } from 'react'
import './App.css'

const initialTasks = [
  { id: 1, title: 'Map onboarding journey', project: 'Website redesign', priority: 'High', initials: 'AK', color: 'coral', due: 'Today' },
  { id: 2, title: 'Gather customer feedback', project: 'Mobile app', priority: 'Medium', initials: 'NS', color: 'blue', due: 'Nov 20' },
  { id: 3, title: 'Review dashboard wireframes', project: 'Website redesign', priority: 'Low', initials: 'JR', color: 'green', due: 'Nov 21' },
  { id: 4, title: 'Set up API documentation', project: 'Platform', priority: 'High', initials: 'NS', color: 'blue', due: 'Nov 22' },
  { id: 5, title: 'Create empty state designs', project: 'Mobile app', priority: 'Medium', initials: 'AK', color: 'coral', due: 'Nov 24' },
  { id: 6, title: 'Test invite flow', project: 'Platform', priority: 'Low', initials: 'ML', color: 'purple', due: 'Nov 25' },
  { id: 7, title: 'Prepare release checklist', project: 'Platform', priority: 'Medium', initials: 'JR', color: 'green', due: 'Nov 27' },
]

const columns = [
  { id: 'todo', label: 'To do', color: 'gray' },
  { id: 'progress', label: 'In progress', color: 'violet' },
  { id: 'review', label: 'In review', color: 'amber' },
  { id: 'done', label: 'Done', color: 'green' },
]

const initialStatuses = { 1: 'todo', 2: 'todo', 3: 'progress', 4: 'progress', 5: 'review', 6: 'done', 7: 'done' }

function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const [statuses, setStatuses] = useState(initialStatuses)
  const [query, setQuery] = useState('')

  const visibleTasks = useMemo(() => tasks.filter((task) =>
    `${task.title} ${task.project} ${task.priority}`.toLowerCase().includes(query.toLowerCase()),
  ), [tasks, query])

  function addTask() {
    const title = window.prompt('What needs to get done?')
    if (!title?.trim()) return
    const id = Date.now()
    setTasks((current) => [{ id, title: title.trim(), project: 'Website redesign', priority: 'Medium', initials: 'NS', color: 'blue', due: 'No date' }, ...current])
    setStatuses((current) => ({ ...current, [id]: 'todo' }))
  }

  function moveTask(taskId, direction) {
    const currentIndex = columns.findIndex((column) => column.id === statuses[taskId])
    const next = columns[Math.max(0, Math.min(columns.length - 1, currentIndex + direction))]
    setStatuses((current) => ({ ...current, [taskId]: next.id }))
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#home" aria-label="Flowboard home">
          <span className="brand-mark"><i /><i /><i /></span>
          <span>flowboard</span>
        </a>

        <button className="workspace-switcher" type="button">
          <span className="workspace-avatar">S</span>
          <span className="workspace-name"><strong>Studio North</strong><small>Free workspace</small></span>
          <span className="chevron">⌄</span>
        </button>

        <nav className="main-nav" aria-label="Main navigation">
          <a className="nav-item" href="#overview"><span className="nav-icon">⌂</span> Overview</a>
          <a className="nav-item active" href="#projects"><span className="nav-icon">▦</span> Projects <span className="nav-count">4</span></a>
          <a className="nav-item" href="#my-tasks"><span className="nav-icon">☷</span> My tasks</a>
          <a className="nav-item" href="#inbox"><span className="nav-icon">♧</span> Inbox <span className="unread-dot" /></a>
        </nav>

        <div className="sidebar-section">
          <div className="section-heading"><span>FAVORITES</span><button aria-label="Add favorite" type="button">+</button></div>
          <a className="project-link" href="#website"><span className="project-dot lavender" /> Website redesign</a>
          <a className="project-link" href="#mobile"><span className="project-dot orange" /> Mobile app</a>
          <a className="project-link" href="#platform"><span className="project-dot mint" /> Platform</a>
          <button className="add-project" type="button"><span>+</span> Add project</button>
        </div>

        <div className="sidebar-bottom">
          <a className="nav-item" href="#help"><span className="nav-icon">?</span> Help center</a>
          <button className="profile-button" type="button">
            <span className="avatar blue">NS</span>
            <span className="profile-name"><strong>Niranjan Singh</strong><small>Personal account</small></span>
            <span className="chevron">···</span>
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumbs"><span>Projects</span><span className="crumb-separator">/</span><strong>Website redesign</strong></div>
          <div className="topbar-actions">
            <label className="search-box"><span>⌕</span><input aria-label="Search tasks" placeholder="Search anything..." value={query} onChange={(event) => setQuery(event.target.value)} /><kbd>⌘ K</kbd></label>
            <button className="icon-button notification-button" aria-label="Notifications" type="button">♧<i /></button>
            <span className="avatar small coral">AK</span>
          </div>
        </header>

        <section className="page-content">
          <div className="page-heading-row">
            <div>
              <div className="eyebrow"><span className="project-dot lavender" /> PRODUCT DESIGN <span className="eyebrow-separator">·</span> PROJECT</div>
              <h1>Website redesign</h1>
              <p className="page-subtitle">A fresh, thoughtful experience for our next chapter.</p>
            </div>
            <div className="heading-actions">
              <div className="avatar-stack" aria-label="Project team"><span className="avatar coral">AK</span><span className="avatar green">JR</span><span className="avatar purple">ML</span><span className="avatar blue">NS</span><button className="avatar add-person" aria-label="Add teammate" type="button">+</button></div>
              <button className="share-button" type="button"><span>↗</span> Share</button>
              <button className="more-button" aria-label="More project options" type="button">···</button>
            </div>
          </div>

          <div className="project-tabs"><button className="tab active" type="button"><span>▦</span> Board</button><button className="tab" type="button"><span>☷</span> List</button><button className="tab" type="button"><span>▤</span> Timeline</button><button className="tab" type="button"><span>▦</span> Files</button><button className="tab-add" type="button" aria-label="Add view">+</button><button className="tab-settings" type="button"><span>⚙</span> Customize</button></div>

          <section className="summary-grid" aria-label="Project summary">
            <article className="summary-card"><div className="summary-label">Project progress <span className="summary-icon violet-icon">↗</span></div><div className="progress-row"><strong>68%</strong><span className="positive-change">↑ 12%</span></div><div className="progress-track"><span style={{ width: '68%' }} /></div><small>18 of 26 tasks completed</small></article>
            <article className="summary-card"><div className="summary-label">Open tasks <span className="summary-icon blue-icon">☷</span></div><div className="summary-number">8 <span className="summary-muted">tasks</span></div><small><b>3 due this week</b> · 2 overdue</small></article>
            <article className="summary-card"><div className="summary-label">Team members <span className="summary-icon amber-icon">♧</span></div><div className="summary-number">5 <span className="summary-muted">people</span></div><small>Last active <b>12 minutes ago</b></small></article>
            <article className="summary-card deadline-card"><div className="summary-label">Project deadline <span className="summary-icon green-icon">▣</span></div><div className="summary-number">Nov 28 <span className="deadline-badge">12 days left</span></div><small>On track to meet the deadline</small></article>
          </section>

          <div className="board-toolbar"><div className="board-title"><h2>Project board</h2><span className="task-total">26</span></div><div className="board-controls"><button type="button" className="filter-button"><span>☷</span> Filter</button><button type="button" className="sort-button"><span>↕</span> Sort</button><button type="button" className="board-add-button" onClick={addTask}><span>+</span> Add task</button><button type="button" className="board-menu" aria-label="Board options">···</button></div></div>

          <div className="board-grid">
            {columns.map((column) => {
              const columnTasks = visibleTasks.filter((task) => statuses[task.id] === column.id)
              return <section className="board-column" key={column.id}>
                <div className="column-heading"><div><span className={`status-dot ${column.color}`} /><h3>{column.label}</h3><span className="column-count">{columnTasks.length}</span></div><button type="button" aria-label={`Add task to ${column.label}`} onClick={addTask}>+</button></div>
                <div className="task-list">
                  {columnTasks.map((task) => <article className="task-card" key={task.id}>
                    <div className="task-topline"><span className={`priority ${task.priority.toLowerCase()}`}><i />{task.priority}</span><button type="button" aria-label={`Options for ${task.title}`} className="task-menu">···</button></div>
                    <h4>{task.title}</h4>
                    <div className="task-project"><span className="project-dot lavender" />{task.project}</div>
                    <div className="task-footer"><span className="due-date"><span>◷</span>{task.due}</span><div className="task-actions"><button type="button" aria-label="Move task left" onClick={() => moveTask(task.id, -1)}>‹</button><span className={`avatar task-avatar ${task.color}`}>{task.initials}</span><button type="button" aria-label="Move task right" onClick={() => moveTask(task.id, 1)}>›</button></div></div>
                  </article>)}
                  <button className="column-add" type="button" onClick={addTask}><span>+</span> Add task</button>
                </div>
              </section>
            })}
          </div>
          <footer className="page-footer"><span>Last updated just now</span><span>Made for teams that flow <b>✳</b></span></footer>
        </section>
      </main>
    </div>
  )
}

export default App
