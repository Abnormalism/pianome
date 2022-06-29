let keyboard = document.querySelector(".piano_keyboard");
let playBtn = document.querySelector(".piano_play-btn");
let controls = document.querySelectorAll(".piano_control_option");
let pianoNotes = ["C", "D", "E", "F", "G", "A", "B"];
let keyboardMap = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
];
let keys = [];
let happyBirthday = `G4,G4,A4,G4,C4,B4
                      G4,G4,A4,G4,D5,C5
                      G4,G4,G5,E5,C5,B4,A4
                      F5,F5,E5,C5,D5,C5`;

let playSong = (noteString, tempo) => {
  let notes = noteString.split(",");
  let currentNote = 0;
  let mousedown = new Event("mousedown");
  let interval = setInterval(() => {
    if (currentNote < notes.length) {
      let btn = document.querySelector(
        `[data-letter-note="${notes[currentNote]}"]`
      );
      // btn.dispatchEvent(mousedown);
      currentNote++;
    } else {
      clearInterval(interval);
    }
  }, 200);
};

playBtn.addEventListener("mousedown", () => {
  playSong(happyBirthday, 2);
});

let init = () => {
  for (let i = 1; i <= 5; i++) {
    for (let j = 0; j < 7; j++) {
      let key = createKey("white", pianoNotes[j], i);
      key.dataset.keyboard = keyboardMap[j + (i - 1) * 7];
      keyboard.appendChild(key);

      if (j != 2 && j != 6) {
        key = createKey("black", pianoNotes[j], i);
        key.dataset.keyboard = "⇧+" + keyboardMap[j + (i - 1) * 7];
        let emptySpace = document.createElement("div");
        emptySpace.className = "empty-space";
        emptySpace.appendChild(key);
        keyboard.appendChild(emptySpace);
      }
    }
  }
};

let createKey = (type, note, octave) => {
  let key = document.createElement("button");
  key.className = `piano_key piano_key--${type}`;
  key.dataset.letterNotes =
    type == "white" ? note + octave : note + "#" + octave;
  key.dataset.letterNoteFileName =
    type == "white" ? note + octave : note + "s" + octave;
  key.textContent = key.dataset.letterNotes;
  keys.push(key);

  key.addEventListener("mousedown", () => {
    playSound(key);
    key.classList.add("piano_key-playing");
  });

  key.addEventListener("mouseup", () => {
    key.classList.remove("piano_key-playing");
  });

  key.addEventListener("mouseleave", () => {
    key.classList.remove("piano_key-playing");
  });

  return key;
};

document.addEventListener("keydown", (e) => {
  if (e.repeat) {
    return;
  }
  let lastLetter = e.code.substring(e.code.length - 1);
  let isShiftPressed = e.shiftKey;
  let selector;
  if (isShiftPressed) {
    selector = `[data-keyboard="⇧+${lastLetter}"]`;
  } else {
    selector = `[data-keyboard=${lastLetter}]`;
  }

  let key = document.querySelector(selector);
  if (key !== null) {
    let mousedown = new Event("mousedown");
    key.dispatchEvent(mousedown);
  }
});

document.addEventListener("keyup", (e) => {
  let lastLetter = e.code.substring(e.code.length - 1);
  let isShiftPressed = e.shiftKey;
  let selector;
  if (isShiftPressed) {
    selector = `[data-keyboard="⇧+${lastLetter}"]`;
  } else {
    selector = `[data-keyboard=${lastLetter}]`;
  }

  let key = document.querySelector(selector);
  if (key !== null) {
    let mouseup = new Event("mouseup");
    key.dispatchEvent(mouseup);
  }
});

let playSound = (key) => {
  let audio = document.createElement("audio");
  audio.src = `sounds/${key.dataset.letterNoteFileName}.mp3`;
  audio.play().then(() => audio.remove());
};

controls.forEach((input) => {
  input.addEventListener("input", () => {
    let value = input.value;

    keys.forEach((key) => {
      key.textContent = key.dataset[value];
    });
  });
});
init();
