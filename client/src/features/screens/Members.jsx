import { Outlet } from "react-router-dom";
import CollaboratorsSideBar from "../members/components/CollaboratorsSideBar";
import MembersBoardBar from "../members/components/MembersBoardBar";
import { useDeskMembers } from "../members/hooks/useDeskMembers";
import Divider from "@/shared/components/Divider";

export default function Members() {
  const { members } = useDeskMembers();
  return (
    <div className="p-6">
      <MembersBoardBar />
      <Divider />
      {/* <Collaboartors /> */}
      <div className="py-8 px-20">
        <h1 className="font-semibold text-2xl my-4">
          Collaboartors <span>{members.length}/10</span>
        </h1>
        <div id="main-container" className="flex gap-4">
          <CollaboratorsSideBar />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
