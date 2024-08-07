const generatePasscode = () => {
    let upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let lowerCase = 'abcdefghijklmnopqrstuvwxyz';
    let numbers = '0123456789';
    let specialChars = '!@#$%&?';

    // Shuffle the Sequence to ensure randomness
    upperCase = upperCase.split('').sort(() => Math.random() - 0.5).join('');
    lowerCase = lowerCase.split('').sort(() => Math.random() - 0.5).join('');
    numbers = numbers.split('').sort(() => Math.random() - 0.5).join('');
    specialChars = specialChars.split('').sort(() => Math.random() - 0.5).join('');


    const getRandomChar = (charSet) => charSet[Math.floor(Math.random() * charSet.length)];

    let passcode = '';

    // Ensure the passcode contains at least one character from each set
    passcode += getRandomChar(upperCase);
    passcode += getRandomChar(numbers);
    passcode += getRandomChar(specialChars);
    passcode += getRandomChar(lowerCase);
    passcode += getRandomChar(numbers);
    passcode += getRandomChar(specialChars);


    // Shuffle the passcode to ensure randomness
    passcode = passcode.split('').sort(() => Math.random() - 0.5).join('');
    passcode = passcode.split('').sort(() => Math.random() - 0.5).join('');
    passcode = passcode.split('').sort(() => Math.random() - 0.5).join('');

    return passcode;
};

export default generatePasscode;