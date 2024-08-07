import { circleThik, cirlceFilled, time } from "../../Chat/helper/PlusButtonIcons";
import style from "../css/UserBox.module.css";

export const reciptSetter = (status) => {
    if (status === "unsend")
        return <div className={style.timeStatus}>{time}</div>;
    else if (status === "sent") return circleThik;
    else if (status === "recieve") return cirlceFilled;
    else if (status === "read")
        return <div className={style.recieptRead}>{cirlceFilled}</div>;
};