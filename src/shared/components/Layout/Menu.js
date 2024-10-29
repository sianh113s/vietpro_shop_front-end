import { useState, useEffect } from "react";
import { getCategories } from "../../../services/Api";
import { Link } from "react-router-dom";
const Menu = () => {
    const [categories, setCategories] = useState([]) ;
    useEffect(()=>{
        getCategories({})
            .then(({ data })=> setCategories(data.data.docs)) 
            .catch((error)=> console.log(error)) ;
    },[])

    return (
        <>
            <nav>
                <div id="menu" className="collapse navbar-collapse">
                    <ul>
                        {
                            categories.map((category, index)=>
                                <li key={index} className="menu-item">
                                    <Link to={`Category-${category._id}`}>{category.name}</Link>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Menu;