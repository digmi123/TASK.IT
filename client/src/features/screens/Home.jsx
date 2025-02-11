import Desks from "@/features/desks/components/Desks";
import Templates from "@/features/desks/components/Templates";
import StarredBoards from "@/features/desks/components/StarredBoards";

function Home() {
  return (
    <>
      <Templates />
      <StarredBoards />
      <Desks />
    </>
  );
}

export default Home;
