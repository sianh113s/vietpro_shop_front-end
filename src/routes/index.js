import Home from "../pages/Home";
import Category from "../pages/Category";
import Cart from "../pages/Cart";
import NotFound from "../pages/NotFound";
import ProductDetails from "../pages/ProductDetails";
import Search from "../pages/Search";
import Success from "../pages/Success";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Order from "../pages/Order";
import OrderDetail from "../pages/OrderDetail";
import Customer from "../pages/Customer";
const Routes = [
  {
    path: "/",
    element: Home,
  },
  {
    path: "/Category-:id",
    element: Category,
  },
  {
    path: "/Cart",
    element: Cart,
  },
  {
    path: "/ProductDetails-:id",
    element: ProductDetails,
  },
  {
    path: "/Search",
    element: Search,
  },
  {
    path: "/Success",
    element: Success,
  },
  {
    path: "/Register",
    element: Register,
  },
  {
    path: "/Login",
    element: Login,
  },
  {
    path: "/Order",
    element: Order,
  },
  {
    path: "/OrderDetail",
    element: OrderDetail,
  },
  {
    path: "Customer",
    element: Customer,
  },
  {
    path: "*",
    element: NotFound,
  },
];
export default Routes;
