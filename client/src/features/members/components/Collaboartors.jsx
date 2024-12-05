import CollaboratorsSideBar from "./CollaboratorsSideBar";
import { Outlet } from "react-router-dom";

export default function Collaboartors() {
  return (
    <div className="py-8 px-12">
      <h1 className="font-semibold text-2xl my-4">
        Collaboartors <span>4/10</span>
      </h1>
      <div id="main-container" className="flex gap-4">
        <CollaboratorsSideBar />
        <Outlet />
      </div>
    </div>
  );
}
