import axiosInstance from "./AxiosInstance"

export const register =async(data)=>{
try{
    const responce =await axiosInstance.post("/auth/register",data);
    return responce
}catch(error){
    console.error("Error fetching data:", error);
    throw error;
}
}

export const login =async(data)=>{
    try{
     const responce = await axiosInstance.post("/auth/login",data);
     if(!responce.data.token){
        console.log("login failed")
         return { success: false }; 
     }
     else{
        localStorage.setItem("token",responce.data.token)
         return { success: true, token: responce.data.token };
     }

    }catch(error){
    console.error("Error fetching data:", error);
    throw error;
    }
}

export const getAllTask = async()=>{
    try{
   const response =await  axiosInstance.get("/Task/getallmyTask")
   return response.data;


    }catch(error){
    console.error("Error fetching data:", error);
    throw error;
    }
}
export const createTask =async(data)=>{

try{
  const task =await axiosInstance.post("/Task/createTask",data)
  return task  

}catch(error){
    console.error("Error fetching data:", error);
    throw error;
}
}

export const getSingleTask =async(id)=>{
    try{
    const SingleTask= await axiosInstance.get(`/Task/getMyTask/${id}`)
    return SingleTask
    }catch(error){
        console.error("Error fetching data:", error);
        throw error;

    }
}

export const updateTask = async(id,data)=>{
try{
    const updatedTask =await axiosInstance.put(`/Task/updateTask/${id}`,data)
    return updatedTask

}catch(error){
    console.error("Error in update data:", error);
    throw error;
}
}
export const deleteTask = async(id)=>{
    try{
        const deleteTask = await axiosInstance.delete(`/Task/deleteTask/${id}`)

    }catch(error){
        console.error("Error in update data:", error);
        throw error;
        
    }
}