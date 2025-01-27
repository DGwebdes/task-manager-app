import { useState, useEffect, useCallback } from "react";
// import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import CreateTaskPopup from "../components/CreateTaskPopup";
import EditTasksPopup from '../components/EditTasksPopup';
import {errorHandler} from '../utils/errorHandler.js';
import '../styles/taskDashboard.css';

const FILTER_OPTIONS = {
    priority: ['', 'low', 'medium', 'high'],
    completed: ['', 'true', 'false']
};

const TaskDashboard = () => {
    // const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        priority: '',
        completed: '',
        dueDate: ''
    });
    const [showPopup, setShowPopup] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);

    const fetchTasks = useCallback(async() => {
        setLoading(true);
        try {
            const response = await API.get('tasks', { params: filters });
            setTasks(response.data);
        } catch (error) {
            errorHandler(error, 'Error fetching tasks');
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleCreateTask = async (newTask) => {
        try {
            const response = await API.post('tasks', newTask);
            setTasks((prevTask) => [...prevTask, response.data]);
            setShowPopup(false);
        } catch (error) {
            errorHandler(error, 'Error creating task');
        }
    };

    const handleTaskEdit = async (taskId, updatedTask) => {
        try {
            const response = await API.put(`/tasks/${taskId}`, updatedTask);
            setTasks((prevTask) => prevTask.map((task) => task._id === taskId ? response.data : task));
            setShowEditPopup(false);
        } catch (error) {
            errorHandler(error, 'Error updating task');
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
            errorHandler(error, 'Error changing task status');
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await API.delete(`/tasks/${taskId}`);
            setTasks(prevTask => prevTask.filter(task => task._id !== taskId));
        } catch (error) {
            errorHandler(error, 'Error deleting task');
        }
    };

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        })
    ;}

    return (
        <main>
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
                    setTaskToEdit={setTaskToEdit}
                    setShowEditPopup={setShowEditPopup}
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
            {
                showEditPopup && (
                    <EditTasksPopup
                        task={taskToEdit}
                        onClose={() => setShowEditPopup(false)}
                        onEdit={handleTaskEdit}
                    />
                )
            }
        </main>
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

const TaskCards = ({ tasks, toggleTaskCompletion, deleteTask,  setTaskToEdit, setShowEditPopup }) => (
    <>
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
                            setTaskToEdit={setTaskToEdit}
                            setShowEditPopup={setShowEditPopup}
                        />
                    ))
                )
            }
        </div>
    </>
)

const TaskCard = ({ task, toggleTaskCompletion, deleteTask, setShowEditPopup, setTaskToEdit }) => (
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
        <button
            onClick={()=>{
                setTaskToEdit(task);
                setShowEditPopup(true);
            }}
        >Edit</button>
    </div>
)

export default TaskDashboard;