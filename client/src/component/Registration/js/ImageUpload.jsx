import React, { useState } from "react";
import style from "../css/FileUpload.module.css";

const FileUpload = ({ label, name, onChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);

  const handleFileChange = (file) => {
    if (validateFile(file)) {
      setFile(file);
      onChange(file);
    }
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
    onChange("");
    setFile(null);
  };

  const validateFile = (file, maxSizeInMB = 5) => {
    const validTypes = [
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/svg",
      "image/",
    ];
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
      alert(`INVALID file type. Only IMAGES are allowed.`);
      return false;
    }

    if (file.size > maxSizeInBytes) {
      alert(`File size exceeds ${maxSizeInMB}MB.`);
      return false;
    }

    return true;
  };

  return (
    <>
      {!file && (
        <div
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
            accept="image/*"
          />
          <span className={style.label}>{`Upload  ${label}`}</span>
        </div>
      )}
      {file && (
        <div className={style.infor}>
          <p>Uploaded: {file.name}</p>
          <p className={style.resetLink} onClick={handleResetFile}>
            Re-Upload
          </p>
        </div>
      )}
    </>
  );
};

export default FileUpload;
