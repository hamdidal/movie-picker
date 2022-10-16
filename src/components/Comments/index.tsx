import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { getUser } from '../../services/auth';
import { createComment } from '../../services/Movie/comment';

export const CommentForm = ({slugId}:any)  => {
    const [movieId, setMovieId] = useState(0);
    const [commentBody, setCommentBody] = useState("");
    const [userId, setUserId] = useState("");
    const [commentId, setCommentId] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setMovieId(slugId.id);
        setUserId(getUser()?.uid || "");
        console.log("useEffect", movieId, userId, userId==="")

      }, [movieId, slugId, userId])
  
    const submitHandler = async (e: any) => {
      e.preventDefault();
      if ( !commentBody) {
        return toast.error("comment is empty");
      }
      try {
        setLoading(true);
        const comment = {
            movieId: movieId,
            commentBody: commentBody,
            userId: userId,
            commentId: commentId
        }
        let _commentId = createComment(comment)
        setCommentId(await _commentId)
        setLoading(false);
        toast.success("comment posted!");
      } catch (error) {
        setLoading(false);
        toast.error("oh no!");
      }
    }
    return (
      <div className="post-comment">
        <ToastContainer position="bottom-center" limit={1} />
        <div className="post-comment-container">
          <form onSubmit={submitHandler}>
            <div className="post-comment-form">
              <textarea
                id="comment-body"
                onChange={(e) => setCommentBody(e.target.value)}
                placeholder="write a comment"
              ></textarea>
              <button disabled={loading} type="submit">
                {loading ? "Sending..." : "Send It"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }