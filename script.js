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

function startMonitoring() {
    monitoring = true;
    startBeating();
}

function stopMonitoring() {
    monitoring = false;
    clearInterval(intervalId);
    flatline();
}

function startBeating() {
    intervalId = setInterval(() => {
        if (monitoring) {
            const heartRate = getRandomHeartRate();
            heartRateDisplay.textContent = heartRate;

            // Sync other values based on heart rate
            const oxygenSaturation = Math.max(95, heartRate - 60 + Math.random() * 10).toFixed(0);
            spo2Display.textContent = oxygenSaturation;
            temperatureDisplay.textContent = (36 + Math.random() * 2).toFixed(1);
            respiratoryRateDisplay.textContent = (12 + Math.floor(Math.random() * 6)).toString(); // Normal range 12-18 RR

            drawHeartbeat(heartRate);
            updateFlatlineStatus(false);
        }
    }, getRandomInterval());
}

function getRandomHeartRate() {
    return Math.floor(Math.random() * (100 - 60 + 1)) + 60; // Random heart rate between 60 and 100 BPM
}

function getRandomInterval() {
    return 600; // Fixed interval for consistent heartbeat
}

function drawHeartbeat(heartRate) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    
    const pulseHeight = (heartRate - 60) * 2; // Scale pulse height
    const pulseWidth = 30; // Width of each pulse segment
    const centerY = canvas.height / 2;

    // Draw a heartbeat pattern
    for (let i = 0; i < canvas.width; i += pulseWidth) {
        ctx.lineTo(i, centerY);
        ctx.lineTo(i + pulseWidth / 4, centerY - pulseHeight); // Peak of the pulse
        ctx.lineTo(i + pulseWidth / 2, centerY);
    }
    
    ctx.strokeStyle = '#007bff'; // Blue color for the heartbeat
    ctx.lineWidth = 2;
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
