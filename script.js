let audio = document.getElementById("audio");
let file = document.getElementById("thefile");

file.onchange = function() {
    let files = this.files;
    audio.src = URL.createObjectURL(files[0]);
    audio.onload;
    
const canvas = document.getElementById("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const audioCtx = new window.AudioContext();
let audioSource = null;
let analyser = null;

audio.play();
audioSource = audioCtx.createMediaElementSource(audio);
analyser = audioCtx.createAnalyser();
audioSource.connect(analyser);
analyser.connect(audioCtx.destination);

analyser.fftSize =1024;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);
const barWidth = canvas.width / bufferLength;


var ctx = canvas.getContext("2d");    

function animate() {
    requestAnimationFrame(animate);
    
    x = 0;
    analyser.getByteFrequencyData(dataArray);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawVisualizer({ bufferLength, dataArray, barWidth })
    
}

const drawVisualizer = ({ bufferLength, dataArray, barWidth }) => {
    
    let barHeight;
for (let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i];
    const red = (i * barHeight)/10;
    const green = i * 4;
    const blue = barHeight / 4 - 12;
    ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
    ctx.fillRect(
        canvas.width / 2 - x,
        canvas.height - barHeight,
        barWidth,
        barHeight
        );
    x += barWidth;
};

for (let j = 0; j < bufferLength; j++) {
    barHeight = dataArray[j];
    const red = (j * barHeight)/10;
    const green = j * 4;
    const blue = barHeight / 4 - 12;
    ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
    ctx.fillRect(
        //canvas.width /2 +
         x,
        canvas.height - barHeight,
        barWidth,
        barHeight
        );
     x += barWidth;
}

}
audio.play();
animate();

}