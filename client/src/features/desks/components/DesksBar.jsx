import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Desk from "@/assets/desk.svg?react";

function DesksBar() {
  const { desks, loading } = useSelector((state) => state.desks);

  if (loading) return <p>Loading...</p>;
  if (!desks) return <p>No desks</p>;

  return (
    <div id="desks">
      <h2 className="font-semibold text-xl my-2">My desks</h2>
      <div className="flex flex-col gap-4">
        {desks.map((desk) => (
          <Link key={desk.id} to={`/${desk.id}`}>
            <li className="flex items-center gap-4">
              <div
                id="desk-icon"
                className="bg-primary rounded-md p-1 flex items-center justify-center"
              >
                <Desk style={{ color: "white" }} />
              </div>
              {desk.name}
            </li>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default DesksBar;
