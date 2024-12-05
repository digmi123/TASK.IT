import { Link, NavLink } from "react-router-dom";
import reactLogo from "@/assets/react.svg";
import { useDesks } from "@/shared/providers/DesksProvider";
import Desk from "@/assets/desk.svg?react";

export default function Sidebar() {
  const { desks } = useDesks();

  return (
    <ul className="w-[256px]">
      <div id="upper-links" className="flex flex-col gap-4">
        <NavLink className="flex items-center gap-4 w-full">
          <img src={reactLogo} alt="" className="w-6 h-6" />
          <li className="font-semibold">Boards</li>
        </NavLink>
        <NavLink className="flex items-center gap-4 w-full">
          <img src={reactLogo} alt="" className="w-6 h-6" />
          <li className="font-semibold">Boards</li>
        </NavLink>
        <NavLink className="flex items-center gap-4 w-full">
          <img src={reactLogo} alt="" className="w-6 h-6" />
          <li className="font-semibold">Boards</li>
        </NavLink>
      </div>

      <hr
        id="divider"
        className="w-full h-[1px] bg-slate-300 rounded-md my-4 border-0"
      />

      <div id="desks">
        <h2 className="font-semibold text-xl my-2">My desks</h2>
        <div className="flex flex-col gap-4">
          {desks.map((desk) => (
            <Link key={desk.id} to={`/${desk.id}`}>
              <li className="flex items-center gap-4">
                <div
                  id="desk-icon"
                  className="bg-green-400 rounded-md p-1 flex items-center justify-center"
                >
                  <Desk />
                </div>
                {desk.name}
              </li>
            </Link>
          ))}
        </div>
      </div>
    </ul>
  );
}
