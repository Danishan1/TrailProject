const generateUserId = () => {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    characters = characters.split('').sort(() => Math.random() - 0.5).join('');
    characters = characters.split('').sort(() => Math.random() - 0.5).join('');
    characters = characters.split('').sort(() => Math.random() - 0.5).join('');

    let userId = '';

    for (let i = 0; i < 6; i++) {
        userId += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    userId = userId.split('').sort(() => Math.random() - 0.5).join('');
    userId = userId.split('').sort(() => Math.random() - 0.5).join('');
    return userId;
};

export default generateUserId