import { useState } from 'react';
import '../styles/createTasksPopup.css';

const CreateTaskPopup = ({ onClose, onCreate }) => {
    const [taskData, setTaskData] = useState({
        title: '',
        priority: '',
        dueDate: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setTaskData({
            ...taskData,
            [e.target.name]: e.target.value
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!taskData.title){
            setErrorMessage('Title is required');
            return;
        }
        await onCreate(taskData)
    }

  return (
    <div className='popup-overlay'>
        <div className="popup-card">
            <h2 className="popup-title">Create Task</h2>
            {errorMessage && <p className='error'>{errorMessage}</p>}
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
                        id="priority"
                        name="priority"
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
                    <label htmlFor="dueDate">DueDate</label>
                    <input
                        type="date"
                        id="dueDate"
                        name="dueDate"
                        value={taskData.dueDate}
                        onChange={handleChange}
                    />
                </div>
                <button type='submit'>Create Tasks</button>
                <button type='button' onClick={onClose}>Cancel</button>
            </form>
        </div>
    </div>
  )
};

export default CreateTaskPopup;
