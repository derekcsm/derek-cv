import * as Tone from "tone";

export class ComponentService {

  constructor() {
    var poly = new Tone.PolySynth(6, Tone.FMSynth, {
      "volume": -12,
      "harmonicity": 8,
      "modulationIndex": 4,
      "oscillator": {
        "type": "sine"
      },
      "envelope": {
        "attack": 0.001,
        "decay": 2,
        "sustain": 0.1,
        "release": 2
      },
      "modulation": {
        "type": "square"
      },
      "modulationEnvelope": {
        "attack": 0.002,
        "decay": 0.2,
        "sustain": 0,
        "release": 0.2
      }
    }).toMaster();

    window.onload = function () {
      this.chord1 = document.getElementById("chord1");
      this.chord2 = document.getElementById("chord2");
      this.chord3 = document.getElementById("chord3");
      this.chord4 = document.getElementById("chord4");

      document.addEventListener("keydown", (key) => {
        if (key.repeat) {
          return;
        }

        if (key.Handled) {
          return;
        }

        this.console.log("keydown: " + key.code);

        switch (key.code) {
          case "Digit1":
            playChord1(true);
            break;
          case "Digit2":
            playChord2(true);
            break;
          case "Digit3":
            playChord3(true);
            break;
          case "Digit4":
            playChord4(true);
            break;
        }

        key.Handled = true;
      });

      document.addEventListener("keyup", (key) => {
        this.console.log("keyup: " + key.code);

        key.stopImmediatePropagation();

        switch (key.code) {
          case "Digit1":
            playChord1(false);
            break;
          case "Digit2":
            playChord2(false);
            break;
          case "Digit3":
            playChord3(false);
            break;
          case "Digit4":
            playChord4(false);
            break;
        }
      });

      // ----
      this.chord1.addEventListener("mousedown", () => {
        playChord1(true);
      });
      this.chord1.addEventListener("mouseup", () => {
        playChord1(false);
      });

      // ----
      this.chord2.addEventListener("mousedown", () => {
        playChord2(true);
      });
      this.chord2.addEventListener("mouseup", () => {
        playChord2(false);
      });

      // ----
      this.chord3.addEventListener("mousedown", () => {
        playChord3(true);
      });
      this.chord3.addEventListener("mouseup", () => {
        playChord3(false);
      });

      // ----
      this.chord4.addEventListener("mousedown", () => {
        playChord4(true);
      });
      this.chord4.addEventListener("mouseup", () => {
        playChord4(false);
      });
    }

    let chord1Playing = false;
    function playChord1(clickDown) {
      if (clickDown && chord1Playing) {
        return;
      }

      if (clickDown) {
        chord1Playing = true;
        poly.triggerAttack(["B4", "D4", "F#4"]);
      } else {
        chord1Playing = false;
        poly.triggerRelease(["B4", "D4", "F#4"]);
      }
    }

    let chord2Playing = false;
    function playChord2(clickDown) {
      if (clickDown && chord2Playing) {
        return;
      }

      if (clickDown) {
        chord2Playing = true;
        poly.triggerAttack(["F#4", "A4", "C#4"]);
      } else {
        chord2Playing = false;
        poly.triggerRelease(["F#4", "A4", "C#4"]);
      }
    }

    let chord3Playing = false;
    function playChord3(clickDown) {
      if (clickDown && chord3Playing) {
        return;
      }

      if (clickDown) {
        chord3Playing = true;
        poly.triggerAttack(["C#4", "E4", "G#4"]);
      } else {
        chord3Playing = false;
        poly.triggerRelease(["C#4", "E4", "G#4"]);
      }
    }

    let chord4Playing = false;
    function playChord4(clickDown) {
      if (clickDown && chord4Playing) {
        return;
      }

      if (clickDown) {
        chord4Playing = true;
        poly.triggerAttack(["C#4", "E#4", "G#4", "B4"]);
      } else {
        chord4Playing = false;
        poly.triggerRelease(["C#4", "E#4", "G#4", "B4"]);
      }
    }

  }
}