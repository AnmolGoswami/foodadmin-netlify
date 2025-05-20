import axios from "axios";

const API_URL = 'http://localhost:8080/api/foods';

export const addFood = async (foodData, image) => {

    const formData = new FormData();
    formData.append('file', image);
    formData.append('food', JSON.stringify(foodData));
    try {
        await axios.post(API_URL, formData, { headers: { "Content-Type": "multipart/form-data" } });
    } catch (error) {
        console.log(error);
        throw error;

    };

    





}


export const getFoodList= async()=>{
    try {
        const response = await axios.get(API_URL);
    
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log("Error fetching the Food List",error);
        throw error;
        
    }

}

export const deleteFood = async(id)=>{
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.status  
    } catch (error) {
        console.log(error);
        throw error
    }
            
            

}