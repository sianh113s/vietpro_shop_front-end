import Http from "./Http";

export const getProducts = (config) => Http.get("/products", config);
export const getCategories = (config) => Http.get("/categories", config);
export const getProductsCategory = (id, config) => Http.get(`categories/${id}/products`, config);
export const getCategory = (id, config) => Http.get(`/categories/${id}`, config);
export const getProduct = (id, config) => Http.get(`/products/${id}`, config);
export const getCommentsProduct = (id, config) => Http.get(`/products/${id}/comments`, config);
export const createCommentProduct = (id, data) => Http.post(`/products/${id}/comments`, data);
export const order = (data) => Http.post("/order", data);
export const getBanner = (config) => Http.get("/banners", config);
export const getSlider = (config) => Http.get("/sliders", config);
export const registerUser = (data) => Http.post("/customers/register", data);
export const loginUser = (data) => Http.post("/customers/login", data);
export const postOrder = (data) => Http.post("/order", data);
export const getOrder = (id, config) => Http.get(`/customers/${id}/orders`);
export const updateCustomer = (id, data) => Http.post(`/customers/${id}/update`, data);
export const customerLogout = (id) => Http.get(`/customers/${id}/logout`);
export const getOrderDetail = (id) => Http.get(`/customer/orders/${id}`);
