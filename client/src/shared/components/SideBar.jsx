import { NavLink, useParams } from "react-router-dom";
import reactLogo from "../../assets/react.svg";
function SideBar() {
  const { id: boardId } = useParams();

  return (
    <nav className="h-screen text-card-foreground border shadow rounded-md">
      <ul className="flex flex-col gap-4 p-4">
        <li>
          <a href="/" className="flex items-center gap-4">
            <img src={reactLogo} alt="logo" className="w-6 h-6" />
            <h3 className="font-medium">My Boards</h3>
          </a>
        </li>
        <li>
          <NavLink
            to={`board/${boardId}/members/workspace`}
            className="flex items-center gap-4"
          >
            <img src={reactLogo} alt="logo" className="w-6 h-6" />
            <h3 className="font-medium">Members</h3>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default SideBar;
