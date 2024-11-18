import '../App.css'
import { Link } from 'react-router-dom';


function Navbar() {
    return (
    
            <nav className="sidebar">
               <Link to='/'> <h2>Dashboard</h2> </Link>
            </nav>
    
    )
}

export default Navbar