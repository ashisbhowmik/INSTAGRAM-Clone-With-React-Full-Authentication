import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { storage } from "./firebase";
import db from "./firebase";
import firebase from "firebase";
import "./imageupload.css";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

const ImageUpload = ({ username, avatarImg }) => {
  const [caption, setCaption] = useState();
  const [file, setFile] = useState();
  const [progress, setProgress] = useState();
  const [image, setImage] = useState();

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const captionChange = (e) => {
    setCaption(e.target.value);
  };

  // tracking the uploading file

  const handleUpload = (e) => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    setFile(e.target.value);
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
      <Button class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
        <Tooltip title="Upload Photo" arrow>
          <IconButton color="primary" component="span">
            <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </IconButton>
        </Tooltip>
      </Button>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Upload Your Photo
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="body">
              <div className="imageUpload">
                <progress className="progressBar" value={progress} max="100" />
                <input
                  className="input"
                  type="text"
                  placeholder="enter a caption..."
                  onChange={captionChange}
                  value={caption}
                />
                <input
                  className="files"
                  type="file"
                  value={file}
                  onChange={handleChange}
                />
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<CloudUploadIcon />}
                  disabled={!caption && !file}
                  onClick={handleUpload}
                >
                  Upload
                </Button>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageUpload;
