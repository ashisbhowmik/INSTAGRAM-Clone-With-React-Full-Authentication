import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { storage } from "./firebase";
import db from "./firebase";
import firebase from "firebase";
import "./imageupload.css";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const ImageUpload = ({ username, avatarImg }) => {
  const [caption, setCaption] = useState();
  const [progress, setProgress] = useState();
  const [image, setImage] = useState();
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const captionChange = (e) => {
    setCaption(e.target.value);
  };

  // tracking the uploading file
  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress bar funcion...
        const progresss = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progresss);
      },
      (error) => {
        // Error function...
        console.log(error);
        alert(error.message);
      },
      () => {
        // complete function...
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // post the images into the database
            db.collection("posts").add({
              // get the timeOfPosting for appearing the post home page in the top
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              avatarImg: avatarImg,
              username: username,
            });
            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <>
      {/* <div classNameName="imageUpload">
        <div classNameName="uploadDetails">
          <progress classNameName="progressBar" value={progress} max="100" />
          <input
            classNameName="input"
            type="text"
            placeholder="enter a caption..."
            onChange={captionChange}
            value={caption}
          />
          <input classNameName="files" type="file" onChange={handleChange} />
          <Button
            variant="contained"
            color="primary"
            startIcon={<CloudUploadIcon />}
            onClick={handleUpload}
          >
            Upload
          </Button>
        </div>
      </div> */}
    </>
  );
};

export default ImageUpload;
