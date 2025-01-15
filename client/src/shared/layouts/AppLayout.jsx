import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import UserProvider from "../providers/UserProvider";
import DesksProvider from "../providers/DesksProvider";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

function AppLayout() {
  return (
    <UserProvider>
      <Provider store={store}>
        <DesksProvider>
          <Navbar />
          <Outlet />
        </DesksProvider>
      </Provider>
    </UserProvider>
  );
}

export default AppLayout;
