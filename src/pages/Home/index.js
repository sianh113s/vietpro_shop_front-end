import { getProducts } from "../../services/Api";
import { useState, useEffect } from "react";
import ProductItem from "../../shared/components/product-item";
import { useSelector } from "react-redux";
const Home = () => {
    const [latestProducts, setLatestProducts] = useState([]);
    const [featureProducts, setFeatureProducts] = useState([]);
    const data = useSelector((state) => state.auth)
    useEffect(() => {
        // Featured 
        getProducts({
            params: {
                limit: 6,
            }
        })
            .then(({ data }) => setFeatureProducts(data.data.docs))
            .catch((error) => console.log(error));
        // Lastest
        getProducts({
            params: {
                limit: 6,
            }
        })
            .then(({ data }) => setLatestProducts(data.data.docs))
            .catch((error) => console.log(error));
    }, [])

    return (
        <>
            {/*	Feature Product	*/}
            <div className="products">
                <h3>Sản phẩm nổi bật</h3>
                <div className="product-list card-deck">
                    {
                        featureProducts.map((item, index) =>
                            <ProductItem key={index} item={item} />
                        )
                    }
                </div>
            </div>
            {/*	End Feature Product	*/}
            <div className="products">
                <h3>Sản phẩm mới</h3>
                <div className="product-list card-deck">
                    {
                        latestProducts.map((item, index) =>
                            <ProductItem key={index} item={item} />)
                    }
                </div>
            </div>
        </>
    );
};

export default Home;
