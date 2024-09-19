import { useNavigate, useParams } from 'react-router-dom';
import { getSingleTask, updateTask } from '../Api/AllApi';
import './TaskPage.css'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const TaskDetails = () => {
    const [task, setTask] = useState({
        title: '',
        description: '',
        status: '',
        duedate: ''
      });

    const {id} =useParams(); 
    const navigate = useNavigate();
     useEffect(()=>{
     const getSingle =async()=>{
     const res =await  getSingleTask(id)
      setTask(res.data.SingleData)
     } 
     getSingle();     
     },[])

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
           const response = await updateTask(id,task) ;
           if (response) {
            toast.success("your data updated successful")  
             navigate("/task")
        }
        
        } catch (error) {
          console.error("Error creating task:", error);
          toast.error("Failed to create task.");
        }
      };
  return (
    <>
        <div className="task-list-container">
        <h2>update My Tasks</h2>
        <div className="task-form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={task.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={task.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={task.status}
              onChange={handleChange}
              
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
              
            />
          </div>
          <button type="submit" className="submit-btn2">update Task</button>
        </form>
      </div>  
      </div> 
    </>
  )
}

export default TaskDetails

