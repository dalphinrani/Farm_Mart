import { Routes, Route } from "react-router-dom";
// User Pages
import Home from "./pages/user/Home";
import CategoryProducts from "./pages/user/CategoryProducts";
import ProductDetails from "./pages/user/ProductDetails";
import Cart from "./pages/user/Cart";
import Wishlist from "./pages/user/Wishlist";
import Checkout from "./pages/user/Checkout";
import OrderSuccess from "./pages/user/OrderSuccess";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import Orders from "./pages/user/Orders";
import TrackOrder from "./pages/user/TrackOrder";
import Profile from "./pages/user/Profile";
import About from "./pages/user/About";
import HelpSupport from "./pages/user/HelpSupport";
// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import Categories from "./pages/admin/Categories";
import AdminOrders from "./pages/admin/Orders";
import Users from "./pages/admin/Users";
import Settings from "./pages/admin/Settings";
import AdminLogin from "./pages/admin/Login";

function App() {
  return (
    <Routes>
      {/* User Routes */}
      <Route path="/" element={<Home />} />

      {/* Products Route */}
      <Route
        path="/products"
        element={<CategoryProducts />}
      />
<Route
  path="/category/:name"
  element={<CategoryProducts />}
/>
<Route
  path="/help-support"
  element={<HelpSupport />}
/>


      <Route
        path="/product/:id"
        element={<ProductDetails />}
      />

<Route
  path="/cart"
  element={<Cart />}
/>

     <Route
  path="/wishlist"
  element={<Wishlist />}
/>

      <Route
  path="/checkout"
  element={<Checkout />}
/>

      <Route
        path="/order-success"
        element={<OrderSuccess />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
  path="/orders"
  element={<Orders />}
/>

      <Route
  path="/track-order"
  element={<TrackOrder />}
/>
<Route path="/about" element={<About />} />

      {/* Admin Routes */}
      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />

      <Route
  path="/admin/dashboard"
  element={<Dashboard />}
/>

      <Route
        path="/admin/products"
        element={<Products />}
      />

      <Route
        path="/admin/add-product"
        element={<AddProduct />}
      />

      <Route
        path="/admin/edit-product/:id"
        element={<EditProduct />}
      />

      <Route
        path="/admin/categories"
        element={<Categories />}
      />

      <Route
        path="/admin/orders"
        element={<AdminOrders />}
      />

      <Route
        path="/admin/users"
        element={<Users />}
      />

      <Route
        path="/admin/settings"
        element={<Settings />}
      />

      <Route
  path="/profile"
  element={<Profile />}
/>

      {/* 404 */}
      <Route
        path="*"
        element={
          <div className="flex items-center justify-center h-screen">
            <h1>404 - Page Not Found</h1>
          </div>
        }
      />
    </Routes>
  );
}

export default App;