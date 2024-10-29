import { Link, useParams } from "react-router-dom";
import { getOrderDetail } from "../../services/Api";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
const OrderDetail = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const auth = useSelector((state) => state.auth);
  const { _id } = auth?.customer;
  const { id } = useParams();
  //   console.log(_id);

  useEffect(() => {
    getOrderDetail(_id, {})
      .then(({ data }) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, [_id]);
  // console.log(orderDetails);
  return (
    <>
      {/*	Order Details	*/}
      <div id="my-cart">
        <div className="row">
          <div className="cart-nav-item col-lg-7 col-md-7 col-sm-12">Thông tin sản phẩm</div>
          <div className="cart-nav-item col-lg-2 col-md-2 col-sm-12">Số lượng</div>
          <div className="cart-nav-item col-lg-3 col-md-3 col-sm-12">Giá</div>
        </div>
        <form method="post">
          {orderDetails?.map((orderDetail, index) => {
            if (id === orderDetail.id)
              orderDetail.items.map((item, index) => {
                return (
                  <div key={index} className="cart-item row">
                    <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                      <img src="images/product-1.png" />
                      <h4>{item.prd_id}</h4>
                    </div>
                    <div className="cart-quantity col-lg-2 col-md-2 col-sm-12">
                      <p>{item.qty}</p>
                    </div>
                    <div className="cart-price col-lg-3 col-md-3 col-sm-12">
                      <b>300đ</b>
                    </div>
                  </div>
                  // <></>
                );
              });
            return null;
          })}
        </form>
      </div>
      {/*	End Order Details	*/}
      {/*	Customer Info	*/}
      <div id="customer">
        <div className="row">
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <Link to="/Order">
              <b>Về danh sách đơn hàng</b>
            </Link>
          </div>
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <Link to="/">
              <b>Về trang chủ</b>
            </Link>
          </div>
        </div>
      </div>
      {/*	End Customer Info	*/}
    </>
  );
};

export default OrderDetail;
