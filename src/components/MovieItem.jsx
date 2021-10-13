import React, { useState } from "react";
import CommentItem from "./CommentItem";
import MyModal from "./MyModal";

function MovieItem({ title, year, runtime, rating }) {
  const [comments, setComments] = useState([
    // { id: 1, body: "description" },
    // { id: 2, body: "description" },
  ]);

  const [comment, setComment] = useState({ id: "", body: "" });
  const [modal, setModal] = useState(false);

  const addNewComment = (e) => {
    e.preventDefault();
    setComments([...comments, { ...comment, id: Date.now() }]);
    console.log(comment);
    setComment({ id: "", body: "" });
  };

  const removeComment = (comment) => {
    setComments(comments.filter((obj) => obj.id !== comment.id));
    console.log(comment);
  };

  return (
    <div className="row">
      <div className="cell">{title}</div>
      <div className="cell">{year}</div>
      <div className="cell">{runtime}</div>
      <div className="cell">{rating}</div>
      <div className="cell">
        <button onClick={() => setModal(true)} >Open comments</button>
        <MyModal visible={modal} setVisible={setModal}>
        <form>
          <input
            value={comment.body}
            onChange={(e) => setComment({ ...comment, body: e.target.value })}
            className="myInput"
            type="text"
            placeholder="Add comment"
          />
          <button onClick={addNewComment} className="myBtn">
            Create comment
          </button>
        </form>
        {comments.length ? (
          comments.map((obj, index) => (
            <CommentItem
              key={obj.id}
              number={index + 1}
              comment={obj}
              remove={removeComment}
            />
          ))
        ) : (
          <div>No comments added</div>
        )}
        </MyModal>
      </div>
    </div>
  );
}

export default MovieItem;
