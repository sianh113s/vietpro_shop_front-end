import { useState } from "react";
import { updateCustomer } from "../../services/Api";
import { useSelector } from "react-redux";
const Customer = () => {
  const [inputCustomers, setInputCustomers] = useState({});
  const customer = useSelector(({ auth }) => auth.customer);
  const customerId = customer?._id;
  return (
    <>
      {/*	Register Form	*/}
      <div id="customer">
        <div className="alert alert-danger text-center">Thông tin Username hoặc Email đã tồn tại!</div>
        <h3 className="text-center">Đăng ký</h3>
        <form method="post">
          <div className="row">
            <div id="customer-name" className="col-lg-6 col-md-6 col-sm-12">
              <input
                placeholder="Họ và tên (bắt buộc)"
                type="text"
                name="fullName"
                className="form-control"
                value={inputCustomers?.fullName || ""}
                required
              />
            </div>
            <div id="customer-pass" className="col-lg-6 col-md-6 col-sm-12">
              <input
                disabled
                placeholder="Mật khẩu (bắt buộc)"
                type="pastword"
                name="password"
                className="form-control"
                required
                value={inputCustomers?.password}
              />
            </div>
            <div id="customer-mail" className="col-lg-6 col-md-6 col-sm-12">
              <input
                disabled
                placeholder="Email (bắt buộc)"
                type="text"
                name="email"
                className="form-control"
                required
                value={inputCustomers?.email}
              />
            </div>
            <div id="customer-phone" className="col-lg-6 col-md-6 col-sm-12">
              <input
                placeholder="Số điện thoại (bắt buộc)"
                type="text"
                name="phone"
                className="form-control"
                value={inputCustomers?.phone}
                required
              />
            </div>
            <div id="customer-add" className="col-lg-12 col-md-12 col-sm-12">
              <input
                placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)"
                type="text"
                name="address"
                className="form-control"
                value={inputCustomers?.address}
                required
              />
            </div>
          </div>
        </form>
        <div className="row">
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <a href="#">
              <b>Sửa thông tin</b>
            </a>
          </div>
          <div className="by-now col-lg-6 col-md-6 col-sm-12">
            <a href="#">
              <b>Quay về trang chủ</b>
            </a>
          </div>
        </div>
      </div>
      {/*	End Register Form	*/}
    </>
  );
};

export default Customer;
