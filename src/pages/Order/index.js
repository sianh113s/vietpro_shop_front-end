import { useEffect, useState } from "react";
import { getOrder } from "../../services/Api";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
const Order = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const auth = useSelector((state) => state.auth);
  const { _id } = auth?.customer;

  console.log(auth);

  useEffect(() => {
    getOrder(_id, {})
      .then(({ data }) => setOrders(data.data.docs))
      .catch((error) => console.log(error));
  }, [_id]);
  return (
    <div id="my-cart">
      <div className="row">
        <div className="cart-nav-item col-lg-7 col-md-7 col-sm-12">Đơn hàng của bạn</div>
        <div className="cart-nav-item col-lg-5 col-md-5 col-sm-12">Tổng tiền</div>
      </div>
      <form method="post">
        {orders?.map((order, index) => {
          let button = <></>;
          let status = "";
          if (order.status === 2) {
            status = "alert-success";
            button = (
              <>
                <button type="button" class="btn btn-success mb-1">
                  Đơn đã giao
                </button>
              </>
            );
          }
          if (order.status === 0) {
            status = "alert-danger";
            button = (
              <>
                <button type="button" class="btn btn-danger mb-1">
                  Đơn đã hủy
                </button>
              </>
            );
          }
          if (order.status === 1) {
            status = "";
            button = (
              <>
                <button type="button" class="btn btn-outline-danger mb-1">
                  Huỷ đơn
                </button>
                <button type="button" class="btn btn-outline-success mb-1">
                  Đơn đang giao
                </button>
              </>
            );
          }
          return (
            <div key={index} className="cart-item row alert-success">
              <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                <h4>
                  Đơn hàng đã mua vào ngày: <span className="text-secondary">{order.createdAt}</span>
                </h4>
                <p>Mã Đơn (MĐ): {order._id}</p>
              </div>
              <div className="cart-price col-lg-2 col-md-2 col-sm-12">
                <b>{order.totalPrice}đ</b>
              </div>
              <div className="cart-quantity col-lg-3 col-md-3 col-sm-12">
                <button onClick={() => navigate("/OrderDetail")} type="button" className="btn btn-outline-dark mb-1">
                  Chi tiết đơn hàng
                </button>
                {button}
              </div>
            </div>
          );
        })}
        <div className="row">
          <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
            <button onClick={() => navigate("/")} id="update-cart" className="btn btn-success" type="submit" name="sbm">
              Quay về trang chủ
            </button>
          </div>
          <div className="col-lg-5 col-md-5 col-sm-12">
            <ul className="pagination mt-4">
              <li className="page-item disabled">
                <span className="page-link">Trang trước</span>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item active" aria-current="page">
                <span className="page-link">2</span>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Trang sau
                </a>
              </li>
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Order;
