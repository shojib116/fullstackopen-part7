import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";
import { useParams } from "react-router-dom";

const Comments = ({ comments }) => {
  const queryClient = useQueryClient();
  const blogId = useParams().id;
  const newCommentMutation = useMutation({
    mutationFn: blogService.addComment,
    onSuccess: (updatedBlog) => {
      queryClient.setQueryData(["blog"], updatedBlog);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const comment = event.target.comment.value;
    newCommentMutation.mutate({ comment, blogId });
    event.target.comment.value = "";
  };
  return (
    <div>
      <h3>comments</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="comment" id="comment" />{" "}
        <button type="submit">add comment</button>
      </form>
      {comments.length === 0 ? (
        <div>No comments yet</div>
      ) : (
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Comments;
