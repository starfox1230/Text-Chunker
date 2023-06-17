let clickedButtons = [];

function chunkText(text, chunkSize) {
    let sentences = text.split('. ');
    let chunks = [];
    let currentChunk = '';
    let wordsCount = 0;

    for (let sentence of sentences) {
        if (wordsCount + sentence.split(' ').length > chunkSize) {
            chunks.push(currentChunk.trim());
            currentChunk = sentence + '. ';
            wordsCount = sentence.split(' ').length;
        } else {
            currentChunk += sentence + '. ';
            wordsCount += sentence.split(' ').length;
        }
    }

    if (currentChunk) {
        chunks.push(currentChunk.trim());
    }

    return chunks;
}

function chunkInput() {
    try {
        // Reset clicked buttons
        clickedButtons = [];
        document.getElementById('clicked-buttons').innerText = '';
        
        let text = document.getElementById('text-input').value;
        text = text.replace('\n', ' ');

        let chunkSizeInput = document.getElementById('chunk-size-input');
        let chunkSize = chunkSizeInput.value ? parseInt(chunkSizeInput.value) : 500;

        if (isNaN(chunkSize)) {
            throw new Error('Chunk size is not a number');
        }

        let chunks = chunkText(text, chunkSize);

        let buttonFrame = document.getElementById('button-frame');
        buttonFrame.innerHTML = '';

        chunks.forEach((chunk, i) => {
            let button = document.createElement('button');
            button.innerText = `Block ${i+1}`;
            button.addEventListener('click', function(event) { showBlock(chunk, i, event); });
            buttonFrame.appendChild(button);
        });
    } catch (error) {
        console.error(error);
    }
}


function showBlock(blockText, buttonNum, event) {
    clickedButtons.push(buttonNum+1);
    document.getElementById('clicked-buttons').innerText = clickedButtons.join(', ');

    // Change the button's color to gray
    event.target.style.backgroundColor = 'gray';

    // Calculate the position for the new window
    let leftPosition = window.outerWidth;

    let blockWindow = window.open("", "Block Text", `width=600,height=600,left=${leftPosition}`);
    blockWindow.document.body.innerHTML = `<h1>Convert the following into a bulleted list of facts that one might need to know for their upcoming test on the material:</h1><p>${blockText}</p>`;
}


document.getElementById('text-form').addEventListener('keyup', function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("chunk-button").click();
    }
});


document.getElementById('chunk-button').addEventListener('click', chunkInput);
