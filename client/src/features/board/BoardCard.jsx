import { Button } from "@/components/ui/button";
import Card from "./components/Card";
import { Link } from "react-router-dom";
export default function BoardCard({ boardInfo, id }) {
  console.log({ boardInfo });

  return (
    <Card>
      <Link id="board-card" to={`/board/${id}`}>
        {/* <img src={reactLogo} alt="" /> */}
        <div id="img-section" className="bg-slate-900 h-[100px]" />
        <div id="board-content" className="p-4 flex flex-col gap-3">
          <h3 className="">{boardInfo.name}</h3>
          <Button variant="secondary">Edit Board</Button>
        </div>
      </Link>
    </Card>
  );
}
