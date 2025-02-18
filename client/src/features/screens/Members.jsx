import { Outlet } from "react-router-dom";
import CollaboratorsSideBar from "../members/components/CollaboratorsSideBar";
import MembersBoardBar from "../members/components/MembersBoardBar";
import Divider from "@/shared/components/Divider";
import { Hourglass } from "react-loader-spinner";

export default function Members({ members, loading }) {
  if (loading)
    return (
      <Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        colors={["#306cce", "#72a1ed"]}
      />
    );

  return (
    <>
      <MembersBoardBar />
      <Divider />
      <div className="py-8 px-20">
        <h1 className="font-semibold text-2xl my-4">
          Collaboartors <span>{members.length}/10</span>
        </h1>
        <div id="main-container" className="flex flex-col gap-4">
          <CollaboratorsSideBar />
          <Outlet context={{ members }} />
        </div>
      </div>
    </>
  );
}
