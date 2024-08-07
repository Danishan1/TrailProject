export const handleFileClick = (fileInputRef) => {
    fileInputRef.current.click();
}

export const handleFileChange = (e, showAlert) => {
    const files = e.target.files;
    let len = files.length;
    let uploadedFile = []
    let uploadedFileMax = []

    if (len > 50) showAlert("No. of files should be less than 50", "error")
    else {
        const maxSizeInMB = 100;
        let countMaxSizeFile = 0;
        const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
        Array.from(files).forEach(file => {
            if (file.size > maxSizeInBytes) {
                countMaxSizeFile++
                uploadedFileMax.push(file)
            } else {
                uploadedFile.push(file)
            }
        });

        if (countMaxSizeFile > 0) {
            showAlert(`You have selected ${countMaxSizeFile} ${countMaxSizeFile === 1 ? "file" : "files"} with a size greater than 100 MB.`, "info");
            showAlert(`You can only share these files using the "Direct Share" option.`, "info");
        }
        return [uploadedFile, uploadedFileMax];
    }
}

export const getFileType = (fileType) => {
    switch (fileType) {
        case 'media':
            return 'audio/*,video/*,image/*,video/x-matroska';
        case 'doc':
            return '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,application/*,text/*';
        default:
            return '*/*';
    }

}
