import React, { useEffect, useState } from "react";
import { CreateCommentModel } from "../../models/movies";
import { getCommentForMovieId } from "../../services/Movie/comment";
import "./CommentList.css";

interface Props {
  movieId: number;
}

const CommentList = (props: Props) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getComment = async () => {
      try {
        const response = await getCommentForMovieId(props.movieId);
        let _comments: any = [];
        if (response) {
          _comments = response;
        }
        setComments(_comments);
        setLoading(false);
      } catch (error) {}
    };
    getComment();
  }, [props.movieId]);

  if (loading) return <div>loading...</div>;
  return (
    <div className="list-container">
      {comments.map((comment: CreateCommentModel, index) => {
        return (
          <div key={index} className="list-form">
            <div className="comment-user">
              <span>USER-</span>
              {comment.userId}
            </div>
            <div className="comment-body"> {comment.commentBody}</div>
          </div>
        );
      })}
    </div>
  );
};

export default CommentList;
