import { useState, useEffect } from "react";
import CommentRemove from "./CommentRemove";
import CommentUpdate from "./CommentUpdate";

const CommentDisplay = ({ comment, comments, setComments }) => {

  const [updatedName, setUpdatedName] = useState(comment.name);
  const [updatedBody, setUpdatedBody] = useState(comment.body);
  const [inUpdate, setInUpdate] = useState(false);
  const [commentArea, setCommentArea] = useState("");
  const currentUser = (JSON.parse(localStorage.getItem("currentUser")));
  const userEmail = currentUser ? currentUser.email : null;
  useEffect(() => {
    setUpdatedBody(comment.body);
    setUpdatedName(comment.name);
  }, [inUpdate]);

  const { postId, ...rest } = comment;
  return (<>
    <ul>
      {Object.keys(rest).map(key => (
        <li key={key} className="list">
          <strong>{key}:</strong> {(key === 'name' && inUpdate) ?
            <textarea type="text" value={updatedName} onChange={(event) => { setUpdatedName(event.target.value) }} required style={{ width: "350px" }} /> :
            (key === 'body' && inUpdate) ?
              <textarea type="text" value={updatedBody} onChange={(event) => { setUpdatedBody(event.target.value) }} required style={{ width: "350px", height: "70px" }} /> :
              rest[key]}
        </li>
      ))}
      {comment.email === userEmail &&
        <><CommentRemove commentToRemove={comment} comments={comments} setComments={setComments} setCommentArea={setCommentArea} />
          <CommentUpdate inUpdate={inUpdate} setInUpdate={setInUpdate} commentToUpdate={comment} setCommentArea={setCommentArea}
            comments={comments} setComments={setComments} updatedName={updatedName} updatedBody={updatedBody} />
        </>}
    </ul>
    <p className='commentArea'>{commentArea}</p>
  </>)
}
export default CommentDisplay;