import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { getUser } from "../../services/FirebaseAuth";
import { createComment } from "../../services/Movie/comment";
import "./Comments.css"

export const CommentForm = ({ slugId }: any) => {
  const [movieId, setMovieId] = useState(0);
  const [commentBody, setCommentBody] = useState("");
  const [userId, setUserId] = useState("");
  const [commentId, setCommentId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMovieId(slugId.id);
    setUserId(getUser()?.uid || "");
  }, [movieId, slugId, userId]);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    if (!commentBody) {
      return toast.error("comment is empty");
    }
    try {
      setLoading(true);
      const comment = {
        movieId: movieId,
        commentBody: commentBody,
        userId: userId,
        commentId: commentId,
      };
      let _commentId = createComment(comment);
      setCommentId(await _commentId);
      setLoading(false);
      toast.success("comment posted!");
    } catch (error) {
      setLoading(false);
      toast.error("oh no!");
    }
  };
  return (
    <div className="comment-head">
      <ToastContainer position="bottom-center" limit={1} />
      <div className="comment-container">
        <form onSubmit={submitHandler}>
          <div className="comment-form">
            <textarea
              onChange={(e) => setCommentBody(e.target.value)}
              placeholder="write a comment"
              className="comment-textarea"
            ></textarea>
            <button disabled={loading} type="submit" className="comment-button">
              {loading ? "Sending..." : "Send It"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
