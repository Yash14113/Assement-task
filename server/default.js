import axios from "axios";
import mongoose from "mongoose";
import { Product } from "./schema/Product_schema.js";

const DefaultData=async()=>{
    const url='https://s3.amazonaws.com/roxiler.com/product_transaction.json'
    try{
        const {data}= await axios.get(url);
        
        const len= await Product.find()
        if(len.length>0){
            return;
        }
        const updatedData=data.map((item)=>({
            ...item,
            dateOfSale:new Date(item.dateOfSale)

        }))
        await Product.insertMany(updatedData);
        console.log('Data imported successfully')

    }catch(error){
        console.log('Data importing in DB failed',error)
    }
}

export default DefaultData;