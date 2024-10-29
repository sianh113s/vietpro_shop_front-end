import { useState, useEffect } from "react";
import { getImageProduct } from "../../shared/ultils";
import { createCommentProduct, getProduct } from "../../services/Api";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCommentsProduct } from "../../services/Api";
import moment from "moment";
import { addToCard } from "../../redux-setup/reducers/cart";
const ProductDetails = () => {
    const [inputsComment, setInputsComment] = useState({});
    const [product, setProduct] = useState([]);
    const [comments, setComments] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate() ;
    const dispatch = useDispatch() ;
    const changeInputsComment = (e) => {
        const { name, value } = e.target;
        // console.log(inputsComment);
        return setInputsComment({ ...inputsComment, [name]: value });
    }
    const clickAddToCart = (type)=> {
        dispatch(addToCard({
            _id: id,
            name: product.name,
            image: product.image,
            price: product.price,
            qty: 1,
        }))
        if( type === "buy-now") return navigate("/Cart") ;
    }
    const clickComment = () => {
        createCommentProduct(id, inputsComment)
            .then(({ data }) => {
                if (data.status === "success") {
                    setInputsComment({})
                    getComments(id);
                }
            })
            .catch((error) => console.log(error));
    }
    const getComments = (id) => {
        // create comment
        createCommentProduct(id, inputsComment)
            .then(({ data }) => setInputsComment(data.data.docs))
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        getCommentsProduct(id, {})
            .then(({ data }) => setComments(data.data.docs))
            .catch((error) => console.log(error));
        getProduct(id, {})
            .then(({ data }) => setProduct(data.data))
            .catch((error) => console.log(error));
        getComments(id);
    }, [])
    return (
        <>
            <div id="product">
                <div id="product-head" className="row">
                    <div id="product-img" className="col-lg-6 col-md-6 col-sm-12">
                        <img src={getImageProduct(product.image)} />
                    </div>
                    <div id="product-details" className="col-lg-6 col-md-6 col-sm-12">
                        <h1>{product?.name}</h1>
                        <ul>
                            <li><span>Bảo hành:</span> 12 Tháng</li>
                            <li><span>Đi kèm:</span>{product?.accessories}</li>
                            <li><span>Tình trạng:</span> {product?.status}</li>
                            <li><span>Khuyến Mại:</span> Dán Màn Hình 3 lớp</li>
                            <li id="price">Giá Bán (chưa bao gồm VAT)</li>
                            <li id="price-number">{product?.price}</li>
                            <li id="status" className={product?.is_stock ? "" : "text-danger"} >{product?.is_stock ? "Còn hàng" : "Hết Hàng"}</li>
                        </ul>
                        <div id="add-cart">
                            <button onClick={()=> clickAddToCart("buy-now")} className="btn btn-warning mr-2">
                                Mua ngay
                            </button>

                            <button onClick={clickAddToCart} className="btn btn-info">
                                Thêm vào giỏ hàng
                            </button>
                        </div>


                    </div>
                </div>
                <div id="product-body" className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <h3>Đánh giá về {product.name}</h3>
                        {product.details}
                    </div>
                </div>
                {/*	Comment	*/}
                <div id="comment" className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <h3>Bình luận sản phẩm</h3>
                        <form method="post">
                            <div className="form-group">
                                <label>Tên:</label>
                                <input onChange={changeInputsComment}
                                    name="name"
                                    required
                                    type="text"
                                    className="form-control"
                                    value={inputsComment.name || ""} />
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input onChange={changeInputsComment}
                                    name="email"
                                    required
                                    type="email"
                                    className="form-control"
                                    id="pwd"
                                    value={inputsComment.email || ""} />
                            </div>
                            <div className="form-group">
                                <label>Nội dung:</label>
                                <textarea onChange={changeInputsComment}
                                    name="content"
                                    required
                                    rows={8}
                                    className="form-control"
                                    value={inputsComment.content || ""} />
                            </div>
                            <button onClick={clickComment} type="button" name="sbm" className="btn btn-primary">Gửi</button>
                        </form>
                    </div>
                </div>
                {/*	End Comment	*/}
                {/*	Comments List	*/}
                <div id="comments-list" className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">

                        {

                            comments.map((comment, index) => {
                                let m = moment(comment.createdAt);
                                return (
                                    <div key={index} className="comment-item">
                                        <ul>
                                            <li><b>{comment.name}</b></li>
                                            <li>{m.fromNow()}</li>
                                            <li>
                                                <p>{comment.content}</p>
                                            </li>
                                        </ul>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
                {/*	End Comments List	*/}
            </div>
            {/*	End Product	*/}
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
}

export default ProductDetails;