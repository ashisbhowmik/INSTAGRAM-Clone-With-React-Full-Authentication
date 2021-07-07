import React, { useState, useEffect } from "react";
import "./post.css";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineSharpIcon from "@material-ui/icons/ChatBubbleOutlineSharp";
import TelegramIcon from "@material-ui/icons/Telegram";
import BookmarkBorderSharpIcon from "@material-ui/icons/BookmarkBorderSharp";
import FavoriteIcon from "@material-ui/icons/Favorite";
import db from "./firebase";
import { IconButton } from "@material-ui/core";

const LoveReactSection = ({ postIdForPost, likeId }) => {
  const [loveReact, setLoveReact] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  // const [completeDoubleClick, setCompleteDoubleClick] = useState(false);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    let unsubscribe1;
    if (postIdForPost) {
      unsubscribe1 = db
        .collection("posts")
        .doc(postIdForPost)
        .collection("likes")
        .onSnapshot((snapshot) => {
          setLikes(snapshot.docs.map((doc) => doc.data()).length);
        });
    }
    return () => {
      unsubscribe1();
    };
  }, [postIdForPost]);

  const press__like = () => {
    setLoveReact(true);
    setLikesCount(likesCount + 1);
    // setCompleteDoubleClick(false);
    db.collection("posts")
      .doc(postIdForPost)
      .collection("likes")
      .add({
        like: likesCount + 1,
      });
  };
  const remove__like = () => {
    setLoveReact(false);
    setLikesCount(likesCount - 1);
    // setCompleteDoubleClick(false);
    db.collection("posts")
      .doc(postIdForPost)
      .collection("likes")
      .doc(likeId)
      .delete();
  };

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

  return (
    <>
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
      {postIdForPost && <h4 className="likes__count">{likes} likes</h4>}
    </>
  );
};

export default LoveReactSection;
