import React, { useState } from "react";
import style from "../css/FileUpload.module.css";

const FileUpload = ({ label, name, onChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);

  const handleFileChange = (file) => {
    setFile(file);
    onChange(file);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      handleFileChange(droppedFile);
      console.log("File dropped:", droppedFile);
      e.dataTransfer.clearData();
    }
  };

  const handleInputChange = (e) => {
    const uploadedFile = e.target.files[0];
    handleFileChange(uploadedFile);
  };

  const handleResetFile = () => {
    onChange("")
    setFile(null)
   };

  return (
    <>
      {!file &&  <div
        className={`${style.fileUpload} ${isDragging ? style.dragging : ""}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id={name}
          name={name}
          onChange={handleInputChange}
          className={style.formControl}
          title=""
        />
        <span className={style.label}>{`Upload  ${label}`}</span>
      </div>}
      {file && (
        <div className={style.infor}>
          <p>Uploaded: {file.name}</p>
          <p className={style.resetLink} onClick={handleResetFile}>Re-Upload</p>
        </div>
      )}
    </>
  );
};

export default FileUpload;
