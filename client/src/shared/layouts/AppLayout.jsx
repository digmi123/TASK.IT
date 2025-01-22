import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

function AppLayout() {
  return (
    <Provider store={store}>
      <Navbar />
      <Outlet />
    </Provider>
  );
}

export default AppLayout;
