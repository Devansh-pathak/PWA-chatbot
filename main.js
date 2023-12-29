import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'


document.addEventListener('DOMContentLoaded', () => {
  const recordButton = document.getElementById('recordButton');
  const audioPlayback = document.getElementById('audioPlayback');
  let mediaRecorder;
  let audioChunks = [];

  recordButton.addEventListener('click', () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      recordButton.textContent = 'Record';
    } else {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          mediaRecorder = new MediaRecorder(stream);
          mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
          mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks);
            const audioUrl = URL.createObjectURL(audioBlob);
            audioPlayback.src = audioUrl;
            audioChunks = [];
          };
          mediaRecorder.start();
          recordButton.textContent = 'Stop';
        });
    }
  });
});


setupCounter(document.querySelector('#counter'))
