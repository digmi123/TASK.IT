import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import View from "@/assets/view.svg?react";
import Description from "@/assets/description.svg?react";
import Comments from "@/assets/comments.svg?react";
import Avatar from "@/assets/user.svg?react";
import { Input } from "@/components/ui/input";
import bg from "@/assets/task-bg.jpg";
import { addComment, getTask } from "@/features/task/api";
// import { useGetTask } from "@/features/task/hooks/useGetTask";

export default function TaskDialog({ task, children }) {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  // const [taskData, setTaskData] = useState();
  // fetch task by taskId
  const handleComment = () => {
    addComment({ comment, taskId: task.id });
  };

  // const hadleOpenTask = () => {
  //   // fetch task
  //   setOpen((prev) => !prev);
  //   if (open) return;
  //   getTask(task.id).then((res) => setTaskData(res));

  //   console.log({ taskData });
  // };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-fit">
        <DialogHeader>
          <DialogTitle>New Task</DialogTitle>
          <DialogDescription>Add your own task.</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <img src={bg} alt="background-image" className="h-[300px]" />

          <div className="flex flex-col items-start gap-4">
            <div className="flex gap-4">
              <View />
              <h1>{task.title}</h1>
            </div>
          </div>

          <div className="flex flex-col items-start gap-4">
            <div className="flex gap-4">
              <Description />
              <p>{task.description}</p>
            </div>
          </div>

          <hr
            id="divider"
            className="w-full h-[1px] bg-slate-300 rounded-md my-4 border-0"
          />

          <section
            id="comments-section"
            className="flex flex-col items-start gap-4"
          >
            <div className="flex gap-4">
              <Comments />
              <h3>Comments</h3>
            </div>

            <div id="comment-input" className="flex gap-4 w-full">
              <Avatar style={{ width: "35px", height: "35px" }} />
              <Input
                type="text"
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button onClick={() => handleComment()}>Send</Button>
            </div>

            {task.Comments.map((comment) => {
              return (
                <div className="flex gap-4" key={comment.id}>
                  <Avatar style={{ width: "35px", height: "35px" }} />
                  <p>{comment.content}</p>
                </div>
              );
            })}
          </section>
        </div>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
