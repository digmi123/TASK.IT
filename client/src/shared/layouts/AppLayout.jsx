import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import UserProvider from "../providers/UserProvider";
import DesksProvider from "../providers/DesksProvider";

function AppLayout() {
  return (
    <UserProvider>
      <DesksProvider>
        <Navbar />
        <Outlet />
      </DesksProvider>
    </UserProvider>
  );
}

export default AppLayout;
