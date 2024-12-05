import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

import arrow from "@/assets/down-arrow.svg";
import logo from "@/assets/logo.svg";
import circle_user from "@/assets/user.svg";
import NewDeskDialog from "@/features/desks/components/NewDeskDialog";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <ul>
      <Menubar>
        <div id="left-side" className="flex items-center gap-4">
          <Link id="logo-section" className="flex items-center gap-2" to="/">
            <img src={logo} alt="logo" className="w-6 h-6" />
            <h1 className="text-2xl font-semibold">TASK.IT</h1>
          </Link>

          <MenubarMenu>
            <MenubarTrigger className="gap-2">
              Workspace
              <img src={arrow} alt="" className="w-6 h-6" />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                New Tab <MenubarShortcut>⌘T</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>New Window</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Share</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Print</MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger className="gap-2">
              Starred
              <img src={arrow} alt="" className="w-6 h-6" />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                New Tab <MenubarShortcut>⌘T</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>New Window</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Share</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Print</MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger className="gap-2">
              Recent
              <img src={arrow} alt="" className="w-6 h-6" />
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                New Tab <MenubarShortcut>⌘T</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>New Window</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Share</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Print</MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <NewDeskDialog />
        </div>

        <MenubarMenu>
          <MenubarTrigger>
            <img src={circle_user} alt="user" className="w-6 h-6" />
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              New Tab <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>New Window</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Share</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Print</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </ul>
    // </div>
  );
}

export default Navbar;
