export const adjustTextareaHeight = (textareaRef) => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto"; // Reset height to auto to calculate the scroll height correctly
    if (textarea.scrollHeight > 400) {
      textarea.style.height = "400px";
      textarea.style.overflowY = "scroll";
    } else {
      textarea.style.height = `${textarea.scrollHeight}px`;
      textarea.style.overflowY = "hidden";
    }
  };