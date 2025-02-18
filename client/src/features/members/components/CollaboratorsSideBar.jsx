import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { sideBarRoutes } from "../consts";

const activeLinkClasName = "bg-primary text-white shadow-sm";
const LinkClassName = "border-primary border-2 text-primary";

export default function CollaboratorsSideBar() {
  return (
    <div id="colab-sidebar" className="flex gap-4">
      {sideBarRoutes.map((route) => (
        <NavLink
          key={route.name}
          to={route.path}
          className={({ isActive }) =>
            cn(
              "min-w-48 rounded-md p-2 flex items-center font-semibold",
              isActive ? activeLinkClasName : LinkClassName
            )
          }
        >
          {route.name}
        </NavLink>
      ))}
    </div>
  );
}
