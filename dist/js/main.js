// Init Speech Synth API
const synth = window.speechSynthesis;

// DOM Elements
const textForm = document.querySelector('form'),
  textInput = document.getElementById('text-input'),
  voiceSelect = document.getElementById('voice-select'),
  rate = document.getElementById('rate'),
  rateValue = document.getElementById('rate-value'),
  pitch = document.getElementById('pitch'),
  pitchValue = document.getElementById('pitch-value'),
  body = document.querySelector('body');

//   Init the Voices Array
let voices = [];

const getVoices = () => {
  voices = synth.getVoices();
  // Loop through voices and create an option for each one
  voices.forEach(voice => {
    // Create an option element
    const option = document.createElement('option');
    // Fill the option with voice and language
    option.textContent = voice.name + '(' + voice.lang + ')';
    // Set needed option attributes
    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    voiceSelect.appendChild(option);
  });
};

getVoices();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

// Speak
const speak = () => {
  // Check if speaking
  if (synth.speaking) {
    console.error('Already Speaking...');
    return;
  }
  if (textInput.value !== '') {
    // Add Background Animation
    body.style.background = "#141414 url('img/wave.gif')";
    body.style.backgroundRepeat = 'repeat-x';
    body.style.backgroundSize = '100% 100%';
    //   Get speak text
    const speakText = new SpeechSynthesisUtterance(textInput.value);
    // Speak End
    speakText.onend = e => {
      console.log('Done speaking...');
      body.style.background = '#141414';
    };
    // Speak Error
    speakText.onerror = e => {
      console.error('Something Went Wrong');
    };
    // Selected voice
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
      'data-name'
    );
    // Loop through voices
    voices.forEach(voice => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });
    // Set pitch and rate
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;
    // Speak
    synth.speak(speakText);
  }
};

// Event Listeners

// Text form submit
textForm.addEventListener('submit', e => {
  e.preventDefault();
  speak();
  textInput.blur();
});

// Rate value change
rate.addEventListener('change', e => (rateValue.textContent = rate.value));

// Rate value change
pitch.addEventListener('change', e => (pitchValue.textContent = pitch.value));

// Voice select change
voiceSelect.addEventListener('change', e => speak());
