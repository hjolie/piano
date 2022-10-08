const keyboard = document.getElementById('piano-keyboard');
const keyboardOptions = document.querySelectorAll('.keyboard-display-option');
const songOptions = document.getElementById('song-list');
const playBtn = document.getElementById('play-btn');
const stopBtn = document.getElementById('stop-btn');

const letterNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

const init = () => {
    for (let i = 3; i <= 6; i++) {
        for (let j = 0; j < 7; j++) {
            let key = createKey('white', letterNotes[j], i);
            keyboard.appendChild(key);

            if (j !== 2 && j !== 6) {
                key = createKey('black', letterNotes[j], i);
                const emptySpace = document.createElement('div');
                emptySpace.className = 'empty-space';
                emptySpace.appendChild(key);
                keyboard.appendChild(emptySpace);
            }
        }
    }
}


let keys = [];

const createKey = (type, note, octave) => {
    const key = document.createElement('button');
    key.className = `piano-key piano-key-${type}`;
    key.dataset.letterNotes = type === 'white' ? note + octave : note + '#' + octave;
    key.textContent = key.dataset.letterNotes;
    key.dataset.letterNotesFileName = type === 'white' ? note + octave : note + 's' + octave;
    keys.push(key);

    key.addEventListener('mousedown', () => {
        playSound(key);
        key.classList.add('piano-key-playing');
    })

    key.addEventListener('mouseup', () => {
        key.classList.remove('piano-key-playing');
    })

    key.addEventListener('mouseleave', () => {
        key.classList.remove('piano-key-playing');
    })

    return key;
}

// Play Sound
const playSound = (key) => {
    const audio = document.createElement('audio');
    audio.src = 'sounds/' + key.dataset.letterNotesFileName + '.mp3';
    audio.play().then(() => audio.remove());
}

// Keyboard Display Option
keyboardOptions.forEach(option => {
    option.addEventListener('input', () => {
        const keyboardDisplay = option.value;
        keys.forEach(key => {
            key.textContent = key.dataset[keyboardDisplay];
        })
    })
})

// Song Notes
const happyBirthday = `C5, C5, D5,, C5,, F5,, E5,,,,
                        C5, C5, D5,, C5,, G5,, F5,,,,
                        C5, C5, C6,, A5,, F5,, E5,, D5,,,,
                        As5, As5, A5,, F5,, G5,, F5
                        `;

const furElise = `E5, Ds5, E5, Ds5, E5, B4, D5, C5, A4,,,
                    C4, E4, A4, B4,,, E4, Gs4, B4, C5,,,
                    E5, Ds5, E5, Ds5, E5, B4, D5, C5, A4,,,
                    C4, E4, A4, B4,,, E4, C5, B4, A4,,,

                    E5, Ds5, E5, Ds5, E5, B4, D5, C5, A4,,,
                    C4, E4, A4, B4,,, E4, Gs4, B4, C5,,,
                    E5, Ds5, E5, Ds5, E5, B4, D5, C5, A4,,,
                    C4, E4, A4, B4,,, E4, C5, B4, A4,,,

                    B4, C5, D5, E5,,,
                    G4, F5, E5, D5,,,
                    F4, E5, D5, C5,,,
                    E4, D5, C5, B4,,,,,,

                    E5, Ds5, E5, Ds5, E5, Ds5, E5, Ds5, E5, Ds5, E5, Ds5, E5, B4, D5, C5, A4,,,
                    C4, E4, A4, B4,,, E4, Gs4, B4, C5,,,
                    E5, Ds5, E5, Ds5, E5, B4, D5, C5, A4,,,
                    C4, E4, A4, B4,,, E4, C5, B4, A4
                    `;

const theMaidensPrayer = `C4, E5, G5, C6, E6,,, D6, D6,, C6, C6, B5, A5, A5,,,,
                            B3, B4, D5, F5, B5,,, A5, A5,, G5, G5, F5, E5, E5,,,,
                            C4, E5, G5, C6, E6,,, D6, D6,, C6, C6, B5, A5, A5,,,,
                            D4, B5, D6, G6, C4, C6, E6, G6, G5,, E6, D6, C6,,,,

                            C4, E5, G5, C6, E6,,, D6, D6,, C6, C6, B5, A5, A5,,,,
                            B3, B4, D5, F5, B5,,, A5, A5,, G5, G5, F5, E5, E5,,,,
                            C4, E5, G5, C6, E6,,, D6, D6,, C6, C6, B5, A5, A5,,,,
                            D4, B5, D6, G6, C4, C6, E6, G6, G5,, E6, D6, C6
                            `;

// Play Song
const playSong = (songString) => {
    const songNotes = songString.split(',');
    let notesIdx = 0;
    let key;
    const mousedown = new Event('mousedown');
    const mouseup = new Event('mouseup');

    const interval = setInterval(() => {
        if (notesIdx < songNotes.length) {
            if (songNotes[notesIdx].trim() !== "") {
                if (key) {
                    key.dispatchEvent(mouseup);
                }
    
                key = document.querySelector(`[data-letter-notes-file-name="${songNotes[notesIdx].trim()}"]`);
                key.dispatchEvent(mousedown);
            }
            notesIdx ++;
        } else {
            clearInterval(interval);
            key.dispatchEvent(mouseup);
        }
    }, 300);

    stopBtn.addEventListener('mousedown', () => {
        clearInterval(interval);
        key.dispatchEvent(mouseup);
    })
}

// Song Option
let song;
songOptions.addEventListener('change', (e) => {
    song = e.target.value;
})

playBtn.addEventListener('mousedown', () => {
    if (song === "happyBirthday") {
        playSong(happyBirthday);
    } else if (song === "furElise") {
        playSong(furElise);
    } else if (song === "theMaiden'sPrayer") {
        playSong(theMaidensPrayer);
    }
})

init();