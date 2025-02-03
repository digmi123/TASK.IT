import { NavLink } from "react-router-dom";
import reactLogo from "@/assets/react.svg";
import Settings from "@/assets/settings.svg?react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useSelector } from "react-redux";
import DesksBar from "./DesksBar";
import Organizations from "@/shared/components/Organizations";
import Divider from "@/shared/components/Divider";

export default function Sidebar() {
  const { desks } = useSelector((state) => state.desks);

  return (
    <ul className="w-[256px]">
      <div id="upper-links" className="flex flex-col gap-4">
        <NavLink className="flex items-center gap-4 w-full">
          <Settings />
          <li className="font-semibold">Boards</li>
        </NavLink>

        <NavLink className="flex items-center gap-4 w-full">
          <Settings />
          <li className="font-semibold">Boards</li>
        </NavLink>

        <Collapsible>
          <CollapsibleTrigger>
            <div className="flex items-center gap-4 w-full">
              <Settings />
              <li className="font-semibold">Settings</li>
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent className="p-4">
            <ul className="flex flex-col gap-4">
              <NavLink className="flex items-center gap-4 w-full">
                <img src={reactLogo} alt="" className="w-6 h-6" />
                <li className="font-semibold">Customize Board</li>
              </NavLink>
              <NavLink className="flex items-center gap-4 w-full">
                <img src={reactLogo} alt="" className="w-6 h-6" />
                <li className="font-semibold">Profile</li>
              </NavLink>
            </ul>
          </CollapsibleContent>
        </Collapsible>
      </div>

      <Divider />
      <DesksBar desks={desks} />
      <Divider />
      <Organizations />
    </ul>
  );
}
