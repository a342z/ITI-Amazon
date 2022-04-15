import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext, useEffect } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import ProductList from "./pages/productList/productList";
import NewProduct from "./pages/newProduct/NewProduct";
import Product from "./pages/product/Product";
import OrdersList from "./pages/ordersList/OrdersList";
import UsersList from "./pages/usersList/UsersList";
import NewUser from "./pages/newUser/NewUser";
import User from "./pages/user/User";
import Order from "./pages/order/Order";
function App() {
  const { darkMode } = useContext(DarkModeContext);
  let isAdmin =
    JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
      .currentUser?.data.role == "admin";

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            {isAdmin && (
              <>
                <Route index element={<Home />} />

                <Route path="users">
                  {/* <Route index element={<List />} /> */}
                  <Route index element={<UsersList />} />
                  <Route path=":userId" element={<User />} />
                  <Route path="new" element={<NewUser />} />
                  {/* <Route
                    path="new"
                    element={<New inputs={userInputs} title="Add New User" />}
                  /> */}
                </Route>



                <Route path="products">
                  {/* <Route index element={<List />} /> */}
                  <Route index element={<ProductList />} />
                  <Route path=":productId" element={<Product />} />
                  <Route path="new" element={<NewProduct />} />
                </Route>

                <Route path="orders">
                  {/* <Route index element={<List />} /> */}
                  <Route index element={<OrdersList />} />
                  <Route path=":orderId" element={<Order />} />
                  {/* <Route path="new" element={<NewProduct />} /> */}
                </Route>
              </>
            )}
            {!isAdmin && (
              <Route path="" element={<Navigate to="/login" replace />} />
            )}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
