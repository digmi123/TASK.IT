import Comments from "@/assets/comments.svg?react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "@/features/task/api";
import { addTaskComment } from "@/redux/slices/boardSlice";
import { Button } from "@/components/ui/button";
import NewMemberAvatar from "@/features/members/components/NewMemberAvatar";
import { formatDate } from "@/shared/utils";

function Coments({ task }) {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleComment = () => {
    addComment({ comment, taskId: task.id }).then(() =>
      dispatch(
        addTaskComment({
          taskId: task.id,
          parentColumn: task.parent_column,
          comment: { content: comment, createdAt: new Date().toISOString() },
          user,
        })
      )
    );
  };

  return (
    <div id="comments-section" className="flex flex-col items-start gap-4">
      <div className="flex gap-4">
        <Comments />
        <h3>Comments</h3>
      </div>

      <div id="comment-input" className="flex gap-4 items-center w-full">
        <Input
          type="text"
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button onClick={() => handleComment()} className="w-20 h-8">
          Send
        </Button>
      </div>

      <div className="flex flex-col gap-4 w-full max-h-[120px] overflow-auto pr-4">
        {task.Comments.map((comment, index) => {
          return (
            <div
              id="comment-row-wrapper"
              className="flex justify-between w-full items-center"
              key={`${comment}-${index}`}
            >
              <div
                id="comment-content-col-wrapper"
                className="flex flex-col gap-2"
              >
                <div className="flex gap-4 items-center">
                  <NewMemberAvatar user={comment.user} />
                  <p>{comment.content}</p>
                </div>
                <p className="text-sm text-slate-400">
                  {formatDate(comment.createdAt)}
                </p>
              </div>

              <Button variant="destructive" className="w-14 h-8">
                Delete
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Coments;
