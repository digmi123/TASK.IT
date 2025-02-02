import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

function AppLayout() {
  return (
    <Provider store={store}>
      <div id="app-wrapper" className="h-screen overflow-auto flex flex-col">
        <Navbar />
        <Outlet />
      </div>
    </Provider>
  );
}

export default AppLayout;
