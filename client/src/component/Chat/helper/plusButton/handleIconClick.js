import { MeetingBox } from "../../js/MeetingBox";
import FileBox from "../../js/FileBox";

export const handleIconClick = (clickOn, clickedContent = null) => {
    let screen;
    switch (clickOn) {
        case "meeting":
            screen = <MeetingBox />
            console.log("meeting")
            break
        case "notes":
            console.log("note")
            break
        case "media":
            screen = <FileBox content={clickedContent} type="media" />
            break
        case "document":
            screen = <FileBox content={clickedContent} type="document" />
            break
        case "directShare":
            screen = <FileBox content={clickedContent} type="directShare" />
            break
        case "schedule":
            console.log("sche")
            break
        case "reminder":
            console.log("rema")
            break
        case "payment":
            console.log("pay")
            break
        default:
            console.log("default")
            break
    }
    return screen;

}