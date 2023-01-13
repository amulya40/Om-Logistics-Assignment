import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";

//Here we fetch the data from the backend//
export const Products = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchAllProducts = async () => {
            try{
                const res = await axios.get("http://localhost:8800/products")
                setProducts(res.data);                
            }
            catch(err){
                console.log(err)
            }
        }
        fetchAllProducts()
    }, []);

    const handleDelete = async (Item) => {
        try{
            await axios.delete(`http://localhost:8800/products/${Item}`)
            window.location.reload()
        }
        catch(err){
            console.log(err)
        }
    }
    return (
        <div>
          <h1>Om logistics</h1>
          <div className="products">
            {products.map(product => (
              <div className="product" key={product.id}>
                {product.Cover && <img src={product.Cover} alt="" />}
                <h2>{product.Item_Name}</h2>
                <h3>{product.UOM}</h3>
                <span>Rs.{product.Rate}</span>
                <button className='delete' onClick={()=>handleDelete(product.Item)}>Delete</button>
                <button className='update'>
                    <Link to={`/update/${product.Item}`}>Update</Link>
                    </button>
              </div>
            ))}
            <div>
                <button className='Add'>
                <Link to="/add">Add New Product</Link>
                </button>
            </div>
          </div>
    
          
        </div>
      );
    };

        

export default Products;