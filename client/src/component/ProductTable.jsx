import React, { useEffect, useState } from 'react';
import '../App.css';
import { TransactionTable } from '../../services/api';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import StatisticsCharts from './StatisticsCharts';
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProductTable = () => {
    const [product, setProduct] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(3);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searched,setSearched]=useState('')
    const [filteredProducts,setFilteredProducts]=useState([])

    const months = [
        "Select", "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const processChartData = (products) => {
        const priceRanges = ['0-100', '101-200', '201-300', '301-400', '400+'];
        const counts = [0, 0, 0, 0, 0];

        products.forEach((item) => {
            if (item.sold) {
                if (item.price <= 100) counts[0]++;
                else if (item.price <= 200) counts[1]++;
                else if (item.price <= 300) counts[2]++;
                else if (item.price <= 400) counts[3]++;
                else counts[4]++;
            }
        });

        setChartData({
            labels: priceRanges,
            datasets: [
                {
                    label: "Number of Products Sold",
                    data: counts,
                    backgroundColor: 'skyblue',
                },
            ],
        });
    };

    const handleChange = async (e) => {
        const selected = parseInt(e.target.value);
        setSelectedMonth(selected);
        setCurrentPage(1);

        fetchData(selected, 1)
    };

    const fetchData = async (month, page) => {
        try {
            const response = await TransactionTable(month, page, 3);
            setProduct(response.transactions);
            setTotalPages(response.totalPages);
            setFilteredProducts(response.transactions)
            processChartData(response.transactions);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData(selectedMonth, currentPage);
    }, [selectedMonth, currentPage]);

    const handleSearchChange = (e) => {
        const searchQuery = e.target.value;
        setSearched(searchQuery);

        if (searchQuery === '') {
            setFilteredProducts(product); 
        } else {
            const filtered = product.filter((item) =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase())||
                Number(item.price).toString().includes(searchQuery)
            );
            setFilteredProducts(filtered);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        fetchData(selectedMonth, page);
    };

    return (
        <div className="product-table-container">
            <div style={{textAlign:'center'}}><h1>Transaction Dashboard</h1></div>
            <div className='search'>
                <input type="text" placeholder='Search item based on title,description and price... ' value={searched} onChange={handleSearchChange} />
            </div>
            <div className="producttable">
                <h2>Product Table</h2>
                <div>
                    <label htmlFor="month">Select month: </label>
                    <select
                        name="month"
                        id="month"
                        value={selectedMonth}
                        onChange={handleChange}
                    >
                        {months.map((item, idx) => (
                            <option key={idx} value={idx}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Sold</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{item.description}</td>
                                <td>{item.price}</td>
                                <td>{item.category}</td>
                                <td>{item.sold ? 'True' : 'False'}</td>
                                <td>
                                    <img src={item.image} alt={item.title} width={50} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="pagination">
                <button 
                    disabled={currentPage === 1} 
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Prev  
                </button>
                
                <span style={{marginTop:'10px'}}>{currentPage} of {totalPages}</span>
                <button 
                    disabled={currentPage === totalPages} 
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                </button>
            </div>
            <div style={{ width: '100%', display:'flex' , justifyContent:'space-around' }}>
                <StatisticsCharts/>
                <div className="barchart">
                    <Bar
                        data={chartData}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    display: true,
                                    position: "top",
                                },
                                title: {
                                    display: true,
                                    text: "Number of Products Sold by Price Range",
                                },
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    max: 10, // Fixed maximum value for the Y-axis
                                    ticks: {
                                        stepSize: 1, // Interval for the Y-axis
                                    },
                                },
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductTable;
