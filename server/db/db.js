
import mongoose from "mongoose";

export const Connection=async()=>{
        try{

             const URL='mongodb://localhost:27017';
            await mongoose.connect(URL)
            console.log('DB connected successfully')

        }catch(error){
                console.log('Error while Connecting to the data base',error);
        }
}
