import React, { useEffect, useState } from 'react';
import "./TaskPage.css";
import { createTask, deleteTask, getAllTask } from '../Api/AllApi';
import { toast } from 'react-toastify';
import {useNavigate } from 'react-router-dom';

const TaskPage = () => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: '',
    duedate: ''
  });

  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    var getAllData = async () => {
      try {
        const res = await getAllTask();
        setTasks(res.data);  
      } catch (error) {
        console.error("Error fetching tasks:", error);
        toast.error("Failed to load tasks.");
      }
    };
    getAllData();
  }, [tasks]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createTask(task);
      if (response) {
        toast.success("Task created successfully!");
        const res = await getAllTask();
        setTasks(res.data);  
      }
      setTask({
        title: '',
        description: '',
        status: '',
        duedate: ''
      });
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Failed to create task.");
    }
  };
  
  const editData = (id)=>{
    navigate(`/taskDetails/${id}`)
  }   
  
      const DeleteData = async(id)=>{
      const res =await deleteTask(id)
      if(res){
        toast.success("task Deleted successfully")
        }
    }
    
    
 
  return (
    <div className="task-page">
      <div className="task-form-container">
        <h2>Add Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={task.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={task.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={task.status}
              onChange={handleChange}
              required
            >
              <option value="">Select Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              id="duedate"
              name="duedate"
              value={task.duedate}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn">Add Task</button>
        </form>
      </div>

      <div className="task-list-container">
        <h2>My Tasks</h2>
        <ul className="task-list">
          {tasks.map((taskItem, index) =>{ 
            const mduedate = new Date(taskItem.duedate)
            const formattedDate = `${mduedate.getDate()}-${mduedate.getMonth() + 1}-${mduedate.getFullYear()}`
               return (
            <li key={index} className="task-item">
              <h3>Title: {taskItem.title}</h3>
              <p>Description: {taskItem.description}</p>
              <p>Status: {taskItem.status}</p>
              <p>Due Date: {formattedDate}</p>
              <p>Remaining Days: {taskItem.remday}</p>
              <button type="submit" className="submit-btn2" onClick={()=>editData(taskItem._id) }>edit</button>
              <button type="submit" className="submit-btn3" onClick={()=>DeleteData(taskItem._id)}>Delete</button>
            </li>
          )})}
        </ul>
      </div>
    </div>
  );
};

export default TaskPage;
