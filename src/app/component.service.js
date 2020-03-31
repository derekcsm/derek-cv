import * as Tone from "tone";
var freeverb = new Tone.Freeverb().toMaster();
freeverb.dampening.value = 7000;
freeverb.roomSize.value = 0.7;

var pingPong = new Tone.PingPongDelay("8n", 0.2).toMaster();

var synth = new Tone.PolySynth(6, Tone.FMSynth, {
  oscillator: {
    type: "sine"
  }
})
  .toMaster();

export class ComponentService {

  constructor() {

    synth.set({
      "detune": -1200,
      "volume": -12,
      "envelope": {
        "attack": 0.01,
        "decay": 1.20,
        "sustain": 0.0,
        "release": 1.2
      }
    });

    window.onload = function () {
      this.toneButton = document.getElementById("toneButton");
      this.toneButton.addEventListener("mousedown", () => {
        synth.triggerAttackRelease(["C4", "E4", "A4"], "4n");
      });

      document.querySelector('tone-keyboard').addEventListener('noteon', e => {
        synth.triggerAttack(e.detail.name);
      })
      document.querySelector('tone-keyboard').addEventListener('noteoff', e => {
        synth.triggerRelease(e.detail.name)
      })
    }
  }

}