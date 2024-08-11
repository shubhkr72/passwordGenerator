// DOM elements
const passwordDisplay = document.querySelector('[data-passwordDisplay]');
const lengthNumber = document.querySelector('[data-lengthNumber]');
const lengthSlider = document.querySelector('[data-lengthSlider]');
const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numberCheckbox = document.getElementById('number');
const symbolsCheckbox = document.getElementById('symbols');
const copyButton = document.querySelector('[data-copy]');
const copyMessage = document.querySelector('[data-copyMsg]');
const indicator = document.querySelector('[data-indicator]');
const generateButton = document.querySelector('.generateButton');

// Character code arrays
const UPPERCASE_CODES = arrayFromLowToHigh(65, 90);
const LOWERCASE_CODES = arrayFromLowToHigh(97, 122);
const NUMBER_CODES = arrayFromLowToHigh(48, 57);
const SYMBOL_CODES = arrayFromLowToHigh(33, 47).concat(
    arrayFromLowToHigh(58, 64),
    arrayFromLowToHigh(91, 96),
    arrayFromLowToHigh(123, 126)
);

// Initialize length display
lengthNumber.textContent = lengthSlider.value;

// Update password length display when slider value changes
lengthSlider.addEventListener('input', () => {
    lengthNumber.textContent = lengthSlider.value;
});

// Copy password to clipboard
copyButton.addEventListener('click', () => {
    const password = passwordDisplay.value;

    if (!password) return;

    navigator.clipboard.writeText(password).then(() => {
        copyMessage.textContent = 'Copied!';
        setTimeout(() => {
            copyMessage.textContent = '';
        }, 2000);
    });
});

// Generate password on button click
generateButton.addEventListener('click', () => {
    const length = lengthSlider.value;
    const includeUppercase = uppercaseCheckbox.checked;
    const includeLowercase = lowercaseCheckbox.checked;
    const includeNumbers = numberCheckbox.checked;
    const includeSymbols = symbolsCheckbox.checked;

    const password = generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
    passwordDisplay.value = password;
    updateStrengthIndicator(password);
});

// Password generation function
function generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols) {
    let charCodes = [];
    if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CODES);
    if (includeLowercase) charCodes = charCodes.concat(LOWERCASE_CODES);
    if (includeNumbers) charCodes = charCodes.concat(NUMBER_CODES);
    if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CODES);

    const passwordCharacters = [];
    for (let i = 0; i < length; i++) {
        const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)];
        passwordCharacters.push(String.fromCharCode(characterCode));
    }
    return passwordCharacters.join('');
}

// Generate array of character codes
function arrayFromLowToHigh(low, high) {
    const array = [];
    for (let i = low; i <= high; i++) {
        array.push(i);
    }
    return array;
}

// Update strength indicator
function updateStrengthIndicator(password) {
    let strength = 0;

    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    indicator.style.width = `${(strength / 4) * 100}%`;

    if (password.length >= 12 && strength === 4) {
        indicator.style.backgroundColor = 'green';
    } else if (password.length >= 8 && strength >= 3) {
        indicator.style.backgroundColor = 'yellow';
    } else {
        indicator.style.backgroundColor = 'red';
    }
}
