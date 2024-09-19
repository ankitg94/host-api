import express from "express"
  import { authMiddleware } from "../Middleware/authMiddleware.js";
import { createTaskController, deleteTaskController, getAllTaskControllera, 
    getSingleTaskController, 
    updateTaskContolller } from "../Controller/TaskController.js";

const route =express.Router()
route.post("/createTask",authMiddleware,createTaskController);
route.get("/getallmyTask",authMiddleware,getAllTaskControllera);
route.put("/updateTask/:id",authMiddleware,updateTaskContolller);
route.delete("/deleteTask/:id",authMiddleware,deleteTaskController);
route.get("/getMyTask/:id",authMiddleware, getSingleTaskController);

export default route;
