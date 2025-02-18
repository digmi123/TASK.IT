import { Input } from "@/components/ui/input";
import NewMemberAvatar from "@/features/members/components/NewMemberAvatar";
import axios from "axios";
import { useEffect, useState } from "react";

function UsersSearch() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/api/users/get_users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <div id="new-members-section" className="flex flex-col gap-4">
      <div id="new-members-header" className="flex items-center gap-4">
        <h2 className="text-2xl font-semibold">Add Members</h2>
        <Input
          type="text"
          placeholder="Search"
          name="member_name"
          className="w-fit"
        />
      </div>
      <div id="new-members-wrapper" className="flex gap-4 overflow-x-auto">
        {users.map((user) => (
          <div
            id="user-wrapper"
            className="flex flex-col items-center gap-1"
            key={user.id}
          >
            <NewMemberAvatar user={user} />
            <p className="text-center">{user.name || "User"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UsersSearch;
