import React, { useEffect } from 'react';
import { useState } from 'react';
import '../App.css';
import { Statistic } from '../../services/api';



const StatisticsCharts = () => {

    const months = [
        "Select", "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const [selectedMonth, setSelectedMonth] = useState(3);
    const [product, setProduct] = useState({})

    async function handlechange(e) {
        setSelectedMonth(e.target.value);
        try {
            const data = await Statistic(selectedMonth)
            console.log('res ', data)
            setProduct(data)
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        async function fetch() {
            try {
                const data = await Statistic(selectedMonth);
                setProduct(data);
                console.log(data);

            } catch (err) {
                console.log("Error fetching data:", err);
            }
        }
        fetch();
    }, [selectedMonth]);
    console.log('product', product)
    return (
        <div className="statistics-container">
            <div className='statisticsbox'>
                <div className='filter'>
                    <label htmlFor="month">Statistics : </label>
                    <select name="month" id="month" value={selectedMonth} onChange={(e) => handlechange(e)} >
                        {
                            months.map((item, idx) => {
                                return (
                                    <option name={item} value={idx}>{item}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className='info'>
                    <div className="stat-row">
                        <p>Total sale</p>
                        <span>{product.sale}</span>
                    </div>
                    <div className="stat-row">
                        <p>Total sold items</p>
                        <span>{product.count}</span>
                    </div>
                    <div className="stat-row">
                        <p>Total not sold items</p>
                        <span>{60 - product.count}</span>
                    </div>
                </div>

            </div>

            {/* <div className='chart-Container' >
                <div className='filter'>
                    <label htmlFor="month">Bar chart stats : </label>
                    <select name="month" id="month" value={selectedMonth} onChange={(e) => handlechange(e)} >
                        {
                            months.map((item, idx) => {
                                return (
                                    <option name={item} value={idx}>{item}</option>
                                )
                            })
                        }
                    </select>

                </div>
                
            </div> */}

        </div>
    );
};

export default StatisticsCharts;
