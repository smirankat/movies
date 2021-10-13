import React from "react";

function CommentItem({ comment, number, remove }) {
  return <div className={'commentItem'}>
      <div className={'commentBody'}>{number}. {comment.body}</div>
      <button className='myBtn' onClick={() => remove(comment)}>Remove</button>
      </div>;
}

export default CommentItem;
