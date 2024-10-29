import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../../services/Api";
import ProductItem from "../../shared/components/product-item";
import Pagination from "../../shared/components/Pagination";
const Search = () => {
    const limit = 9 ;
    const [products, setProducts] = useState([]) ;
    const [pages, setPages] = useState({
        limit ,
    })
    const [searchParams, setSearchParams] = useSearchParams() ;
    const keyword = searchParams.get("keyword") ;
    const page = searchParams.get("page") || 1 ;
    useEffect(()=>{
        getProducts({
            params: {
                name: keyword,
                limit,
                page ,
            }
        })
        .then(({ data })=> {
            setProducts(data.data.docs) ;
            setPages({...pages, ...data.data.pages}) ;
        })
        .catch((error)=> console.log(error))
    }, [keyword, page])
    return (
        <>
            <div className="products">
                <div id="search-result">Kết quả tìm kiếm với sản phẩm <span>{keyword}</span></div>
                <div className="product-list card-deck">
                    {
                        products?.map((product, index)=> 
                            <ProductItem key={index} item={product}/>
                        )
                    }
                </div>
            </div>
            {/*	End List Product	*/}
            <Pagination pages={pages} />
        </>
    );
}

export default Search;