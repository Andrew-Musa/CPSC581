// script.js

window.addEventListener('load', function() {
    const overlay = document.getElementById('overlay');
    setTimeout(() => {
        overlay.style.opacity = '0';
    }, 100);

    setTimeout(() => {
        overlay.style.display = 'none';
        showNextPrompt();
    }, 1100);
});

let currentVideoIndex = 1;

function changeBackgroundVideo() {
    const video = document.getElementById('backgroundVideo');
    currentVideoIndex++;
    const newVideoSrc = `video/video${currentVideoIndex}.mp4`;
    
    console.log(`Changing video to: ${newVideoSrc}`);
    
    video.src = newVideoSrc;
    
    video.onerror = function() {
        console.error(`Error loading video: ${newVideoSrc}`);
    };
    
    video.onloadeddata = function() {
        console.log(`Video loaded successfully: ${newVideoSrc}`);
        video.play().catch(e => console.error("Error playing video:", e));
    };
    
    video.load();
}

const squares = document.querySelectorAll('.small-square');
const options = document.querySelectorAll('.option');
const promptContainer = document.getElementById('current-prompt');
const prompts = [
    "It's time to pick extracurricular courses, should you choose computer science or political science?",
    "Your friends invited you to a soccer match but you just discovered how to mod Minecraft with Python. Should you join your friends, or expand your thinking horizon?",
    "You've been offered a summer job that would look great on your resume, but doesn't excite you. At the same time, you have the opportunity to work on a personal project that aligns with your passion for game development. Do you choose the security of the summer job or take the chance to explore your passion?",
    "Your researching potential university degrees to apply for, you might have an interest in computer science. However, mom and dad expect you to enroll in law school. Should you take the risk?"
];
let currentPromptIndex = 0;
let currentAudio = null;

options.forEach(option => {
    option.addEventListener('dragstart', dragStart);
});

squares.forEach(square => {
    square.addEventListener('dragover', dragOver);
    square.addEventListener('drop', drop);
});

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
}

function dragOver(e) {
    e.preventDefault();
}

var counter = 0; // Start counter at 0 to match square indices

let userSelections = [];

function drop(e) {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    const option = document.getElementById(data);
    const targetSquare = e.target;

    // Check if the target square already has a background color or if it's not the correct order
    if (targetSquare.style.backgroundColor || !isCorrectSquare(counter, targetSquare.id)) {
        return; // Do nothing if the square is already colored or not in order
    }

    // Add the selected option to userSelections
    userSelections.push(option.id);

    // Change color based on the option dragged
    switch (option.id) {
        case 'blue':
            targetSquare.style.backgroundColor = 'blue';
            document.getElementById("top-left-text").innerHTML = "💻";
            document.getElementById("top-left-text").style.fontSize = "100px";
            toggleOptions('blue', 'green', ['red', 'yellow']);
            break;
        case 'green':
            targetSquare.style.backgroundColor = 'green';
            document.getElementById("top-left-text").innerHTML = "🏛";
            document.getElementById("top-left-text").style.fontSize = "100px";
            toggleOptions('blue', 'green', ['red', 'yellow']);
            break;
        case 'red':
            targetSquare.style.backgroundColor = 'red';
            document.getElementById("top-right-text").innerHTML = "⚽️";
            document.getElementById("top-right-text").style.fontSize = "100px";
            toggleOptions('red', 'yellow', ['purple', 'brown']);
            break;
        case 'yellow':
            targetSquare.style.backgroundColor = 'yellow';
            document.getElementById("top-right-text").innerHTML = "⛏";
            document.getElementById("top-right-text").style.fontSize = "100px";
            toggleOptions('red', 'yellow', ['purple', 'brown']);
            break;
        case 'purple':
            targetSquare.style.backgroundColor = 'purple';
            document.getElementById("bottom-left-text").innerHTML = "👾";
            document.getElementById("bottom-left-text").style.fontSize = "100px";
            toggleOptions('purple', 'brown', ['pink', 'cyan']);
            break;
        case 'brown':
            targetSquare.style.backgroundColor = 'brown';
            document.getElementById("bottom-left-text").innerHTML = "💼";
            document.getElementById("bottom-left-text").style.fontSize = "100px";
            toggleOptions('purple', 'brown', ['pink', 'cyan']);
            break;
        case 'pink':
            targetSquare.style.backgroundColor = 'pink';
            document.getElementById("bottom-right-text").innerHTML = "👨‍💻";
            document.getElementById("bottom-right-text").style.fontSize = "100px";
            toggleOptions('pink', 'cyan', []);
            break;
        case 'cyan':
            targetSquare.style.backgroundColor = 'cyan';
            document.getElementById("bottom-right-text").innerHTML = "👨‍⚖️";
            document.getElementById("bottom-right-text").style.fontSize = "100px";
            toggleOptions('pink', 'cyan', []);
            break;
    }

    counter++;

    changeBackgroundVideo();
    
    // Show next prompt after placing a puzzle piece
    // if (counter < prompts.length) {
    //     showNextPrompt();
    // }
    showNextPrompt();

    if (userSelections.length === 4) {
        checkSelectionsAndRedirect();
    }
}

function checkSelectionsAndRedirect() {
    const pathOne = ['blue', 'yellow', 'purple', 'pink'];
    const pathTwo = ['green', 'red', 'brown', 'cyan'];

    if (arraysEqual(userSelections, pathOne)) {
        window.location.href = 'outro-one.html';
    } else if (arraysEqual(userSelections, pathTwo)) {
        window.location.href = 'outro-two.html';
    } else {
        window.location.href = 'outro-three.html';
    }
}

function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

// Function to check if the square is the correct one based on the counter
function isCorrectSquare(counter, squareId) {
    const order = {
        'top-left': 0,
        'top-right': 1,
        'bottom-left': 2,
        'bottom-right': 3
    };
    return order[squareId] === counter;
}

function toggleOptions(option1, option2, showOptions) {
    document.getElementById(option1).style.display = 'none';
    document.getElementById(option2).style.display = 'none';

    showOptions.forEach(option => {
        document.getElementById(option).style.display = 'block';
    });
}

// Function to display and play the current prompt
function showNextPrompt() {
    if (currentPromptIndex < prompts.length) {
        promptContainer.textContent = prompts[currentPromptIndex];
        playPromptAudio(currentPromptIndex + 1);
        currentPromptIndex++;
    }
}

// Function to play prompt audio
function playPromptAudio(promptNumber) {
    // Stop the currently playing audio if there is one
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    // Play the new audio
    currentAudio = new Audio(`audio/prompt${promptNumber}.mp3`);
    currentAudio.play();
}