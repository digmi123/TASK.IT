import { Button } from "@/components/ui/button";
import Card from "./components/Card";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export default function BoardCard({ boardInfo, id }) {
  const { user } = useSelector((state) => state.user);

  return (
    <Card>
      <Link id="board-card" to={`/board/${id}`}>
        {/* <img src={reactLogo} alt="" /> */}
        <div id="img-section" className="bg-slate-900 h-[100px]" />
        <div id="board-content" className="p-4 flex flex-col gap-3">
          <h3 className="">{boardInfo.name}</h3>
          <div
            id="board-action-buttons"
            className="flex items-center gap-4 justify-between"
          >
            <Button variant="secondary">Edit Board</Button>
            {user.id === boardInfo.owner_id && <Button>Delete</Button>}
          </div>
        </div>
      </Link>
    </Card>
  );
}
