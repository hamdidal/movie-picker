import React, { useEffect, useState } from "react";
import { CreateCommentModel } from "../../models/movies";
import { getAllComments } from "../../services/Movie/comment";

const CommentList = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getComment = async () => {
      try {
        const response = await getAllComments()
        let _comments:any = []
        if (response) {
          _comments = response
        }
        setComments(_comments)
        setLoading(false)
        
      } catch (error) {
        
      }
    }
    getComment()
  }, []);

    if(loading) return <div>loading...</div>
    return (
    <div>
      {comments.map((comment: CreateCommentModel, index) => {
        console.log("2",comment.commentBody)
        return <div key={index} style={{color:"white"}}>{comment.commentBody}</div>
  })}
    </div>
  );
};

export default CommentList;
