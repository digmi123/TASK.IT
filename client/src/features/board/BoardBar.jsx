import { Button } from "@/components/ui/button";
import reactLogo from "../../assets/react.svg";
import Task from "../tasks/components/Task";
import TaskDialog from "../tasks/components/TaskDialog";
import { useState } from "react";

export default function BoardBar({ boardName }) {
  return (
    <div
      id="upper-bar"
      className="rounded-md shadow p-4 flex justify-between items-center"
    >
      <div id="left-side" className="flex gap-4 items-center">
        <h3 className="text-xl font-bold">{boardName}</h3>
        <img src={reactLogo} alt="star" className="w-6 h-6" />
      </div>
    </div>
  );
}