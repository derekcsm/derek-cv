import * as Tone from "tone";
import * as rebound from "rebound";

var springSystem = new rebound.SpringSystem();
var spring1 = springSystem.createSpring(54, 20);
var spring2 = springSystem.createSpring(54, 20);
var spring3 = springSystem.createSpring(54, 20);
var spring4 = springSystem.createSpring(54, 20);

export class ComponentService {

  constructor() {
    var poly = new Tone.PolySynth(6, Tone.FMSynth, {
      "volume": -12,
      "harmonicity": 8,
      "modulationIndex": 6,
      "oscillator": {
        "type": "sine"
      },
      "envelope": {
        "attack": 0.001,
        "decay": 2,
        "sustain": 0.4,
        "release": 1.5
      },
      "modulation": {
        "type": "square"
      },
      "modulationEnvelope": {
        "attack": 0.002,
        "decay": 0.2,
        "sustain": 0,
        "release": 0.3
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
          case "KeyR":
            playChord1(true);
            break;
          case "KeyT":
            playChord2(true);
            break;
          case "KeyY":
            playChord3(true);
            break;
          case "KeyU":
            playChord4(true);
            break;
        }

        key.Handled = true;
      });

      document.addEventListener("keyup", (key) => {
        this.console.log("keyup: " + key.code);

        key.stopImmediatePropagation();

        switch (key.code) {
          case "KeyR":
            playChord1(false);
            break;
          case "KeyT":
            playChord2(false);
            break;
          case "KeyY":
            playChord3(false);
            break;
          case "KeyU":
            playChord4(false);
            break;
        }
      });

      this.chord1.addEventListener("mousedown", () => {
        playChord1(true);
      });
      this.chord1.addEventListener("mouseup", () => {
        playChord1(false);
      });
      this.chord1.addEventListener("mousemove", () => {
        playChord1(false);
      });
      this.chord2.addEventListener("mousedown", () => {
        playChord2(true);
      });
      this.chord2.addEventListener("mouseup", () => {
        playChord2(false);
      });
      this.chord2.addEventListener("mousemove", () => {
        playChord2(false);
      });
      this.chord3.addEventListener("mousedown", () => {
        playChord3(true);
      });
      this.chord3.addEventListener("mouseup", () => {
        playChord3(false);
      });
      this.chord3.addEventListener("mousemove", () => {
        playChord3(false);
      });
      this.chord4.addEventListener("mousedown", () => {
        playChord4(true);
      });
      this.chord4.addEventListener("mouseup", () => {
        playChord4(false);
      });
      this.chord4.addEventListener("mousemove", () => {
        playChord4(false);
      });

      // ----
      // Animation setup
      spring1.addListener({
        onSpringUpdate: function(spring) {
          var val = spring.getCurrentValue();
          val = rebound.MathUtil
                       .mapValueInRange(val, 0, 1, 1, 0.5);
          scale(chord1, val);
        }
      });

      spring2.addListener({
        onSpringUpdate: function(spring) {
          var val = spring.getCurrentValue();
          val = rebound.MathUtil
                       .mapValueInRange(val, 0, 1, 1, 0.5);
          scale(chord2, val);
        }
      });

      spring3.addListener({
        onSpringUpdate: function(spring) {
          var val = spring.getCurrentValue();
          val = rebound.MathUtil
                       .mapValueInRange(val, 0, 1, 1, 0.5);
          scale(chord3, val);
        }
      });

      spring4.addListener({
        onSpringUpdate: function(spring) {
          var val = spring.getCurrentValue();
          val = rebound.MathUtil
                       .mapValueInRange(val, 0, 1, 1, 0.5);
          scale(chord4, val);
        }
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
        spring1.setEndValue(1);
      } else {
        chord1Playing = false;
        poly.triggerRelease(["B4", "D4", "F#4"]);
        spring1.setEndValue(0);
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
        spring2.setEndValue(1);
      } else {
        chord2Playing = false;
        poly.triggerRelease(["F#4", "A4", "C#4"]);
        spring2.setEndValue(0);
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
        spring3.setEndValue(1);
      } else {
        chord3Playing = false;
        poly.triggerRelease(["C#4", "E4", "G#4"]);
        spring3.setEndValue(0);
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
        spring4.setEndValue(1);
      } else {
        chord4Playing = false;
        poly.triggerRelease(["C#4", "E#4", "G#4", "B4"]);
        spring4.setEndValue(0);
      }
    }
    
    // -- animations

    function scale(el, val) {
      el.style.mozTransform =
      el.style.msTransform =
      el.style.webkitTransform =
      el.style.transform = 'scale3d(' +
        val + ', ' + val + ', 1)';
    }

  }
}