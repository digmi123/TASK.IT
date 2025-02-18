import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import SideBar from "@/shared/components/SideBar";

function AppLayout() {
  return (
    <Provider store={store}>
      <div id="app-wrapper" className="h-screen overflow-auto flex flex-col">
        <Navbar />
        <div className="flex gap-16 h-full overflow-auto">
          <SideBar />
          <main className="flex flex-col gap-6 overflow-auto grow pr-4 py-8 px-12">
            <Outlet />
          </main>
        </div>
      </div>
    </Provider>
  );
}

export default AppLayout;
