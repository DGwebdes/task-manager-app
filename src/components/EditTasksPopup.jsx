import { useEffect, useState } from "react";

const EditTasksPopup = ({ task, onClose, onEdit }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    priority: '',
    description: '',
    dueDate: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (task) {
      setTaskData({
        title: task.title || '',
        priority: task.priority || '',
        description: task.description || '',
        dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
      })
    }
  }, [task]);

  const handleChange = (e) => {
    setTaskData({
      ...taskData,
      [e.target.name] : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!taskData.title) {
      setErrorMessage('Title is required');
      return;
    }
    await onEdit(task._id, taskData);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-card">
        <h2 className="popup-title">Edit Task</h2>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={taskData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="priority">Priority</label>
              <select
                name="priority"
                id="priority"
                value={taskData.priority}
                onChange={handleChange}
              >
                <option value="">Select Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                id="description"
                value={taskData.description}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="dueDate">Due Date</label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={taskData.dueDate}
                onChange={handleChange}
              />
            </div>
            <button type="submit">Save Changes</button>
            <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  )
}

export default EditTasksPopup;