import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './ListFood.css';
import { deleteFood, getFoodList } from '../../Service/foodService';

const ListFoods = () => {
    const [list, setList] = useState([]);

    const fetchList = async () => {
        try {
            const response = await getFoodList();
            console.log('Food list:', response);
            setList(response); // Adjust if response is nested (e.g., response.data)
        } catch (error) {
            console.error('Fetch error:', error);
            toast.error("Error while reading the Foods");
        }
    };

    const removeFood = async (id) => {
        try {
            const status = await deleteFood(id);
            if (status === 204) {
                await fetchList();
                toast.success("Food Deleted Successfully");
            }
        } catch (error) {
            console.error('Delete error:', error);
            toast.error("Error while deleting the Food");
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className='py-5 row justify-content-center'>
            <div className='col-11 card'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <img src={item.imageUrl} alt={item.name} height={48} width={48} />
                                </td>
                                <td>{item.name}</td>
                                <td>{item.category}</td>
                                <td>₹{item.price}.00</td>
                                <td className='text-danger'>
                                    <i 
                                        className="bi bi-x-circle-fill" 
                                        onClick={() => removeFood(item.id)}
                                        style={{cursor: 'pointer'}}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListFoods;