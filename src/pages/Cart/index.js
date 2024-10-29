import { useSelector } from "react-redux";
import { getImageProduct } from "../../shared/ultils";
import { useDispatch } from "react-redux";
import { updateItemCard, deleteItemCard, clearCart } from "../../redux-setup/reducers/cart";
import { useEffect, useState } from "react";
import { order } from "../../services/Api";
import { useNavigate } from "react-router-dom";
import auth from "../../redux-setup/reducers/auth";
const Cart = () => {
  const [inputsOrder, setInputsOrder] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const itemsCard = useSelector(({ cart }) => cart.items);
  const customer = useSelector(({ auth }) => auth.customer);
  console.log(customer);

  const totalPrice = itemsCard.reduce((total, item) => total + item.qty * item.price, 0);

  const changeInputsOrder = (e) => {
    const { name, value } = e.target;
    return setInputsOrder({ ...inputsOrder, [name]: value });
  };
  const clickOrder = (e) => {
    e.preventDefault();
    const newDataCustomer = {
      customer_id: customer?._id,
      fullName: customer?.fullName,
      email: customer?.email,
      phone: customer?.phone,
      address: customer?.address,
    };
    const newItemsCart = itemsCard.map((item) => ({
      prd_id: item._id,
      price: item.price,
      qty: item.qty,
    }));
    console.log({
      ...newDataCustomer,
      totalPrice: totalPrice,
      items: newItemsCart,
    });

    order({
      ...newDataCustomer,
      totalPrice: totalPrice,
      items: newItemsCart,
    })
      .then(({ data }) => {
        console.log(data);

        if (data.status === "success") {
          dispatch(clearCart());
          return navigate("/Success");
        }
      })
      .catch((error) => console.log(error));
  };
  const changeQty = (e, id) => {
    const value = Number(e.target.value);
    if (value === 0) {
      // eslint-disable-next-line no-restricted-globals
      const isConfirm = confirm("Bạn muốn xóa sản phẩm khỏi giỏ hàng không");
      return isConfirm ? dispatch(deleteItemCard({ _id: id })) : false;
    } else {
      return dispatch(updateItemCard({ _id: id, qty: value }));
    }
  };
  const clickDeleteItemCard = (e, id) => {
    e.preventDefault();
    // eslint-disable-next-line no-restricted-globals
    const isConfirm = confirm("Bạn muốn xóa sản phẩm khỏi giỏ hàng không");
    return isConfirm ? dispatch(deleteItemCard({ _id: id })) : false;
  };

  return (
    <>
      <div id="my-cart">
        <div className="row">
          <div className="cart-nav-item col-lg-7 col-md-7 col-sm-12">Thông tin sản phẩm</div>
          <div className="cart-nav-item col-lg-2 col-md-2 col-sm-12">Tùy chọn</div>
          <div className="cart-nav-item col-lg-3 col-md-3 col-sm-12">Giá</div>
        </div>
        <form method="post">
          {itemsCard?.map((item, index) => (
            <div key={index} className="cart-item row">
              <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                <img src={getImageProduct(item.image)} />
                <h4>{item.name}</h4>
              </div>
              <div className="cart-quantity col-lg-2 col-md-2 col-sm-12">
                <input
                  onChange={(e) => changeQty(e, item._id)}
                  type="number"
                  id="quantity"
                  className="form-control form-blue quantity"
                  value={item.qty}
                />
              </div>
              <div className="cart-price col-lg-3 col-md-3 col-sm-12">
                <b>{item.qty * item.price}đ</b>
                <a onClick={(e) => clickDeleteItemCard(e, item._id)} href="#">
                  Xóa
                </a>
              </div>
            </div>
          ))}
          <div className="row">
            <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
              <button id="update-cart" className="btn btn-success" type="submit" name="sbm">
                Cập nhật giỏ hàng
              </button>
            </div>
            <div className="cart-total col-lg-2 col-md-2 col-sm-12">
              <b>Tổng cộng:</b>
            </div>
            <div className="cart-price col-lg-3 col-md-3 col-sm-12">
              <b>{totalPrice}đ</b>
            </div>
          </div>
        </form>
      </div>
      {/*	End Cart	*/}
      {/*	Customer Info	*/}
      <div id="customer">
        <form method="post">
          <div className="row">
            <div id="customer-name" className="col-lg-4 col-md-4 col-sm-12">
              <input
                onChange={changeInputsOrder}
                placeholder="Họ và tên (bắt buộc)"
                type="text"
                name="fullName"
                className="form-control"
                required
              />
            </div>
            <div id="customer-phone" className="col-lg-4 col-md-4 col-sm-12">
              <input
                onChange={changeInputsOrder}
                placeholder="Số điện thoại (bắt buộc)"
                type="text"
                name="phone"
                className="form-control"
                required
              />
            </div>
            <div id="customer-mail" className="col-lg-4 col-md-4 col-sm-12">
              <input
                onChange={changeInputsOrder}
                placeholder="Email (bắt buộc)"
                type="text"
                name="email"
                className="form-control"
                required
              />
            </div>
            <div id="customer-add" className="col-lg-12 col-md-12 col-sm-12">
              <input
                onChange={changeInputsOrder}
                placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)"
                type="text"
                name="address"
                className="form-control"
                required
              />
            </div>
          </div>
        </form>
        <div className="row">
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <a onClick={(e) => clickOrder(e)} href="#">
              <b>Mua ngay</b>
              <span>Giao hàng tận nơi siêu tốc</span>
            </a>
          </div>
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <a href="#">
              <b>Trả góp Online</b>
              <span>Vui lòng call (+84) 0988 550 553</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
