import { Outlet } from "react-router";
import Home from "../Home/Home";

const Root = () => {
  return (
    <div>
      <Home></Home>
      <Outlet></Outlet>
    </div>
  );
};

export default Root;
