import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearLogin } from "../../../redux-setup/reducers/auth";
import { customerLogout } from "../../../services/Api";
const Header = () => {
  const [keyword, setKeyword] = useState("");
  const [isLogined, setIsLogined] = useState(null);
  const changeKeyword = (e) => setKeyword(e.target.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login = useSelector((state) => state.auth);
  const id = login.customer?._id;

  const clickSearch = () => navigate(`/Search?keyword=${keyword}`);
  const totalCartItem = useSelector(({ cart }) => cart.items.reduce((total, item) => total + item.qty, 0));
  const checkCustomer = useSelector((state) => state.auth);
  console.log(checkCustomer);

  const clickLogout = (e) => {
    e.preventDefault();
    setIsLogined(null);

    customerLogout(id)
      .then(() => {
        dispatch(clearLogin());
        return navigate("/Login");
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    setIsLogined(checkCustomer.customer);
  }, [checkCustomer]);
  return (
    <>
      <div id="header">
        <div className="container">
          <div className="row">
            <div id="logo" className="col-lg-3 col-md-12 col-sm-12">
              <h1>
                <Link to="/">
                  <img className="img-fluid" src="images/logo.png" />
                </Link>
              </h1>
            </div>
            <div id="search" className="col-lg-4 col-md-12 col-sm-12">
              <form className="form-inline">
                <input
                  onChange={changeKeyword}
                  className="form-control mt-3"
                  type="search"
                  placeholder="Tìm kiếm"
                  aria-label="Search"
                />
                <button onClick={clickSearch} className="btn btn-danger mt-3" type="button">
                  Tìm kiếm
                </button>
              </form>
            </div>
            <div id="cart" className="col-lg-5 col-md-12 col-sm-12">
              <i className="fa-solid fa-user mr-1" />
              {isLogined != null ? (
                <>
                  <Link className="mr-2 ml-2" to="/Customer">
                    {checkCustomer.customer?.fullName} - {checkCustomer.customer?.email} |{" "}
                  </Link>
                  <Link className="mr-2 ml-2" onClick={clickLogout}>
                    {" "}
                    Đăng xuất |{" "}
                  </Link>
                </>
              ) : (
                <>
                  <Link className="mr-2 ml-2" to="/Login">
                    {" "}
                    Đăng nhập |{" "}
                  </Link>
                  <Link className="mr-2 ml-2" to="/Register">
                    đăng ký |{" "}
                  </Link>
                </>
              )}
              <a className="mt-4 mr-2 ml-2" href="#">
                giỏ hàng
                <ul>
                  <li>
                    <Link to="/Cart">
                      <i className="fas fa-shopping-cart" />
                      Giỏ hàng của bạn
                    </Link>
                  </li>
                  <li>
                    <Link to="/Order">
                      <i className="fas fa-file-alt" />
                      Đơn hàng đã mua
                    </Link>
                  </li>
                </ul>
              </a>
              <span className="mt-3">{totalCartItem}</span>
            </div>
          </div>
        </div>
        {/* Toggler/collapsibe Button */}
        <button className="navbar-toggler navbar-light" type="button" data-toggle="collapse" data-target="#menu">
          <span className="navbar-toggler-icon" />
        </button>
      </div>
    </>
  );
};

export default Header;
