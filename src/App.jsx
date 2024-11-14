import React, { useState } from 'react';
import './index.css';

function TodoApp() {
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [taskHeading, setTaskHeading] = useState('');
  const [taskContent, setTaskContent] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [updatedTaskContent, setUpdatedTaskContent] = useState('');

  const addProject = () => {
    if (newProjectName.trim()) {
      const newProject = { name: newProjectName, tasks: [] };
      setProjects([...projects, newProject]);
      setNewProjectName('');
      setSelectedProject(newProject);
    }
  };

  const addTask = () => {
    if (selectedProject && taskHeading.trim() && taskContent.trim()) {
      const updatedProject = {
        ...selectedProject,
        tasks: [
          ...selectedProject.tasks,
          { heading: taskHeading, content: taskContent, completed: false, id: Date.now() },
        ],
      };
      setProjects(
        projects.map((project) =>
          project.name === selectedProject.name ? updatedProject : project
        )
      );
      setTaskHeading('');
      setTaskContent('');
      setSelectedProject(updatedProject);
    }
  };

  const updateTask = (taskId) => {
    if (updatedTaskContent.trim()) {
      const updatedTasks = selectedProject.tasks.map((task) =>
        task.id === taskId ? { ...task, content: updatedTaskContent } : task
      );
      const updatedProject = { ...selectedProject, tasks: updatedTasks };
      setProjects(
        projects.map((project) =>
          project.name === selectedProject.name ? updatedProject : project
        )
      );
      setSelectedProject(updatedProject);
      setEditingTaskId(null);
      setUpdatedTaskContent('');
    }
  };

  const markAsComplete = (taskIndex) => {
    const updatedTasks = selectedProject.tasks.map((task, index) =>
      index === taskIndex ? { ...task, completed: !task.completed } : task
    );
    const updatedProject = { ...selectedProject, tasks: updatedTasks };
    setProjects(
      projects.map((project) =>
        project.name === selectedProject.name ? updatedProject : project
      )
    );
    setSelectedProject(updatedProject);
  };

  const deleteTask = (taskIndex) => {
    const updatedTasks = selectedProject.tasks.filter((_, index) => index !== taskIndex);
    const updatedProject = { ...selectedProject, tasks: updatedTasks };
    setProjects(
      projects.map((project) =>
        project.name === selectedProject.name ? updatedProject : project
      )
    );
    setSelectedProject(updatedProject);
  };

  return (
    <div className="app">
      <h1>Todo Application</h1>
      <div className="project-section">
        <input
          type="text"
          value={newProjectName}
          placeholder="New Project Name"
          onChange={(e) => setNewProjectName(e.target.value)}
        />
        <button onClick={addProject}>Create New Project</button>
      </div>
      <div className="projects-list">
        {projects.map((project) => (
          <button
            key={project.name}
            className={selectedProject?.name === project.name ? 'active' : ''}
            onClick={() => setSelectedProject(project)}
          >
            {project.name}
          </button>
        ))}
      </div>
      {selectedProject && (
        <>
          <h2>{selectedProject.name}</h2>
          <div className="input-section">
            <input
              type="text"
              value={taskHeading}
              placeholder="Task Heading"
              onChange={(e) => setTaskHeading(e.target.value)}
            />
            <input
              type="text"
              value={taskContent}
              placeholder="Task Content"
              onChange={(e) => setTaskContent(e.target.value)}
            />
            <button onClick={addTask}>Add Task</button>
          </div>
          <ul className="todo-list">
            {selectedProject.tasks.map((task, index) => (
              <li key={task.id} className={task.completed ? 'completed' : ''}>
                <div className="task-content">
                  <div>
                    <div className="task-heading">{task.heading}</div>
                    {editingTaskId === task.id ? (
                      <input
                        type="text"
                        value={updatedTaskContent}
                        onChange={(e) => setUpdatedTaskContent(e.target.value)}
                        placeholder="Update task..."
                      />
                    ) : (
                      <div className="task-description">{task.content}</div>
                    )}
                  </div>
                  <div className="actions">
                    {editingTaskId === task.id ? (
                      <button onClick={() => updateTask(task.id)}>Save</button>
                    ) : (
                      <button onClick={() => setEditingTaskId(task.id)}>Update</button>
                    )}
                    <button className="delete" onClick={() => deleteTask(index)}>
                      Delete
                    </button>
                    <button onClick={() => markAsComplete(index)}>
                      {task.completed ? 'Undo' : 'Complete'}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default TodoApp;
