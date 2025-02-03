import Desks from "@/features/screens/Desks";
import Templates from "@/features/desks/components/Templates";
import StarredBoards from "@/features/desks/components/StarredBoards";
import Sidebar from "@/features/desks/components/Sidebar";

function HomeLayout() {
  return (
    <div id="content" className="flex justify-center gap-16 py-8 px-12">
      <Sidebar />
      <main className="flex flex-col gap-6">
        <Templates />
        <StarredBoards />
        <Desks />
      </main>
    </div>
  );
}

export default HomeLayout;
