import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom';


export const Update = () => {
    const [product, setProduct] = useState({
        Item: "",
        Item_Name: "",
        UOM: "",
        HSN_Code: "",
        Quantity: "",
        Rate: "",
        Gross_Value: "",
        CGSTP: "",
        CGST: "",
        SGSTP: "",
        SGST: "",
        IGSTP: "",
        IGST: "",
        Net_Value: "",
        Remarks: "",
        Cover: ""
    });

    const navigate = useNavigate()
    const location = useLocation();

    const productID = location.pathname.split("/")[2];

    console.log(location.pathname.split("/")[2]);

    const handleChange = (e) => {
        setProduct((prev)=>({...prev, [e.target.name]: e.target.value}));
    };
    const handleClick = async e => {
        e.preventDefault() // prevent page refresh

        try{
            await axios.put("http://localhost:8800/products/"+ productID, product)
            navigate("/")
        }
        catch(err){
            console.log(err)
        }
    }

    console.log(product);

  return (
    <div className='form'>
        <h1>Update the Product</h1>
        <input type="number" placeholder='Item No.' onChange={handleChange} name='Item'  />
        <input type="text" placeholder='Item Name' onChange={handleChange} name='Item_Name'/>
        <input type="text" placeholder='UOM' onChange={handleChange} name='UOM'/>
        <input type="number" placeholder='HSN Code' onChange={handleChange} name='HSN_Code'/>
        <input type="number" placeholder='Quantity' onChange={handleChange} name='Quantity'/>
        <input type="number" placeholder='Rate' onChange={handleChange} name='Rate'/>
        <input type="number" placeholder='Gross Value' onChange={handleChange} name='Gross_Value'/>
        <input type="number" placeholder='CGST in %' onChange={handleChange} name='CGSTP'/>
        <input type="number" placeholder='CGST' onChange={handleChange} name='CGST'/>
        <input type="number" placeholder='SGST in %' onChange={handleChange} name='SGSTP'/>
        <input type="number" placeholder='SGST' onChange={handleChange} name='SGST'/>
        <input type="number" placeholder='IGST in %' onChange={handleChange} name='IGSTP'/>
        <input type="number" placeholder='IGST' onChange={handleChange} name='IGST'/>
        <input type="number" placeholder='Net Value'onChange={handleChange} name='Net_Value'/>
        <input type="text" placeholder='Remarks'onChange={handleChange} name='Remarks'/>
        <input type="text" placeholder='Image URL'onChange={handleChange} name='Cover'/>
        <button className='formbutton' onClick={handleClick}>Update</button>
    </div>
  )
}

export default Update
