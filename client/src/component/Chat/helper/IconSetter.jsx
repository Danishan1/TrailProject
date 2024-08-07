import React from "react";
import style from "./css/plusButtonIcons.module.css";

const IconSetter = ({ icon, name, clickHandle }) => {
  return (
    <div className={style.iconSetter}>
      <div className={style.setIcon} onClick={clickHandle}>
        {icon}
        <p>{name}</p>
      </div>
    </div>
  );
};

export default IconSetter;
