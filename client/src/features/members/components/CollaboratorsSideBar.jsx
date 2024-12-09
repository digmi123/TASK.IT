import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { sideBarRoutes } from "../consts";

const activeLinkClasName =
  "bg-primary text-white shadow rounded-md font-semibold";
export default function CollaboratorsSideBar() {
  return (
    <ul id="colab-sidebar" className="flex flex-col gap-4">
      {sideBarRoutes.map((route) => (
        <NavLink
          key={route.name}
          to={route.path}
          className={({ isActive }) =>
            cn("min-w-48", isActive ? activeLinkClasName : "")
          }
        >
          <li>
            <h3 className="px-2 py-2">{route.name}</h3>
          </li>
        </NavLink>
      ))}
    </ul>
  );
}
