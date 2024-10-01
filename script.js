const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");
const heartRateDisplay = document.getElementById("heartRate");
const co2StatusDisplay = document.getElementById("co2Status");
const plugStatusDisplay = document.getElementById("plugStatus");
const spo2Display = document.getElementById("spo2");
const temperatureDisplay = document.getElementById("temperature");
const respiratoryRateDisplay = document.getElementById("respiratoryRate");
const flatlineStatusDisplay = document.getElementById("flatlineStatus");

let monitoring = false;
let intervalId;
let heartRate = getRandomHeartRate();

function startMonitoring() {
    monitoring = true;
    heartRateDisplay.textContent = heartRate;
    startBeating();
    setRandomValues(); // Set random values for the first time
}

function stopMonitoring() {
    monitoring = false;
    clearInterval(intervalId);
    flatline();
}

function startBeating() {
    intervalId = setInterval(() => {
        if (monitoring) {
            drawHeartbeat(heartRate);
        }
    }, 100); // Adjusted to be smoother

    // Change heart rate every 30 seconds to 2 minutes
    setInterval(() => {
        if (monitoring) {
            heartRate = getRandomHeartRate();
            heartRateDisplay.textContent = heartRate;
            updateOtherValues();
        }
    }, getRandomTimeInterval());
}

function getRandomHeartRate() {
    return Math.floor(Math.random() * (100 - 60 + 1)) + 60; // Random heart rate between 60 and 100 BPM
}

function getRandomTimeInterval() {
    return Math.floor(Math.random() * (120000 - 30000 + 1)) + 30000; // Random interval between 30 seconds (30000 ms) and 2 minutes (120000 ms)
}

function updateOtherValues() {
    const oxygenSaturation = Math.max(95, heartRate - 60 + Math.random() * 10).toFixed(0);
    spo2Display.textContent = oxygenSaturation;
    temperatureDisplay.textContent = (36 + Math.random() * 2).toFixed(1);
    respiratoryRateDisplay.textContent = (12 + Math.floor(Math.random() * 6)).toString(); // Normal range 12-18 RR
}

function drawHeartbeat(heartRate) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    
    const pulseHeight = (heartRate - 60) * 3; // Scale pulse height larger
    const pulseWidth = 30; // Width of each pulse segment
    const centerY = canvas.height / 2;

    // Draw a heartbeat pattern
    for (let i = 0; i < canvas.width; i += pulseWidth) {
        ctx.lineTo(i, centerY);
        ctx.lineTo(i + pulseWidth / 4, centerY - pulseHeight); // Peak of the pulse
        ctx.lineTo(i + pulseWidth / 2, centerY);
    }
    
    ctx.strokeStyle = '#007bff'; // Blue color for the heartbeat
    ctx.lineWidth = 4; // Thicker line for more visibility
    ctx.stroke();
    ctx.closePath();
}

function flatline() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.strokeStyle = 'red'; // Flatline color
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.closePath();
    
    flatlineStatusDisplay.textContent = "Yes";
}

// Initialize with random values
startMonitoring();
