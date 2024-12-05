import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

const activeLinkClasName =
  "bg-red-600 text-white shadow rounded-md font-semibold";
export default function CollaboratorsSideBar() {
  return (
    <ul id="colab-sidebar" className="flex flex-col gap-4">
      <NavLink
        to="workspace"
        className={({ isActive }) =>
          cn("w-max", isActive ? activeLinkClasName : "")
        }
      >
        <li>
          <h3 className="px-4">
            Workspace Members <span>(3)</span>
          </h3>
        </li>
      </NavLink>
      <NavLink
        to="guests"
        className={({ isActive }) => (isActive ? activeLinkClasName : "")}
      >
        <li>
          <h3 className="px-4">
            Guest <span>(3)</span>
          </h3>
        </li>
      </NavLink>
      <NavLink
        to="requests"
        className={({ isActive }) => (isActive ? activeLinkClasName : "")}
      >
        <li>
          <h3 className="px-4">
            Join Requests <span>(0)</span>
          </h3>
        </li>
      </NavLink>
    </ul>
  );
}
