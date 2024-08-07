export const handleKeyDown = (event, setMessage, handleSendMessage) => {
    // Check if Shift + Enter is pressed

    if (event.key === "Enter" && event.shiftKey) {
        console.log("Enter+Shift")
        setMessage((prevMessage) => prevMessage + "\n");
        event.preventDefault(); // Prevent default Enter behavior (newline)
    }
    else if (event.key === "Enter") {
        console.log("Enter")
        handleSendMessage();
        event.preventDefault(); // Prevent default Enter behavior (newline)
    }
};
