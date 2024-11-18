import axios from 'axios'

const url='http://localhost:5000'

export const TransactionTable=async(month,page,pageSize)=>{
    try{
        console.log('month',month)
        const {data}=await axios.get(`${url}/transaction?month=${month}&page=${page}&pageSize=${pageSize}`)
        return data;
    }catch(error){
        console.log('Failed to get the product table',error)
    }
}

export const Statistic=async(month)=>{
    try{
        console.log('month',month)
        const {data}=await axios.get(`${url}/statistics?month=${month}`)
        return data;
    }catch(error){
        console.log('Failed to get the product table',error)
    }
}