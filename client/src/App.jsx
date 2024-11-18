
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./component/DashBoard";
import ProductTable from "./component/ProductTable";
import StatisticsCharts from "./component/StatisticsCharts";
import Navbar from "./component/Navbar";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/product-table" element={<ProductTable />} />
        {/* <Route path="/statistics" element={<StatisticsCharts />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
  
