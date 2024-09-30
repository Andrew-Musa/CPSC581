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

let currentImageIndex = 1;

function changeBackgroundImage() {
    const backgroundImage = document.getElementById('backgroundImage');
    currentImageIndex++;
    const newImageSrc = `backgroundImages/background${currentImageIndex}.jpg`;
    
    console.log(`Changing image to: ${newImageSrc}`);
    
    backgroundImage.src = newImageSrc;
    
    backgroundImage.onerror = function() {
        console.error(`Error loading image: ${newImageSrc}`);
    };
    
    backgroundImage.onload = function() {
        console.log(`Image loaded successfully: ${newImageSrc}`);
    };
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

var counter = 0;

let userSelections = [];

function drop(e) {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    const option = document.getElementById(data);
    const targetSquare = e.currentTarget;

    if (targetSquare.style.backgroundColor || !isCorrectSquare(counter, targetSquare.id)) {
        return;
    }

    userSelections.push(option.id);

    switch (option.id) {
        case 'blue':
            targetSquare.style.backgroundColor = 'blue';
            
            var img = document.createElement('img');
            img.src = 'buttons/1A.png';
            img.alt = 'Blue Image';
            img.style.width = '150px';
            img.style.height = '150px';
            img.style.borderRadius = '10px';
            
            var topLeftText = document.getElementById("top-left-text");
            topLeftText.innerHTML = '';
            topLeftText.appendChild(img)

            toggleOptions('blue', 'green', ['red', 'yellow']);
            break;

        case 'green':
            targetSquare.style.backgroundColor = 'green';

            var img = document.createElement('img');
            img.src = 'buttons/1B.png';
            img.alt = 'Blue Image';
            img.style.width = '150px';
            img.style.height = '150px';
            img.style.borderRadius = '10px';
            
            var topLeftText = document.getElementById("top-left-text");
            topLeftText.innerHTML = '';
            topLeftText.appendChild(img)

            toggleOptions('blue', 'green', ['red', 'yellow']);
            break;

        case 'red':
            targetSquare.style.backgroundColor = 'red';

            var img = document.createElement('img');
            img.src = 'buttons/2A.png';
            img.alt = 'Blue Image';
            img.style.width = '150px';
            img.style.height = '150px';
            img.style.borderRadius = '10px';
            
            var topLeftText = document.getElementById("top-right-text");
            topLeftText.innerHTML = '';
            topLeftText.appendChild(img)

            toggleOptions('red', 'yellow', ['purple', 'brown']);
            break;

        case 'yellow':
            targetSquare.style.backgroundColor = 'yellow';

            var img = document.createElement('img');
            img.src = 'buttons/2B.png';
            img.alt = 'Blue Image';
            img.style.width = '150px';
            img.style.height = '150px';
            img.style.borderRadius = '10px';
            
            var topLeftText = document.getElementById("top-right-text");
            topLeftText.innerHTML = '';
            topLeftText.appendChild(img)

            toggleOptions('red', 'yellow', ['purple', 'brown']);
            break;

        case 'purple':
            targetSquare.style.backgroundColor = 'purple';

            var img = document.createElement('img');
            img.src = 'buttons/3A.png';
            img.alt = 'Blue Image';
            img.style.width = '150px';
            img.style.height = '150px';
            img.style.borderRadius = '10px';
            
            var topLeftText = document.getElementById("bottom-left-text");
            topLeftText.innerHTML = '';
            topLeftText.appendChild(img)

            toggleOptions('purple', 'brown', ['pink', 'cyan']);
            break;

        case 'brown':
            targetSquare.style.backgroundColor = 'brown';

            var img = document.createElement('img');
            img.src = 'buttons/3B.png';
            img.alt = 'Blue Image';
            img.style.width = '150px';
            img.style.height = '150px';
            img.style.borderRadius = '10px';
            
            var topLeftText = document.getElementById("bottom-left-text");
            topLeftText.innerHTML = '';
            topLeftText.appendChild(img)

            toggleOptions('purple', 'brown', ['pink', 'cyan']);
            break;

        case 'pink':
            targetSquare.style.backgroundColor = 'pink';

            var img = document.createElement('img');
            img.src = 'buttons/4A.png';
            img.alt = 'Blue Image';
            img.style.width = '150px';
            img.style.height = '150px';
            img.style.borderRadius = '10px';
            
            var topLeftText = document.getElementById("bottom-right-text");
            topLeftText.innerHTML = '';
            topLeftText.appendChild(img)

            toggleOptions('pink', 'cyan', []);
            break;

        case 'cyan':
            targetSquare.style.backgroundColor = 'cyan';

            var img = document.createElement('img');
            img.src = 'buttons/4B.png';
            img.alt = 'Blue Image';
            img.style.width = '150px';
            img.style.height = '150px';
            img.style.borderRadius = '10px';
            
            var topLeftText = document.getElementById("bottom-right-text");
            topLeftText.innerHTML = '';
            topLeftText.appendChild(img)

            toggleOptions('pink', 'cyan', []);
            break;
    }

    counter++;

    changeBackgroundImage();
    
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

function showNextPrompt() {
    if (currentPromptIndex < prompts.length) {
        promptContainer.textContent = prompts[currentPromptIndex];
        playPromptAudio(currentPromptIndex + 1);
        currentPromptIndex++;
    }
}

function playPromptAudio(promptNumber) {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    currentAudio = new Audio(`audio/prompt${promptNumber}.mp3`);
    currentAudio.play();
}