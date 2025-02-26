import { createBrowserRouter, Outlet } from "react-router-dom";
import Board from "../../features/screens/Board";
import Boards from "@/features/screens/Boards";
import Login from "@/features/screens/Login";
import Register from "@/features/screens/Register";
import CollabMain from "@/features/members/components/CollabMain";
import Guests from "@/features/members/components/Guests";
import Desks from "@/features/screens/Desks";
import Home from "../../features/screens/Home";
import AppLayout from "../layouts/AppLayout";
import Organization from "@/features/organizations/components/Organization";
import DeskMembers from "@/features/desks/components/DeskMembers";
import OrganizationParticipant from "@/features/organizations/components/OrganizationMembers";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "desks",
        element: <Desks />,
      },
      {
        path: "/organization/:organizationId",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <Organization />,
          },
          {
            path: "members",
            element: <OrganizationParticipant />,
            children: [
              {
                path: "workspace",
                element: <CollabMain />,
              },
              {
                path: "guests",
                element: <Guests />,
              },
              {
                path: "requests",
                element: <h1>Requests</h1>,
              },
            ],
          },
        ],
      },
      {
        path: ":deskId",
        element: <Boards />,
      },
      {
        path: ":deskId/:boardId",
        element: <Board />,
      },
      {
        path: ":deskId/members",
        element: <DeskMembers />,
        children: [
          {
            path: "workspace",
            element: <CollabMain />,
          },
          {
            path: "guests",
            element: <Guests />,
          },
          {
            path: "requests",
            element: <h1>Requests</h1>,
          },
        ],
      },
    ],
  },
]);

export default router;
