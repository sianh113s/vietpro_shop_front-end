import { Link, Router, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../services/Api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux-setup/reducers/auth";
import { Navigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dataLogin, setDataLogin] = useState({});
  const [isLogined, setIsLogined] = useState(true);

  const changeInputLogin = (e) => {
    const { name, value } = e.target;
    return setDataLogin({ ...dataLogin, [name]: value });
  };

  const clickLogin = () => {
    const { email, password } = dataLogin;
    if (email && password) {
      loginUser(dataLogin)
        .then(({ data }) => {
          const { accessToken, customer } = data;
          setIsLogined(true);
          dispatch(loginSuccess({ accessToken, customer }));
          return navigate("/");
        })
        .catch((error) => {
          console.log(error);
          setIsLogined(false);
        });
    }
  };

  return (
    <div id="customer">
      {isLogined === false ? (
        <div className="alert alert-danger text-center">Thông tin Email hoặc Password không hợp lệ!</div>
      ) : (
        <></>
      )}
      <h3 className="text-center">Đăng nhập</h3>
      <form method="post">
        <div className="row">
          <div id="customer-mail" className="col-lg-6 col-md-6 col-sm-12">
            <input
              value={dataLogin?.email || ""}
              onChange={changeInputLogin}
              placeholder="Email (bắt buộc)"
              type="text"
              name="email"
              className="form-control"
              required
            />
          </div>
          <div id="customer-pass" className="col-lg-6 col-md-6 col-sm-12">
            <input
              value={dataLogin?.password || ""}
              onChange={changeInputLogin}
              placeholder="Mật khẩu (bắt buộc)"
              type="text"
              name="password"
              className="form-control"
              required
            />
          </div>
        </div>
      </form>
      <div className="row">
        <div className="by-now col-lg-6 col-md-6 col-sm-12">
          <a onClick={clickLogin}>
            <b>Đăng nhập ngay</b>
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

export default Login;
