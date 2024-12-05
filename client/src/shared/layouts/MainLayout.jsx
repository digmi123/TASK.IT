import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

export default function MainLayout() {
  return (
    <div id="main-page" className="grid grid-cols-[200px_1fr]">
      <SideBar />
      <Outlet />
    </div>
  );
}
