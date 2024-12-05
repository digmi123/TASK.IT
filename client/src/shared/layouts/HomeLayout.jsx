import Desks from "@/features/screens/Desks";
import Sidebar from "@/features/desks/components/Sidebar";
import Templates from "@/features/desks/components/Templates";
import StarredBoards from "@/features/desks/components/StarredBoards";

function HomeLayout() {
  return (
    <div id="content" className="flex justify-center gap-16 py-8 px-12">
      <Sidebar />
      <div className="flex flex-col gap-6">
        <Templates />
        <StarredBoards />
        <Desks />
      </div>
    </div>
  );
}

export default HomeLayout;
