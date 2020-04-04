import * as Tone from "tone";
import * as rebound from "rebound";

var springSystem = new rebound.SpringSystem();
var spring1 = springSystem.createSpring(58, 9);
var spring2 = springSystem.createSpring(58, 9);
var spring3 = springSystem.createSpring(58, 9);
var spring4 = springSystem.createSpring(58, 9);

var sound1Layout;
var sound2Layout;
var sound3Layout;
var sound4Layout;

export class ComponentService {

  constructor() {

    document.documentElement.addEventListener(
      "mousedown", function () {
        mouse_IsDown = true;
        if (Tone.context.state !== 'running') {
          Tone.context.resume();
        }
      })

    var phaser = new Tone.Phaser({
      "frequency": 20,
      "octaves": 2,
      "Q": 10,
      "baseFrequency": 1600
    }).toMaster();

    var poly = new Tone.PolySynth(6, Tone.FMSynth, {
      "volume": -6,
      "harmonicity": 8,
      "modulationIndex": 6,
      "oscillator": {
        "type": "sine"
      },
      "envelope": {
        "attack": 0.001,
        "decay": 2,
        "sustain": 0.4,
        "release": 1.8
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
    });

    poly.connect(phaser);
    poly.toMaster()

    window.onload = function () {
      sound1Layout = document.getElementById("sound1");
      sound2Layout = document.getElementById("sound2");
      sound3Layout = document.getElementById("sound3");
      sound4Layout = document.getElementById("sound4");

      document.addEventListener("keydown", (key) => {
        if (key.repeat) {
          return;
        }

        if (key.Handled) {
          return;
        }

        console.log("keydown: " + key.code);

        switch (key.code) {
          case "Digit1":
            playSound1(true);
            break;
          case "Digit2":
            playSound2(true);
            break;
          case "Digit3":
            playSound3(true);
            break;
          case "Digit4":
            playSound4(true);
            break;
        }

        key.Handled = true;
      });

      document.addEventListener("keyup", (key) => {
        console.log("keyup: " + key.code);

        key.stopImmediatePropagation();

        switch (key.code) {
          case "Digit1":
            playSound1(false);
            break;
          case "Digit2":
            playSound2(false);
            break;
          case "Digit3":
            playSound3(false);
            break;
          case "Digit4":
            playSound4(false);
            break;
        }
      });

      connectEventListeners();

      connectAnimationListeners();
    }

    let sound1Playing = false;
    function playSound1(clickDown) {
      if (clickDown && sound1Playing) {
        return;
      }

      if (clickDown) {
        sound1Playing = true;
        poly.triggerAttack(["C#3"]);
        spring1.setEndValue(1);
      } else {
        sound1Playing = false;
        poly.triggerRelease(["C#3"]);
        spring1.setEndValue(0);
      }
    }

    let sound2Playing = false;
    function playSound2(clickDown) {
      if (clickDown && sound2Playing) {
        return;
      }

      if (clickDown) {
        sound2Playing = true;
        poly.triggerAttack(["E#3"]);
        spring2.setEndValue(1);
      } else {
        sound2Playing = false;
        poly.triggerRelease(["E#3"]);
        spring2.setEndValue(0);
      }
    }

    let sound3Playing = false;
    function playSound3(clickDown) {
      if (clickDown && sound3Playing) {
        return;
      }

      if (clickDown) {
        sound3Playing = true;
        poly.triggerAttack(["G#3"]);
        spring3.setEndValue(1);
      } else {
        sound3Playing = false;
        poly.triggerRelease(["G#3"]);
        spring3.setEndValue(0);
      }
    }

    let sound4Playing = false;
    function playSound4(clickDown) {
      if (clickDown && sound4Playing) {
        return;
      }

      if (clickDown) {
        sound4Playing = true;
        poly.triggerAttack(["B#3"]);
        spring4.setEndValue(1);
      } else {
        sound4Playing = false;
        poly.triggerRelease(["B#3"]);
        spring4.setEndValue(0);
      }
    }

    function connectEventListeners() {
      sound1Layout.addEventListener("mousedown", () => {
        playSound1(true);
      });
      sound1Layout.addEventListener("touchstart", () => {
        playSound1(true);
      });
      sound1Layout.addEventListener("mouseup", () => {
        playSound1(false);
      });
      sound1Layout.addEventListener("mousemove", () => {
        playSound1(false);
      });
      sound1Layout.addEventListener("touchend", () => {
        playSound1(false);
      });

      sound2Layout.addEventListener("mousedown", () => {
        playSound2(true);
      });
      sound2Layout.addEventListener("touchstart", () => {
        playSound2(true);
      });
      sound2Layout.addEventListener("mouseup", () => {
        playSound2(false);
      });
      sound2Layout.addEventListener("mousemove", () => {
        playSound2(false);
      });
      sound2Layout.addEventListener("touchend", () => {
        playSound2(false);
      });

      sound3Layout.addEventListener("mousedown", () => {
        playSound3(true);
      });
      sound3Layout.addEventListener("touchstart", () => {
        playSound3(true);
      });
      sound3Layout.addEventListener("mouseup", () => {
        playSound3(false);
      });
      sound3Layout.addEventListener("mousemove", () => {
        playSound3(false);
      });
      sound3Layout.addEventListener("touchend", () => {
        playSound3(false);
      });

      sound4Layout.addEventListener("mousedown", () => {
        playSound4(true);
      });
      sound4Layout.addEventListener("touchstart", () => {
        playSound4(true);
      });
      sound4Layout.addEventListener("mouseup", () => {
        playSound4(false);
      });
      sound4Layout.addEventListener("mousemove", () => {
        playSound4(false);
      });
      sound4Layout.addEventListener("touchend", () => {
        playSound4(false);
      });
    }

    function connectAnimationListeners() {
      spring1.addListener({
        onSpringUpdate: function (spring) {
          var val = spring.getCurrentValue();
          val = rebound.MathUtil
            .mapValueInRange(val, 0, 1, 1, 0.4);
          scale(sound1Layout, val);
        }
      });

      spring2.addListener({
        onSpringUpdate: function (spring) {
          var val = spring.getCurrentValue();
          val = rebound.MathUtil
            .mapValueInRange(val, 0, 1, 1, 0.4);
          scale(sound2Layout, val);
        }
      });

      spring3.addListener({
        onSpringUpdate: function (spring) {
          var val = spring.getCurrentValue();
          val = rebound.MathUtil
            .mapValueInRange(val, 0, 1, 1, 0.4);
          scale(sound3Layout, val);
        }
      });

      spring4.addListener({
        onSpringUpdate: function (spring) {
          var val = spring.getCurrentValue();
          val = rebound.MathUtil
            .mapValueInRange(val, 0, 1, 1, 0.4);
          scale(sound4Layout, val);
        }
      });
    }

    function scale(el, val) {
      el.style.mozTransform =
        el.style.msTransform =
        el.style.webkitTransform =
        el.style.transform = 'scale3d(' +
        val + ', ' + val + ', 1)';
    }
  }
}