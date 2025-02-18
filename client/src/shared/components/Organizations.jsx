import reactLogo from "@/assets/react.svg";
import ParticipantsShortcut from "./ParticipantsShortcut";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Organizations() {
  const [organizations, setOrganizations] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/organizations")
      .then((res) => {
        setOrganizations(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!organizations) return <p>No organizations</p>;

  return (
    <div id="organizations-wrapper">
      <h2 className="font-semibold text-xl my-2">Organizations</h2>
      <ul className="flex flex-col gap-4">
        {organizations.map((organization, index) => (
          <li
            key={`${organization.name}-${index}`}
            className="flex items-center gap-4 justify-between"
          >
            <NavLink
              to={`/organization/${organization.id}`}
              id="left-side"
              className="flex items-center gap-2"
            >
              <img
                src={reactLogo}
                alt=""
                className="w-8 h-8 bg-primary rounded-md p-1 flex items-center justify-center"
              />
              <p className="text-ellipsis w-[100px] overflow-hidden">
                {organization.name}
              </p>
            </NavLink>
            <ParticipantsShortcut participants={organization.members} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Organizations;
