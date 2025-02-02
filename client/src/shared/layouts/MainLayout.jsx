import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

export default function MainLayout() {
  return (
    <div id="main-page" className="flex overflow-auto h-full">
      <SideBar />
      <Outlet />
    </div>
  );
}
