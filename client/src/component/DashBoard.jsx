import React from 'react';
import '../App.css'; 
import ProductTable from './ProductTable';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="content">
        <div>
        <h1 className='dashboard-title' style={{fontSize:48}}>Welcome to the Dashboard</h1>
        <Link className='dashboard-link' to={'/product-table'}>Click here for Product Table Page </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
