import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { addFood } from '../../Service/foodService';
import { toast } from 'react-toastify';
const AddFoods = () => {
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Biryani'
    });

    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({ ...data, [name]: value })
    }

    const onSubmitHandler = async(e)=>{
        e.preventDefault();
        

        try{
           await addFood(data,image);
           
            toast.success('Food Added Successfully');
            setData({
                name: '',
                description: '',
                price: '',
                category: 'Biryani'
            });
            setImage(null);
           


        }catch(err){
            console.log(err);
            toast.error('Something went wrong');
        }
    }

    return (
        <div className=" ">
            <div className="row m-3">
                <div className="card col-md-4">
                    <div className="card-body">
                        <h2 className="mb-4">Add Food</h2>
                        <form onSubmit={onSubmitHandler}>

                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">
                                    <img src={image ? URL.createObjectURL(image) : assets.upload} alt="" width={100} />
                                </label>
                                <input type="file" className="form-control" id="image" required onChange={(e) => setImage(e.target.files[0])} />
                            </div>




                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control" id="name" required name='name' onChange={onChange} value={data.name} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea className="form-control" name='description' id="description" rows="5" required onChange={onChange} value={data.description}></textarea>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="category" className="form-label">Category</label>
                                <select name="category" id="category" className='form-control' onChange={onChange} value={data.category}>
                                    <option value="Biryani">Biryani</option>
                                    <option value="Pizza">Pizza</option>
                                    <option value="Burger">Burger</option>
                                    <option value="Pasta">Pasta</option>
                                    <option value="Noodles">Noodles</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">Price</label>
                                <input type="number" className="form-control" id="price" required name='price' onChange={onChange} value={data.price} />
                            </div>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddFoods