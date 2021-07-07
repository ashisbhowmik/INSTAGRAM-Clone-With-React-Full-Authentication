import "./App.css";
import React, { useState, useEffect } from "react";
import Post from "./Post";
import db from "./firebase";
import { Switch, Route } from "react-router-dom";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
import ImageUpload from "./ImageUpload";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import ChatBubbleOutlineRoundedIcon from "@material-ui/icons/ChatBubbleOutlineRounded";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Badge from "@material-ui/core/Badge";

const App = () => {
  const [{ user }, dispatch] = useStateValue();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  console.log(posts);

  const avtar__style = {
    width: "30px",
    height: "30px",
  };
  const home__style = {
    width: "50px",
    height: "40px",
  };

  return (
    <>
      {!user ? (
        <Login />
      ) : (
        <div className="app">
          <Switch>
            <Route path="/">
              <div className="total__app">
                <div className="app__header">
                  <div className="app__headerImage">
                    <img
                      src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                      alt="image not found"
                    />
                  </div>

                  <div className="header__icons">
                    <Tooltip title="Home">
                      <IconButton>
                        <HomeRoundedIcon style={home__style} />
                      </IconButton>
                    </Tooltip>
                    {user?.displayName && (
                      <ImageUpload
                        username={user.displayName}
                        avatarImg={user.photoURL}
                      />
                    )}
                    <Tooltip title="Your Chats">
                      <IconButton>
                        <Badge color="secondary" badgeContent={2} showZero>
                          <ChatBubbleOutlineRoundedIcon />
                        </Badge>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Find People">
                      <IconButton>
                        <Badge color="secondary" badgeContent={4} showZero>
                          <PeopleAltOutlinedIcon />
                        </Badge>
                      </IconButton>
                    </Tooltip>
                    <IconButton>
                      <FavoriteBorderIcon />
                    </IconButton>
                    <Tooltip title={user?.displayName}>
                      <IconButton>
                        <Avatar style={avtar__style} src={user?.photoURL} />
                      </IconButton>
                    </Tooltip>
                  </div>
                </div>
                <div className="stories">
                  <div className="story__icons">
                    <IconButton>
                      <img
                        style={{
                          borderRadius: "30px",
                          width: "47px",
                          border: "3px solid transparent",
                          boxShadow: "0 0 0 2px red",
                        }}
                        src="https://lh3.googleusercontent.com/ogw/ADea4I7-iIxfXZZNW82c29fJYA2QL6kWdsAhsIsSQsZ0=s32-c-mo"
                      />
                    </IconButton>
                    <IconButton>
                      <Avatar
                        style={{
                          width: "47px",
                          height: "47px",
                          border: "3px solid transparent",
                          boxShadow: "0 0 0 2px red",
                        }}
                        src="https://upleap.com/blog/wp-content/uploads/2018/10/how-to-create-the-perfect-instagram-profile-picture.jpg"
                      />
                    </IconButton>
                    <IconButton>
                      <Avatar
                        style={{
                          width: "47px",
                          height: "47px",
                          border: "3px solid transparent",
                          boxShadow: "0 0 0 2px red",
                        }}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-1T126XRnEz8E31KyhIHoFXr23cumLbv7Uk7UmGurqn1OfW4Q1cudy41PLA2bL67INks&usqp=CAU"
                      />
                    </IconButton>
                    <IconButton>
                      <Avatar
                        style={{
                          width: "47px",
                          height: "47px",
                          border: "3px solid transparent",
                          boxShadow: "0 0 0 2px red",
                        }}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUJKavVqkIb5jLP_E4iUE_DSiZd24pdkSg7DRWPh6k1Aqmj_meXttz-7MN6PhKAboVM_o&usqp=CAU"
                      />
                    </IconButton>
                    <IconButton>
                      <Avatar
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaYInP_wV2Omx7-eiWrBn-cfc9RAdXUEH8tg&usqp=CAU"
                        alt="image not found"
                        style={{
                          width: "47px",
                          height: "47px",
                          border: "3px solid transparent",
                          boxShadow: "0 0 0 2px red",
                        }}
                      />
                    </IconButton>
                    <IconButton>
                      <Avatar
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9o5INl5Il_WCYOpky60-G_vKfZB_PwSogug&usqp=CAU"
                        alt="image not found"
                        style={{
                          width: "47px",
                          height: "47px",
                          border: "3px solid transparent",
                          boxShadow: "0 0 0 2px red",
                        }}
                      />
                    </IconButton>
                    <IconButton>
                      <Avatar
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbDyUEnb7ks7CmoHz3lIZQtmBjyvWy3z8VR4Po_huT1_ZcYDIW4K_q3fVIC1ch40bADzU&usqp=CAU"
                        alt="image not found"
                        style={{
                          width: "47px",
                          height: "47px",
                          border: "3px solid transparent",
                          boxShadow: "0 0 0 2px red",
                        }}
                      />
                    </IconButton>
                    <IconButton>
                      <Avatar
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY94_TUH47iNl1EiPoPO5HUtCGzRocMxUOaKDLMfFOxfZYxYnkDN6sPQvKWCANVlldK6Q&usqp=CAU"
                        alt="image not found"
                        style={{
                          width: "47px",
                          height: "47px",
                          border: "3px solid transparent",
                          boxShadow: "0 0 0 2px red",
                        }}
                      />
                    </IconButton>
                    <IconButton>
                      <Avatar
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSACJ1miXpyNCcvqAunxyWmFlQTf9GOA1uFIw&usqp=CAU"
                        alt="image not found"
                        style={{
                          width: "47px",
                          height: "47px",
                          border: "3px solid transparent",
                          boxShadow: "0 0 0 2px red",
                        }}
                      />
                    </IconButton>
                    <IconButton>
                      <Avatar
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR68D48UkZBpW58VckCGJwPJ8NhVByiq3H-P6oYyGbxe32EaPOxluoNZ45FN6qCmNSoMrk&usqp=CAU"
                        alt="image not found"
                        style={{
                          width: "47px",
                          height: "47px",
                          border: "3px solid transparent",
                          boxShadow: "0 0 0 2px red",
                        }}
                      />
                    </IconButton>
                    <IconButton>
                      <Avatar
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR68D48UkZBpW58VckCGJwPJ8NhVByiq3H-P6oYyGbxe32EaPOxluoNZ45FN6qCmNSoMrk&usqp=CAU"
                        alt="image not found"
                        style={{
                          width: "47px",
                          height: "47px",
                          border: "3px solid transparent",
                          boxShadow: "0 0 0 2px red",
                        }}
                      />
                    </IconButton>
                    <IconButton>
                      <Avatar
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR68D48UkZBpW58VckCGJwPJ8NhVByiq3H-P6oYyGbxe32EaPOxluoNZ45FN6qCmNSoMrk&usqp=CAU"
                        alt="image not found"
                        style={{
                          width: "47px",
                          height: "47px",
                          border: "3px solid transparent",
                          boxShadow: "0 0 0 2px red",
                        }}
                      />
                    </IconButton>
                  </div>
                </div>

                <div className="app__posts">
                  <div className="post__left">
                    {posts.map(({ post, id }) => (
                      <Post
                        key={id}
                        postId={id}
                        commentUser={user.displayName}
                        // lastSignInTime={user.metadata.lastSignInTime}
                        avatarImg={post.avatarImg}
                        username={post.username}
                        caption={post.caption}
                        imageUrl={post.imageUrl}
                      />
                    ))}
                  </div>
                </div>
              </div>{" "}
            </Route>
          </Switch>
        </div>
      )}
    </>
  );
};
export default App;

// import "./App.css";
// import React, { useState, useEffect } from "react";
// import Post from "./Post";
// import db from "./firebase";
// import { Switch, Route } from "react-router-dom";
// import Login from "./Login";
// import { useStateValue } from "./StateProvider";
// import ImageUpload from "./ImageUpload";
// import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
// import ChatBubbleOutlineRoundedIcon from "@material-ui/icons/ChatBubbleOutlineRounded";
// import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
// import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
// import Avatar from "@material-ui/core/Avatar";
// import IconButton from "@material-ui/core/IconButton";
// import Tooltip from "@material-ui/core/Tooltip";
// import Badge from "@material-ui/core/Badge";

// const App = () => {
//   const [{ user }, dispatch] = useStateValue();
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     db.collection("posts")
//       .orderBy("timestamp", "desc")
//       .onSnapshot((snapshot) => {
//         setPosts(
//           snapshot.docs.map((doc) => ({
//             id: doc.id,
//             post: doc.data(),
//           }))
//         );
//       });
//   }, []);

//   const avtar__style = {
//     width: "30px",
//     height: "30px",
//   };
//   const home__style = {
//     width: "50px",
//     height: "40px",
//   };

//   return (
//     <>
//       {!user ? (
//         <Login />
//       ) : (
//         <div className="app">
//           <Switch>
//             <Route path="/">
//               <div className="total__app">
//                 <div className="app__header">
//                   <div className="app__headerImage">
//                     <img
//                       src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
//                       alt="image not found"
//                     />
//                   </div>

//                   {/* <div className="header__input">
//                   <input type="text" placeholder="search" />
//                 </div> */}
//                   <div className="header__icons">
//                     <Tooltip title="Home">
//                       <IconButton>
//                         <HomeRoundedIcon style={home__style} />
//                       </IconButton>
//                     </Tooltip>
//                     {user?.displayName && (
//                       <ImageUpload
//                         username={user.displayName}
//                         avatarImg={user.photoURL}
//                       />
//                     )}
//                     <Tooltip title="Your Chats">
//                       <IconButton>
//                         <Badge color="secondary" badgeContent={2} showZero>
//                           <ChatBubbleOutlineRoundedIcon />
//                         </Badge>
//                       </IconButton>
//                     </Tooltip>
//                     <Tooltip title="Find People">
//                       <IconButton>
//                         <Badge color="secondary" badgeContent={4} showZero>
//                           <PeopleAltOutlinedIcon />
//                         </Badge>
//                       </IconButton>
//                     </Tooltip>
//                     <IconButton>
//                       <FavoriteBorderIcon />
//                     </IconButton>
//                     <Tooltip title={user?.displayName}>
//                       <IconButton>
//                         <Avatar style={avtar__style} src={user?.photoURL} />
//                       </IconButton>
//                     </Tooltip>
//                   </div>
//                 </div>
//                 <div className="stories">
//                   <div className="story__icons">
//                     <IconButton>
//                       <img
//                         style={{
//                           borderRadius: "30px",
//                           width: "47px",
//                           border: "3px solid transparent",
//                           boxShadow: "0 0 0 2px red",
//                         }}
//                         src="https://lh3.googleusercontent.com/ogw/ADea4I7-iIxfXZZNW82c29fJYA2QL6kWdsAhsIsSQsZ0=s32-c-mo"
//                       />
//                     </IconButton>
//                     <IconButton>
//                       <Avatar
//                         style={{
//                           width: "47px",
//                           height: "47px",
//                           border: "3px solid transparent",
//                           boxShadow: "0 0 0 2px red",
//                         }}
//                         src="https://upleap.com/blog/wp-content/uploads/2018/10/how-to-create-the-perfect-instagram-profile-picture.jpg"
//                       />
//                     </IconButton>
//                     <IconButton>
//                       <Avatar
//                         style={{
//                           width: "47px",
//                           height: "47px",
//                           border: "3px solid transparent",
//                           boxShadow: "0 0 0 2px red",
//                         }}
//                         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-1T126XRnEz8E31KyhIHoFXr23cumLbv7Uk7UmGurqn1OfW4Q1cudy41PLA2bL67INks&usqp=CAU"
//                       />
//                     </IconButton>
//                     <IconButton>
//                       <Avatar
//                         style={{
//                           width: "47px",
//                           height: "47px",
//                           border: "3px solid transparent",
//                           boxShadow: "0 0 0 2px red",
//                         }}
//                         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUJKavVqkIb5jLP_E4iUE_DSiZd24pdkSg7DRWPh6k1Aqmj_meXttz-7MN6PhKAboVM_o&usqp=CAU"
//                       />
//                     </IconButton>
//                     <IconButton>
//                       <Avatar
//                         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaYInP_wV2Omx7-eiWrBn-cfc9RAdXUEH8tg&usqp=CAU"
//                         alt="image not found"
//                         style={{
//                           width: "47px",
//                           height: "47px",
//                           border: "3px solid transparent",
//                           boxShadow: "0 0 0 2px red",
//                         }}
//                       />
//                     </IconButton>
//                     <IconButton>
//                       <Avatar
//                         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9o5INl5Il_WCYOpky60-G_vKfZB_PwSogug&usqp=CAU"
//                         alt="image not found"
//                         style={{
//                           width: "47px",
//                           height: "47px",
//                           border: "3px solid transparent",
//                           boxShadow: "0 0 0 2px red",
//                         }}
//                       />
//                     </IconButton>
//                     <IconButton>
//                       <Avatar
//                         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbDyUEnb7ks7CmoHz3lIZQtmBjyvWy3z8VR4Po_huT1_ZcYDIW4K_q3fVIC1ch40bADzU&usqp=CAU"
//                         alt="image not found"
//                         style={{
//                           width: "47px",
//                           height: "47px",
//                           border: "3px solid transparent",
//                           boxShadow: "0 0 0 2px red",
//                         }}
//                       />
//                     </IconButton>
//                     <IconButton>
//                       <Avatar
//                         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY94_TUH47iNl1EiPoPO5HUtCGzRocMxUOaKDLMfFOxfZYxYnkDN6sPQvKWCANVlldK6Q&usqp=CAU"
//                         alt="image not found"
//                         style={{
//                           width: "47px",
//                           height: "47px",
//                           border: "3px solid transparent",
//                           boxShadow: "0 0 0 2px red",
//                         }}
//                       />
//                     </IconButton>
//                     <IconButton>
//                       <Avatar
//                         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSACJ1miXpyNCcvqAunxyWmFlQTf9GOA1uFIw&usqp=CAU"
//                         alt="image not found"
//                         style={{
//                           width: "47px",
//                           height: "47px",
//                           border: "3px solid transparent",
//                           boxShadow: "0 0 0 2px red",
//                         }}
//                       />
//                     </IconButton>
//                     <IconButton>
//                       <Avatar
//                         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR68D48UkZBpW58VckCGJwPJ8NhVByiq3H-P6oYyGbxe32EaPOxluoNZ45FN6qCmNSoMrk&usqp=CAU"
//                         alt="image not found"
//                         style={{
//                           width: "47px",
//                           height: "47px",
//                           border: "3px solid transparent",
//                           boxShadow: "0 0 0 2px red",
//                         }}
//                       />
//                     </IconButton>
//                     <IconButton>
//                       <Avatar
//                         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR68D48UkZBpW58VckCGJwPJ8NhVByiq3H-P6oYyGbxe32EaPOxluoNZ45FN6qCmNSoMrk&usqp=CAU"
//                         alt="image not found"
//                         style={{
//                           width: "47px",
//                           height: "47px",
//                           border: "3px solid transparent",
//                           boxShadow: "0 0 0 2px red",
//                         }}
//                       />
//                     </IconButton>
//                     <IconButton>
//                       <Avatar
//                         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR68D48UkZBpW58VckCGJwPJ8NhVByiq3H-P6oYyGbxe32EaPOxluoNZ45FN6qCmNSoMrk&usqp=CAU"
//                         alt="image not found"
//                         style={{
//                           width: "47px",
//                           height: "47px",
//                           border: "3px solid transparent",
//                           boxShadow: "0 0 0 2px red",
//                         }}
//                       />
//                     </IconButton>
//                   </div>
//                 </div>

//                 <div className="app__posts">
//                   <div className="post__left">
//                     {posts.map(({ post, id }) => (
//                       <Post
//                         key={id}
//                         postId={id}
//                         commentUser={user.displayName}
//                         // lastSignInTime={user.metadata.lastSignInTime}
//                         avatarImg={post.avatarImg}
//                         username={post.username}
//                         caption={post.caption}
//                         imageUrl={post.imageUrl}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* {user?.displayName && (
//                 <ImageUpload
//                   username={user.displayName}
//                   avatarImg={user.photoURL}
//                 />
//               )} */}
//             </Route>
//           </Switch>
//         </div>
//       )}
//     </>
//   );
// };

// export default App;
