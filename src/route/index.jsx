import { Route, Routes } from "react-router-dom";
import Dashbroad from "../views/Dashbroad";
import Customers from "../views/Customers";
import Orders from "../views/Orders";
import Inventory from "../views/Inventory";
function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Dashbroad />}></Route>
      <Route path="/Customers" element={<Customers />}></Route>
      <Route path="/Orders" element={<Orders />}></Route>
      <Route path="/Inventory" element={<Inventory />}></Route>
    </Routes>
  );
}
export default AppRouter;
