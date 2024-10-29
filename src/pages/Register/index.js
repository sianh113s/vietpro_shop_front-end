import { useState } from "react";
import { registerUser } from "../../services/Api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Register = () => {
  const [inputValue, setInputValue] = useState({});
  const [isRegisted, setIsRegisted] = useState(true);
  const [isUsers, setIsUsers] = useState(null);
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const changeRegisterValue = (e) => {
    const { name, value } = e.target;
    return setInputValue({ ...inputValue, [name]: value });
  };
  const clickRegister = (e) => {
    e.preventDefault();
    registerUser(inputValue)
      .then(({ data }) => {
        if (data === "create customer successfully") return navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        setIsRegisted(false);
      });
  };

  return (
    <div id="customer">
      {isRegisted === true ? (
        <></>
      ) : (
        <div className="alert alert-danger text-center">Thông tin Username hoặc Email đã tồn tại!</div>
      )}
      <h3 className="text-center">Đăng ký</h3>
      <form method="post">
        <div className="row">
          <div id="customer-name" className="col-lg-6 col-md-6 col-sm-12">
            <input
              onChange={changeRegisterValue}
              placeholder="Họ và tên (bắt buộc)"
              type="text"
              name="fullName"
              className="form-control"
              required
            />
          </div>
          <div id="customer-pass" className="col-lg-6 col-md-6 col-sm-12">
            <input
              onChange={changeRegisterValue}
              placeholder="Mật khẩu (bắt buộc)"
              type="text"
              name="password"
              className="form-control"
              required
            />
          </div>
          <div id="customer-mail" className="col-lg-6 col-md-6 col-sm-12">
            <input
              onChange={changeRegisterValue}
              placeholder="Email (bắt buộc)"
              type="text"
              name="email"
              className="form-control"
              required
            />
          </div>
          <div id="customer-phone" className="col-lg-6 col-md-6 col-sm-12">
            <input
              onChange={changeRegisterValue}
              placeholder="Số điện thoại (bắt buộc)"
              type="text"
              name="phone"
              className="form-control"
              required
            />
          </div>
          <div id="customer-add" className="col-lg-12 col-md-12 col-sm-12">
            <input
              onChange={changeRegisterValue}
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
          <a onClick={clickRegister} href="#">
            <b>Đăng ký ngay</b>
          </a>
        </div>
        <div className="by-now col-lg-6 col-md-6 col-sm-12">
          <Link to="/">
            <b>Quay về trang chủ</b>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
