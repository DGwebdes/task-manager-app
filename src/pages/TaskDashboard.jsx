import { useState, useEffect, useCallback } from "react";
// import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import CreateTaskPopup from "../components/CreateTaskPopup";
import '../styles/taskDashboard.css';

const FILTER_OPTIONS = {
    priority: ['', 'low', 'medium', 'high'],
    completed: ['', 'true', 'false']
};

const TaskDashboard = () => {
    // const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [filters, setFilters] = useState({
        priority: '',
        completed: '',
        dueDate: ''
    });
    const [showPopup, setShowPopup] = useState(false);

    const fetchTasks = useCallback(async() => {
        setLoading(true);
        try {
            const response = await API.get('tasks', { params: filters });
            setTasks(response.data);
        } catch (error) {
            setErrorMessage('Error fetching tasks', error);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        console.log("Wiiii");
        fetchTasks();
    }, [fetchTasks]);

    const handleCreateTask = async (newTask) => {
        try {
            const response = await API.post('tasks', newTask);
            setTasks((prevTask) => [...prevTask, response.data]);
            setShowPopup(false);
        } catch (error) {
            setErrorMessage('Error creating task', error)
        }
    }

    const toggleTaskCompletion = async (taskId, currentStatus) => {
        try {
            await API.patch(`/tasks/${taskId}/status`, { completed : !currentStatus });
            setTasks(prevTask =>
                prevTask.map(task =>
                    task._id === taskId ? { ...task, completed: !currentStatus }: task
                )
            );
        } catch (error) {
            setErrorMessage('Error changing task status', error)
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await API.delete(`/tasks/${taskId}`);
            setTasks(prevTask => prevTask.filter(task => task._id !== taskId));
        } catch (error) {
            setErrorMessage('Error deleting task', error)
        }
    };

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        })
    ;}

    return (
        <>
            <h1>Dashboard</h1>
            <button onClick={() => setShowPopup(true)}>Create Task</button>
            <FilterForm filters={filters} handleFilterChange={handleFilterChange} />
            { loading ? (
                <p>Loading tasks...</p>
            ) : (
                <TaskCards
                    tasks={tasks}
                    toggleTaskCompletion={toggleTaskCompletion}
                    deleteTask={deleteTask}
                    errorMessage={errorMessage}
                />
            )}
            {
                showPopup && (
                    <CreateTaskPopup
                        onClose={() => setShowPopup(false)}
                        onCreate={handleCreateTask}
                    />
                )
            }
        </>
    )
}


const FilterForm = ({ filters, handleFilterChange }) => (
    <>
        <h2>Filters</h2>
        <form action="">
            <div>
                <label htmlFor="">Priority</label>
                <select name="priority" id="prio" onChange={handleFilterChange} value={filters.priority}>
                    {
                        FILTER_OPTIONS.priority.map(option => (
                            <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
                        ))
                    }
                </select>
            </div>
            <div>
                <label htmlFor="">Status</label>
                <select name="completed" id="status" onChange={handleFilterChange} value={filters.completed}>
                    {
                        FILTER_OPTIONS.completed.map(option => (
                            <option key={option} value={option}>{ option === '' ? 'All' : option === 'true' ? 'Completed' : 'Incomplete'}</option>
                        ))
                    }
                </select>
            </div>
            <div>
                <label htmlFor="">Due Date</label>
                <input
                    type="date"
                    name="dueDate"
                    onChange={handleFilterChange}
                    value={filters.dueDate}
                />
            </div>
        </form>
    </>
);

const TaskCards = ({ tasks, toggleTaskCompletion, deleteTask, errorMessage }) => (
    <>
        {errorMessage && <p>{errorMessage}</p>}
        <div className="task-cards">
            {
                tasks.length === 0 ? (
                    <p>No tasks Found</p>
                ) : (
                    tasks.map(task => (
                        <TaskCard
                            key={task._id}
                            task={task}
                            toggleTaskCompletion={toggleTaskCompletion}
                            deleteTask={deleteTask}
                        />
                    ))
                )
            }
        </div>
    </>
)

const TaskCard = ({ task, toggleTaskCompletion, deleteTask }) => (
    <div className="task-card">
        <h3>{task.title}</h3>
        <p>Priority: {task.priority}</p>
        <p>Status: {task.completed ? 'Completed' : 'Incomplete'}</p>
        <p>DueDate: {new Date(task.dueDate).toLocaleString()}</p>
        <button onClick={() => toggleTaskCompletion(task._id, task.completed)}>
            {task.completed ? 'Mark as Incomplete' : 'Mark as Completed'}
        </button>
        <button onClick={() => deleteTask(task._id)}>
            Delete
        </button>
    </div>
)

export default TaskDashboard;