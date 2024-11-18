import { Product } from "../schema/Product_schema.js";


export const getTransaction = async (req, res) => {
    try {
        const { month, page = 1, pageSize = 10 } = req.query; 
        const monthInt = parseInt(month);
        const pageInt = parseInt(page);
        const pageSizeInt = parseInt(pageSize);

        console.log('Month:', monthInt, 'Page:', pageInt, 'Page Size:', pageSizeInt);

        const skip = (pageInt - 1) * pageSizeInt;

        const transactions = await Product.find({
            $expr: { $eq: [{ $month: { $toDate: "$dateOfSale" } }, monthInt] },
        })
        .skip(skip)
        .limit(pageSizeInt);

        const totalTransactions = await Product.countDocuments({
            $expr: { $eq: [{ $month: { $toDate: "$dateOfSale" } }, monthInt] },
        });
        const totalPages = Math.ceil(totalTransactions / pageSizeInt);

        res.status(200).json({
            transactions,
            totalTransactions,
            totalPages,
            currentPage: pageInt,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export const getStatistics=async(req,res)=>{
    try{
        const month=req.query.month
        const monthInt=parseInt(month)
        console.log( monthInt)
        const statistics= await Product.find({
            $expr:{$eq:[{$month :{$toDate:"$dateOfSale"}},monthInt]}
        })
        let sale=0,count=0
        statistics.map((items,idx)=>{
            sale+=items.price,
            count=idx+1
        })
        console.log(sale,count)
        res.status(200).json({sale,count}) 
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}