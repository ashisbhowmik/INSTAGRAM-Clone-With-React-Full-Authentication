// import React, { useState, useEffect } from "react";
// import "./post.css";
// import Avatar from "@material-ui/core/Avatar";
// import db from "./firebase";
// import firebase from "firebase";
// import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
// import LoveReactSection from "./LoveReactSection";

// const Post = ({
//   commentUser,
//   postId,
//   avatarImg,
//   username,
//   caption,
//   imageUrl,
// }) => {
//   const [comments, setComments] = useState([]);
//   const [comment, setComment] = useState("");
//   const [reactId, setReactId] = useState([]);

//   const postComment = (e) => {
//     e.preventDefault();
//     db.collection("posts").doc(postId).collection("comments").add({
//       text: comment,
//       username: commentUser,
//       timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//     });
//     setComment("");
//   };

//   useEffect(() => {
//     let unsubscribe;
//     if (postId) {
//       unsubscribe = db
//         .collection("posts")
//         .doc(postId)
//         .collection("comments")
//         .orderBy("timestamp", "desc")
//         .onSnapshot((snapshot) => {
//           setComments(snapshot.docs.map((doc) => doc.data()));
//         });
//     }
//     return () => {
//       unsubscribe();
//     };
//   }, [postId]);

//   useEffect(() => {
//     db.collection("posts")
//       .doc(postId)
//       .collection("likes")
//       .onSnapshot((snapshot) => {
//         setReactId(
//           snapshot.docs.map((doc) => ({
//             id: doc.id,
//           }))
//         );
//       });
//   }, [postId]);

//   return (
//     <>
//       <div className="post">
//         <div className="post__header">
//           <Avatar
//             src={avatarImg}
//             style={{
//               width: "32px",
//               height: "32px",
//               border: "3px solid transparent",
//               boxShadow: "0 0 0 2px red",
//               marginLeft: "19px",
//               marginRight: "8px",
//             }}
//           />
//           <div className="username__style">
//             <h4>{username}</h4>
//             <h6>Angelos, California</h6>
//           </div>
//         </div>
//         <img className="post__image" src={imageUrl} alt="image not found" />

//         {reactId.map(({ id }) => (
//           <LoveReactSection key={id} postIdForPost={postId} likeId={id} />
//         ))}

//         <h4 className="post__text">
//           <strong>{username} </strong>
//           {caption}
//         </h4>

//         <div className="post__comments">
//           {comments.map((comment, index) => (
//             <p key={index}>
//               <strong>{comment.username}: </strong>
//               {comment.text}
//             </p>
//           ))}
//         </div>

//         <form className="post__commentBox">
//           <InsertEmoticonIcon
//             style={{ marginTop: "7px", marginLeft: "9px", fontSize: "22px" }}
//           />
//           <input
//             className="post__input"
//             type="text"
//             placeholder="add a comment"
//             value={comment}
//             onChange={(e) => {
//               e.preventDefault();
//               setComment(e.target.value);
//             }}
//           />

//           <button
//             variant="contained"
//             disabled={!comment}
//             className="post__button"
//             onClick={postComment}
//             type="submit"
//           >
//             Post
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default Post;

import React, { useState, useEffect } from "react";
import "./post.css";
import Avatar from "@material-ui/core/Avatar";
import db from "./firebase";
import firebase from "firebase";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineSharpIcon from "@material-ui/icons/ChatBubbleOutlineSharp";
import TelegramIcon from "@material-ui/icons/Telegram";
import BookmarkBorderSharpIcon from "@material-ui/icons/BookmarkBorderSharp";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";

const Post = ({
  commentUser,
  postId,
  avatarImg,
  username,
  caption,
  imageUrl,
}) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loveReact, setLoveReact] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [completeDoubleClick, setCompleteDoubleClick] = useState(false);
  const [likes, setLikes] = useState([]);
  const [likeId, setLikeId] = useState([]);

  const postComment = (e) => {
    e.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: commentUser,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  useEffect(() => {
    let unsubscribe1;
    if (postId) {
      unsubscribe1 = db
        .collection("posts")
        .doc(postId)
        .collection("likes")
        .onSnapshot((snapshot) => {
          setLikes(snapshot.docs.map((doc) => doc.data()).length);
          setLikeId(
            snapshot.docs.map((doc) => ({
              id: doc.id,
            }))
          );
        });
    }
    return () => {
      unsubscribe1();
    };
  }, [postId]);

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const reacts__style = {
    width: "30px",
    height: "36px",
    marginLeft: "22px",
    fontSize: "45px",
    transform: "scale(1.08)",
  };

  const reacts__stylee = {
    width: "30px",
    color: "red",
    height: "36px",
    marginLeft: "22px",
  };

  const double__click = () => {
    setLoveReact(true);
    {
      !completeDoubleClick && !loveReact
        ? setLikesCount(likesCount + 1)
        : setLikesCount(likesCount);
    }
    setCompleteDoubleClick(true);
  };

  const press__like = () => {
    setLoveReact(true);
    setLikesCount(likesCount + 1);
    setCompleteDoubleClick(false);
    db.collection("posts")
      .doc(postId)
      .collection("likes")
      .add({
        like: likesCount + 1,
      });
  };
  const remove__like = () => {
    setLoveReact(false);
    setLikesCount(likesCount - 1);
    setCompleteDoubleClick(false);
  };

  return (
    <>
      <div className="post">
        <div className="post__header">
          <Avatar
            src={avatarImg}
            style={{
              width: "32px",
              height: "32px",
              border: "3px solid transparent",
              boxShadow: "0 0 0 2px red",
              marginLeft: "19px",
              marginRight: "8px",
            }}
          />
          <div className="username__style">
            <h4>{username}</h4>
            <h6>Angelos, California</h6>
          </div>
        </div>
        <img
          className="post__image"
          src={imageUrl}
          alt="image not found"
          onDoubleClick={double__click}
        />
        <div className="post__responses">
          <div className="post__responses__left">
            {!loveReact ? (
              <FavoriteBorderIcon style={reacts__style} onClick={press__like} />
            ) : (
              <FavoriteIcon style={reacts__stylee} onClick={remove__like} /> // special effect
            )}

            <ChatBubbleOutlineSharpIcon style={reacts__style} />
            <TelegramIcon style={reacts__style} />
          </div>

          <div className="post__responses__right">
            <IconButton>
              <BookmarkBorderSharpIcon style={reacts__style} />
            </IconButton>
          </div>
        </div>

        {postId && <h4 className="likes__count">{likes} likes</h4>}

        <h4 className="post__text">
          <strong>{username} </strong>
          {caption}
        </h4>

        <div className="post__comments">
          {comments.map((comment, index) => (
            <p key={index}>
              <strong>{comment.username}: </strong>
              {comment.text}
            </p>
          ))}
        </div>

        <form className="post__commentBox">
          <InsertEmoticonIcon
            style={{ marginTop: "7px", marginLeft: "9px", fontSize: "22px" }}
          />
          <input
            className="post__input"
            type="text"
            placeholder="add a comment"
            value={comment}
            onChange={(e) => {
              e.preventDefault();
              setComment(e.target.value);
            }}
          />

          <button
            variant="contained"
            disabled={!comment}
            className="post__button"
            onClick={postComment}
            type="submit"
          >
            Post
          </button>
        </form>
      </div>
    </>
  );
};

export default Post;
