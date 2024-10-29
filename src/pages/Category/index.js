import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProductsCategory, getCategory } from "../../services/Api";
import ProductItem from "../../shared/components/product-item";
const Category = () => {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState({});
    const [total, setTotal] = useState(0) ;
    useEffect(() => {
        // get Category
        getCategory(id, {})
            .then(({ data })=> setCategory(data.data))
            .catch((error)=> console.log(error));
        // get ProductCategory
        getProductsCategory(id, {})
            .then(({ data }) => {
                setTotal(data.data.pages.total)
                setProducts(data.data.docs)
            })
            .catch((error) => console.log(error));
    }, [id])
    return (
        <>
            <div className="products">
                <h3>{category?.name} (hiện có {total} sản phẩm)</h3>
                <div className="product-list card-deck">
                    {
                        products.map((product, index) =>
                            <ProductItem key={index} item={product} />
                        )
                    }
                </div>
            </div>
            {/*	End List Product	*/}
            <div id="pagination">
                <ul className="pagination">
                    <li className="page-item"><a className="page-link" href="#">Trang trước</a></li>
                    <li className="page-item active"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#">Trang sau</a></li>
                </ul>
            </div>
        </>
    );
};

export default Category;
