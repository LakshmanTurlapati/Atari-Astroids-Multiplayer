/**
 * Umaru Bongo Cat - Input Overlay
 * Tracks keyboard and mouse input to animate the Umaru character
 */

// DOM Elements
const umaruBody = document.getElementById('umaru-body');
const leftHand = document.getElementById('left-hand');
const rightHand = document.getElementById('right-hand');
const mouseHandContainer = document.getElementById('mouse-hand-container');
const overlayContainer = document.getElementById('overlay-container');
const keyDisplay = document.getElementById('current-keys');

// State tracking
const pressedKeys = new Set();
let leftHandActive = false;
let rightHandActive = false;

// Key mappings - left side of keyboard
const leftKeys = [
    'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5',
    'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT',
    'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG',
    'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB',
    'ControlLeft', 'AltLeft', 'MetaLeft'
];

// Key mappings - right side of keyboard
const rightKeys = [
    'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
    'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash',
    'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
    'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ShiftRight',
    'AltRight', 'MetaRight', 'ControlRight',
    'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'
];

// Space bar is special - could be either hand, we'll make it trigger both
const bothKeys = ['Space'];

/**
 * Update Umaru's sprite based on current hand states
 */
function updateUmaruSprite() {
    if (leftHandActive && rightHandActive) {
        umaruBody.src = 'assets/both_tap.svg';
    } else if (leftHandActive) {
        umaruBody.src = 'assets/left_tap.svg';
    } else if (rightHandActive) {
        umaruBody.src = 'assets/right_tap.svg';
    } else {
        umaruBody.src = 'assets/neutral.svg';
    }
}

/**
 * Update the visual keyboard to show pressed keys
 */
function updateKeyboardVisual() {
    // Reset all keys
    document.querySelectorAll('.key').forEach(key => {
        key.classList.remove('active');
    });

    // Highlight pressed keys
    pressedKeys.forEach(keyCode => {
        const keyElement = document.querySelector(`.key[data-key="${keyCode}"]`);
        if (keyElement) {
            keyElement.classList.add('active');
        }
    });

    // Update key display
    if (pressedKeys.size > 0) {
        const keyNames = Array.from(pressedKeys).map(k => k.replace('Key', '').replace('Digit', ''));
        keyDisplay.textContent = keyNames.join(' + ');
    } else {
        keyDisplay.textContent = 'Press any key...';
    }
}

/**
 * Handle keydown events
 */
function handleKeyDown(event) {
    const key = event.code;

    // Prevent default for certain keys to avoid browser shortcuts
    if (['Space', 'Tab'].includes(key)) {
        event.preventDefault();
    }

    // Skip if key is already pressed (key repeat)
    if (pressedKeys.has(key)) {
        return;
    }

    pressedKeys.add(key);

    // Determine which hand to activate
    if (leftKeys.includes(key)) {
        leftHandActive = true;
        leftHand.classList.add('active');
    }

    if (rightKeys.includes(key)) {
        rightHandActive = true;
        rightHand.classList.add('active');
    }

    // Space bar triggers both hands
    if (bothKeys.includes(key)) {
        leftHandActive = true;
        rightHandActive = true;
        leftHand.classList.add('active');
        rightHand.classList.add('active');
    }

    // Update sprite and visuals
    updateUmaruSprite();
    updateKeyboardVisual();

    // Add excited class when typing fast
    if (pressedKeys.size >= 3) {
        umaruBody.classList.add('excited');
        overlayContainer.classList.add('active');
    }
}

/**
 * Handle keyup events
 */
function handleKeyUp(event) {
    const key = event.code;

    pressedKeys.delete(key);

    // Check if any left keys are still pressed
    leftHandActive = Array.from(pressedKeys).some(k => leftKeys.includes(k) || bothKeys.includes(k));

    // Check if any right keys are still pressed
    rightHandActive = Array.from(pressedKeys).some(k => rightKeys.includes(k) || bothKeys.includes(k));

    // Update hand visibility
    if (!leftHandActive) {
        leftHand.classList.remove('active');
    }
    if (!rightHandActive) {
        rightHand.classList.remove('active');
    }

    // Update sprite and visuals
    updateUmaruSprite();
    updateKeyboardVisual();

    // Remove excited class when not typing much
    if (pressedKeys.size < 3) {
        umaruBody.classList.remove('excited');
        overlayContainer.classList.remove('active');
    }
}

/**
 * Handle mouse movement for the mouse hand
 */
function handleMouseMove(event) {
    const containerRect = overlayContainer.getBoundingClientRect();

    // Calculate mouse position relative to container
    const relativeX = event.clientX - containerRect.left;
    const relativeY = event.clientY - containerRect.top;

    // Normalize to container dimensions
    const normalizedX = (relativeX / containerRect.width) - 0.5;
    const normalizedY = (relativeY / containerRect.height) - 0.5;

    // Apply limited movement to mouse hand (subtle movement)
    const moveX = normalizedX * 30; // Max 30px movement
    const moveY = normalizedY * 20; // Max 20px movement

    mouseHandContainer.style.transform = `translate(${moveX}px, ${moveY}px)`;
}

/**
 * Handle mouse clicks
 */
function handleMouseDown(event) {
    mouseHandContainer.classList.add('clicking');
    overlayContainer.classList.add('active');
}

function handleMouseUp(event) {
    mouseHandContainer.classList.remove('clicking');
    if (pressedKeys.size < 3) {
        overlayContainer.classList.remove('active');
    }
}

/**
 * Initialize event listeners
 */
function init() {
    // Keyboard events
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    // Mouse events
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Handle window blur (reset all keys when window loses focus)
    window.addEventListener('blur', () => {
        pressedKeys.clear();
        leftHandActive = false;
        rightHandActive = false;
        leftHand.classList.remove('active');
        rightHand.classList.remove('active');
        updateUmaruSprite();
        updateKeyboardVisual();
        umaruBody.classList.remove('excited');
        overlayContainer.classList.remove('active');
    });

    console.log('Umaru Bongo Cat initialized! Start typing to see her react.');
}

// Start when DOM is ready
document.addEventListener('DOMContentLoaded', init);
