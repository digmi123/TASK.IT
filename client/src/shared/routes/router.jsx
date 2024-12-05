import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/mainLayout";
import Board from "../../features/screens/Board";
import Boards from "@/features/screens/Boards";
import Login from "@/features/screens/Login";
import Register from "@/features/screens/Register";
import Members from "@/features/screens/Members";
import CollabMain from "@/features/members/components/CollabMain";
import Guests from "@/features/members/components/Guests";
import Desks from "@/features/screens/Desks";
import HomeLayout from "../layouts/HomeLayout";
import AppLayout from "../layouts/AppLayout";
import BoardLayout from "../layouts/BoardLayout";

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
        element: <HomeLayout />,
        children: [
          {
            path: "/",
            element: <Desks />,
          },
        ],
      },

      {
        element: <MainLayout />,
        children: [
          {
            path: ":deskId",
            element: <Boards />,
          },

          {
            path: ":deskId/:boardId",
            element: <BoardLayout />,
            children: [
              {
                path: "",
                element: <Board />,
              },
            ],
          },

          {
            path: ":deskId/members",
            element: <Members />,
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
    ],
  },
]);

export default router;
